import compose from 'compose-function'

/* eslint-disable prettier/prettier */
const stopRecording = (recorder) => () => proccesAudio(recorder)
const createPlayerStop = (_stopRecording) => () => {
  const audio = _stopRecording()
  return { player: new Audio(audio.audioUrl), audio }
}

const record = compose(createPlayerStop, stopRecording, setUpRecording)

export function AudioRecorder() {
  const micRef = { current: {} }
  const recorder: any = { current: {} }
  const recording: any = {}

  const startRecord = () => {
    if (micRef && micRef.current) {
      recorder.current = record(micRef.current)
    }
  }

  const stopRecord = () => {
    Object.assign(recording, recorder.current())
  }

  askForMic().then((stream: MediaStream) => {
    if (!stream) throw new Error('no source to record from')
    micRef.current = stream
    startRecord()
  })

  return {
    startRecord,
    stopRecord,
    recording
  }
}

function setUpRecording(stream) {
  const context = new AudioContext({ sampleRate: 44100 })
  const sampleRate = context.sampleRate
  const stats: any = {
    leftChannel: [],
    rightChannel: [],
    recordingLength: 0
  }
  // creates a gain node
  // const volume = context.createGain()
  // creates an audio node from the microphone incoming stream
  const audioInput = context.createMediaStreamSource(stream)
  // Create analyser
  const analyser = context.createAnalyser()
  // connect audio input to the analyser
  audioInput.connect(analyser)

  // connect analyser to the volume control
  // analyser.connect(volume);
  const bufferSize = 2048
  const recorder = context.createScriptProcessor(bufferSize, 2, 2)

  // we connect the volume control to the processor
  // volume.connect(recorder);

  analyser.connect(recorder)

  // finally connect the processor to the output
  recorder.connect(context.destination)

  recorder.onaudioprocess = function (e) {
    const left = e.inputBuffer.getChannelData(0)
    const right = e.inputBuffer.getChannelData(1)
    // we clone the samples
    stats.leftChannel.push(new Float32Array(left))
    stats.rightChannel.push(new Float32Array(right))
    stats.recordingLength += bufferSize
  }
  return {
    stats,
    sampleRate,
    stop: () => {
      stream.getTracks().forEach((track) => track.stop())
      context.close()
    }
  }
}

type Recording = {
  stats: {
    leftChannel: any[]
    rightChannel: any[]
    recordingLength: number
  }
  sampleRate: number
  stop: () => any
}

type RecordingResult = {
  buffer: ArrayBuffer
  audioUrl: string
  blob: Blob
}
async function askForMic() {
  return navigator.mediaDevices.getUserMedia({
    audio: true,
    video: false
  })
}

// async function getMics() {
//   const devices = await navigator.mediaDevices.enumerateDevices()
//   const mics =
//     devices && devices.filter((device) => device.kind === 'audioinput')
// }

//
function proccesAudio({
  stats: { leftChannel, rightChannel, recordingLength },
  sampleRate,
  stop
}: Recording): RecordingResult {
  stop()
  // we flat the left and right channels down
  const leftBuffer = mergeBuffers(leftChannel, recordingLength)
  const rightBuffer = mergeBuffers(rightChannel, recordingLength)
  // we interleave both channels together
  const interleaved = interleave(leftBuffer, rightBuffer)

  /// ////////// WAV Encode /////////////////
  // from http://typedarray.org/from-microphone-to-wav-with-getusermedia-and-web-audio/
  //

  // we create our wav file
  const buffer = new ArrayBuffer(44 + interleaved.length * 2)
  const view = new DataView(buffer)

  // RIFF chunk descriptor
  writeUTFBytes(view, 0, 'RIFF')
  view.setUint32(4, 44 + interleaved.length * 2, true)
  writeUTFBytes(view, 8, 'WAVE')
  // FMT sub-chunk
  writeUTFBytes(view, 12, 'fmt ')
  view.setUint32(16, 16, true)
  view.setUint16(20, 1, true)
  // stereo (2 channels)
  view.setUint16(22, 2, true)
  view.setUint32(24, sampleRate, true)
  view.setUint32(28, sampleRate * 4, true)
  view.setUint16(32, 4, true)
  view.setUint16(34, 16, true)
  // data sub-chunk
  writeUTFBytes(view, 36, 'data')
  view.setUint32(40, interleaved.length * 2, true)

  // write the PCM samples
  const lng = interleaved.length
  let index = 44
  const volume = 1
  for (let i = 0; i < lng; i++) {
    view.setInt16(index, interleaved[i] * (0x7fff * volume), true)
    index += 2
  }

  // our final binary blob
  const blob = new Blob([view], { type: 'audio/wav' })

  const audioUrl = URL.createObjectURL(blob)
  // console.log('BLOB ', blob)
  // console.log('URL ', audioUrl)
  return { buffer, audioUrl, blob }
}

function mergeBuffers(channelBuffer, recordingLength) {
  const result = new Float32Array(recordingLength)
  let offset = 0
  const lng = channelBuffer.length
  // debugger
  for (let i = 0; i < lng; i++) {
    const buffer = channelBuffer[i]
    result.set(buffer, offset)
    offset += buffer.length
  }
  return result
}

function interleave(leftChannel, rightChannel) {
  const length = leftChannel.length + rightChannel.length
  const result = new Float32Array(length)

  let inputIndex = 0

  for (let index = 0; index < length; ) {
    result[index++] = leftChannel[inputIndex]
    result[index++] = rightChannel[inputIndex]
    inputIndex++
  }
  return result
}

function writeUTFBytes(view, offset, string) {
  const lng = string.length
  for (let i = 0; i < lng; i++) {
    view.setUint8(offset + i, string.charCodeAt(i))
  }
}

import React from 'react'
import MicRecorder from 'mic-recorder-to-mp3'
import compose from 'compose-function'

// NOTE: in Android there's an issue with recording while starting speech recognizing
const supportsRecordingWithSpeech =
  navigator.userAgent.match(/(mobile)|(android)/im) === null

export function useRecorder() {
  const [audio, setAudio] = React.useState<File>()
  const [player, setPlayer] = React.useState<HTMLAudioElement>()
  const recorderInstance = React.useRef<MicRecorder>(() => undefined)

  const start = () => {
    if (supportsRecordingWithSpeech) recorderInstance.current = record()
  }

  const stop = async () => {
    if (supportsRecordingWithSpeech) {
      const { file, audioPlayer } = await recorderInstance.current()
      setAudio(file)
      setPlayer(audioPlayer)
    }
  }

  return {
    start,
    stop,
    audio,
    player
  }
}

function setupMic() {
  return new MicRecorder({
    bitRate: 128
  })
}

function startRecording(recorder) {
  recorder.start()
  return recorder
}

function attachStopRecording(recorder) {
  return () =>
    recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const file = new File(buffer, 'reading.mp3', {
          type: blob.type,
          lastModified: Date.now()
        })

        const audioPlayer = new Audio(URL.createObjectURL(file))
        return { file, audioPlayer }
      })
      .catch((e) => {
        console.log(`Something went wrong with the recording ${e}`)
      })
}

const record = compose(attachStopRecording, startRecording, setupMic)

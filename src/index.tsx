/* eslint-disable no-unused-vars */
import * as React from 'react'
import { AudioRecorder } from './recorder.utils'
import compose from 'compose-function'

// NOTE: in Android there's an issue with recording while starting speech recognizing
const supportsRecordingWithSpeech =
  navigator.userAgent.match(/(mobile)|(android)/im) === null

export function useRecorder() {
  const [audio, setAudio] = React.useState<File>()
  const [player, setPlayer] = React.useState<HTMLAudioElement>()
  const recorderInstance = React.useRef<any>(() => undefined)
  // const { startRecord, stopRecord, recording } = useMic()

  const start = () => {
    recorderInstance.current = AudioRecorder()
  }

  const stop = async () => {
    recorderInstance.current.stopRecord()
    setPlayer(recorderInstance.current.recording.player)
  }

  return {
    start,
    stop,
    audio,
    player
  }
}

// function setupMic() {
//   return new MicRecorder({
//     bitRate: 128
//   })
// }

// function startRecording(recorder: MicRecorder) {
//   recorder.start()
//   return recorder
// }

// function attachStopRecording(recorder: MicRecorder) {
//   return () =>
//     recorder
//       .stop()
//       .getMp3()
//       .then(([buffer, blob]) => {
//         const file = new File(buffer, 'reading.mp3', {
//           type: blob.type,
//           lastModified: Date.now()
//         })

//         const audioPlayer = new Audio(URL.createObjectURL(file))
//         return { file, audioPlayer }
//       })
//       .catch((error: string) => {
//         console.log(`Something went wrong with the recording ${error}`)
//       })
// }

// const record = compose(attachStopRecording, startRecording, setupMic)

export const Recorder = () => {
  return <React.Fragment>Only Hook is implemented currently.</React.Fragment>
}

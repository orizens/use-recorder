/* eslint-disable no-unused-vars */
import * as React from 'react'
import { AudioRecorder } from './recorder.utils'

export function useRecorder() {
  const [audio, setAudio] = React.useState<File>()
  const [player, setPlayer] = React.useState<HTMLAudioElement>()
  const recorderInstance = React.useRef<any>(() => undefined)

  const start = () => {
    recorderInstance.current = AudioRecorder()
  }

  const stop = async () => {
    recorderInstance.current.stopRecord()
    setAudio(recorderInstance.current.recording.audio)
    setPlayer(recorderInstance.current.recording.player)
  }

  return {
    start,
    stop,
    audio,
    player
  }
}

export const Recorder = () => {
  return <React.Fragment>Only Hook is implemented currently.</React.Fragment>
}

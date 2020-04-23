import React from 'react'

import { Recorder, useRecorder } from 'use-recorder'
import 'use-recorder/dist/index.css'

const App = () => {
  const { start, stop, player } = useRecorder()
  return (
    <div>
      <Recorder />
      <button onClick={start}>start</button>
      <button onClick={stop}>stop</button>
      <button onClick={() => player.play()}>play</button>
      <button onClick={() => player.pause()}>pause</button>
    </div>
  )
}

export default App

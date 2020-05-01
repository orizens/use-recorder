import React from 'react'
import { useRecorder } from 'use-recorder'
import { Card } from './card'
import { Button } from './button'
import 'bulma/css/bulma.css'
import './styles.css'

const RecorderStarus = {
  PAUSED: 'paused',
  RECORDING: 'recording',
  PLAYING: 'playing',
  SILENT: 'silent'
}
export default function App() {
  const [status, setStatus] = React.useState(RecorderStarus.PAUSED)
  const { start, stop, player } = useRecorder()

  const actions = {
    [RecorderStarus.RECORDING]: start,
    [RecorderStarus.PAUSED]: stop,
    [RecorderStarus.PLAYING]: () => player.play(),
    [RecorderStarus.SILENT]: () => player.pause()
  }

  const handleAction = (action) => {
    setStatus(action)
    actions[action]()
  }

  return (
    <div className='container'>
      <div id='flow'>
        <span className='flow-1' />
        <span className='flow-2' />
        <span className='flow-3' />
      </div>
      <div className='row columns'>
        <div className='column is-half is-offset-one-quarter'>
          <Card>
            <div className='buttons'>
              {(status === RecorderStarus.PAUSED ||
                status === RecorderStarus.SILENT) && (
                <Button
                  icon='microphone'
                  onClick={() => handleAction(RecorderStarus.RECORDING)}
                  color='danger'
                >
                  record
                </Button>
              )}
              {status === RecorderStarus.RECORDING && (
                <Button
                  icon='stop'
                  color='danger'
                  onClick={() => handleAction(RecorderStarus.PAUSED)}
                  animate={true}
                >
                  stop recording
                </Button>
              )}
              {(status === RecorderStarus.PAUSED ||
                status === RecorderStarus.SILENT) &&
                !!player && (
                  <Button
                    icon='play'
                    color='info'
                    onClick={() => handleAction(RecorderStarus.PLAYING)}
                  >
                    play
                  </Button>
                )}
              {status === RecorderStarus.PLAYING && (
                <Button
                  icon='pause'
                  color='info'
                  onClick={() => handleAction(RecorderStarus.SILENT)}
                  animate={true}
                >
                  pause
                </Button>
              )}
            </div>
            {!!player && (
              <Button icon='download' color='info'>
                <a
                  href={player.src}
                  tooltip='download last recording'
                  download={`recording-${Date.now()}`}
                >
                  <span>download</span>
                </a>
              </Button>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}

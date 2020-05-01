import React from 'react'

export function Card({ children }) {
  return (
    <div className='card large'>
      <div className='card-image'>
        <figure className='image'>
          <img src='//source.unsplash.com/pe_R74hldW4' alt='splash' />
        </figure>
      </div>
      <div className='card-content'>
        <div className='media'>
          <div className='media-left'>
            <figure className='image is-96x96'>
              <img
                className='is-rounded'
                src='//www.gravatar.com/avatar/10036b8b167326fa6edfd2ad38c01ddc?s=512'
                alt='else'
              />
            </figure>
          </div>
          <div className='media-content'>
            <p className='title is-4 no-padding'>The Recorder Experience</p>
            <p>
              A <strong>"useRecorder()"</strong> example
              <br />
              can be installed via{' '}
              <a
                href='//www.npmjs.com/package/use-recorder'
                target='_blank'
                rel='noopener noreferrer'
              >
                npm
              </a>
              ,
              <a
                href='//github.com/orizens/use-recorder#readme'
                target='_blank'
                rel='noopener noreferrer'
              >
                source
              </a>
            </p>
            <p>
              By{' '}
              <span className='title is-6'>
                <a href='//twitter.com/orizens'>@orizens</a>
              </span>
            </p>
            <p className='subtitle is-6'>
              Senior Software Engineer <a href='//orizens.com/about'>more...</a>
            </p>
          </div>
        </div>
        <div className='content'>
          {children}
          <div className='background-icon'>
            <span className='icon-barcode' />
          </div>
        </div>
      </div>
    </div>
  )
}

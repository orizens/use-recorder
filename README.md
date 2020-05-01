# use-recorder

> An Audio and Microphone recorder hook for react apps

[![NPM](https://img.shields.io/npm/v/use-recorder.svg)](https://www.npmjs.com/package/use-recorder) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save use-recorder
```

## Usage

- [See Demo Here]
- [Source Code Here]

```tsx
import React from 'react'

import { useRecorder } from 'use-recorder'

const App = () => {
  const { start, stop, player } = useRecorder()
  return (
    <div>
      <button onClick={start}>start</button>
      <button onClick={stop}>stop</button>
      <button onClick={() => player.play()}>play</button>
      <button onClick={() => player.pause()}>pause</button>
    </div>
  )
}

export default App
```

## License

EULA © [orizens](https://github.com/orizens)

## Front End Consulting Services

I'm a Senior Senior Front End Engineer & Consultant at [Orizens](http://orizens.com).
My services include:

- React/Angular/Javascript Consulting
- Front End Consulting
- Project Code Review
- project bootstrapping and development.

[Contact Here](https://orizens.com/contact)

![alt text][orizens]

[orizens]: https://cloud.githubusercontent.com/assets/878660/23353771/d0adbd12-fcd6-11e6-96be-7a236f8819d9.png 'Orizens - React And Front End Consulting'
[see demo here]: https://p1wmc.csb.app/ 'demo recorder app here'
[source code here]: https://codesandbox.io/s/use-recorder-example-p1wmc 'demo user-recorder hook'

## Publish

publish beta https://gist.github.com/adcreare/00a10f389841dd4c97197608c9b33a7f

`npm publish --tag beta`

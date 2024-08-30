import React, { useEffect, useRef } from 'react'
import Hls from 'hls.js'

function VideoPlayer({ src }: { src: string }) {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.controls = true
    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // This will run in safari, where HLS is supported natively
      video.src = src
    } else if (Hls.isSupported()) {
      // This will run in all other modern browsers
      const hls = new Hls()
      hls.loadSource(src)
      hls.attachMedia(video)
    } else {
      console.error(
        'This is an old browser that does not support MSE https://developer.mozilla.org/docs/Web/API/Media_Source_Extensions_API',
      )
    }
  }, [src, videoRef])

  return (
    <>
      <video ref={videoRef} />
      <style jsx>{`
        video {
          max-width: 100%;
        }
      `}</style>
    </>
  )
}

export default VideoPlayer

// =================自定义Videojs组件======================

// import videojs from 'video.js'
// import 'video.js/dist/video-js.css'

// export const VideoJS = (props) => {
//   const videoRef = React.useRef(null)
//   const playerRef = React.useRef(null)
//   const { options, onReady } = props

//   React.useEffect(() => {
//     // Make sure Video.js player is only initialized once
//     if (!playerRef.current) {
//       // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
//       const videoElement = document.createElement('video-js')

//       videoElement.classList.add('vjs-big-play-centered')
//       videoRef.current.appendChild(videoElement)

//       const player = (playerRef.current = videojs(videoElement, options, () => {
//         videojs.log('player is ready')
//         onReady && onReady(player)
//       }))

//       // You could update an existing player in the `else` block here
//       // on prop change, for example:
//     } else {
//       const player = playerRef.current

//       player.autoplay(options.autoplay)
//       player.src(options.sources)
//     }
//   }, [options, videoRef])

//   // Dispose the Video.js player when the functional component unmounts
//   React.useEffect(() => {
//     const player = playerRef.current

//     return () => {
//       if (player && !player.isDisposed()) {
//         player.dispose()
//         playerRef.current = null
//       }
//     }
//   }, [playerRef])

//   return (
//     <div data-vjs-player>
//       <div ref={videoRef} />
//     </div>
//   )
// }

// export default VideoJS

// =================使用组件======================

// import VideoJS from './VideoJS'

// const App = () => {
//   const playerRef = React.useRef(null)

//   const videoJsOptions = {
//     autoplay: true,
//     controls: true,
//     responsive: true,
//     fluid: true,
//     sources: [
//       {
//         src: '/path/to/video.mp4',
//         type: 'video/mp4',
//       },
//     ],
//   }

//   const handlePlayerReady = (player) => {
//     playerRef.current = player

//     // You can handle player events here, for example:
//     player.on('waiting', () => {
//       videojs.log('player is waiting')
//     })

//     player.on('dispose', () => {
//       videojs.log('player will dispose')
//     })
//   }

//   return (
//     <>
//       <div>Rest of app here</div>
//       <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
//       <div>Rest of app here</div>
//     </>
//   )
// }

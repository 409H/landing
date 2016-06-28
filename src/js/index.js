var ModelViewer = require('metamask-logo')
var isMobile = !!detectMobile()

// To render with fixed dimensions:
var viewer = ModelViewer({

  // Dictates whether width & height are px or multiplied
  pxNotRatio: false,
  width: 0.10,
  height: 0.10,

  followMouse: !isMobile,
  slowDrift: isMobile,
})

// add viewer to DOM
var container = document.getElementById('logo-container')
container.appendChild(viewer.canvas)

function detectMobile() {
  return (
      navigator.userAgent.match(/Android/i)
   || navigator.userAgent.match(/webOS/i)
   || navigator.userAgent.match(/iPhone/i)
   || navigator.userAgent.match(/iPad/i)
   || navigator.userAgent.match(/iPod/i)
   || navigator.userAgent.match(/BlackBerry/i)
   || navigator.userAgent.match(/Windows Phone/i)
  )
}

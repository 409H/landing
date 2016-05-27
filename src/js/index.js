
var ModelViewer = require('metamask-logo')

// To render with fixed dimensions:
var viewer = ModelViewer({

  // Dictates whether width & height are px or multiplied
  pxNotRatio: false,
  width: 0.10,
  height: 0.10,

  // To make the face follow the mouse.
  followMouse: true,

  // head should slowly drift (overrides lookAt)
  slowDrift: false,

})

// add viewer to DOM
var container = document.getElementById('logo-container')
container.appendChild(viewer.canvas)

// enable mouse follow
viewer.setFollowMouse(true)

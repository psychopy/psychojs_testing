// Return screen aspect ratio
export function getWindowAspectRatio() {
  return window.innerWidth / window.innerHeight;
}

// Return screen aspect ratio
export function getScreenAspectRatio() {
  let aspectRatio = screen.width / screen.height;
  if (aspectRatio >= 1) {
    return aspectRatio;
  }
  return screen.height / screen.width;
}

// Return whether the screen is in landscape orientation by checking whether
// screen aspect ratio > 1
export function isLandscape() {
  // If there is an orientation property, use that
  if (window.orientation !== undefined) {
    let orientation = Number(window.orientation);
    return window.orientation !== 0 && window.orientation !== 180;
  }
  return getScreenAspectRatio() > 1;
}

// Return whether the window is full-screen by comparing window and screen aspect
// ratior (they should differ by 0.05 at most)
export function isFullscreen() {
  let aspectRatioDifference = getWindowAspectRatio() - getScreenAspectRatio();
  return aspectRatioDifference < 0.05;
  let heightDifference = (window.innerHeight - screen.height) / screen.height;
  return -0.05 < heightDifference && heightDifference < 0.05;
}

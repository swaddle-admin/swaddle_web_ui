export const APP = {
  name: 'Swaddle',
}

export const ANIMATIONS = {
  // Logo bobbing animation - continuously moves the logo up and down in a smooth loop
  logoAnimation: {
    animate: { y: [0, -8, 0] },
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
  },

  // Text fade-in animation - slides text content in from below while fading in on page load
  textAnimation: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.25, delay: 0.2 },
  },
}

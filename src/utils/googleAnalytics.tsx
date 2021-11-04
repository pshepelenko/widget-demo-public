// Here we are going to use the G.A. instance already created by the host website to log event on their behalf
// https://developers.google.com/analytics/devguides/collection/analyticsjs/sending-hits
export const event = (action: string, optLabel: string): void => {
  try {
    const category = 'discovery-module'
    window.gaCustomer('send', 'event', category, action, optLabel) // i.e. ga('send', 'event', 'Video', 'play', 'cats.mp4');

    console.log('Event logged in G.A.')
  } catch (err) {
    console.error('Could not log event in G.A.', err.message)
  }
}

export const logEvent = async (event: string, payload: any): Promise<void> => {
  try {
    const response = await fetch('https://api.splashup.co/event/add', {
      method: 'POST',
      body: JSON.stringify({ event_type: event, event_payload: payload })
    })

    await response.json()
  } catch (err) {
    const errorMessage: string = err.message
    console.error('Could not log the event', errorMessage)
  }

  return
}

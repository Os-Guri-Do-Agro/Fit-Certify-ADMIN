import { ref } from 'vue'

type EventCallback = () => void

const events = new Map<string, EventCallback[]>()

export const eventBus = {
  on(event: string, callback: EventCallback) {
    if (!events.has(event)) {
      events.set(event, [])
    }
    events.get(event)?.push(callback)
  },

  off(event: string, callback: EventCallback) {
    const callbacks = events.get(event)
    if (callbacks) {
      const index = callbacks.indexOf(callback)
      if (index > -1) {
        callbacks.splice(index, 1)
      }
    }
  },

  emit(event: string) {
    const callbacks = events.get(event)
    if (callbacks) {
      callbacks.forEach(callback => callback())
    }
  }
}

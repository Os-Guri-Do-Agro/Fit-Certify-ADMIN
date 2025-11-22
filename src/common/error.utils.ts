/**
 * Handles errors by logging them and displaying a toast notification.
 * @param customMessage Custom error message to display.
 * @param error The Error object to handle.
 */
export function handleError(customMessage: string, error: Error): void {
  console.error(`Error occurred at ${new Date().toISOString()}:`, error)

  const errorMessage =
    customMessage || 'Um erro ocorreu, tente novamente mais tarde.'

  if (typeof errorMessage !== 'string') {
    console.error('Invalid customMessage provided:', customMessage)
    return
  }
}


export function getErrorMessage(error: any, defaultMessage: string = 'Ocorreu um erro'): string {
  const message = error?.response?.data?.message;

  if (!message) {
    return defaultMessage;
  }

  if (Array.isArray(message)) {
    return message[0] || defaultMessage;
  }

  if (typeof message === 'string') {
    return message;
  }

  return defaultMessage;
}


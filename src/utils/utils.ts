// Shared utility helpers

/**
 * Extracts a human-friendly error message from various error shapes (e.g., AxiosError).
 * Falls back to the provided default message when none is found.
 */
export function errorHandling(err: unknown, fallback: string = 'Something went wrong'): string {
  const anyErr = err as any;

  // Prefer server-provided message if available (AxiosError shape)
  const serverMessage = anyErr?.response?.data?.message;
  if (typeof serverMessage === 'string' && serverMessage.trim().length > 0) {
    return serverMessage;
  }

  // Generic error.message
  const genericMessage = anyErr?.message;
  if (typeof genericMessage === 'string' && genericMessage.trim().length > 0) {
    return genericMessage;
  }

  return fallback;
}

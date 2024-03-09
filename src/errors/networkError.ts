export class NetworkError extends Error {
  constructor(
    message?: string,
    options?: ErrorOptions
  ) {
    message = `Network Error, status code: ${message}`;
    super(message, options);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NetworkError);
    }

    this.name = 'NetworkError';
  }
}

export class AuthError extends Error {
  code: string;

  constructor(code: string, message: string) {
    super(message);
    this.name = 'uthError';
    this.code = code;
    this.message = message;
  }
}

// errors.ts
export class JWTMalformedError extends Error {
  constructor(message = "Invalid token") {
    super(message);
    this.name = "JWTMalformedError";
  }
}

export class JWTClaimValidationFailedError extends Error {
  constructor(message = "Invalid token") {
    super(message);
    this.name = "JWTClaimValidationFailedError";
  }
}

export class JWTExpiredError extends Error {
  constructor(message = "Token has expired") {
    super(message);
    this.name = "JWTExpiredError";
  }
}

export class JWTVerificationFailedError extends Error {
  constructor(message = "Token verification failed") {
    super(message);
    this.name = "JWTVerificationFailedError";
  }
}

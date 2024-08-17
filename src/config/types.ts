const TYPES = {
  UserRepository: Symbol.for('UserRepository'),
  PasswordHasher: Symbol.for('PasswordHasher'),
  RegisterUserUseCase: Symbol.for('RegisterUserUseCase'),
  TokenVerifier: Symbol.for('TokenVerifier'),
  VerificationTokenRepository: Symbol.for('VerificationTokenRepository'),
  SendVerificationEmailUseCase: Symbol.for('SendVerificationEmailUseCase'),
  EmailService: Symbol.for('EmailService'),
  OTPService: Symbol.for('OTPService'),
  RegisterUserWithMobile: Symbol.for('RegisterUserWithMobile'),
  VerifyOTPUseCase: Symbol.for('VerifyOTPUseCase'),
  SendOTPUseCase: Symbol.for('SendOTPUseCase'),
};

export { TYPES };

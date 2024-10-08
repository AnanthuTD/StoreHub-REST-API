import { Container } from 'inversify';
import { TYPES } from './types';
import IPasswordHasher from '../domain/services/IPasswordHasher';
import BcryptPasswordHasher from '../infrastructure/services/PasswordHasher';
import { IUserRepository } from '../domain/repositories/IUserRepository';
import UserRepository from '../infrastructure/repositories/UserRepository';
import RegisterUserUseCase from '../application/usecases/RegisterUserWithEmail';
import { ITokenVerifier } from '../domain/services/ITokenVerifier';
import TokenVerifier from '../infrastructure/services/TokenVerifier';
import { IVerificationTokenRepository } from '../domain/repositories/IVerificationTokenRepository';
import VerificationTokenRepository from '../infrastructure/repositories/VerificationTokenRepository';
import SendVerificationEmailUseCase from '../application/usecases/SendVerificationEmailUseCase';
import IEmailService from '../domain/services/IEmailService';
import EmailService from '../infrastructure/services/EmailService';
import IOTPService from '../domain/services/IOTPService';
import { OTPService } from '../infrastructure/services/OTPService';
import RegisterUserWithMobile from '../application/usecases/RegisterUserWithMobile';
import { SignInAdminUseCaseImpl } from '../application/usecases/SignInAdminUseCaseImpl';
import { AdminRepository } from '../infrastructure/repositories/AdminRepository';
import { HashService } from '../infrastructure/services/HashService';
import { IHashService } from '../domain/services/IHashService';
import { IAdminRepository } from '../domain/repositories/IAdminRepository';
import { ISignInAdminUseCase } from '../application/usecases/SignInAdminUseCase';
import { SignInShopOwnerUseCase } from '../application/usecases/ShopOwnerSignInUseCase';
import { IShopOwnerRepository } from '../domain/repositories/IShopOwnerRepository';
import { VendorOwnerRepository } from '../infrastructure/repositories/VendorRepository';
import { ISignUpShopOwnerUseCase } from '../application/usecases/SignUpShopOwnerUseCase';
import { SignUpShopOwnerUseCaseImpl } from '../application/usecases/SignUpShopOwnerUseCaseImpl';
import { ResendVerificationTokenUseCase } from '../application/usecases/ResendVerificationTokenUseCase';
import { UpdateShopOwnerUseCase } from '../application/usecases/UpdateShopOwner';
import CreateDeliveryPartner from '../application/usecases/CreateDeliveryPartner';
import { IDeliveryPartnerRepository } from '../domain/repositories/IDeliveryPartnerRepository';
import { DeliveryPartnerRepository } from '../infrastructure/repositories/DeliveryPartnerRepository';
import SendOTPUseCase from '../application/usecases/SendOTPUseCase';
import VerifyOTPUseCase from '../application/usecases/VerifyOTPUseCase';
import RepositoryFactory from '../application/usecases/RepositoryFactory';

const container = new Container();
container.bind<IPasswordHasher>(TYPES.PasswordHasher).to(BcryptPasswordHasher);
container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);
container
  .bind<RegisterUserUseCase>(TYPES.RegisterUserUseCase)
  .to(RegisterUserUseCase);
container.bind<ITokenVerifier>(TYPES.TokenVerifier).to(TokenVerifier);
container
  .bind<IVerificationTokenRepository>(TYPES.VerificationTokenRepository)
  .to(VerificationTokenRepository);
container
  .bind<SendVerificationEmailUseCase>(TYPES.SendVerificationEmailUseCase)
  .to(SendVerificationEmailUseCase);
container.bind<IEmailService>(TYPES.EmailService).to(EmailService);
container.bind<IOTPService>(TYPES.OTPService).to(OTPService);
container
  .bind<RegisterUserWithMobile>(TYPES.RegisterUserWithMobile)
  .to(RegisterUserWithMobile);

// Admin
container
  .bind<ISignInAdminUseCase>(TYPES.ISignInAdminUseCase)
  .to(SignInAdminUseCaseImpl);
container.bind<IAdminRepository>(TYPES.IAdminRepository).to(AdminRepository);
container.bind<IHashService>(TYPES.IHashService).to(HashService);

// Shop Owner
container
  .bind<SignInShopOwnerUseCase>(TYPES.ISignInShopOwnerUseCase)
  .to(SignInShopOwnerUseCase);
container
  .bind<IShopOwnerRepository>(TYPES.IShopOwnerRepository)
  .to(VendorOwnerRepository);
container
  .bind<ISignUpShopOwnerUseCase>(TYPES.ISignUpShopOwnerUseCase)
  .to(SignUpShopOwnerUseCaseImpl);
container
  .bind<ResendVerificationTokenUseCase>(TYPES.ResendVerificationTokenUseCase)
  .to(ResendVerificationTokenUseCase);
container
  .bind<UpdateShopOwnerUseCase>(TYPES.UpdateShopOwnerUseCase)
  .to(UpdateShopOwnerUseCase);
container
  .bind<IDeliveryPartnerRepository>(TYPES.DeliveryPartnerRepository)
  .to(DeliveryPartnerRepository);
container
  .bind<CreateDeliveryPartner>(TYPES.CreateDeliveryPartner)
  .to(CreateDeliveryPartner);
container.bind<SendOTPUseCase>(TYPES.SendOTPUseCase).to(SendOTPUseCase);
container.bind<VerifyOTPUseCase>(TYPES.VerifyOTPUseCase).to(VerifyOTPUseCase);

// Repository Factory
container
  .bind<RepositoryFactory>(TYPES.RepositoryFactory)
  .to(RepositoryFactory);

export { container };

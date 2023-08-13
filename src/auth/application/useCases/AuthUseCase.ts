import { AuthRepository } from '../../domain/repositories/AuthRepository';
import { LoginUserDTO } from '../../domain/dto/LoginUserDTO';
import { RegisterUserDTO } from '../../domain/dto/RegisterUserDTO';
import { UserToken } from '../../domain/entities/AuthEntity';

export class AuthUseCase {
  constructor(private authRepository: AuthRepository) {}

  async registerUser(registerUserDTO: RegisterUserDTO): Promise<UserToken> {
    return await this.authRepository.registerUser(registerUserDTO);
  }

  async loginUser(loginUserDTO: LoginUserDTO): Promise<UserToken> {
    return await this.authRepository.loginUser(loginUserDTO);
  }
}

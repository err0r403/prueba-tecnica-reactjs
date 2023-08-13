import { AuthRepository } from '../../domain/repositories/AuthRepository';
import { LoginUserDTO } from '../../domain/dto/LoginUserDTO';
import { RegisterUserDTO } from '../../domain/dto/RegisterUserDTO';

export default class UserController {
  constructor(private userRepository: AuthRepository) {}

  async loginUser(loginUserDTO: LoginUserDTO) {
    return await this.userRepository.loginUser(loginUserDTO);
  }

  async registerUser(registerUserDTO: RegisterUserDTO) {
    return await this.userRepository.registerUser(registerUserDTO);
  }
}

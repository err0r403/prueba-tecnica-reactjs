import { LoginUserDTO } from '../dto/LoginUserDTO';
import { RegisterUserDTO } from '../dto/RegisterUserDTO';
import { UserToken } from '../entities/AuthEntity';

export interface AuthRepository {
  registerUser(registerUserDTO: RegisterUserDTO): Promise<UserToken>;
  loginUser(loginUserDTO: LoginUserDTO): Promise<UserToken>;
}

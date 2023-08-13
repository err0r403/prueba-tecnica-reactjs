import { AuthRepository } from '../../../domain/repositories/AuthRepository';
import { LoginUserDTO } from '../../../domain/dto/LoginUserDTO';
import { RegisterUserDTO } from '../../../domain/dto/RegisterUserDTO';
import axios from 'axios';

const API_URL = 'https://reqres.in/api';

export class AuthApi implements AuthRepository {
  async registerUser(registerUserDTO: RegisterUserDTO) {
    const response = await axios.post(`${API_URL}/register`, registerUserDTO);
    return response.data;
  }

  async loginUser(loginUserDTO: LoginUserDTO) {
    const response = await axios.post(`${API_URL}/login`, loginUserDTO);
    return response.data;
  }
}

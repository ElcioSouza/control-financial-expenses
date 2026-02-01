import * as Crypto from 'expo-crypto';
import { AuthRequest, AuthResponse } from '../../dto/user/AuthUserDTO';
import { DatabaseConnection } from '../../../database/DatabaseConnection';
import { SQLiteUserRepository } from '../../../database/repositories/SQLiteUserRepository';

export class AuthUserService {
  

  async execute({ email, password }: AuthRequest): Promise<AuthResponse> {
        
    if (!email || typeof email !== 'string') {
      throw new Error("Email é obrigatório");
    }   

    if (!password || typeof password !== 'string') {
      throw new Error("Senha é obrigatória");
    }
     
    const dataBase = await DatabaseConnection.getInstance()
    const userRepository = SQLiteUserRepository.getInstance(dataBase);
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new Error("Email ou senha incorretos");
    }

    if (!user.password || typeof user.password !== 'string') {
      throw new Error("Email ou senha incorretos");
    }

    // Hash da senha fornecida e comparar
    const passwordHash = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password
    );

    if (passwordHash !== user.password) {
    throw new Error("Email ou senha incorretos");
    } 

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      balance: user.balance
    };
  }
}
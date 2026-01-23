import * as Crypto from 'expo-crypto';
import { IUserRepository } from '../../repositories/IUserRepository';
import { AuthRequest, AuthResponse } from '../../dto/user/AuthUserDTO';

export class AuthUserService {
  
  constructor(private userRepository: IUserRepository) {}

  async execute({ email, password }: AuthRequest): Promise<AuthResponse> {
    
    if (!email || typeof email !== 'string') {
      throw new Error("Email é obrigatório");
    }

    if (!password || typeof password !== 'string') {
      throw new Error("Senha é obrigatória");
    }

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("Email ou senha incorretos");
    }

    if (!user.password || typeof user.password !== 'string') {
      throw new Error("Email ou senha incorretos");
    }

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
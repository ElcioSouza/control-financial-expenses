import * as Crypto from 'expo-crypto';
import { User } from "../../models/User";
import { CreateUserRequest } from "../../dto/user/CreateUserDTO";
import { DatabaseConnection } from '../../../database/DatabaseConnection';
import { SQLiteUserRepository } from '../../../database/repositories/SQLiteUserRepository';

export class CreateUserService {

  async execute({name, email, password, balance = 0}: CreateUserRequest): Promise<User> {

    if (!email || typeof email !== 'string') {
      throw new Error("Email é obrigatório e deve ser uma string");
    }

    if (!name || typeof name !== 'string') {
      throw new Error("Nome é obrigatório e deve ser uma string");
    }

    if (!password || typeof password !== 'string' || password.length < 1) {
      throw new Error("Senha é obrigatória, deve ser uma string e não pode estar vazia");
    }
    
    const dataBase = await DatabaseConnection.getInstance()
    const userRepository = SQLiteUserRepository.getInstance(dataBase);
    const userExists = await userRepository.findByEmail(email);
    if (userExists) {
      console.log("usuario ja existe");
      throw new Error("Usuário ja existe");
    }

    const passwordHash = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password
    );

    const id = Crypto.randomUUID();

    const newUser: User = {
      id: id,
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      password: passwordHash, 
      balance: Number(balance) || 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    await userRepository.create(newUser);

    return {
      ...newUser,
      password: ''
    };
  }
}
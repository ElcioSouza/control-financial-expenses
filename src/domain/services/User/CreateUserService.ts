import * as Crypto from 'expo-crypto';
import { IUserRepository } from "../../repositories/IUserRepository";
import { User } from "../../models/User";
import { CreateUserRequest } from "../../dto/user/CreateUserDTO";

export class CreateUserService {
  constructor(private userRepository: IUserRepository) {}

  async execute({name, email, password, balance = 0}: CreateUserRequest): Promise<User> {

    if (!email || typeof email !== 'string') {
      throw new Error("O endereço de e-mail é obrigatório e deve ser uma sequência de caracteres");
    }

    if (!name || typeof name !== 'string') {
      throw new Error("O nome é obrigatório e deve ser uma string");
    }

    if (!password || typeof password !== 'string' || password.length < 1) {
      throw new Error("É necessário um código de senha, que deve ser uma sequência de caracteres e não pode estar vazia");
    }

    const userExists = await this.userRepository.findByEmail(email);

    if (userExists) {
      throw new Error("O usuário já existe");
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

    await this.userRepository.create(newUser);

    return {
      ...newUser,
      password: ''
    };
  }
}
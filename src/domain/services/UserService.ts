// src/domain/services/UserService.ts
import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";
import { AppError } from "../../interfaces/http/middleware/errors";

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async registerUser(name: string, email: string, password: string): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new AppError("Email already in use", 400);
    }

    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password;
    user.registrationDate = new Date();

    await this.userRepository.save(user);
    return user;
  }

  async getUserById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  async updateUser(id: string, updateData: Partial<User>): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    Object.assign(user, updateData);
    await this.userRepository.save(user);
    return user;
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    await this.userRepository.delete(id);
  }

  async authenticateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findByEmail(email);
    if (user && user.password === password) {
      return user;
    }
    throw new AppError("Invalid email or password", 401);
  }
}

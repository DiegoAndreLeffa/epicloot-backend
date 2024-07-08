import { User } from "../../../domain/entities/User";
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { AppError } from "../../../interfaces/http/middleware/errors";

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
}

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(request: CreateUserRequest): Promise<User> {
    const { name, email, password, isAdmin = false } = request;

    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new AppError("Email already in use", 400);
    }

    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password;
    user.registrationDate = new Date();
    user.isAdmin = isAdmin;

    await this.userRepository.save(user);
    return user;
  }
}

import { User } from "../../../domain/entities";
import { UserRepository } from "../../../domain/repositories";
import { AppError } from "../../../interfaces/http/middleware/errors";

interface AuthenticateUserRequest {
  email: string;
  password: string;
}

export class AuthenticateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(request: AuthenticateUserRequest): Promise<User | null> {
    const { email, password } = request;

    const user = await this.userRepository.findByEmail(email);
    if (user && user.password === password) {
      return user;
    }
    throw new AppError("Invalid email or password", 401);
  }
}

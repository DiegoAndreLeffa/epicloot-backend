import jwt from "jsonwebtoken";
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { AppError } from "../../../interfaces/http/middleware/errors";
import { compare } from "bcryptjs";

interface AuthRequest {
  email: string;
  password: string;
}

export class AuthenticatedUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(request: AuthRequest): Promise<{}> {
    const { email, password } = request;

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Invalid credentials", 401);
    }

    const isPasswordValid: boolean = await compare(password, user.password);
    if (!isPasswordValid) {
      throw new AppError("Invalid credentials", 401);
    }

    if (!process.env.SECRET_KEY) {
      throw new AppError("JWT secret is not defined", 500);
    }

    const token = jwt.sign(
      { id: user.id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      {
        expiresIn: "24h",
      }
    );

    return {token, user};
  }
}

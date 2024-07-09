import jwt from "jsonwebtoken";

import { UserRepository } from "../../../domain/repositories/UserRepository";
import { AppError } from "../../../interfaces/http/middleware/errors";

interface AuthRequest {
  email: string;
  password: string;
}

export class AuthenticatedUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(request: AuthRequest): Promise<string> {
    const { email, password } = request;

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new AppError("Invalid credentials", 401);
    }

    const isPasswordValid = user.password === password; // Simplified for example purposes
    if (!isPasswordValid) {
      throw new AppError("Invalid credentials", 401);
    }

    const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    return token;
  }
}

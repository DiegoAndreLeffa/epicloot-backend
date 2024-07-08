import { User } from "../../../domain/entities/User";
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { AppError } from "../../../interfaces/http/middleware/errors";

interface UpdateUserRequest {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  isAdmin?: boolean;
}

export class UpdateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(request: UpdateUserRequest): Promise<User> {
    const { id, ...updateData } = request;

    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    Object.assign(user, updateData);
    await this.userRepository.save(user);
    return user;
  }
}

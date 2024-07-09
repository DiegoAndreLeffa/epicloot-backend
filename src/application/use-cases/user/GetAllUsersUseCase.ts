import { UserRepository } from "../../../domain/repositories/UserRepository";
import { User } from "../../../domain/entities/User";

export class GetAllUsersUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<User[]> {
    return await this.userRepository.findAll();
  }
}

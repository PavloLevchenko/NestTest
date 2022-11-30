import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserSubscribtion } from "./dto/update-user-subscribtion.dto";
import { UserEntity } from "./entities/user.entity";

@Injectable()
export class UsersService {
  private readonly users = [
    {
      _id: "1",
      email: "teasetrnet@gmail.com",
      password: "Examplepassword1",
      subscription: "starter",
    },
    {
      _id: "2",
      email: "maria",
      password: "guess",
      subscription: "starter",
    },
  ];

  async findUserById(id: string): Promise<UserEntity | undefined> {
    return this.users.find((user) => user._id === id);
  }

  async findUserByEmail(email: string): Promise<UserEntity | undefined> {
    return this.users.find((user) => user.email === email);
  }

  async signup(createUserDto: CreateUserDto) {
    return `This action creates a #${createUserDto.email} user`;
  }

  async updateSubscribtion(
    { _id }: UserEntity,
    { subscription }: UpdateUserSubscribtion,
  ) {
    return `This action updates a #${_id} user subscribtion #${subscription}`;
  }

  async updateAvatar(id: string) {
    return `This action updates avatar #${id} user`;
  }
}

import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import {User} from "./entities/user.entity";

@Injectable()
export class UsersService {
  private readonly users = [
    {
      _id: 1,
      email: 'teasetrnet@gmail.com',
      password: 'Examplepassword1',
    },
    {
      _id: 2,
      email: 'maria',
      password: 'guess',
    },
  ];

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }
}

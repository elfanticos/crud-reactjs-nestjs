import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/interfaces/user.interface';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { EditUserDto } from 'src/dto/edit-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async find(param: any): Promise<User> {
    return this.userModel.findOne(param).exec();
  }

  async findId(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  async updateUser(editUser: EditUserDto): Promise<any> {
    return this.userModel.updateMany({_id: editUser._id}, editUser);
  }

  async removeUser(_id: string): Promise<User> {
    console.log(_id);
    return this.userModel.remove({_id});
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLoginRegisterInterface } from '../interface/create-login-register.interface';
import { LoginRegisterHistory } from '../../../../entities/history/login-register.schema';

@Injectable()
export class LoginRigesterHistoryService {
  constructor(
    @InjectModel(LoginRegisterHistory.name)
    private loginRegisterHistory: Model<LoginRegisterHistory>,
  ) {}

  async create(
    createLoginRegisterInterface: CreateLoginRegisterInterface,
  ): Promise<LoginRegisterHistory> {
    const createdLoginRegisterHistory = new this.loginRegisterHistory(
      createLoginRegisterInterface,
    );
    return createdLoginRegisterHistory.save();
  }

  async findAll(): Promise<LoginRegisterHistory[]> {
    return this.loginRegisterHistory.find().exec();
  }
}

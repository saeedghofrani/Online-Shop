import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLoginRigesterHistoryDto } from '../dto/create-login-rigester.history';
import { LoginRegisterHistory } from "../../../../entities/history/login-register.schema";

@Injectable()
export class LoginRigesterHistoryService {
  constructor(
    @InjectModel(LoginRegisterHistory.name)
    private loginRegisterHistory: Model<LoginRegisterHistory>,
  ) {}

  async create(
    createLoginRigesterHistoryDto: CreateLoginRigesterHistoryDto,
  ): Promise<LoginRegisterHistory> {
    const createdLoginRegisterHistory = new this.loginRegisterHistory(
      createLoginRigesterHistoryDto,
    );
    return createdLoginRegisterHistory.save();
  }

  async findAll(): Promise<LoginRegisterHistory[]> {
    return this.loginRegisterHistory.find().exec();
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginRegisterHsitory } from 'src/entities/history/login-register.schema';
import { CreateLoginRigesterHistoryDto } from '../dto/create-login-rigester.history';

@Injectable()
export class LoginRigesterHistoryService {
  constructor(
    @InjectModel(LoginRegisterHsitory.name) private loginRegisterHsitory: Model<LoginRegisterHsitory>,
  ) {}

  async create(createLoginRigesterHistoryDto: CreateLoginRigesterHistoryDto): Promise<LoginRegisterHsitory> {
    const createdLoginHisotry = new this.loginRegisterHsitory(createLoginRigesterHistoryDto);
    return createdLoginHisotry.save();
  }

  async findAll(): Promise<LoginRegisterHsitory[]> {
    return this.loginRegisterHsitory.find().exec();
  }
}

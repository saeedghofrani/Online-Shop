import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OtpHistory } from 'src/entities/history/otp.schema';
import { CreateOtpInterface } from '../interface/create-otp.interface';

@Injectable()
export class OtpHistoryService {
  constructor(
    @InjectModel(OtpHistory.name) private otpHistory: Model<OtpHistory>,
  ) {}

  async create(createOtpInterface: CreateOtpInterface): Promise<OtpHistory> {
    const createdCat = new this.otpHistory(createOtpInterface);
    return createdCat.save();
  }

  async findAll(): Promise<OtpHistory[]> {
    return this.otpHistory.find().exec();
  }
}

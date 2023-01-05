import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OtpHistory } from 'src/entities/history/otp.schema';
import { CreateOtpHistoryDto } from '../dto/create.otp-history';

@Injectable()
export class OtpHistoryService {
  constructor(
    @InjectModel(OtpHistory.name) private otpHistory: Model<OtpHistory>,
  ) {}

  async create(createOtpHistoryDto: CreateOtpHistoryDto): Promise<OtpHistory> {
    const createdCat = new this.otpHistory(createOtpHistoryDto);
    return createdCat.save();
  }

  async findAll(): Promise<OtpHistory[]> {
    return this.otpHistory.find().exec();
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OtpHsitory } from 'src/entities/history/otp.schema';
import { CreateOtpHistoryDto } from '../dto/create.otp-history';

@Injectable()
export class OtpHistoryService {
  constructor(
    @InjectModel(OtpHsitory.name) private otpHsitory: Model<OtpHsitory>,
  ) {}

  async create(createOtpHistoryDto: CreateOtpHistoryDto): Promise<OtpHsitory> {
    const createdCat = new this.otpHsitory(createOtpHistoryDto);
    return createdCat.save();
  }

  async findAll(): Promise<OtpHsitory[]> {
    return this.otpHsitory.find().exec();
  }
}

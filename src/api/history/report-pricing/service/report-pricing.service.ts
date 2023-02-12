import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReportPricingHistory } from '../../../../entities/history/report-pricing.schema';
import { CreateReportPricingInterface } from '../interface/create-report-pricing.interface';

@Injectable()
export class ReportPricingService {
  constructor(
    @InjectModel(ReportPricingHistory.name)
    private reportPricingHistory: Model<ReportPricingHistory>,
  ) {}

  async create(
    createReportPricingInterface: CreateReportPricingInterface,
  ): Promise<ReportPricingHistory> {
    const createdReportPricing = new this.reportPricingHistory(
      createReportPricingInterface,
    );
    return createdReportPricing.save();
  }

  async findAll(): Promise<ReportPricingHistory[]> {
    return this.reportPricingHistory.find().exec();
  }
}

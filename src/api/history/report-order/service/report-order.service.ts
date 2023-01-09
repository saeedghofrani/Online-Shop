import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReportOrderHistory } from 'src/entities/history/report-order.schema';
import { CreateReportOrderInterface } from '../interface/creat-report-order.interface';

@Injectable()
export class ReportOrderHistoryService {
  constructor(
    @InjectModel(ReportOrderHistory.name)
    private reportOrderHistory: Model<ReportOrderHistory>,
  ) {}

  async create(
    createReportOrderInterface: CreateReportOrderInterface,
  ): Promise<ReportOrderHistory> {
    const createdReportOrder = new this.reportOrderHistory(
      createReportOrderInterface,
    );
    return createdReportOrder.save();
  }

  async findAll(): Promise<ReportOrderHistory[]> {
    return this.reportOrderHistory.find().exec();
  }
}

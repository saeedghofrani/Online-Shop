import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ErrorHistory } from "../../../../entities/history/error.schema";
import { CreateErrorHistoryInterface } from "../interface/create-error.interface";

@Injectable()
export class ErrorService {
  constructor(
    @InjectModel(ErrorHistory.name)
    private ErrorHistory: Model<ErrorHistory>,
  ) {}

  async create(
    createErrorHistoryInterface: CreateErrorHistoryInterface,
  ): Promise<ErrorHistory> {
    const createdErrorHistory = new this.ErrorHistory(
      createErrorHistoryInterface,
    );
    return createdErrorHistory.save();
  }

  async findAll(): Promise<ErrorHistory[]> {
    return this.ErrorHistory.find().exec();
  }
}

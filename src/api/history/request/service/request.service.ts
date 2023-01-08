import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RequestHistory } from 'src/entities/history/request.schema';
import { CreateRequestHistoryInterfece } from '../interface/create-request.interface';

@Injectable()
export class RequestHistoryService {
    constructor(
        @InjectModel(RequestHistory.name)
        private RequestHistory: Model<RequestHistory>,
    ) { }

    async create(
        createRequestHistoryInterfece: CreateRequestHistoryInterfece,
    ): Promise<RequestHistory> {
        const createdRequestHistory = new this.RequestHistory(
            createRequestHistoryInterfece,
        );
        return createdRequestHistory.save();
    }

    async findAll(): Promise<RequestHistory[]> {
        return this.RequestHistory.find().exec();
    }
}

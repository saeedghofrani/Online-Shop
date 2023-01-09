import {Injectable} from "@nestjs/common";
import {RepositoriesAbstract} from "../../../../common/abstract/repositories.abstract";
import {UserPaymentEntity} from "../../../../entities/WALLET/user-payment.entity";
import {CreateUserPaymentDto} from "../dto/create-user-payment.dto";
import {UpdateUserPaymentDto} from "../dto/update-user-payment.dto";
import {UpdateResult} from "typeorm";
import {UserPaymentRepository} from "../repositories/user-payment.repository";

@Injectable()
export class UserPaymentService{
    constructor(private userPaymentRepo:UserPaymentRepository) {
    }
    async createEntity(createEntityDto: CreateUserPaymentDto): Promise<UserPaymentEntity> {
        try {
            return await this.userPaymentRepo.createEntity(createEntityDto)
        }catch (e) {

        }
    }

    async findAllEntities(): Promise<UserPaymentEntity[]> {
        try {
            return await this.userPaymentRepo.findAllEntities()
        }
        catch (e) {

        }
    }

    async findOneEntity(id: string): Promise<UserPaymentEntity> {
        try {
            return await this.userPaymentRepo.findOneEntity(id)
        }catch (e) {

        }
    }

    async updateEntity(id: string, updateEntityDto: UpdateUserPaymentDto): Promise<UpdateResult> {
        try {
            return await this.userPaymentRepo.updateEntity(id,updateEntityDto)
        }catch (e) {

        }
    }

}
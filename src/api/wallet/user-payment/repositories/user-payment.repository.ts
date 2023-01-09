import {DataSource, Repository, UpdateResult} from "typeorm";
import {UserPaymentEntity} from "../../../../entities/WALLET/user-payment.entity";
import {RepositoriesAbstract} from "../../../../common/abstract/repositories.abstract";
import {CreateUserPaymentDto} from "../dto/create-user-payment.dto";
import {UpdateUserPaymentDto} from "../dto/update-user-payment.dto";
import {Inject, Injectable} from "@nestjs/common";
import {PostgresConstant} from "../../../../common/constants/postgres.constant";

@Injectable()
export class UserPaymentRepository extends Repository<UserPaymentEntity> implements RepositoriesAbstract<UserPaymentEntity, CreateUserPaymentDto,UpdateUserPaymentDto>{
    constructor(@Inject(PostgresConstant) private postgresDataSource:DataSource) {
        super(UserPaymentEntity,postgresDataSource.createEntityManager());
    }
    async createEntity(createEntityDto: CreateUserPaymentDto): Promise<UserPaymentEntity> {
        return await this.save(this.create(createEntityDto))
    }

    async findAllEntities(): Promise<UserPaymentEntity[]> {
        return await this.createQueryBuilder("user-payment").getMany()
    }

    async findOneEntity(id: string): Promise<UserPaymentEntity> {
        return await this.createQueryBuilder("user-payment").where("user-payment.id=:id_user_payment",{id_user_payment:id}).getOne()
    }

    async updateEntity(id: string, updateEntityDto: UpdateUserPaymentDto): Promise<UpdateResult> {
        return await this.update(id,updateEntityDto)
    }

}
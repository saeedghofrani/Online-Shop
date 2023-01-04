import {Inject, Injectable} from "@nestjs/common";
import {DataSource, Repository, UpdateResult} from "typeorm";
import {OrderEntity} from "../../../../entities/WALLET/order.entity";
import {RepositoriesAbstract} from "../../../../common/abstract/repositories.abstract";
import {CreateOrderDto} from "../dto/create-order.dto";
import {UpdateOrderDto} from "../dto/update-order.dto";
import {PostgresConstant} from "../../../../common/constants/postgres.constant";
import {PricingEntity} from "../../../../entities/WALLET/pricing.entity";

@Injectable()
export class OrderRepository extends Repository<OrderEntity> implements RepositoriesAbstract<OrderEntity, CreateOrderDto,UpdateOrderDto>{
    constructor(@Inject(PostgresConstant) private postgresDataSource:DataSource) {
        super(OrderEntity,postgresDataSource.createEntityManager());
    }

    async createEntity(createEntityDto: CreateOrderDto): Promise<OrderEntity> {
        return await this.save(this.create(createEntityDto))
    }

    async findAllEntities(): Promise<OrderEntity[]> {
        return await this.createQueryBuilder("order").getMany()
    }

    async findOneEntity(id: string): Promise<OrderEntity> {
        return await this.createQueryBuilder("order").where("order.id=:order_id",{order_id:id}).getOne()
    }

    async updateEntity(id: string, updateEntityDto: UpdateOrderDto): Promise<UpdateResult> {
        return await this.update(id,updateEntityDto)
    }
}
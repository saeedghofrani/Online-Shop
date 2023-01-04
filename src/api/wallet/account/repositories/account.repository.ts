import { Injectable } from "@nestjs/common";
import { RepositoriesAbstract } from "src/common/abstract/repositories.abstract";
import { AccountEntity } from "src/entities/WALLET/account.entity";
import { Repository, UpdateResult } from "typeorm";
import { CreateAccountDto } from "../dto/create-account.dto";
import { UpdateAccountDto } from "../dto/update-account.dto";

@Injectable()
export class AccountRepository extends Repository<AccountEntity> implements RepositoriesAbstract<AccountEntity,CreateAccountDto,UpdateAccountDto>{
    async createEntity(createEntityDto: CreateAccountDto): Promise<AccountEntity> {
        return await this.save(this.create(createEntityDto))
    }
    async updateEntity(id: string, updateEntityDto: UpdateAccountDto): Promise<UpdateResult> {
        return await this.update(id,updateEntityDto)
    }
    async findOneEntity(id: string): Promise<AccountEntity> {
        return await this.createQueryBuilder("account").where("account.id=:id_account",{id_account:id}).getOne()
    }
    async findAllEntities(): Promise<AccountEntity[]> {
        return await this.createQueryBuilder("account").getMany()
    }

}
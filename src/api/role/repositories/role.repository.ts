import { Inject, Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { RepositoriesAbstract } from "src/common/abstract/repositories.abstract";
import { PostgresConstant } from "src/common/constants/postgres.constant";
import { RoleEntity } from "src/entities/AUTH/role.entity";
import { DataSource, Repository, UpdateResult } from "typeorm";
import { CreateRoleDto } from "../dto/create.role.dto";
import { UpdateRoleDto } from "../dto/update.role.dto";

@Injectable()
export class RoleRepository extends Repository<RoleEntity> implements RepositoriesAbstract<RoleEntity,CreateRoleDto,UpdateRoleDto>{
    constructor(@Inject(PostgresConstant) private postgresDatasource:DataSource){
        super(RoleEntity,postgresDatasource.createEntityManager())
    }

    async createEntity(createEntityDto: CreateRoleDto): Promise<RoleEntity> {
        return await this.save(this.create(createEntityDto))
    }

    async updateEntity(id: string, updateEntityDto: UpdateRoleDto): Promise<UpdateResult> {
        return await this.update(id,updateEntityDto)
    }

     async findOneEntity(roleId: string): Promise<RoleEntity> {
    return await this
      .createQueryBuilder('role')
      .where('role.id = :roleId', {
        roleId,
      })
      .getOne();
  }

    async findByEntity(searchTerm: string): Promise<RoleEntity> {
        return await this
          .createQueryBuilder('role')
          .where(`role.name = :searchTerm`, {
            searchTerm,
          })
          .getOne();
      }

    async findAllEntities(): Promise<RoleEntity[]> {
        return await this.createQueryBuilder('role').getMany();
    }
}
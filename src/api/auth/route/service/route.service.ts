import { Injectable } from '@nestjs/common';
import { Paginated } from 'nestjs-paginate';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import { RouteEntity } from 'src/entities/AUTH/route.entity';
import { UpdateResult } from 'typeorm';
import { PermissionService } from '../../permission/service/permission.service';
import { CreateRouteDto } from '../dto/create-route.dto';
import { UpdateRouteDto } from '../dto/update-route.dto';
import { RouteRepository } from '../repositories/route.repository';

@Injectable()
export class RouteService {
  constructor(
    private routeRepository: RouteRepository,
    private permissionService: PermissionService,
  ) {}

  async createEntity(createEntityDto: CreateRouteDto): Promise<RouteEntity> {
    const PermissionEntity = await this.permissionService.findPermissionByIds(
      createEntityDto.id_permissions,
    );
    createEntityDto.permissions = PermissionEntity;
    return await this.routeRepository.createEntity(createEntityDto);
  }

  async findAllEntities(): Promise<RouteEntity[]> {
    return await this.routeRepository.findAllEntities();
  }

  async findByEntity(searchTerm: string): Promise<RouteEntity> {
    return await this.routeRepository.findByEntity(searchTerm);
  }

  async findOneEntity(routeId: string): Promise<RouteEntity> {
    return await this.routeRepository.findOneEntity(routeId);
  }

  async routePagination(
    query: PaginationQueryDto,
  ): Promise<Paginated<RouteEntity>> {
    return this.routeRepository.routePagination(query);
  }

  async updateEntity(
    id: string,
    updateEntityDto: UpdateRouteDto,
  ): Promise<UpdateResult> {
    return await this.routeRepository.updateEntity(id, updateEntityDto);
  }
}

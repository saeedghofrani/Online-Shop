import {Body, Controller, Get, Post, Query} from "@nestjs/common";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {UserFactorService} from "../services/user-factor.service";
import {CreateUserFactorDto} from "../dto/create-user-factor.dto";
import {UserFactorEntity} from "../../../../entities/WALLET/user-factor.entity";

@ApiBearerAuth('access-token')
@ApiTags("User-Factor")
@Controller("user-factor")
export class UserFactorController {
    constructor(private userFactorService:UserFactorService) {
    }

    @Post()
     createEntity(@Body() createEntityDto: CreateUserFactorDto,@Query("pattern_master_id") patterMasterId:string): Promise<UserFactorEntity> {
       return this.userFactorService.createEntity(createEntityDto, patterMasterId)
    }

    @Get("all")
     findAllEntities(): Promise<UserFactorEntity[]> {
        return  this.userFactorService.findAllEntities()
    }

    @Get()
     findOneEntity(@Query("pattern_master_id") id: string): Promise<UserFactorEntity> {
        return  this.userFactorService.findOneEntity(id)
    }
}
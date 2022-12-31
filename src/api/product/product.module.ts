import { Module } from "@nestjs/common";
import { AttributeController } from "./attribute/controllers/attribute.controller";
import { AttributeRepository } from "./attribute/repositories/attribute.repository";
import { AttributeService } from "./attribute/services/attribute.service";

@Module({
    controllers:[AttributeController],
    providers:[AttributeService,AttributeRepository],

})
export class ProductModule{}
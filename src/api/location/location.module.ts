import {Module} from "@nestjs/common"
import { AddressController } from "./address/controller/address.controller";
import { AddressRepository } from "./address/repositories/address.repository";
import { AddressService } from "./address/services/address.service";
import { CityController } from "./city/controller/city.controller";
import { CityRepository } from "./city/repositories/city.repository";
import { CityService } from "./city/services/city.service";
import { StateController } from "./state/controller/state.controller";
import { StateRepository } from "./state/repositories/state.repository";
import { StateService } from "./state/services/state.service";

@Module({
    controllers:[StateController,CityController,AddressController],
    providers:[StateService,StateRepository,CityService,CityRepository,AddressService,AddressRepository]
})
export class LocationModule{}
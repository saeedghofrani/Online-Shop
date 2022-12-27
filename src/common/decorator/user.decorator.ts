import { createParamDecorator } from "@nestjs/common";
import { UserDto } from "../interfaces/user.interface";

export const GetUser = createParamDecorator(
    (data, request):UserDto => {
        const req = request.switchToHttp().getRequest();
        const user: UserDto = {
            userId: req.user.id,
        }
        return user;
    }
)
import { createParamDecorator } from "@nestjs/common";
import { UserDto } from "../interfaces/user.interface";

export const GetUser = createParamDecorator(
    (data, request):UserDto => {
        const req = request.switchToHttp().getRequest();
        console.log(req);
        
        const user: UserDto = {
            userId: req.user.userId,
        }
        return user;
    }
)
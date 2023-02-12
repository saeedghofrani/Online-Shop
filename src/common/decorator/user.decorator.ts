import { createParamDecorator } from '@nestjs/common';
import { UserInterface } from '../interfaces/user.interface';

export const GetUser = createParamDecorator((data, request): UserInterface => {
  const req = request.switchToHttp().getRequest();
  const user: UserInterface = {
    userId: req.user.userId,
  };
  return user;
});

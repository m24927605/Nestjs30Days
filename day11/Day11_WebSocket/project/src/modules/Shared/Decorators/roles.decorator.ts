import { ReflectMetadata } from '@nestjs/common';

//實作一個@Roles()裝飾器
export const Roles = (...roles: string[]) => ReflectMetadata('roles', roles);
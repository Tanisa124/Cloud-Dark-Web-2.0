import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './createUser.dto';

export class UpdateRestaurantDto extends PartialType(CreateUserDto) {}

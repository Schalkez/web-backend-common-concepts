import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './CreateUserDto';

export class PatchUserDto extends PartialType(CreateUserDto) {}

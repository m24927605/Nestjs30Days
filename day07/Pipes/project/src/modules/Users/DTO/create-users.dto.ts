import { IsString, IsInt } from 'class-validator';

export class CreateUserDTO {

    @IsInt()
    readonly _id: number;

    @IsString()
    readonly _name: string;

    @IsInt()
    readonly _age: number;
}
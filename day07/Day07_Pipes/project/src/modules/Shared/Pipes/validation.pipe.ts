import { HttpException } from '@nestjs/core';
import { PipeTransform, Pipe, ArgumentMetadata, HttpStatus } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

//Pipe裝飾器，會告訴nestjs這是Pipe
@Pipe()
//要實作PipeTransform的介面
export class ValidationPipe implements PipeTransform<any>{
    //PipeTransform介面有transform()，這可以轉換input data並回傳
    async transform(value, metadata: ArgumentMetadata) {
        const { metatype } = metadata;
        /*不檢查原生JavaScript的型別，因為刻意寫ValidationPipe，就是要使用自定義的DTO class
        的屬性去做參數型別檢查，如果metatype是原生JavaScript的型別，就直接return 原始參數，
        不做ValidationPipe的檢查。
        */
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        //這裡使用class-transformer的方法，將plain javascript object(像是JSON object)，轉換成一個class的object。        
        const object = plainToClass(metatype, value);
        //在CreateUserDTO，我們有使用class-validator的驗證裝飾器，validate()會回傳錯誤陣列。
        const errors = await validate(object);
        if (errors.length > 0) {
            console.log('validate errors',errors);
            throw new HttpException('檢驗錯誤', HttpStatus.BAD_REQUEST);
        }
        //ValidationPipe是特別打造出來檢驗型別用，最後要回傳原始參數，避免覆寫。
        return value;
    }
    //檢驗是否為原生JavaScript的型別
    private toValidate(metatype): boolean {
        const types = [String, Boolean, Number, Array, Object];
        return !types.find((type) => metatype === type);
    }
}
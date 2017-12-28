import { Component } from '@nestjs/common';

//別忘記Component裝飾器
@Component()
export class NameService {

    newName(): string {
        return "Tommy";
    }
}
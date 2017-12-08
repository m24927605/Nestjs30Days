import { Component } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import { Observable } from 'rxjs/Observable';
import { CreateProductDTO } from '../DTO/create-products.dto';

//別忘記Component裝飾器
@Component()
export class ProductsService {
    //假資料
    private products = [
        { "_id": 1, "_name": "Watch", "_price": 1000 },
        { "_id": 2, "_name": "Phone", "_price": 25000 }
    ];

    //使用Promise，盡可能避免使用callback方式。
    getAllProducts() {
        return Promise.resolve(this.products);
    }
    getProduct(id: number) {
        const product = this.products.find((product) => {
            return product._id === id;
        });
        if (!product) {
            //nestjs對於http exception有API可以調用，建議使用。
            throw new HttpException("product not found", 404);
        }
        return Promise.resolve(product);
    }
    //在nestjs也是可以歡樂使用Rx.js
    addProduct(product: CreateProductDTO): Observable<object[]> {
        this.products.push(product);
        return Observable.of(this.products);
    }
}
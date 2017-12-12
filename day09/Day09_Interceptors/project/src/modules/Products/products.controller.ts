import { Controller, Get, Post, Request, Response, Param, Next, HttpStatus, Body } from '@nestjs/common';
import { CreateProductDTO } from './DTO/create-products.dto';
import { ProductsService } from '../Products/Services/products.service';

@Controller('products')
export class ProductsController {

    //依賴注入，建議要使用，這是低耦合作法
    constructor(private productsService: ProductsService) { }

    @Get()
    //使用Express的參數
    async getAllProducts( @Request() req, @Response() res, @Next() next) {
        //Promise 有then catch方法可以調用
        await this.productsService.getAllProducts()
            .then((products) => {
                //多種Http的Status可以使用
                res.status(HttpStatus.OK).json(products);
            })
            .catch((error) => {
                console.error(error);
                res.status(HttpStatus.INTERNAL_SERVER_ERROR);
            })
    }

    @Get('/:id')
    //使用Express的參數
    //@Param('id')可以直接抓id參數
    async getProduct( @Response() res, @Param('id') id) {
        //+id ，+符號可以直接把string 轉換成number
        await this.productsService.getProduct(+id)
            .then((product) => {
                res.status(HttpStatus.OK).json(product);
            })
            .catch((error) => {
                console.error(error);
                res.status(HttpStatus.INTERNAL_SERVER_ERROR);
            })
    }

    @Post()
    async addUProduct( @Response() res, @Body() createProductDTO: CreateProductDTO) {
        //使用Rx.js，所以回傳可以做更多資料流的處理
        await this.productsService.addProduct(createProductDTO).subscribe((products) => {
            res.status(HttpStatus.OK).json(products);
        })
    }
}
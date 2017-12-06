# Nestjs framework 30天初探:Day03 Components
## Components
![https://ithelp.ithome.com.tw/upload/images/20171206/20107195sVlIygHZsM.png](https://ithelp.ithome.com.tw/upload/images/20171206/20107195sVlIygHZsM.png)

> 在nestjs世界裡，幾乎所有東西都是Component，像是Service, Repository, Factory, Helper ...，然後透過constructor可以注入到各個Component或Controller。在上一章節我們實作了Controller，但如我一開始提到的，Controller只需要負責處理HTTP請求即可，商業邏輯、資料處理就交給Services，盡可能做到單一職責，程式要朝著符合SOLID原則去開發。

1. 在專案根目錄，下cmd指令，並在Services資料夾下新增users.service.ts。
```
cd src/modules/Users & mkdir Services
```
2.  我們先將DTO class改寫一下，增加_id屬性。
src/modules/Users/DTO/create-users.dto.ts
```javascript
export class CreateUserDTO {
    readonly _id: number;
    readonly _name: string;
    readonly _age: number;
}
```
3.  接下來我們在users.service.ts裏頭寫一些原本放在user.controller.ts裏頭的程式碼，等等也要改寫user.controller.ts，讓controller變得單一職責化些。
src/modules/Users/Services/users.serivce.ts
```javascript
import { Component } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import { Observable } from 'rxjs/Observable';
import { CreateUserDTO } from '../DTO/create-users.dto';

//別忘記Component裝飾器
@Component()
export class UsersService {
    //假資料
    private users = [
        { "_id": 1, "_name": "Michael", "_age": 25 },
        { "_id": 2, "_name": "Mary", "_age": 27 }
    ];

    //使用Promise，盡可能避免使用callback方式。
    getAllUsers() {
        return Promise.resolve(this.users);
    }
    getUser(id: number) {
        const user = this.users.find((user) => {
            return user._id === id;
        });
        if (!user) {
            //nestjs對於http exception有API可以調用，建議使用。
            throw new HttpException("user not found", 404);
        }
        return Promise.resolve(user);
    }
    //在nestjs也是可以歡樂使用Rx.js
    addUser(user: CreateUserDTO): Observable<object[]> {
        this.users.push(user);
        return Observable.of(this.users);
    }
}
```
4. 完成了UsersService，仍然需要去ApplicationModule，讓程式認識到有這隻Service的存在，程式才會去執行它。
src/modules/app.module.ts
```javascript
import { Module } from '@nestjs/common';
import { UsersController } from './Users/users.controller';
import { UsersService } from './Users/Services/users.service';

@Module({
  modules: [],
  controllers: [UsersController],
  components: [UsersService],
})
export class ApplicationModule { }
```

5. 改寫users.controller.ts，在constructor裡注入UsersService，這樣就可以在Controller裡呼叫使用UsersService的方法。
src/modules/Users/users.controller.ts
```javascript
import { Controller, Get, Post, Request, Response, Param, Next, HttpStatus, Body } from '@nestjs/common';
import { CreateUserDTO } from './DTO/create-users.dto';
import { UsersService } from '../Users/Services/users.service';

@Controller('users')
export class UsersController {

    //依賴注入，建議要使用，這是低耦合作法
    constructor(private userService: UsersService) { }

    @Get()
    //使用Express的參數
    getAllUsers( @Request() req, @Response() res, @Next() next) {
        //Promise 有then catch方法可以調用
        this.userService.getAllUsers()
            .then((users) => {
                //多種Http的Status可以使用
                res.status(HttpStatus.OK).json(users);
            })
            .catch((error) => {
                console.error(error);
                res.status(HttpStatus.INTERNAL_SERVER_ERROR);
            })
    }

    @Get('/:id')
    //使用Express的參數
    //@Param('id')可以直接抓id參數
    getUser( @Response() res, @Param('id') id) {
        //+id ，+符號可以直接把string 轉換成number
        this.userService.getUser(+id)
            .then((user) => {
                res.status(HttpStatus.OK).json(user);
            })
            .catch((error) => {
                console.error(error);
                res.status(HttpStatus.INTERNAL_SERVER_ERROR);
            })
    }

    @Post()
    addUser( @Response() res, @Body() createUserDTO:CreateUserDTO) {
        //使用Rx.js，所以回傳可以做更多資料流的處理
        this.userService.addUser(createUserDTO).subscribe((user) => {
            res.status(HttpStatus.OK).json(users);
        });
    }
}
```
6. 接著使用[Postman](https://www.getpostman.com/apps) 
    * 對http://localhost:3000/users 進行GET請求，結果如下圖。
    ![https://ithelp.ithome.com.tw/upload/images/20171206/20107195fNB57eHf8u.png](https://ithelp.ithome.com.tw/upload/images/20171206/20107195fNB57eHf8u.png)
    > 成功取得資料。

    * 對http://localhost:3000/users/1 進行GET請求，結果如下圖。
    ![https://ithelp.ithome.com.tw/upload/images/20171206/20107195I80EvsW7aX.png](https://ithelp.ithome.com.tw/upload/images/20171206/20107195I80EvsW7aX.png)
    > 成功取得資料。
  
    * 對http://localhost:3000/users 進行POST請求，結果如下圖。
    ![https://ithelp.ithome.com.tw/upload/images/20171206/20107195w0mEcxyCFN.png](https://ithelp.ithome.com.tw/upload/images/20171206/20107195w0mEcxyCFN.png)
    >成功新增一筆資料
 7. 到目前為止都很順利，nestjs不單單有Rx.js可以使用，還可以寫async/await，我們改寫一下UsersController，程式如下。
 src/modules/Users/users.controller.ts
 ```javascript
 import { Controller, Get, Post, Request, Response, Param, Next, HttpStatus, Body } from '@nestjs/common';
import { CreateUserDTO } from './DTO/create-users.dto';
import { UsersService } from '../Users/Services/users.service';

@Controller('users')
export class UsersController {

    //依賴注入，建議要使用，這是低耦合作法
    constructor(private userService: UsersService) { }

    @Get()
    //使用Express的參數
    async getAllUsers( @Request() req, @Response() res, @Next() next) {
        //Promise 有then catch方法可以調用
        await this.userService.getAllUsers()
            .then((users) => {
                //多種Http的Status可以使用
                res.status(HttpStatus.OK).json(users);
            })
            .catch((error) => {
                console.error(error);
                res.status(HttpStatus.INTERNAL_SERVER_ERROR);
            })
    }

    @Get('/:id')
    //使用Express的參數
    //@Param('id')可以直接抓id參數
    async getUser( @Response() res, @Param('id') id) {
        //+id ，+符號可以直接把string 轉換成number
        await this.userService.getUser(+id)
            .then((user) => {
                res.status(HttpStatus.OK).json(user);
            })
            .catch((error) => {
                console.error(error);
                res.status(HttpStatus.INTERNAL_SERVER_ERROR);
            })
    }

    @Post()
    async addUser( @Response() res, @Body() createUserDTO: CreateUserDTO) {
        //使用Rx.js，所以回傳可以做更多資料流的處理
        await this.userService.addUser(createUserDTO).subscribe((users) => {
            res.status(HttpStatus.OK).json(users);
        })
    }
}
 ```
 > 再進行一下第六點的檢查，一切都正常顯示，大功告成，已經學會怎樣寫Service了。
 
    
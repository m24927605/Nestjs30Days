## 比特幣即時看盤網站
> 距離鐵人比賽結束剩下5天，不過這次要實作的網站會花超過5天才能完成，而且程式碼應該不少，比賽結束後就請轉看我[github上的專案](https://github.com/m24927605/Nest-Virtual-Currency)，這次點的科技樹是整合之前所學，做一個功能完整的網站。

## 需求規劃
1. 比特幣Realtime報價
2. 比特幣歷史報價
3. 比特幣走勢線圖
4. 會員管理
5. 比特幣新聞
6. 聊天室
 
## 資料表規劃
**MSSQL**
1. Features Table
2. Login Table
3. LoginHistory Table
4. Roles Table
5. Users Table
## 系統功能分析

* 比特幣Realtime報價:
    1. 正式資源:https://www.coindesk.com/api/
    2. 備用資源:https://www.bitstamp.net/api/
    3. 實作方式:[Nestjs](https://nestjs.com/)後端固定頻率請求資源，存入[MongoDB](https://www.mongodb.com/)，並透過[Socket.IO](https://socket.io/)與[Angular](https://angular.io/)前端建立Realtime連線提供資料。 
    
* 比特幣歷史報價
    1. 正式資源:https://api.coindesk.com/v1/bpi/historical/close.json
    2. 備用資源:https://github.com/f1lt3r/bitcoin-scraper
    3. 實作方式:[Nestjs](https://nestjs.com/)後端先寫入所有歷史資料到[MongoDB](https://www.mongodb.com/)，然後每天將新的歷史報價寫入[MongoDB](https://www.mongodb.com/)，並透過[Socket.IO](https://socket.io/)與[Angular](https://angular.io/)前端建立Realtime連線提供資料。

*  會員管理
    1. 功能:註冊帳號、第三方登錄、修改個人基本資料、權限區分
    2. 實作方式:[Nestjs](https://nestjs.com/)後端產Restful API給[Angular](https://angular.io/)前端串接，前後端皆要做好Route與權限保護，使用[JWT Token](https://jwt.io/)做網站驗證保護。
* 比特幣新聞
    1. 正式資源:
               https://chroniclingamerica.loc.gov/about/api/
               https://github.com/feedbin/feedbin-api
               https://developer.nytimes.com/
               https://newsapi.org/
               https://dev.npr.org/api/
               http://open-platform.theguardian.com/
    2. 備用資源:正式資源即備用資源。
* 聊天室
    1. 功能:登入後提供聊天室功能，聊天紀錄寫入[Redis](https://redis.io/)。
    2. 實作方式:使用[Socket.IO](https://socket.io/)。

## 使用到的框架、資料庫、模組
1. 框架:
    * 後端框架:[Nestjs](https://nestjs.com/)(含[Express](http://expressjs.com/zh-tw/))
    * 前端框架:[Angular](https://angular.io/)
    * UI框架:[NG-ZORRO](https://ng.ant.design/#/docs/angular/introduce)
2. 資料庫:
    * MSSQL
    * MongoDB
    * Redis(不是資料庫，但作用類似故分類在此)
3. 模組:
    * [Socket.IO](https://www.npmjs.com/package/socket.io)(Realtime)
    * [TypeORM](https://www.npmjs.com/package/typeorm)(串MSSQL)
    * [Swagger](https://www.npmjs.com/package/swagger)(產生Restful API文檔)
    * [Mongoose](https://www.npmjs.com/package/mongoose)(串MongoDB)
    * [Redis](https://www.npmjs.com/package/redis)(串Redis)
    * [Cors](https://www.npmjs.com/package/cors)(處理跨站問題)
    * [Helmet](https://www.npmjs.com/package/helmet)(基本資安模組)
    * [G2](https://github.com/antvis/g2)/[D3.js](https://www.npmjs.com/package/d3)(資料視覺化)
    * [Moment](https://www.npmjs.com/package/moment)(時間格式處理)
    * [passport](https://www.npmjs.com/package/passport)、[passport-jwt](https://www.npmjs.com/package/passport-jwt)、[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)(三個都要用於JWT token驗證)。
4. 測試工具:
    * [Postman](https://www.getpostman.com/apps)或[Nestjs](https://nestjs.com/)內建(E2E測試)
    * [Test404漏洞掃描器](http://www.test404.com/)

## 任務流程規劃
**後端**

1. 完成後端對於會員的CRUD Restful API。
2. 串接比特幣報價API(寫入MongoDB)，準備好供前端串接Socket.IO的API。
3. 建立聊天室服務，聊天內容寫入redis。
4. 建立登入驗證機制(含第三方登錄)，權限區分。
(以上開發API時，一併做E2E測試)

**前端**

5. NG-ZORRO刻畫面
6. 串接註冊帳號
7. 串接登入機制
8. 串接個人資料管理
9. 串接報價服務
10. 串接聊天室
11. 滲透測試
12. 自動化測試


> 題目本身很小不複雜，但藉由做好一個完整網站，對於學習應該蠻有幫助，而且特地找一個最近很夯的題目-比特幣，我本身對比特幣也不懂，順便借這命題了解一下比特幣，等比特幣網站完成後，後面的規劃是朝著**加密貨幣報價平台**邁進。
> 程式生涯本身就是鐵人賽了，只能不斷實作學習，尤其筆者還是小嫩嫩，持續20幾天傷害大家眼睛XD，後面的PO文我會選擇性PO程式碼，保護大家眼睛，我要將心力放在實作上，這點對大家抱歉了~
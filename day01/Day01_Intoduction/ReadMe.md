#Nest.js framework 30天初探:Day01 攻略行前說明

<blockquote>
    NodeJS後端框架眾多，唯獨這框架最吸引我，雖然今年三月底出爐，還算蠻新的框架，網路上資源不多，但我相信日後它會有一席之地，因為我在努力推廣XDDDD，阿不是，是因為它架構嚴謹，能寫出高品質的程式。
</blockquote>

##前言
JavaScript係弱型別語言，型態轉換很自由，型態檢查也沒那麼嚴謹，這可搞死很多工程師，近幾年雖然有ES6、ES7、ES8的出現(ES9正在擬稿)，可以幫助工程師提高程式品質，但跟強型別語言還是有些差距，於是出現了TypeScript，可以用TypeScript寫出強型別風格的程式碼，再透過Babel轉換成指定版本的JavaScript(ESMAScript版本)。

Nestjs的官網建議使用TypeScript，後續的示範都會以TypeScript去撰寫，如果要寫一般JavaScript也是可行的，不過官網有提到，有些Nestjs的API無法用JavaScript去呼叫使用，所以就以TypeScript作為開發語言會比較好。

##Nestjs Framework幾個特點:
1. Base On Express 框架和socket.io 套件。
2. 語法風格類似Angular，也有人覺得類似Java Spring，使用了許多裝飾器語法。
3. 依賴注入，Nestjs大量使用依賴注入，建議使用此作法。
4. Exception層，可以做更多的exception處理。
5. Guards作為路由警衛，處理訪問權限。
6. Interceptors 攔截器機制。
7. Unit Test & E2E Test。

基於上述幾個特點，Nestjs做了很多抽象層，程式如果是用Nestjs開發，可以做到低藕合，甚至
開發速度也會有大幅提升;另一方面，Nestjs的底層是Express框架，在使用Nestjs開發時，也可以呼叫Express的API，而且Express作為最多人使用的NodeJS後端框架，是有潛力吸收廣大使用Express開發的工程師，建立起龐大活躍的社群。

##筆者30天規劃
* 基礎介紹篇(10天):了解Controller、Component、Interceptors等框架的核心API。
* Webscoket運用篇(3天):了解Nestjs對於Websocket的一些API操作。
* MicroSercives運用篇(2天):了解Nestjs如何建立微服務。
* 資料庫操作篇(3天):介紹如何透過Nestjs的API去串接操作資料庫。
* 串接第三方API運用篇(3天):介紹如何在Nestjs使用Passport模組、串接Swagger服務等。
* 會員聊天室實作篇(9天):採Restful API風格，撰寫具備CRUD功能且能即時聊天的小專案。
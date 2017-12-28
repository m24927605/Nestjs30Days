import { Module } from '@nestjs/common';
import { UsersController } from './Users/users.controller';
import { UsersService } from './Users/Services/users.service';
import { NameService } from './Users/Services/name.service';

//useValue 自定義Token名稱，這邊單純給定值就好。
const nameProvider = { provide: 'nameToken', useValue: 'Ted' };

//useClass 
const newNameProvider = {
  provide: NameService,
  useClass: NameService
}

//useFactory
const newNameFactory = {
  provide: 'NameService',
  useFactory: () => {
    return new NameService();
  }
};

@Module({
  modules: [],
  controllers: [UsersController],
  components: [UsersService, nameProvider, newNameFactory],
})
export class ApplicationModule { }

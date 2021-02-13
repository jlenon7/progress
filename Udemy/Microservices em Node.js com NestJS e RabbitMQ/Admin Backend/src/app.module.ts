import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriasModule } from './categorias/categorias.module';
import { JogadoresModule } from './jogadores/jogadores.module';
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin_sr:kdWcpu1jWvUSlU6Y@clustermogodb-79l5n.mongodb.net/sradmbackend?retryWrites=true&w=majority',
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false }),
    CategoriasModule,
    JogadoresModule,
    ConfigModule.forRoot({isGlobal: true}),
],
  controllers: [],
  providers: [],
})
export class AppModule {}

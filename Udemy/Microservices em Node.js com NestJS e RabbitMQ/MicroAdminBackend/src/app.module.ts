import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { CategoriasModule } from './categorias/categorias.module'
import { JogadoresModule } from './jogadores/jogadores.module'

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:0yFrMqZbtFJ4fH3S@cluster0.aejvg.mongodb.net/micro-adm?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      },
    ),
    CategoriasModule,
    JogadoresModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

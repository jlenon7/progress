import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { JogadoresModule } from './jogadores/jogadores.module'
import { CategoriasModule } from './categorias/categorias.module'
import { DesafiosModule } from './desafios/desafios.module'

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:0yFrMqZbtFJ4fH3S@cluster0.aejvg.mongodb.net/development?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      },
    ),
    JogadoresModule,
    CategoriasModule,
    DesafiosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

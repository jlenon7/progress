import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriaSchema } from './interfaces/categorias/categoria.schema';
import { JogadorSchema } from './interfaces/jogadores/jogador.schema';

@Module({
  imports: [MongooseModule.forRoot(
    'mongodb+srv://admin:0yFrMqZbtFJ4fH3S@cluster0.aejvg.mongodb.net/micro-adm?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
  ),
  MongooseModule.forFeature([{ name: 'Jogador', schema: JogadorSchema }, { name: 'Categoria', schema: CategoriaSchema }]),
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

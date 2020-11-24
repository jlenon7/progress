import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { JogadoresModule } from 'src/jogadores/jogadores.module'
import { CategoriasController } from './categorias.controller'
import { CategoriasService } from './categorias.service'
import { CategoriaSchema } from './interfaces/categoria.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Categoria', schema: CategoriaSchema }]),
    JogadoresModule,
  ],
  controllers: [CategoriasController],
  providers: [CategoriasService],
  exports: [CategoriasService],
})
export class CategoriasModule {}

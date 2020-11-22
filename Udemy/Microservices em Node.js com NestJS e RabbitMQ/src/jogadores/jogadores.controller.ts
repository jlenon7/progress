import { Body, Controller, Post, Get, Query, Delete } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { IJogador } from './interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}
  
  @Post()
  async criarAtualizarJogador(
    @Body() criarJogadorDto: CriarJogadorDto
  ): Promise<void> {
    return this.jogadoresService.criarAtualizarJogador(criarJogadorDto)
  }

  @Get()
  async consultarJogadores(@Query('email') email: string): Promise<IJogador[] | IJogador> {
    if (email) {
      return this.jogadoresService.consultarJogador(email)
    }
    
    return this.jogadoresService.consultarJogadores()
  }

  @Delete()
  public async deletarJogador(@Query('email') email: string): Promise<void> {
    return this.deletarJogador(email)
  }
}

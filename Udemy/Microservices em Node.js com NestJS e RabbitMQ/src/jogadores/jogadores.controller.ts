import { Body, Controller, Post, Get, Query, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { IJogador } from './interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service';
import { JogadoresValidacaoParametrosPipe } from './pipes/jogadores-validacao-parametros.pipe'

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}
  
  @Post()
  @UsePipes(ValidationPipe)
  async criarAtualizarJogador(
    @Body() criarJogadorDto: CriarJogadorDto
  ): Promise<IJogador> {
    return this.jogadoresService.criarAtualizarJogador(criarJogadorDto)
  }

  @Get()
  async consultarJogadores(@Query('email', JogadoresValidacaoParametrosPipe) email: string): Promise<IJogador[] | IJogador> {
    if (email) {
      return this.jogadoresService.consultarJogador(email)
    }
    
    return this.jogadoresService.consultarJogadores()
  }

  @Delete()
  public async deletarJogador(@Query('email', JogadoresValidacaoParametrosPipe) email: string): Promise<void> {
    return this.jogadoresService.deletarJogador(email)
  }
}

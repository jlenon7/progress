import { Body, Controller, Post, Get, Delete, UsePipes, ValidationPipe, Param, Put } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';
import { IJogador } from './interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}
  
  @Post()
  @UsePipes(ValidationPipe)
  async criarJogador(
    @Body() criarJogadorDto: CriarJogadorDto
  ): Promise<IJogador> {
    return this.jogadoresService.criarJogador(criarJogadorDto)
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  async atualizarJogador(@Param('id') id: string, @Body() atualizarJogadorDto: AtualizarJogadorDto): Promise<IJogador> {
    return this.jogadoresService.atualizarJogador(id, atualizarJogadorDto)
  }

  @Get()
  async consultarJogadores(): Promise<IJogador[]> {
    return this.jogadoresService.consultarJogadores()
  }

  @Get('/:id')
  async consultarJogador(@Param('id') id: string): Promise<IJogador> {
    return this.jogadoresService.consultarJogador(id)
  }

  @Delete('/:id')
  public async deletarJogador(@Param('id') id: string): Promise<any> {
    return this.jogadoresService.deletarJogador(id)
  }
}

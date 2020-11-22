import { Body, Controller, Post, Get, Delete, UsePipes, ValidationPipe, Param, Put } from '@nestjs/common';
import { JogadoresService } from './jogadores.service';
import { IJogador } from './interfaces/jogador.interface';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}
  
  @Post()
  @UsePipes(ValidationPipe)
  public async criarJogador(
    @Body() criarJogadorDto: CriarJogadorDto
  ): Promise<IJogador> {
    return this.jogadoresService.criarJogador(criarJogadorDto)
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  public async atualizarJogador(@Param('id') id: string, @Body() atualizarJogadorDto: AtualizarJogadorDto): Promise<IJogador> {
    return this.jogadoresService.atualizarJogador(id, atualizarJogadorDto)
  }

  @Get()
  public async consultarJogadores(): Promise<IJogador[]> {
    return this.jogadoresService.consultarJogadores()
  }

  @Get('/:id')
  public async consultarJogador(@Param('id') id: string): Promise<IJogador> {
    return this.jogadoresService.consultarJogador(id)
  }

  @Delete('/:id')
  public async deletarJogador(@Param('id') id: string): Promise<any> {
    return this.jogadoresService.deletarJogador(id)
  }
}

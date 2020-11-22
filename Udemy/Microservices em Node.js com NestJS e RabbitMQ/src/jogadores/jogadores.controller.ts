import { Controller, Post } from '@nestjs/common';

@Controller('api/v1/jogadores')
export class JogadoresController {
  @Post()
  async criarAtualizarJogador(): Promise<string> {
    return JSON.stringify({nome: "João"})
  }
}

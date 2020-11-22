import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";

export class JogadoresValidacaoParametrosPipe implements PipeTransform {
  transform (value: string, metadata: ArgumentMetadata): string {
    if (!value) {
      throw new BadRequestException(`O valor do parametro ${metadata.data} deve ser informado`)
    }

    return value
  }
}
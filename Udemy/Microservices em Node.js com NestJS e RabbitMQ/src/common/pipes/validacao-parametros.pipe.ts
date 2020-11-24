import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";

export class ValidacaoParametrosPipe implements PipeTransform {
  transform (value: string, metadata: ArgumentMetadata): string {
    if (!value) {
      throw new BadRequestException(`O valor do parametro ${metadata.data} deve ser informado`)
    }

    return value
  }
}
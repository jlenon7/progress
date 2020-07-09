import handlebars from 'handlebars'
import IParseMailTemplateDTO from '../Dtos/IParseMailTemplateDTO'
import IMailTemplateProvider from '../Models/IMailTemplateProvider'

export default class HandlebarsMailTemplateProvider
  implements IMailTemplateProvider {
  public async parse({
    template,
    variables,
  }: IParseMailTemplateDTO): Promise<string> {
    const parseTemplate = handlebars.compile(template)

    return parseTemplate(variables)
  }
}

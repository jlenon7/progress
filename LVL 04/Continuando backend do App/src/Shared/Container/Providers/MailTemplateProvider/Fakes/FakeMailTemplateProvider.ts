import IParseMailTemplateDTO from '../Dtos/IParseMailTemplateDTO'
import IMailTemplateProvider from '../Models/IMailTemplateProvider'

export default class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse({ template }: IParseMailTemplateDTO): Promise<string> {
    return template
  }
}

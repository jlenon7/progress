interface ITemplateVariables {
  [key: string]: string | number
}

export default interface IParseMailTemplateDto {
  template: string
  variables: ITemplateVariables
}

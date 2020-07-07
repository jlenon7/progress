export class EnvClass {
  public get(name: string, defaultValue?: string | boolean): string | boolean | undefined {
    if (process.env[`${name}`]) {
      return process.env[`${name}`]
    }
    
    return defaultValue
  }
}

interface IApplication {
  StartApplication(): Promise<void>
  StopApplication(): Promise<void>
}

export default IApplication
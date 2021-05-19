export default abstract class UtyponModule {
    abstract run(options: { [key: string]: any }): void

    asModule(command: string, options: string[], subModules?:any) {
        return {
            command,
            options,
            handler: (argv) => this.run(argv),
            subModules
        }
    }
}
declare module "troika-three-text" {
  export function configureTextBuilder(options: {
    defaultFontURL?: string;
    useWorker?: boolean;
  }): void;
}

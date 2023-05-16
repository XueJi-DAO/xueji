declare namespace NodeJS {
  export interface ProcessEnv {
    readonly ENV_VARIABLE: string
    readonly NEXT_PUBLIC_ENV_VARIABLE: string

    readonly DEVELOPMENT_ENV_VARIABLE: string
    readonly NEXT_PUBLIC_DEVELOPMENT_ENV_VARIABLE: string

    readonly ENV_LOCAL_VARIABLE: string
    readonly NEXT_PUBLIC_ENV_LOCAL_VARIABLE: string

    readonly PRODUCTION_ENV_VARIABLE: string
    readonly NEXT_PUBLIC_PRODUCTION_ENV_VARIABLE: string

    readonly GITHUB_ID: string
    readonly GITHUB_SECRET: string

    readonly NEO4J_URI: string
    readonly NEO4J_USER: string
    readonly NEO4J_PASSWORD: string

    readonly EMAIL_SERVER: string
    readonly EMAIL_FROM: string
  }
}

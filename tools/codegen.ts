import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: './apps/xueji/src/lib/graphql/schema.graphql',
  // documents: './apps/xueji/app/**/*.tsx',
  ignoreNoDocuments: true,
  generates: {
    './apps/xueji/src/lib/graphql/codegen/': {
      preset: 'client',
      plugins: [],
    },
  },
}

export default config

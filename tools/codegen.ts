import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: './apps/xueji/lib/graphql/schema.graphql',
  // documents: './apps/xueji/app/**/*.tsx',
  ignoreNoDocuments: true,
  generates: {
    './apps/xueji/lib/graphql/codegen/': {
      preset: 'client',
      plugins: [],
    },
  },
}

export default config

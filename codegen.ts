import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: './apps/xueji/schema.graphql',
  // documents: './apps/xueji/app/**/*.tsx',
  ignoreNoDocuments: true,
  generates: {
    './apps/xueji/lib/gql/': {
      preset: 'client',
      plugins: [],
    },
  },
}

export default config

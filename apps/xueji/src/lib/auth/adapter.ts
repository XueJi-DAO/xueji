import { prisma } from '@/lib/prisma'

import { PrismaAdapter } from '@auth/prisma-adapter'
// import { Neo4jAdapter } from '@auth/neo4j-adapter' // 使用 postgresql 存储用户
// import getDriver from './neo4j'
// const driver = getDriver()
// const neo4jSession = driver.session()
// Neo4jAdapter(neo4jSession)

export const adapter = PrismaAdapter(prisma)

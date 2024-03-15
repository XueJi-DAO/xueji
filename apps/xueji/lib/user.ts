import crypto from 'crypto'
// eslint-disable-next-line import/no-named-as-default
import prisma from './prisma'
import { Prisma } from '@prisma/client'

export async function createUser({ email, password }) {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
  const user = {
    // id: uuidv4(),
    // createdAt: Date.now(),
    email,
    hash,
    salt,
  }
  const result = await prisma.user.create({
    data: {
      ...user,
    } as Prisma.UserCreateInput,
  })
  return result
}

export async function findUser({ email }: { email: string }) {
  return prisma.user.findUnique({ where: { email } })
}

export async function validatePassword(user, password) {
  const inputHash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, 'sha512').toString('hex')
  const passwordsMatch = user.hash === inputHash
  return passwordsMatch
}

export async function changePassword(user, password) {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
  console.log(hash)
  return prisma.user.update({
    where: { email: user.email },
    data: {
      salt,
      hash,
    },
  })
}

import { NextResponse } from 'next/server'
import { people } from './data'
import { Person } from '@/types/person'

export async function GET(): Promise<NextResponse<Person[]>> {
  return NextResponse.json(people)
}

'use server'

import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import { database } from '@/db/database'
import { items } from '@/db/schema'

export async function createItemAction(formData: FormData) {
  const session = await auth()

  if (!session) {
    throw new Error('Must be signed in to create an item')
  }

  const user = session.user

  if (!user || !user.id) {
    throw new Error('Must be signed in to create an item')
  }

  const startingPrice = parseFloat(formData.get('startingPrice') as string)
  const startingPriceInCents = Math.floor(startingPrice * 100)

  await database.insert(items).values({
    name: formData.get('name') as string,
    startingPrice: startingPriceInCents,
    userId: user.id,
  })
  redirect('/')
}

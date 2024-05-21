'use server'

import { redirect } from 'next/navigation'

import { getSignedUrlForS3Object } from '@/lib/s3'
import { auth } from '@/auth'
import { database } from '@/db/database'
import { items } from '@/db/schema'

export async function createUploadUrlAction(key: string, type: string) {
  return await getSignedUrlForS3Object(key, type)
}

export async function createItemAction({
  fileName,
  name,
  startingPrice,
  endDate,
}: {
  fileName: string
  name: string
  startingPrice: number
  endDate: Date
}) {
  const session = await auth()

  if (!session) {
    throw new Error('Unauthorized')
  }

  const user = session.user

  if (!user || !user.id) {
    throw new Error('Unauthorized')
  }

  await database.insert(items).values({
    name,
    startingPrice,
    fileKey: fileName,
    currentBid: startingPrice,
    userId: user.id,
    endDate,
  })

  redirect('/')
}

import { revalidatePath } from 'next/cache'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SignIn } from '@/components/sign-in'
import { SignOut } from '@/components/signout'
import { auth } from '@/auth'
import { database } from '@/db/database'
import { items } from '@/db/schema'

export default async function Home() {
  const session = await auth()
  const allItems = await database.query.items.findMany()

  return (
    <main className=' container mx-auto space-y-8 py-12'>
      <h1 className='text-4xl font-bold'>Post an Item to Sell</h1>
      <form
        className='flex max-w-lg flex-col gap-4 space-y-4 rounded-xl border p-4'
        action={async (formData: FormData) => {
          'use server'
          await database.insert(items).values({
            name: formData.get('name') as string,
            userId: session?.user?.id!,
          })
          revalidatePath('/')
        }}
      >
        <Input className='max-w-lg' name='name' placeholder='Name your item' />
        <Button type='submit'>Post Item</Button>
      </form>

      <h2 className='text-4xl font-bold'>Items For Sale</h2>

      <div className='grid grid-cols-4 gap-8'>
        {allItems.map((item) => (
          <div className='rounded-xl border p-8' key={item.id}>
            {item.name}
          </div>
        ))}
      </div>
    </main>
  )
}

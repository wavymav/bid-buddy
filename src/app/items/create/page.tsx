import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { createItemAction } from './actions'

export default function Create() {
  return (
    <main className=' container mx-auto space-y-8 py-12'>
      <h1 className='text-4xl font-bold'>Post an Item</h1>
      <form
        className='flex max-w-lg flex-col gap-4 space-y-4 rounded-xl border p-4'
        action={createItemAction}
      >
        <Input
          required
          className='max-w-lg'
          name='name'
          placeholder='Name your item'
        />
        <Input
          required
          className='max-w-lg'
          name='startingPrice'
          type='number'
          step='0.01'
          placeholder='What to start your auction at'
        />
        <Button type='submit'>Post Item</Button>
      </form>
    </main>
  )
}

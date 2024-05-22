'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DatePickerDemo } from '@/components/date-picker'

import { createItemAction, createUploadUrlAction } from './actions'

export default function Create() {
  const [date, setDate] = useState<Date | undefined>()
  return (
    <main className='space-y-8'>
      <h1 className='text-4xl font-bold'>Post an Item</h1>
      <form
        className='flex max-w-lg flex-col gap-4 space-y-4 rounded-xl border p-4'
        onSubmit={async (e) => {
          e.preventDefault()
          console.log('submitting')

          if (!date) {
            return
          }

          const form = e.currentTarget as HTMLFormElement
          const formData = new FormData(form)
          const file = formData.get('file') as File

          const uploadUrl = await createUploadUrlAction(file.name, file.type)

          await fetch(uploadUrl, {
            method: 'PUT',
            body: file,
          })

          const name = formData.get('name') as string
          const startingPrice = parseInt(
            formData.get('startingPrice') as string
          )
          const startingPriceInCents = Math.floor(startingPrice * 100)

          await createItemAction({
            name,
            startingPrice: startingPriceInCents,
            fileName: file.name,
            endDate: date,
          })
        }}
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
        <Input type='file' name='file' />
        <DatePickerDemo date={date} setDate={setDate} />
        <Button type='submit'>Post Item</Button>
      </form>
    </main>
  )
}

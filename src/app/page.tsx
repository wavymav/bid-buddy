import { database } from '@/db/database'
import { formatToDollar } from '@/utils/currency'

export default async function Home() {
  const allItems = await database.query.items.findMany()

  return (
    <main className=' container mx-auto space-y-8 py-12'>
      <h1 className='text-4xl font-bold'>Items For Sale</h1>

      <div className='grid grid-cols-4 gap-8'>
        {allItems.map((item) => (
          <div className='rounded-xl border p-8' key={item.id}>
            {item.name}
            <div className='text-sm text-gray-500'>
              Starting Price of{' '}
              <span className='font-bold'>
                ${formatToDollar(item.startingPrice)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

import { ItemCard } from '@/app/item-card'
import { database } from '@/db/database'

export default async function Home() {
  const allItems = await database.query.items.findMany()

  return (
    <main className=' container mx-auto space-y-8 py-12'>
      <h1 className='text-4xl font-bold'>Items For Sale</h1>

      <div className='grid grid-cols-4 gap-8'>
        {allItems.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </main>
  )
}

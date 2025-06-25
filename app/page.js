import React from 'react'
import { FloatingDialog } from '@/components/FloatingDialog'
import Deck from '@/components/Deck'
import { GetAllMemories } from './actions/userActions'
import { addDays } from 'date-fns'
import { OrganizationSwitcher } from '@clerk/nextjs'

const page = async () => {
  const grouped = await GetAllMemories();
  const sorted = grouped?.reverse() || [];
  
  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <div className='flex items-center flex-col'>
      <p className='line-through text-neutral-500'>Add Delete and Edit buttons to the new Deck</p>
      <p className='line-through text-neutral-500'>Fix Ui Issue on Mobile</p>
      <p className='line-through text-neutral-500'>fix button when only a single Card is there</p>
      <p>Work on Orgs</p>
      <OrganizationSwitcher hidePersonal/>
      </div>
      <div className="flex flex-col justify-center gap-14 px-6 py-10 max-w-6xl w-full">
        {(!sorted || sorted.length === 0) ? (
          <p className="text-center text-neutral-500">No memories yet. Start adding some!</p>
        ) : (
          sorted.map(({ date, memories }) => (
            <div key={date} className="w-full">
              <h2 className="text-xl font-bold text-center text-neutral-700 dark:text-neutral-200">
              {addDays(new Date(date), 1).toLocaleDateString()}
              </h2>
              
              <div className="relative h-[500px] w-full">
                <Deck 
                  cards={memories.map(memory => ({
                    photo: memory.photo,
                    title: memory.title,
                    date: memory.memoryDate,
                    id: memory._id.toString()
                  }))}
                />
              </div>
            </div>
          ))
        )}
      </div>

      <FloatingDialog />
    </div>
  )
}

export default page
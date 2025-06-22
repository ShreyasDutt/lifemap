import React from 'react'
import { FloatingDialog } from '@/components/FloatingDialog'
import Deck from '@/components/Deck'
import { GetAllMemories } from './actions/userActions'
import { addDays } from 'date-fns'

const page = async () => {
  const grouped = await GetAllMemories();
  const sorted = grouped?.reverse() || [];
  
  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <div className='flex items-center flex-col'>
      <p>Add Delete and Edit buttons to the new Deck</p>
      <p>Fix Ui Issue on Mobile</p>
      <p>Work on Orgs</p>
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
              
              {/* Use Deck component for stacked cards when there are multiple memories */}
              {memories.length > 1 ? (
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
              ) : (
                <div className="flex justify-center">
                  <div className="bg-white dark:bg-neutral-900 shadow-xl border border-neutral-300 dark:border-neutral-700 rounded-sm p-2 pb-6 w-fit max-w-[340px]">
                    <div className="relative w-[300px] h-[300px] overflow-hidden rounded-sm border border-neutral-200 dark:border-neutral-800">
                      <div
                        className="w-full h-full"
                        style={{
                          backgroundImage: `url(${memories[0].photo})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      />
                    </div>
                    <div className="mt-3 text-center px-1">
                      <p className="text-base text-neutral-700 dark:text-neutral-200">
                        {memories[0].title}
                      </p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 italic">
                        {new Date(memories[0].memoryDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <FloatingDialog />
    </div>
  )
}

export default page
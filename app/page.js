import React from 'react'
import { FloatingDialog } from '@/components/FloatingDialog'
import PoloroidFrame from '@/components/PoloroidFrame'
import { GetAllMemories } from './actions/userActions'

const page = async () => {
  const grouped = await GetAllMemories();
  const sorted = grouped.reverse();
  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <div className="flex flex-col justify-center gap-14 px-6 py-10 max-w-6xl w-full">
        {(!sorted || sorted.length === 0) ? (
          <p className="text-center text-neutral-500">No memories yet. Start adding some!</p>
        ) : (
          sorted.map(({ date, memories }) => (
            <div key={date}>
              <h2 className="text-xl font-bold mb-4 text-neutral-700 dark:text-neutral-200">
                {new Date(date).toLocaleDateString()}
              </h2>
              <div className="flex flex-wrap gap-6">
                {memories.map((memory) => (
                  <PoloroidFrame
                    key={memory._id.toString()}
                    memoryId={memory._id.toString()}
                    image={memory.photo}
                    title={memory.title}
                    date={memory.memoryDate}
                  />
                ))}
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

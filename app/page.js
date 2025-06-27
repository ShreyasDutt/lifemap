import React from 'react'
import { FloatingDialog } from '@/components/FloatingDialog'
import Deck from '@/components/Deck'
import { GetAllMemories } from './actions/userActions'
import { Sparkles } from 'lucide-react'

const page = async () => {
  const grouped = await GetAllMemories();
  const sorted = grouped?.reverse() || [];

  return (
    <div className="relative overflow-hidden min-h-screen">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-10%] left-[-10%] h-[300px] w-[300px] rounded-full bg-purple-300 opacity-30 blur-3xl dark:bg-purple-800 dark:opacity-20"></div>
        <div className="absolute bottom-[-10%] right-[-10%] h-[400px] w-[400px] rounded-full bg-blue-200 opacity-30 blur-3xl dark:bg-blue-900 dark:opacity-20"></div>
        <div className="absolute top-[30%] left-[40%] h-[250px] w-[250px] rounded-full bg-pink-200 opacity-20 blur-2xl dark:bg-pink-700 dark:opacity-10"></div>
      </div>

      <div className="flex flex-col items-center justify-center mt-20">
        <div className="flex flex-col justify-center gap-14 px-6 py-10 max-w-6xl w-full">
          {(!sorted || sorted.length === 0) ? (
            <div className="flex flex-col items-center justify-center py-20 text-center text-neutral-500">
              <div className="bg-neutral-100 dark:bg-neutral-800 p-6 rounded-full shadow-md mb-4">
                <Sparkles className="w-10 h-10 dark:text-white text-gray-400 animate-pulse" />
              </div>
              <h2 className="text-xl font-semibold text-neutral-700 dark:text-neutral-200">
                No memories yet
              </h2>
              <p className="mt-2 max-w-md text-sm text-neutral-500 dark:text-neutral-400">
                Your memory lane is empty. Start adding moments to relive them later!
              </p>
            </div>
          ) : (
            sorted.map(({ date, memories }) => (
              <div key={date} className="w-full">
                <h2 className="text-xl font-bold text-center text-neutral-700 dark:text-neutral-200">
                  {new Date(date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric"
                  })}
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
    </div>
  )
}

export default page

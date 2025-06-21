import React from 'react'
import { FloatingDialog } from '@/components/FloatingDialog'
import PoloroidFrame from '@/components/PoloroidFrame'
import { GetAllMemories } from './actions/userActions'
const page = async() => {
  const Memories = await GetAllMemories();
  return (
    <div className='flex flex-col items-center justify-center mt-20'>
      <h1>
        <p className='line-through'>Create Models and DbConnection <br/>
        Create Webhooks for CRUD operations on User <br/>
         Create a form to add a memory <br/>
          Connect Cloudinary & Save Memories <br/>
        </p>
        Create Poloroid Card Component <br/>
        Find a Scribble Library for Ui <br/>

  


      </h1>
      <div className="flex flex-col gap-10 w-full max-w-2xl px-4 my-10">
        {Memories.map((memory) => (
          <PoloroidFrame
            key={memory._id}
            image={memory.photo}
            title={memory.title}
            date={memory.memoryDate}
          />
        ))}
      </div>

      <FloatingDialog/>
    </div>
  )
}

export default page
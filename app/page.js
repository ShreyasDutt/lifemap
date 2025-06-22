import React from 'react'
import { FloatingDialog } from '@/components/FloatingDialog'
import PoloroidFrame from '@/components/PoloroidFrame'
import { GetAllMemories } from './actions/userActions'

const page = async() => {
  const data = await GetAllMemories();
  const Memories = data?.memories || [];

  return (
    <div className='flex flex-col items-center justify-center mt-20'>
      <h1>
        <p className='line-through'>Create Models and DbConnection <br/>
        Create Webhooks for CRUD operations on User <br/>
        Create a form to add a memory <br/>
        Connect Cloudinary & Save Memories <br/>
        Create Poloroid Card Component <br/>
        </p>
        <p>Create a Calendar to Switch b/w dates and then load memories created on that Date</p>
        Find a Scribble Library for Ui <br/>

    


      </h1>
      <div className="flex flex-wrap justify-center gap-8 px-6 py-10 max-w-6xl">
        {Memories.length === 0 ? (
        <p className="text-center text-neutral-500">No memories yet. Start adding some!</p>
      ) : (
      Memories.map((memory) => (
                <PoloroidFrame
                  key={memory._id.toString()}
                  memoryId={memory._id.toString()}
                  image={memory.photo}
                  title={memory.title}
                  date={memory.memoryDate}
                />
              ))
      )}
        
      </div>


      <FloatingDialog/>
    </div>
  )
}

export default page
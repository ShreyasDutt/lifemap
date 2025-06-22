"use client"
import { Trash, Edit3, Heart } from 'lucide-react'
import Image from 'next/image'
import { Button } from './ui/button'
import { useState, useMemo } from 'react'
import { motion } from "framer-motion"
import { DeleteMemory } from '@/app/actions/userActions'
import { toast } from 'sonner'

export default function PolaroidFrame({ image, title, date, memoryId }) {
  const [menuToggler, setmenuToggler] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const randomTilt = useMemo(() => {
    const tilts = ['rotate-[-3deg]', 'rotate-[2deg]', 'rotate-[3deg]', 'rotate-[-2deg]', 'rotate-[1deg]', 'rotate-[-1deg]']
    return tilts[Math.floor(Math.random() * tilts.length)]
  }, [])

  const randomOffset = useMemo(() => {
    const offsets = ['translate-x-1', 'translate-x-[-4px]', 'translate-y-1', 'translate-y-[-4px]']
    return offsets[Math.floor(Math.random() * offsets.length)]
  }, [])

  return (
    <div
      className="relative flex flex-col justify-center items-center group cursor-pointer"
      onMouseEnter={() => {
        setmenuToggler(true)
        setIsHovered(true)
      }}
      onMouseLeave={() => {
        setmenuToggler(false)
        setIsHovered(false)
      }}
    >
      {/* Polaroid Frame */}
      <motion.div
        initial={{ scale: 1, rotate: 0 }}
        whileHover={{ 
          scale: 1.05, 
          rotate: 0,
          transition: { 
            type: "spring", 
            stiffness: 300, 
            damping: 20 
          }
        }}
        className={`bg-white dark:bg-neutral-900 shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-neutral-200 dark:border-neutral-700 rounded-lg p-3 pb-8 w-fit max-w-[340px] transition-all duration-500 ease-out ${randomTilt} ${randomOffset} hover:translate-x-0 hover:translate-y-0`}
      >
        <div className="relative w-[300px] h-[300px] overflow-hidden rounded-lg border-2 border-neutral-100 dark:border-neutral-800">
          
          {/* Action Buttons Container */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ 
              opacity: menuToggler ? 1 : 0,
              y: menuToggler ? 0 : -10
            }}
            transition={{ 
              duration: 0.3,
              ease: "easeOut"
            }}
            className="absolute top-3 right-3 z-20 flex gap-2"
          >
            {/* Edit Button */}
            <Button
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation()
              }}
              className="backdrop-blur-md bg-white/20 hover:bg-white/30 border border-white/30 text-white hover:text-blue-400 p-2 h-auto w-auto rounded-full transition-all duration-200"
            >
              <Edit3 size={14} />
            </Button>

            {/* Delete Button */}
            <Button
              variant="ghost"
              onClick={async(e) => {
                e.stopPropagation()
                const res = await DeleteMemory(memoryId);
                if(res.success){
                  return toast.success(res.message);
                }
                toast.error("Something went wrong");
              }}
              className="backdrop-blur-md bg-white/20 hover:bg-white/30 border border-white/30 text-white hover:text-red-500 p-2 h-auto w-auto rounded-full transition-all duration-200"
            >
              <Trash size={14} />
            </Button>
          </motion.div>

          {/* Image with overlay effect */}
          <div className="relative w-full h-full rounded-lg overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover rounded-lg transition-transform duration-500 group-hover:scale-105"
            />
            
            {/* Subtle overlay on hover */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 0.1 : 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-black pointer-events-none rounded-lg"
            />
          </div>
        </div>

        {/* Enhanced Title and Date Section */}
        <motion.div 
          className="mt-4 text-center px-2"
          initial={{ opacity: 0.8 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <p className="text-lg font-hand text-neutral-800 dark:text-neutral-100 leading-relaxed tracking-wide">
            {title}
          </p>
          {date && (
            <p className="text-xs text-neutral-500 dark:text-neutral-400 italic mt-1 font-mono tracking-wider">
              {new Date(date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </p>
          )}
        </motion.div>
      </motion.div>

      {/* Drop shadow effect */}
      <div className={`absolute inset-0 bg-neutral-900/10 dark:bg-neutral-950/20 rounded-lg blur-xl -z-10 transition-all duration-500 ${randomTilt} ${randomOffset} group-hover:scale-105 group-hover:opacity-30`} 
           style={{ transform: 'translateY(10px)' }} />
    </div>
  )
}
"use client"
import React, { useState } from 'react'
import { useSprings, animated, to as interpolate } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import * as utils from '../lib/utils'
import '../app/styles/style.css'
import { motion } from "framer-motion"
import { Button } from './ui/button'
import { Edit3, Trash } from 'lucide-react'
import { DeleteMemory } from '@/app/actions/userActions'
import { toast } from 'sonner'


export default function Deck({ cards }) {
  const [gone] = useState(() => new Set())
  const [hoveredCard, setHoveredCard] = useState(null)
  const [props, api] = useSprings(cards.length, (i) => ({
    ...utils.to(i),
    from: utils.from(i)
  }))

  const bind = useDrag(({ args: [index], active, movement: [mx], direction: [xDir], velocity: [vx] }) => {
    const trigger = vx > 0.2
    if (!active && trigger) gone.add(index)
    api.start((i) => {
      if (index !== i) return
      const isGone = gone.has(index)
      const x = isGone ? (200 + window.innerWidth) * xDir : active ? mx : 0
      const rot = mx / 100 + (isGone ? xDir * 10 * vx : 0)
      const scale = active ? 1.1 : 1
      return {
        x,
        rot,
        scale,
        delay: undefined,
        config: { friction: 50, tension: active ? 800 : isGone ? 200 : 500 }
      }
    })
    if (!active && gone.size === cards.length)
      setTimeout(() => {
        gone.clear()
        api.start((i) => utils.to(i))
      }, 600)
  })

  return (
    <div className="overflow-hidden relative h-[66vh] w-full flex justify-center items-center">
      {props.map(({ x, y, rot, scale}, i) => (
        <animated.div key={i} style={{ x, y }} className="absolute touch-none">
          <animated.div
            {...bind(i)}
            className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg cursor-grab active:cursor-grabbing w-fit max-w-[340px] transition-all duration-500 ease-out"
            style={{
              transform: interpolate([rot, scale], utils.trans),
              padding: '12px 12px 32px 12px',
            }}
          >
             <div className="relative flex flex-col justify-center items-center group cursor-pointer">
          <motion.div
          onMouseEnter={() => {
                setHoveredCard(i)
              }}
              onMouseLeave={() => {
                setHoveredCard(null)
              }}

            initial={{ opacity: 0, y: -10 }}
            animate={{ 
              opacity: hoveredCard === i ? 1 : 0,
              y: hoveredCard === i ? 0 : -10
            }}
            transition={{ 
              duration: 0.3,
              ease: "easeOut"
            }}
            className={`absolute w-full justify-end top-3 right-3 z-20 flex gap-2`}>
            {/* Edit Button */}
            <Button
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation()
              }}
              className="backdrop-blur-md bg-white/20 hover:bg-white/30 border border-white/30 text-white hover:text-blue-400 p-2 h-auto w-auto rounded-full transition-all duration-200">
              <Edit3 size={14} />
            </Button>

            {/* Delete Button */}
            <Button
              variant="ghost"
              onClick={async(e) => {
                e.stopPropagation()
                const res = await DeleteMemory(cards[i].id);
                if(res.success){
                  return toast.success(res.message);
                }
                toast.error("Something went wrong");
              }}
              className="backdrop-blur-md bg-white/20 hover:bg-white/30 border border-white/30 text-white hover:text-red-500 p-2 h-auto w-auto rounded-full transition-all duration-200">
              <Trash size={14} />
            </Button>
          </motion.div>
          </div>
            <div className="relative w-[280px] h-[280px] md:h-[300px] md:w-[300px] overflow-hidden rounded-lg border-2 border-neutral-100 dark:border-neutral-800">
              <div className="relative w-full h-full rounded-lg overflow-hidden">
                <div
                  className="w-full h-full object-cover rounded-lg"
                  style={{
                    backgroundImage: `url(${cards[i].photo})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              </div>
            </div>
            <div className="mt-4 text-center px-2">
              <p className="text-lg font-hand text-neutral-800 dark:text-neutral-100 leading-relaxed tracking-wide">
                {cards[i].title || 'Photo'}
              </p>
              {cards[i].date && (
                <p className="text-xs text-neutral-500 dark:text-neutral-400 italic mt-1 font-mono tracking-wider">
                  {new Date(cards[i].date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </p>
              )}
            </div>
          </animated.div>
        </animated.div>
      ))}
    </div>
  )
}
"use client"
import React, { useState } from 'react'
import { useSprings, animated, to as interpolate } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import * as utils from '../lib/utils'
import '../app/styles/style.css'

export default function Deck({ cards }) {
  const [gone] = useState(() => new Set())
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
      {props.map(({ x, y, rot, scale }, i) => (
        <animated.div key={i} style={{ x, y }} className="absolute touch-none">
          <animated.div
            {...bind(i)}
            className="bg-white dark:bg-neutral-900 shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-neutral-200 dark:border-neutral-700 rounded-lg cursor-grab active:cursor-grabbing w-fit max-w-[340px] transition-all duration-500 ease-out"
            style={{
              transform: interpolate([rot, scale], utils.trans),
              padding: '12px 12px 32px 12px',
            }}
          >
            <div className="relative w-[300px] h-[300px] overflow-hidden rounded-lg border-2 border-neutral-100 dark:border-neutral-800">
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
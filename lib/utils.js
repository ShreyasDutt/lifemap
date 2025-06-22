import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export let currentSelectedDate;
export const getDate = (value) =>{
currentSelectedDate = value;
}

export const to = (i) => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100
})

export const from = (_i) => ({
  x: 0,
  rot: 0,
  scale: 1.5,
  y: -1000
})

export const trans = (r, s) => `perspective(1500px) rotateX(0deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`
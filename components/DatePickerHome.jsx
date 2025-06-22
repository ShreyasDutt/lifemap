"use client"
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

export default function MyDatePicker({sorted}) {
  const [selected, setSelected] = useState();
    console.log(sorted);
  return (
    <DayPicker
      className="text-2xl w-fu"
      animate
      mode="single"
      selected={selected}
      onSelect={setSelected}
      footer={
        selected ? `Selected: ${selected.toLocaleDateString()}` : "Pick a day."
      }
    />
  );
}
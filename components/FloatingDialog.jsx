"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Earth, Plus } from "lucide-react"
import { useState } from "react"
import AddForm from "./AddForm"

export function FloatingDialog() {
const [hovered, setHovered] = useState(false);

return (
  <Dialog>
    <DialogTrigger asChild>
      <Button
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        variant="outline"
        className="fixed rounded-full w-20 h-20 bottom-10 right-10 z-50 transition-all duration-300"
      >
        <div className="relative w-6 h-6">
          <Plus
            className={`absolute inset-0 transition-all duration-300 size-6 ${
              hovered ? "opacity-0 scale-75" : "opacity-100 scale-100"
            }`}
          />
          <Earth
            className={`absolute inset-0 transition-all duration-300 size-6 ${
              hovered ? "opacity-100 scale-100" : "opacity-0 scale-75"
            }`}
          />
        </div>
      </Button>
    </DialogTrigger>

  
  <DialogContent className="sm:max-w-[425px]">
    <AddForm/>
  </DialogContent>
</Dialog>

  )
}

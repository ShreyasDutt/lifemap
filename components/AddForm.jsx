"use client"
import { useRef, useState } from "react"
import { Button } from './ui/button'
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DatePicker } from './date-picker'
import { SaveMemory } from '@/app/actions/userActions'
import { currentSelectedDate } from "@/lib/utils"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

const AddForm = () => {
  const formRef = useRef(null);
  const CloseRef = useRef(null);
  const [loading, setLoading] = useState(false)

  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(formRef.current)
    const file = formData.get("photo")
    let photoUrl = ""


    try {
      if (!file.name) {
        return toast("Photo is required");
      }else if(!formData.get('title')){
        return toast("Title is required");
      }
      // Upload to Cloudinary
      if (file && file.name) {
        const uploadRes = await fetch("/api/image-upload", {
          method: "POST",
          body: formData,
        })
        const data = await uploadRes.json()
        photoUrl = data.url
      }




      // Submit to DB via Server Action
      await SaveMemory({
        title: formData.get("title"),
        description: formData.get("description"),
        date: currentSelectedDate,
        image: photoUrl,
      })

    } catch (error) {
      console.error("Error saving memory:", error)
    } finally {
      setLoading(false);
    }
      CloseRef.current.click();
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <DialogHeader className="mb-4 text-left space-y-1">
        <DialogTitle className="text-2xl font-hand font-bold text-neutral-800 dark:text-neutral-100">
          Add a New Memory
        </DialogTitle>
        <DialogDescription className="text-sm text-neutral-500 dark:text-neutral-400">
          Fill in the details and click save to capture this moment in your LifeMap.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4">
        <div className="grid gap-3">
          <Input type="file" id="photo" name="photo" accept="image/*" />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" placeholder='That rainy evening in Delhi ☔' />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="description">Description</Label>
          <Input id="description" name="description" placeholder='Write a little about this memory...' />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="memoryDate">Memory Date</Label>
          <DatePicker />
        </div>
      </div>
      <DialogFooter className="mt-5">
        <DialogClose ref={CloseRef}>
          <Button variant="outline"  disabled={loading}>Cancel</Button>
        </DialogClose>
        <Button type="submit" disabled={loading}>
          {loading ? <Loader2 className="animate-spin"/> : "Save changes"}
        </Button>
      </DialogFooter>
    </form>
  )
}

export default AddForm

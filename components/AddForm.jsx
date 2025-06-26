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
import { motion } from "framer-motion"

const AddForm = () => {
  const formRef = useRef(null);
  const CloseRef = useRef(null);
  const [loading, setLoading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState(null)

  
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  const formData = new FormData(formRef.current);
  const file = formData.get("photo");

  if (!file.name) {
    toast.error("Photo is required");
    setLoading(false);
    return;
  }
  if (!formData.get("title")) {
    toast.error("Title is required");
    setLoading(false);
    return;
  }

  let photoUrl = "";
  let public_ID = "";

  try {
    const uploadRes = await fetch("/api/image-upload", {
      method: "POST",
      body: formData,
    });
    const data = await uploadRes.json();

    if (!data.success) throw new Error("Upload failed");

    photoUrl = data.url;
    public_ID = data.publicId;

    const saveRes = await SaveMemory({
      title: formData.get("title"),
      date: currentSelectedDate,
      image: photoUrl,
      imageId: public_ID,
    }).then(()=>{
    toast.success("Memory saved!");
    });

    setPreviewUrl(null);
    formRef.current.reset();
    CloseRef.current.click();
    return;

  } catch (error) {
    console.error("Error saving memory:", error);
    // toast.error("Failed to save memory");
  } finally {
    setLoading(false);
  }
};

  return (
    <form ref={formRef} onSubmit={handleSubmit} >
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
         <Input
          type="file"
          id="photo"
          name="photo"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              setPreviewUrl(URL.createObjectURL(file));
            }
          }}
        />
        </div>
          {previewUrl && (
            <motion.img
              src={previewUrl}
              alt="Preview"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: 'easeIn' }}
              className="mt-2 h-40 w-full object-cover rounded-xl border"
            />
          )}
        <div className="grid gap-3">
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" placeholder='That rainy evening in Delhi ☔' />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="memoryDate">Memory Date</Label>
          <DatePicker />
        </div>
      </div>
      <DialogFooter className="mt-5 flex flex-col-reverse gap-3 md:flex-col-reverse">
        <DialogClose ref={CloseRef}>
          <Button variant="outline" className={'w-full'} disabled={loading}>Cancel</Button>
        </DialogClose>
        <Button type="submit" disabled={loading}>
          {loading ? <Loader2 className="animate-spin"/> : "Save changes"}
        </Button>
      </DialogFooter>
    </form>
  )
}

export default AddForm

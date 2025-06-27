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
import { Loader2, ImagePlus } from "lucide-react"
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

    if (!file?.name) {
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

      await SaveMemory({
        title: formData.get("title"),
        date: currentSelectedDate,
        image: photoUrl,
        imageId: public_ID,
      });

      toast.success("Memory saved!");
      setPreviewUrl(null);
      formRef.current.reset();
      CloseRef.current.click();

    } catch (error) {
      console.error("Error saving memory:", error);
      toast.error("Failed to save memory");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      <DialogHeader className="text-left">
        <DialogTitle className="text-2xl font-bold text-neutral-800 dark:text-neutral-100 font-hand">
          Add a New Memory
        </DialogTitle>
        <DialogDescription className="text-sm text-neutral-500 dark:text-neutral-400">
          Fill in the details below and click save to capture this moment in your LifeMap.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="photo" className="flex items-center gap-2">
            <ImagePlus className="w-4 h-4" /> Upload Photo
          </Label>
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
            transition={{ duration: 0.4 }}
            className="mt-2 h-48 w-full object-cover rounded-xl border shadow"
          />
        )}

        <div className="grid gap-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            placeholder="A moment worth remembering"
            className="placeholder:text-neutral-400"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="memoryDate">Memory Date</Label>
          <DatePicker />
        </div>
      </div>

      <DialogFooter className="flex flex-col-reverse md:flex-row md:justify-end md:gap-3 mt-6">
        <DialogClose ref={CloseRef} asChild>
          <Button variant="outline" className="w-full md:w-auto" disabled={loading}>
            Cancel
          </Button>
        </DialogClose>
        <Button type="submit" className="w-full md:w-auto" disabled={loading}>
          {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Save Memory"}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default AddForm;

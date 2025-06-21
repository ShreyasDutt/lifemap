import { Button } from './ui/button';
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DatePicker } from './date-picker';
import { SaveMemory } from '@/app/actions/userActions';
const AddForm = () => {
  return (
      <form action={SaveMemory}>
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
          <Input type={'file'} id="photo" name="photo" accept="image/*"/>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" placeholder='That rainy evening in Delhi ☔'/>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="description">Description</Label>
          <Input id="description" name="description" placeholder='Write a little about this memory...'/>
        </div>
          <div className="grid gap-3">
          <Label htmlFor="memoryDate">Memory Date</Label>
          <DatePicker/>
        </div>
      </div>
      <DialogFooter className={'mt-5'}>
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button type="submit">Save changes</Button>
      </DialogFooter>
    </form>
  )
}

export default AddForm
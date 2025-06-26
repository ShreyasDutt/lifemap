"use client"
import { SearchUser } from '@/app/actions/userActions'
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
import { Loader2 } from "lucide-react"
import { useState } from 'react'
import { toast } from "sonner"
import SearchFilter from './SearchFilter'

const GroupForm = () => {
const [loading, setloading] = useState(false);
const [search, setsearch] = useState('');
// console.log(search);
// const Results = await SearchUser(search);

  return (
    <form >
      <DialogHeader className="mb-4 text-left space-y-1">
        <DialogTitle className="text-2xl font-hand font-bold text-neutral-800 dark:text-neutral-100">
          Create a group
        </DialogTitle>
        <DialogDescription className="text-sm text-neutral-500 dark:text-neutral-400">
          Create a group and make memories together
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4">
        <div className="grid gap-3">
          <Label htmlFor="groupname">Group name</Label>
          <Input id="GroupName" name="GroupName" placeholder='Enter a Group Name' />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="groupname">Add users</Label>
          <Input id="GroupName" name="GroupName" placeholder='Search your friend' value={search} onChange={(e)=>{
                setsearch(e.target.value);
          }} />
        </div>
        <div>
            <SearchFilter filter={search}/>
        </div>
      </div>
      <DialogFooter className="mt-5 flex flex-col-reverse gap-3 md:flex-col-reverse">
        <DialogClose>
          <Button variant="outline" className={'w-full'} disabled={loading}>Cancel</Button>
        </DialogClose>
        <Button type="submit" disabled={loading}>
          {loading ? <Loader2 className="animate-spin"/> : "Save changes"}
        </Button>
      </DialogFooter>
    </form>
  )
}

export default GroupForm

"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Users } from "lucide-react"
import GroupForm from "./GroupForm"

export function FloatingGroupDialog() {

return (
  <Dialog>
    <DialogTrigger asChild>
      <Button
          variant="ghost"
          className="w-full justify-start px-2 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-accent"
        >
          <Users className="mr-2 h-4 w-4" />
          Create a Group
        </Button>
    </DialogTrigger>

  
  <DialogContent className="sm:max-w-[425px]">
    <GroupForm/>
  </DialogContent>
</Dialog>

  )
}

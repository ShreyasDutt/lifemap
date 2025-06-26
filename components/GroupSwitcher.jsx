"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Users } from "lucide-react"
import { FloatingGroupDialog } from "./FloatingGroupDialog"

export const GroupSwitcher = ({groups}) =>{
 const [position, setPosition] = React.useState("")
//  console.log(groups)

  return (
    <DropdownMenu className="select-none">
      <DropdownMenuTrigger asChild>
        <Button variant="outline"><Users /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel asChild>
        <FloatingGroupDialog/>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          {groups.length > 0 ? (
            <div>
              <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-sm text-muted-foreground px-4 py-3 gap-2">
              <Users className="h-5 w-5 text-gray-400" />
              No groups found
            </div>
          )}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

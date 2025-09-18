import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CircleArrowDown, CircleArrowRight, CircleArrowUp } from "lucide-react"
import { arrPriorityTask, priority } from "@/@types/task"

type props = {
    arrPriority:arrPriorityTask ,
   setSpriority : ( i:priority)=>void,
   Spriority:  priority
}
export function SelectPriorityTask({ arrPriority, setSpriority, Spriority }: props) {
 
  return (
    <Select defaultValue={Spriority} onValueChange={setSpriority} >
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select a Priority Task" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
            {
                arrPriority && arrPriority.length > 0 &&
                arrPriority.map((i)=>(
                  <SelectItem   key={i} value={i} onClick={()=> setSpriority(i)} >
                       < span>
                       {i} 
                        </span>
                       { i ==='high' && <CircleArrowUp color="blue"/>  }
                       { i ==='low' && <CircleArrowDown color="blue"/> }
                       { i ==='medium' && <CircleArrowRight color="blue" /> } 
                   </SelectItem>
                ))
            }
         
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

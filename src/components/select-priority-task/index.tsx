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

type props = {
    arrPriority:string[] ,
   setSpriority : (i:string)=>void,
}
export function SelectPriorityTask({ arrPriority, setSpriority    }: props) {
  return (
    <Select>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select a Priority Task" />
      </SelectTrigger>
      <SelectContent>

        <SelectGroup>
          
            {
                arrPriority && arrPriority.length > 0 &&
                arrPriority.map((i)=>(
                  <SelectItem  key={i} value={i} onClick={()=> setSpriority(i)} >
                    <div className=" justify-between flex items-center">
                        {i} 
                         { i ==='high' && <CircleArrowUp color="blue"/>  }   
                           { i ==='low' && <CircleArrowDown color="blue"/>      }    
                          { i ==='medium' && <CircleArrowRight color="blue" /> } 
                          
                     </div> 
        
                   </SelectItem>

                ))
            }
         
        </SelectGroup>
       
      </SelectContent>
    </Select>
  )
}

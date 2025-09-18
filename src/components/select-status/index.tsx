import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CircleArrowDown, CircleArrowRight, CircleArrowUp, CircleCheckBig, CircleX, Clock9, ClockAlert } from "lucide-react"
import { arrPriorityTask, arrStatus, priority, status } from "@/@types/task"


type props = {
    arrStatus: arrStatus ,
   setSstatus : (i:status)=>void,  
   Sstatus: status    
}
export function SelectStatusTask({ arrStatus, setSstatus, Sstatus }: props) {

    function verifyStatus( status: status ){
     
        switch(status){
            case 'pendente': 
                return <ClockAlert  color="#7903ffff" />
            case 'cancelado':
                return   <CircleX color="red"/>
            case 'concluido':
                return <CircleCheckBig  color="green"/> 
            case 'em-andamento':    
                return <Clock9 color="#428cfaff"/>
            default :null;
        }

}

  return (
    <Select defaultValue={Sstatus} onValueChange={setSstatus} >
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select a status Task" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
            {
                arrStatus && arrStatus.length > 0 &&
                arrStatus.map((i)=>(
                  <SelectItem   key={i} value={i} onClick={()=> setSstatus(i)} >
                       < span>
                       {i} 
                        </span>
                             {
                                verifyStatus(i)
                             }
                        
                   </SelectItem>
                ))
            }
         
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

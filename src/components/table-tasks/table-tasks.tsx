import { tasks } from "@/@types/task"
import {
  Table,TableBody,TableCaption,TableCell,TableFooter,TableHead,TableHeader,TableRow,
} from "@/components/ui/table"

import { ArrowDown, ArrowRight, ArrowUp, CircleArrowDown, CircleArrowRight, CircleArrowUp, CircleCheckBig, CircleX, Clock3, Clock9, ClockAlert } from "lucide-react"

type status =  'pendente' | 'em-andamento'| 'concluido'| 'cancelado';    
type priority = 'high'|'low'|'medium';

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

function verifyPriority(priority:priority ){
    switch( priority){
        case 'high':
            return <CircleArrowUp color="blue"/>;
        case 'low':
            return <CircleArrowDown color="blue"/>;
        case 'medium':
        return <CircleArrowRight color="blue" />    
    }
}
         


export function TableTasks({ data , total}:{data:tasks[] , total:number} ){
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50%] text-base font-bold ">title</TableHead>
          <TableHead className="text-base font-bold" >Status</TableHead>
          <TableHead  className="text-base font-bold" >priority</TableHead>
          <TableHead  className="text-base font-bold" >Created At</TableHead>

        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((task) => (
          <TableRow key={ task.id}>
            <TableCell className="font-medium">{task.title}</TableCell>
            <TableCell   >
                <div >
                  <span className="flex gap-5 text-base font-bold" >
                     {verifyStatus(task.status)}
                     {task.status}
                  </span>
                    </div> 
             </TableCell>
            <TableCell className="flex gap-5">
                  <span className="flex gap-5 text-base font-bold" >
                    { verifyPriority(task.priority)}  {task.priority} 
                  </span>
               </TableCell>
             <TableCell  >
                  <span className="flex gap-5  font-bold" >
                     { new Date(task.createdAt).toLocaleDateString('pt-br', { day:'2-digit', month:'short', year:'numeric'})  }  
                  </span>
                  
               </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right"> { total} </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}

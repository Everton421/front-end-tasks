'use client'
import { tasks } from "@/@types/task"
import { AppSidebar } from "@/components/app-sidebar"
import {  ModalNewTask } from "@/components/modal-new-task"
import { TableTasks } from "@/components/table-tasks"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { SidebarInset,SidebarProvider,SidebarTrigger, } from "@/components/ui/sidebar"
import { api } from "@/services/api"
import { useEffect, useState } from "react"




export default function Page() {
    const [data, setData] = useState<tasks[]>()
  const [ totalTasks, setTotalTasks ] = useState<number>(0)
  const [ filter, setFilter ] = useState<string>('');

    async function getTasks(){
        let params ={}
      if( filter && filter !== ''   ){
        params = { search: filter}
      }

      try{
        const result = await api.get('/tasks' , { params: {  search: filter}});
        setData(result.data.tasks)
        setTotalTasks(result.data.total)
        console.log(result.data.tasks)
      }catch{
      console.log("Erro ao obter os dados das tarefas")
      }
    }

    useEffect(()=>{
      getTasks()
    },[])
     
     

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <div className="gap-5 flex">
          <Input
              placeholder="filter tasks..."
              onChange={(e)=>   setFilter(String(e.target.value))}
               />
               <Button onClick={()=> getTasks()}>
                filter
               </Button>
             <ModalNewTask/>
          </div>
      

        </header>
        { 
          data && data?.length > 0 && 
           <TableTasks data={data} total={totalTasks}/>
        }
      </SidebarInset>
    </SidebarProvider>
  )
}

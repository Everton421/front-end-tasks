'use client'
import { tasks } from "@/@types/task"
import { AlertTask } from "@/components/alert-task"
import { AppSidebar } from "@/components/app-sidebar"
import {   DrawerNewTask } from "@/components/drawer-new-task"
import { TableTasks } from "@/components/table-tasks/table-tasks"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Separator } from "@/components/ui/separator"
import { SidebarInset,SidebarProvider,SidebarTrigger, } from "@/components/ui/sidebar"
import { api } from "@/services/api"
import { Preahvihear } from "next/font/google"
import { useEffect, useState } from "react"

 

export default function Page() {
    const [data, setData] = useState<tasks[]>()
    const [ totalTasks, setTotalTasks ] = useState<number>(0)
    const [ filter, setFilter ] = useState<string>('');
    const [ paginationAmount, setPaginationAmount ] = useState(1)
    const [ numberPage, setNumberPage ] = useState(1);

      function nextPage(){
        const tasksPerPage = 10;
        const totalPages = Math.ceil(totalTasks / tasksPerPage);
  
          setPaginationAmount( paginationAmount + 1  )
          if (paginationAmount < totalPages) {
            setPaginationAmount(paginationAmount + 1);
          }
        }

      
        function prevPage(){
          if(paginationAmount === 1 ){
            return
          }
        if( paginationAmount >= 1 ){
          setPaginationAmount( paginationAmount - 1  )
        }

      }

    async function getTasks(){
        let params ={}
      if( filter && filter !== ''   ){
        params = { search: filter}
      }

      try{
        const result = await api.get('/tasks' , { params: { orderBy:'id', search: filter, page:paginationAmount }});

        setData(result.data.tasks)
        setTotalTasks(result.data.total)
        
        console.log(result.data.tasks)
      }catch{
      console.log("Erro ao obter os dados das tarefas")
      }
    }

    useEffect(()=>{
      getTasks()
    },[paginationAmount])
     
     

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
             <DrawerNewTask/>
          </div>
      

        </header>
      
        { 
          data && data?.length > 0 && 
           <TableTasks data={data} total={totalTasks}/>
        }
        <Pagination>
          <PaginationContent>
            
            <PaginationItem onClick={()=>prevPage()} >
              <PaginationPrevious href="#" />
            </PaginationItem>

            <PaginationItem>
              <PaginationLink href="#">{ paginationAmount }</PaginationLink>
            </PaginationItem>
            
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            
            <PaginationItem onClick={()=>nextPage()} >
              <PaginationNext href="#" />
            </PaginationItem>
          
          </PaginationContent>
      </Pagination>
      </SidebarInset>

 
         
    </SidebarProvider>
  )
}

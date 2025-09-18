'use client'
import { tasks } from "@/@types/task"
import { AppSidebar } from "@/components/app-sidebar"
import { DrawerEditTask } from "@/components/drawer-edit-task"
import { DrawerNewTask } from "@/components/drawer-new-task"
import { TableTasks } from "@/components/table-tasks/table-tasks"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Separator } from "@/components/ui/separator"
import { SidebarInset,SidebarProvider,SidebarTrigger, } from "@/components/ui/sidebar"
import { useEffect, useState } from "react"
import { OrbitProgress, ThreeDot } from 'react-loading-indicators'
import { useAuth } from "../contexts/AuthContex" 
import { useRouter } from "next/navigation"
import { configApi } from "@/services/api"

export default function Page() {
  const api = configApi();
  
    const [data, setData] = useState<tasks[]>()
    const [ loadingData, setLoadingData ] = useState(false);
    const [ totalTasks, setTotalTasks ] = useState<number>(0)
    const [ filter, setFilter ] = useState<string>('');
    const [ paginationAmount, setPaginationAmount ] = useState(1)
    const [ numberPage, setNumberPage ] = useState(1);
    const [ visibleEditTask ,setVisibleEditTask] = useState<boolean>(false)
    const [ taskToBeEdited , setTaskToBeEdited ] = useState<tasks>()
    
    const { user,  logout }:any = useAuth();
    const router  = useRouter();
      
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

    useEffect(()=>{
      if( user && !user.loading && !user){
        router.push('/')
      }
    },[ paginationAmount, user, logout ])


 


       async function getTasks(){
    
        
        let params ={}
      if( filter && filter !== ''   ){
        params = { search: filter}
      }
      try{
       setLoadingData(true)
        const result = await api.get('/tasks' , 
          {
             params: { orderBy:'id', search: filter, page:paginationAmount },
               headers:{ 'Authorization': user.token}

            });
        setData(result.data.tasks)
        setTotalTasks(result.data.total)
      }catch{
       setLoadingData(false)
       console.log("Erro ao obter os dados das tarefas")
      }finally{
       setLoadingData(false)
      }

    }

    useEffect(()=>{
     if( user  ){
      getTasks()
     } 
 

    },[ paginationAmount, user ])
     

 

     function editTask(task:tasks){
        setVisibleEditTask(true)
        setTaskToBeEdited(task)
     }

    
  if ( user && user.loading   ) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ThreeDot variant="bounce" color="#000" size="medium" />
      </div>
    );
  }
   
  function sair(){
    router.push('/')
    logout()
  }

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
             {
               taskToBeEdited && 
              <DrawerEditTask task={taskToBeEdited}  openDrawer={visibleEditTask}  setOpenDrawer={setVisibleEditTask}      />
              }
          </div>
        <div className=" w-full  justify-end flex gap-5 ">
            <span className="font-bold" > {user && user.email }</span> 
              <Button 
              onClick={()=> sair()}>
                  logout
              </Button>
        </div>

        </header>
      
        {  loadingData ?
          ( <div className="w-full items-center justify-center h-full flex">
             <OrbitProgress variant="track-disc" speedPlus={4} easing="linear" color="black" />        
            </div>
          )
          :
          data && data?.length > 0 && 
           <TableTasks data={data} total={totalTasks} editTask={editTask}/>
        }
        <div className=" fixed bottom-0 left-0 w-full bg-white border-t z-50 ">
         <Pagination   >
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
      </div>
      </SidebarInset>

    </SidebarProvider>
  )
}

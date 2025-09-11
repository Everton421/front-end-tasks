"use client"

import {    useState } from "react"
import { FolderPlus, } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { SelectPriorityTask } from "../select-priority-task"
import { DialogTitle } from "../ui/dialog"
import { api } from "@/services/api"
import  {ThreeDot } from 'react-loading-indicators'  
import { AlertTask } from "../alert-task"
 

export function DrawerNewTask() {
    const [ priority ] =   useState  ( [ 'high','low','medium'])
    const [ Spriority, setSpriority  ] = useState< string> ('low');
    const [ title, setTitle ] = useState<string>();
    const [ description, setDescription ] = useState<string>();
    const [ loadingSave, setLoadingSave ] = useState(true);

  
    async function register (){
      try{
        setLoadingSave(true)
        const resultCreateTask = await api.post('/tasks',
        {
          priority:Spriority,
          title:title,
          description:description,
          status:'pendente'
        }
        )

        if( resultCreateTask.status === 201){
          console.log(resultCreateTask.data)
        }
        setLoadingSave(false)

      }catch(e){
        setLoadingSave(false)

        console.log(`Erro ao tentar registrar uma nova tarefa`)
      }finally{
        setLoadingSave(false)
      }   
      
    }



if( loadingSave){
 //    <AlertTask
 //    title="teste"
 //    description="teste"
 //    />
   // 
   <div className="flex w-full">
   <ThreeDot color="blue"  />
   </div>

  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
              <Button  >
                 <FolderPlus /> Add New Task
               </Button>
      </DrawerTrigger>

    <DrawerContent>
      
           <div className="mx-auto w-[70%]  ">
            <DrawerHeader >
            <DialogTitle>New Task</DialogTitle>
               <DrawerDescription>Creating a new task.</DrawerDescription>

           </DrawerHeader>
            { loadingSave ? 
              <div className="grid gap-3">
      
             <ThreeDot color="blue"  />
               </div>
            : 
           <>
              <div className="grid gap-3">

            
                  <DrawerTitle className=" text-start" >Title</DrawerTitle>
                  <Input  placeholder="Updating database client 134..."
                onChange={(e)=> setTitle(String(e.target.value))}
                />

                <Label htmlFor="username-1">Description</Label>
                <Textarea
                onChange={(e)=>setDescription(String(e.target.value))}
                />
                <Label htmlFor="username-1">Priority</Label>

              <SelectPriorityTask arrPriority={priority} setSpriority={setSpriority}  />
              </div>
            <DrawerFooter>
                <Button onClick={()=>register()}>Save new Task</Button>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
            </DrawerFooter>
            </>
              }
          </div>
      </DrawerContent>
  
    </Drawer>
  )
}

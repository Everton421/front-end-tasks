"use client"

import { useState } from "react"
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
import {  configApi } from "@/services/api"
import { ThreeDot } from 'react-loading-indicators'
import { AlertTask } from "../alert-task"
import { arrPriorityTask, arrStatus, priority, status, tasks } from "@/@types/task"
import { SelectStatusTask } from "../select-status"
import { useAuth } from "@/app/contexts/AuthContex"

type props = {
task: tasks,
openDrawer:boolean, 
setOpenDrawer : (value:boolean)=>void
}

export function DrawerEditTask({task, openDrawer , setOpenDrawer}:props) {
const api = configApi();
  const [priority] = useState<arrPriorityTask>(['high', 'low', 'medium'])
  const [ status ] = useState<arrStatus>(['pendente' , 'em-andamento', 'concluido', 'cancelado'])
  const [Spriority, setSpriority] = useState<priority>( task.priority);
  const [ sStatus, setStatus] = useState <status>(task.status)
  const [loadingSave, setLoadingSave] = useState(false);
  const [visibleAlert, setVisibleAlert] = useState(false);

  const [titleResponse, setTitleResponse] = useState('');
  const [descriptionResponse, setDescriptionResponse] = useState('');
    const { user,  logout }:any = useAuth();


  async function register() {
    try {
      
    // setLoadingSave(true)
      task.priority = Spriority
      task.status = sStatus
       console.log(task)
   const dataUpdate =   {
           title: task.title,
           description: task.description,
           status: task.status,
           priority: task.priority,
          };

      const resultCreateTask = await api.put(`/tasks/${task.id}`,dataUpdate ,{
             headers: {
                 authorization: user.token 
            },
        } 
          )
         
       if (resultCreateTask.status === 200) {
         console.log(resultCreateTask.data);
         setOpenDrawer(false)
         setVisibleAlert(true);
         setTitleResponse('Ok');
         setDescriptionResponse("Task registered sucessfully")
       }
      setLoadingSave(false)
     
     
 
    } catch (e) {
      setLoadingSave(false)
       setOpenDrawer(false)
        setVisibleAlert(true);
        setTitleResponse('Erro');
        setDescriptionResponse("Error registering task")

      console.log(`Erro ao tentar atualiza uma tarefa`, e )
       console.log(task)

    } finally {
       setOpenDrawer(false)
      setLoadingSave(false)    }

  }

  return (
  <>
  
    <Drawer open={openDrawer} >
      <DrawerContent>
        <div className="mx-auto w-[70%]  ">
          <DrawerHeader >
            <DialogTitle>Editing Task</DialogTitle>
            <DrawerDescription>Editing task.</DrawerDescription>

          </DrawerHeader>
           {  loadingSave ?
            <div className="grid gap-3 h-70">
              <ThreeDot color="black" />
            </div>
            :

            <>
              <div className="grid gap-3">
                <Label htmlFor="username-1">Priority</Label>
                <SelectPriorityTask arrPriority={priority} setSpriority={setSpriority} Spriority={task && task.priority} />

                <Label htmlFor="username-1">Status</Label>
                <SelectStatusTask  Sstatus={task.status} arrStatus={status} setSstatus={setStatus} />

                <DrawerTitle className=" text-start" >Title</DrawerTitle>
                <Input placeholder="Updating database client 134..."
                    defaultValue={task && task.title}
                        onChange={(e) => task.title = String(e.target.value) } 

                  //onChange={(e) => setTitle(String(e.target.value))}
                />

                <Label htmlFor="username-1">Description</Label>
                <Textarea
                    defaultValue={task &&  task.description}
                        onChange={(e) => task.description = String(e.target.value) } 
                    //  onChange={(e) => setDescription(String(e.target.value))}
                />
                
              </div>
              <DrawerFooter>
                <Button onClick={() => register()}>Save new Task</Button>
                <DrawerClose asChild>
                  <Button variant="outline" onClick={ ()=> setOpenDrawer(false)}>Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </>
          }
        </div>
      </DrawerContent>

    </Drawer>
     <AlertTask
      description={descriptionResponse}
      setVisible={setVisibleAlert }
      title={titleResponse}
      visible={visibleAlert}
    />
 
</>


  )
}


 
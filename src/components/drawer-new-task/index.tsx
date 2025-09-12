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
import { api } from "@/services/api"
import { ThreeDot } from 'react-loading-indicators'
import { AlertTask } from "../alert-task"


export function DrawerNewTask() {
  const [priority] = useState(['high', 'low', 'medium'])
  const [Spriority, setSpriority] = useState<string>('low');
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [loadingSave, setLoadingSave] = useState(false);
  const [visibleAlert, setVisibleAlert] = useState(false);

  const [titleResponse, setTitleResponse] = useState('');
  const [descriptionResponse, setDescriptionResponse] = useState('');

  const [ open, setOpen ] = useState(false);

  async function register() {
    try {
      setLoadingSave(true)
      const resultCreateTask = await api.post('/tasks',
        {
          priority: Spriority,
          title: title,
          description: description,
          status: 'pendente'
        }
      )

      if (resultCreateTask.status === 201) {
        console.log(resultCreateTask.data);
        setOpen(false)
        setVisibleAlert(true);
        setTitleResponse('Ok');
        setDescriptionResponse("Task registered sucessfully")

      }
      setLoadingSave(false)

    } catch (e) {
      setLoadingSave(false)
       setOpen(false)
        setVisibleAlert(true);
        setTitleResponse('Erro');
        setDescriptionResponse("Error registering task")

      console.log(`Erro ao tentar registrar uma nova tarefa`)
    } finally {
      setLoadingSave(false)
    }

  }

  return (
  <>
  
    <Drawer open={open} onOpenChange={setOpen}>
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
           {  loadingSave ?
            <div className="grid gap-3 h-70">
              <ThreeDot color="black" />
            </div>
            :

            <>
              <div className="grid gap-3">
                <Label htmlFor="username-1">Priority</Label>
                <SelectPriorityTask arrPriority={priority} setSpriority={setSpriority} />

                <DrawerTitle className=" text-start" >Title</DrawerTitle>
                <Input placeholder="Updating database client 134..."
                  onChange={(e) => setTitle(String(e.target.value))}
                />

                <Label htmlFor="username-1">Description</Label>
                <Textarea
                  onChange={(e) => setDescription(String(e.target.value))}
                />
                
              </div>
              <DrawerFooter>
                <Button onClick={() => register()}>Save new Task</Button>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
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

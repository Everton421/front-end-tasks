import { priorityTask, tasks } from "@/@types/task"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FolderPlus } from "lucide-react"
import { Textarea } from "../ui/textarea"
import { Select } from "../ui/select"
import { SelectPriorityTask } from "../select-priority-task"
import { useState } from "react"

export function ModalNewTask() {
  const [ priority ] = useState  ( [ 'high','low','medium'])
  const [ Spriority, setSpriority  ] = useState< string> ('low');
  const [ title, setTitle ] = useState<string>();
  const [ description, setDescription ] = useState<string>();

  function register (){

    console.log({
      priority:Spriority,
      title:title,
      description:description
    })
  }
  return (
      <div className="w-[60%]">

    <Dialog  >
        <DialogTrigger asChild > 
            <Button  >
                <FolderPlus /> Add New Task
               </Button>

        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>New Task</DialogTitle>
            <DialogDescription>
              Creating a new task.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Title</Label>
              <Input  placeholder="Updating database client 134..."
              onChange={(e)=> setTitle(String(e.target.value))}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Description</Label>
              <Textarea
              onChange={(e)=>setDescription(String(e.target.value))}
              />

        <SelectPriorityTask arrPriority={priority} setSpriority={setSpriority} />


            </div>

          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={()=>register()}> Save Task</Button>
          </DialogFooter>
        </DialogContent>
    </Dialog>
    </div>

  )
}

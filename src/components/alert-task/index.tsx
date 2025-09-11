import { Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { Button } from "../ui/button";

type props = { 
    title:string,
    description:string,
    setVisible:(i:boolean)=>void,
     visible:boolean
}
export function AlertTask({ title, description,  setVisible,visible }: props ){

        return(
             
 
 <AlertDialog open={visible} onOpenChange={()=>{}}>
    
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle> {title}</AlertDialogTitle>
          <AlertDialogDescription>
           {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          
          <AlertDialogAction onClick={()=> setVisible(false)} >Ok</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

        )
}
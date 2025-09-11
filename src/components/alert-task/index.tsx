import { Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

type props = { 
    title:string,
    description:string,
    variant?:'destructive'|null
}
export function AlertTask({ title, description, variant }: props ){

        return(
          <div className="grid w-full max-w-xl items-start gap-4">
             <Alert variant={variant}>
              <Terminal />
               <AlertTitle>{title}</AlertTitle>
               <AlertDescription>
                 {description}
               </AlertDescription>
            </Alert>
        </div>
        )
}
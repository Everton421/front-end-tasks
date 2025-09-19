import { LoginForm } from "@/components/login-form";

export default function Home() {
  return (
     <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10 items-center justify-center ">

    
        <div className="w-3/4 items-center justify-center  ">
            <LoginForm />
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
           <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
          record your tasks!
         </h1>
        <img
          src="/taskimg.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      
      </div>
    </div>
  );
}

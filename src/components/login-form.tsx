'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {  configApi } from "@/services/api"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useAuth } from "@/app/contexts/AuthContex"

import { useRouter } from "next/navigation";
import { AlertLogin } from "./alert-login"
import { ThreeDot } from "react-loading-indicators"


export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {

const router = useRouter();
const api = configApi();

 const [ email, setEmail ] = useState<string>('');
 const [ password, setPassword ] = useState<string>('');
  const [ loadingLogin, setLoadingLogin ] = useState(false)
 const [ invalidCredentials , setInvalidCredentials ] = useState(false);

    const { setUser  }:any = useAuth()


  async function signin (){
    try{
      setLoadingLogin(true)
        const result = await api.post('/sessions',
          {
            email: email,
            password :password
          }
      )

        if( result.status === 200 ){
          const userData =   { 
                  email: email,
                  senha: password,
                  token:result.data.token
                }

          setUser(  userData  )

            localStorage.setItem('authUser', JSON.stringify(userData));
        }
      setLoadingLogin(false)

        router.push('/dashboard')  
    }catch(e){ 
      setInvalidCredentials(true)
      setLoadingLogin(false)

    }finally{
      setLoadingLogin(false)
    }
}


  return (
    <> 
    {
       loadingLogin ? (
      <div>
            <ThreeDot variant="bounce" color="#000" size="medium" text="" textColor="" />
        </div>
      )
     :(
        <Card  >
        <CardHeader>
      
          <CardTitle className="text-center font-bold text-3xl"> Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                    onChange={(e)=> setEmail(String(e.target.value)) }
              
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                  <Input 
                  id="password"
                  type="password"
                   required 
                    onChange={(e)=> setPassword(String(e.target.value)) }
                  />
              </div>
              <div className="flex flex-col gap-3">
                <Button
                onClick={()=> signin()}
                 type="submit" className="w-full"  
                >
                  Login
                </Button>
                <Button variant="outline" className="w-full">
                  Login with Google
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div>

          <AlertLogin   
          description="Invalid credentials!"
          setVisible={setInvalidCredentials}
          title="Error!"
          visible={invalidCredentials}
          />
   

        </CardContent>
      </Card>
      )}
      </>
  )
}

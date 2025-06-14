import {
    Card,
    CardAction,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function SignUp(){ 
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')

    const [password,setPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const [confirmPassword,setConfirmPassword] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('')

    const [isValid, setIsValid] = useState(false)

    function validateEmail(email:string) {
        if (!email){
            return "Email is required"
        }
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!regex.test(email)){
            return "Invalid email!"
        }
        return '';
    }

    function validatePassword(password:string) {
        if (password.length < 8) {
          return "Password must be at least 8 characters long.";
        }
      
        if (!/[a-z]/.test(password)) {
          return "Password must contain at least one lowercase letter.";
        }
      
        if (!/[A-Z]/.test(password)) {
          return "Password must contain at least one uppercase letter.";
        }
      
        if (!/\d/.test(password)) {
          return "Password must contain at least one digit.";
        }
      
        if (!/[@$!%*?&]/.test(password)) {
          return "Password must contain at least one special character (@$!%*?&).";
        }
      
        return "";
      }

    function validateConfirmPassword(pass:string){
        if (pass!=password){
            return 'Passwords do not match'
        }
        return ''
    }
    
    function handleEmailChange(event: { target: { value: string } }){
        const newEmail = event.target.value
        const emailErr = validateEmail(newEmail)
        if (emailErr!=''){
            setEmailError(emailErr)
            setIsValid(false)
        }
        else{
            setEmail(newEmail)
            setEmailError('')
            setIsValid(!emailErr && !passwordError && !confirmPasswordError)
        }
    }

    function handlePasswordChange(event: { target: { value: string } }){
        const newPass = event.target.value
        const passErr = validatePassword(newPass)
        if (!passErr){
            setPassword(newPass)
            setIsValid(!passErr && !emailError && !confirmPasswordError)
            setPasswordError('')
        }
        else{
            setPasswordError(passErr)
            setIsValid(false)
        }
    }

    function handleConfirmPasswordChange(event: { target: { value: string } }){
        const confPass = event.target.value
        const confPassErr = validateConfirmPassword(confPass)
        if (!confPassErr){
            setConfirmPassword(confPass)
            setIsValid(!confPassErr && !emailError && !passwordError)
            setConfirmPasswordError('')
        }
        else{
            setConfirmPasswordError(confPassErr)
            setIsValid(false)
        }
    }

    function onSubmit(){
        console.log(email,password,confirmPassword)
    }
      
    return (
        <div className="bg-[url('@assets/uml_gen_bg_img.jpg')] bg-cover bg-center flex items-center justify-center min-h-screen w-full">
            <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Sign Up</CardTitle>
                <CardAction>
                <Button variant="link">Login</Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <form>
                <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                    <Label htmlFor="emailInput">Email</Label>
                    <Input
                        id="emailInput"
                        type="email"
                        placeholder="m@example.com"
                        onChange={handleEmailChange}
                        required
                    />
                    {emailError && <span className="error">{emailError}</span>}
                    </div>
                    <div className="grid gap-2">
                    <Label htmlFor="passwordInput">Password</Label>
                    <Input 
                        id="passwordInput" 
                        type="password" 
                        onChange={handlePasswordChange}
                        required />
                        {passwordError && <span className="error">{passwordError}</span>}
                    
                    </div>
                    <div className="grid gap-2">
                    <Label htmlFor="confirmPasswordInput">Confirm Password</Label>
                    <Input 
                        id="confirmPasswordInput" 
                        type="password" 
                        onChange={handleConfirmPasswordChange}
                        required />
                        {confirmPasswordError && <span className="error">{confirmPasswordError}</span>}

                    </div>
                </div>
                </form>
            </CardContent>
            <CardFooter className="flex-col gap-2">
                <Button type="submit" className="w-full" disabled={!isValid} onClick={onSubmit}>
                Login
                </Button>
            </CardFooter>
            </Card>
        </div>
      )
}
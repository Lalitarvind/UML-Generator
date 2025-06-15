import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [isValid, setIsValid] = useState(false);

  function validateEmail(email: string) {
    if (!email) {
      return 'Email is required';
    }
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(email)) {
      return 'Invalid email!';
    }
    return '';
  }

  function validatePassword(password: string) {
    if (password.length < 8) {
      return 'Password must be at least 8 characters long.';
    }

    if (!/[a-z]/.test(password)) {
      return 'Password must contain at least one lowercase letter.';
    }

    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one uppercase letter.';
    }

    if (!/\d/.test(password)) {
      return 'Password must contain at least one digit.';
    }

    if (!/[@$!%*?&]/.test(password)) {
      return 'Password must contain at least one special character (@$!%*?&).';
    }

    return '';
  }

  function handleEmailChange(event: { target: { value: string } }) {
    const newEmail = event.target.value;
    const emailErr = validateEmail(newEmail);
    if (emailErr != '') {
      setEmailError(emailErr);
      setIsValid(false);
    } else {
      setEmail(newEmail);
      setEmailError('');
      setIsValid(!emailErr && !passwordError);
    }
  }

  function handlePasswordChange(event: { target: { value: string } }) {
    const newPass = event.target.value;
    const passErr = validatePassword(newPass);
    if (!passErr) {
      setPassword(newPass);
      setIsValid(!passErr && !emailError);
      setPasswordError('');
    } else {
      setPasswordError(passErr);
      setIsValid(false);
    }
  }

  async function onSubmit() {
    console.log(email, password);
    if (!isValid) {
      console.error('Form is not valid');
      return;
    }
    try {
      const res = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Login failed');
      }
      const data = await res.json();
      console.log('Login successful:', data);
    } catch (error) {
      console.error('Error during login:', error);
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('An unexpected error occurred');
      }
    }
  }

  return (
    <div className="bg-[url('@assets/uml_gen_bg_img.jpg')] bg-cover bg-center flex items-center justify-center min-h-screen w-full">
      <Card className="w-full max-w-lg max-h-lg">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardAction>
            <Button variant="link">Sign Up</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
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
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" onChange={handlePasswordChange} required />
                {passwordError && <span className="error">{passwordError}</span>}
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="button" className="w-full" disabled={!isValid} onClick={onSubmit}>
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

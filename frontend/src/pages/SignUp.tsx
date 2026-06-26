import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bgImg from '@assets/uml_gen_bg_img.jpg';

export default function SignUp() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

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

  function validateConfirmPassword(pass: string) {
    if (pass != password) {
      return 'Passwords do not match';
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
      setIsValid(!emailErr && !passwordError && !confirmPasswordError);
    }
  }

  function handlePasswordChange(event: { target: { value: string } }) {
    const newPass = event.target.value;
    const passErr = validatePassword(newPass);
    if (!passErr) {
      setPassword(newPass);
      setIsValid(!passErr && !emailError && !confirmPasswordError);
      setPasswordError('');
    } else {
      setPasswordError(passErr);
      setIsValid(false);
    }
  }

  function handleConfirmPasswordChange(event: { target: { value: string } }) {
    const confPass = event.target.value;
    const confPassErr = validateConfirmPassword(confPass);
    if (!confPassErr) {
      setConfirmPassword(confPass);
      setIsValid(!confPassErr && !emailError && !passwordError);
      setConfirmPasswordError('');
    } else {
      setConfirmPasswordError(confPassErr);
      setIsValid(false);
    }
  }

  async function onSubmit() {
    console.log(email, password, confirmPassword);
    if (!isValid) {
      console.error('Form is not valid');
      return;
    }
    try {
      const res = await fetch('http://localhost:8000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Sign up failed');
      }
      const data = await res.json();
      console.log('Sign up successful:', data);
      alert('Sign up successful! Please log in.');
      navigate('/home');
    } catch (error) {
      console.error('Error during sign up:', error);
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('An unexpected error occurred');
      }
    }
  }

  return (
    <div
      className="bg-cover bg-center flex items-center justify-center min-h-screen w-full"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Sign Up</h2>
          <button
            className="text-sm text-[#3A2990] hover:underline"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        </div>

        <form className="flex flex-col gap-6">
          <div className="grid gap-2">
            <label htmlFor="emailInput" className="text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="emailInput"
              type="email"
              placeholder="m@example.com"
              onChange={handleEmailChange}
              required
              className="px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-[#3A2990] focus:ring-1 focus:ring-[#3A2990]"
            />
            {emailError && <span className="error">{emailError}</span>}
          </div>

          <div className="grid gap-2">
            <label htmlFor="passwordInput" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="passwordInput"
              type="password"
              onChange={handlePasswordChange}
              required
              className="px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-[#3A2990] focus:ring-1 focus:ring-[#3A2990]"
            />
            {passwordError && <span className="error">{passwordError}</span>}
          </div>

          <div className="grid gap-2">
            <label htmlFor="confirmPasswordInput" className="text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              id="confirmPasswordInput"
              type="password"
              onChange={handleConfirmPasswordChange}
              required
              className="px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-[#3A2990] focus:ring-1 focus:ring-[#3A2990]"
            />
            {confirmPasswordError && <span className="error">{confirmPasswordError}</span>}
          </div>
        </form>

        <div className="mt-6 flex flex-col gap-2">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#3A2990] text-white font-semibold rounded-md hover:bg-[#2e2070] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            disabled={!isValid}
            onClick={onSubmit}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

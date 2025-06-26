// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from '@/pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import ChatPage from './pages/ChatPage';
import Playground from './pages/Playground';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home"/>} />
        <Route path="/home" element={<Home/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/chat" element={<ChatPage />} />
        <Route path="/dashboard/playground" element={<Playground />} />
        {/* other routes */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

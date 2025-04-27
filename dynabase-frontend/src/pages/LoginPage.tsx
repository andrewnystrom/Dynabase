import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

import ApplicationLayout from '../layouts/ApplicationLayout';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <ApplicationLayout>
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">Dynabase Login</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <InputText
              id="username"
              className="w-full"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>

          <div className="w-full space-y-6">
            <label htmlFor="password" className="w-full block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <Password
              id="password"
              inputClassName="w-full"
              className="w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              feedback={false}
              toggleMask
              placeholder="Enter your password"
            />
          </div>

          <Button type="submit" label="Login" className="w-2 p-button-primary" />
        </form>
      </div>
    </ApplicationLayout>
  );
}

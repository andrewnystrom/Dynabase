import * as React from 'react';
import { TextField, PrimaryButton, Stack } from '@fluentui/react';
import axios from 'axios';
import { setAuthToken } from '../util/api';
import { MessageBar, MessageBarType } from '@fluentui/react';

const api = axios.create({
  baseURL: 'http://localhost:8081'
});

export default function LoginForm(): JSX.Element {
  const [username, setUsername] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [accessToken, setAccessToken] = React.useState<string>('');
  const [error, setError] = React.useState<boolean>(false);


  React.useEffect(() => {
    console.log("TOKEN: ", accessToken);
  }, [accessToken]);

  async function getToken(username: string, password: string): Promise<string> {
    const params = new URLSearchParams();
    params.append('grant_type', 'password');
    params.append('client_id', 'dynabase-frontend');
    params.append('username', username);
    params.append('password', password);

    const response = await axios.post(
      'http://localhost:8180/realms/dynabase/protocol/openid-connect/token',
      params,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    setAccessToken(response.data.access_token);

    setAuthToken(response.data.access_token);


    return response.data.access_token;  // ✅ Extract access token cleanly
  }



  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Logging in with:', { username, password });

    try {
      const token = await getToken(username, password);
      console.log('Token received:', token);

      setAccessToken(token); // still set it in React state if you want

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      const response = await api.get('/admin')
        .then(response => {
          console.log('User Profile:', response.data);
          setError(false);
        })
        .catch(e => {
          setError(true);
        })

    } catch (error) {
      setError(true);
      console.error('Login or fetching user info failed:', error);
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <Stack tokens={{ childrenGap: 15 }} styles={{ root: { width: 300, margin: '0 auto', marginTop: 100 } }}>
        <TextField
          label="Username"
          value={username}
          onChange={(event, newValue) => setUsername(newValue || '')}
          required
        />
        <TextField
          label="Password"
          type="password"
          canRevealPassword
          value={password}
          onChange={(event, newValue) => setPassword(newValue || '')}
          required
        />
        <PrimaryButton text="Login" type="submit" />
        {
          error && (
            <MessageBar
              delayedRender={false}
              messageBarType={MessageBarType.error}
            >
              {"There was an error."}
            </MessageBar>
          )
        }
      </Stack>
    </form>
  );
}

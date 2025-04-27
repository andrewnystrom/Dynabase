import * as React from 'react';
import { TextField, PrimaryButton, Stack } from '@fluentui/react';
import axios from 'axios';


const api = axios.create({
  baseURL: 'http://localhost:8081'
});

export default function LogoutForm(): JSX.Element {
  const [username, setUsername] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [accessToken, setAccessToken] = React.useState<string>('');
  const [profile, setProfile] = React.useState<string | null>(null);


  React.useEffect(() => {
    if (accessToken) {
      api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

      // Fetch user profile after login
      api.get('/me')
        .then((response) => setProfile(response.data))
        .catch((error) => console.error('Failed to fetch profile', error));
    }
  }, [accessToken]);

  async function logout(): Promise<string> {
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
    return response.data.access_token;  // ✅ Extract access token cleanly
  }



  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.location.href = 'http://localhost:8081/logout';
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack tokens={{ childrenGap: 15 }} styles={{ root: { width: 300, margin: '0 auto', marginTop: 100 } }}>

        <PrimaryButton text="Logout" type="submit" />
      </Stack>
    </form>
  );
}

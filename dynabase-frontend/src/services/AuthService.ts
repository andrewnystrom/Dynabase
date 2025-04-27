import axios from 'axios';

const KEYCLOAK_URL = 'http://localhost:8180/realms/dynabase/protocol/openid-connect/token';
const CLIENT_ID = 'dynabase-frontend';

export async function login(username: string, password: string): Promise<string> {
  const params = new URLSearchParams();
  params.append('grant_type', 'password');
  params.append('client_id', CLIENT_ID);
  params.append('username', username);
  params.append('password', password);

  const response = await axios.post(KEYCLOAK_URL, params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  return response.data.access_token;
}

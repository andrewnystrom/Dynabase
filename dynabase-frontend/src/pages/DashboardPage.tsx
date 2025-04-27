import { useEffect, useState } from 'react';
import api from '../services/api';
import LogoutButton from '../components/LogoutButton';
import ApplicationLayout from '../layouts/ApplicationLayout';

export default function DashboardPage() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    api.get('/me')
      .then((response) => setProfile(response.data))
      .catch((error) => console.error('Failed to fetch profile', error));
  }, []);

  return (
    <ApplicationLayout>
      <h1>Dashboard</h1>
      {profile ? (
        <>
          <p>Username: {profile.username}</p>
          <p>Email: {profile.email}</p>
          <p>Roles: {profile.roles.join(', ')}</p>
          <LogoutButton />

        </>
      ) : (
        <p>Loading profile...</p>
      )}
    </ApplicationLayout>
  );
}

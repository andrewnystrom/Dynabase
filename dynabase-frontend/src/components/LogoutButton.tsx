import { Button } from 'primereact/button';
import { useAuth } from '../hooks/useAuth';

export default function LogoutButton() {
  const { logout } = useAuth();

  return (
    <Button label="Logout" onClick={logout} className="p-button-danger p-mt-2" />
  );
}

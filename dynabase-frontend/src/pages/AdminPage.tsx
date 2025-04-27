import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import LogoutButton from '../components/LogoutButton';
import DarkModeToggle from '../components/DarkModeToggle';

export default function AdminPage() {
  const users = [
    { id: 1, username: 'adminuser', email: 'admin@example.com', role: 'admin' },
    { id: 2, username: 'regularuser', email: 'user@example.com', role: 'user' }
  ];

  return (
    <div className="p-m-4">
      <Card title="Admin Dashboard" className="p-mb-4">
        <p className="p-m-0">
          Welcome, Admin! You can manage your users here.
        </p>
      </Card>

      <Card title="User Management" className="p-mb-4">
        <DataTable value={users} responsiveLayout="scroll">
          <Column field="id" header="ID" />
          <Column field="username" header="Username" />
          <Column field="email" header="Email" />
          <Column field="role" header="Role" />
        </DataTable>
      </Card>

      <div className="p-d-flex p-ai-center p-jc-between p-mt-4">
        <LogoutButton />
        <DarkModeToggle />
      </div>
    </div>
  );
}

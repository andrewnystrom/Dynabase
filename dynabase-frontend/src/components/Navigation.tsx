import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';
import { useNavigate } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';
export default function Navigation() {

  const navigate = useNavigate();
  const itemRenderer = (item: any) => (
    <a className="flex align-items-center p-menuitem-link">
      <span className={item.icon} />
      <span className="mx-2">{item.label}</span>
      {item.badge && <Badge className="ml-auto" value={item.badge} />}
      {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
    </a>
  );
  const items = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      command: () => {
        navigate('/dashboard');
      }
    },

    {
      label: 'Projects',
      icon: 'pi pi-bolt',
      items: [
        {
          label: 'Core',
          icon: 'pi pi-bolt',
          shortcut: '⌘+S',
          template: itemRenderer
        },
        {
          label: 'Blocks',
          icon: 'pi pi-server',
          shortcut: '⌘+B',
          template: itemRenderer
        },
        {
          label: 'Permissions',
          icon: 'pi pi-lock',
          shortcut: '⌘+U',
          template: itemRenderer
        },
        {
          separator: true
        },
        {
          label: 'Templates',
          icon: 'pi pi-palette',
          items: [
            {
              label: 'Apollo',
              icon: 'pi pi-palette',
              badge: 2,
              template: itemRenderer
            },
            {
              label: 'Ultima',
              icon: 'pi pi-palette',
              badge: 3,
              template: itemRenderer
            }
          ]
        }
      ]
    },

    {
      label: 'Features',
      icon: 'pi pi-star'
    },
  ];

  const start = <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2"></img>;
  const end = (
    <div className="flex align-items-center gap-2">
      <InputText placeholder="Search" type="text" className="w-8rem sm:w-auto" />
      <DarkModeToggle />
    </div>
  );

  return (
    <div className="card">
      <Menubar model={items} start={start} end={end} />
    </div>
  )
}
import { Button } from 'primereact/button';
import { useDarkMode } from '../hooks/useDarkMode';

export default function DarkModeToggle() {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <Button
      label={darkMode ? 'Light Mode' : 'Dark Mode'}
      icon={darkMode ? 'pi pi-sun' : 'pi pi-moon'}
      onClick={toggleDarkMode}
      className="p-mt-2"
    />
  );
}

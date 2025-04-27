import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

// PrimeReact core styles
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import 'primeflex/primeflex.css'; // optional if you're using PrimeFlex too
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

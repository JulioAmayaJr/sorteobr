import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSettings,
  cilSpeedometer,
  cilStar,
  cilUser,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  // Sección de Configuración
  {
    component: CNavGroup,
    name: 'Configuración',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Banner',
        to: '/settings/banner',
      },
      {
        component: CNavItem,
        name: 'Sorteo',
        to: '/settings/raffle',
      },
      {
        component: CNavItem,
        name: 'Nosotros',
        to: '/settings/about',
      },
      {
        component: CNavItem,
        name: 'Datos de Contacto',
        to: '/settings/contact',
      },
      {
        component: CNavItem,
        name: 'Nombre y Logo',
        to: '/settings/name',
      },
    ],
  },
  // Sección de Administración de Clientes
  {
    component: CNavGroup,
    name: 'Administración de Clientes',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Clientes',
        to: '/clientes/administracion',
      },
    ],
  },
  // Resto de las secciones existentes

  // Más secciones como 'Forms', 'Charts', 'Icons', etc.
];


export default _nav

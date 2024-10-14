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
        name: 'Términos y Condiciones',
        to: '/configuracion/terminos-condiciones',
      },
      {
        component: CNavItem,
        name: 'Nosotros',
        to: '/configuracion/nosotros',
      },
      {
        component: CNavItem,
        name: 'Preguntas y Respuestas',
        to: '/configuracion/preguntas-respuestas',
      },
      {
        component: CNavItem,
        name: 'Datos de Contacto',
        to: '/configuracion/datos-contacto',
      },
      {
        component: CNavItem,
        name: 'Nombre y Logo',
        to: '/configuracion/nombre-logo',
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

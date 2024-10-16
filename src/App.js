import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'

import { app } from './firebase/data'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'

const auth = getAuth(app)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const App = () => {
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userFirebase) => {
      if (userFirebase) {
        setUser(userFirebase)
      } else {
        setUser(null)
      }
    })

    return () => unsubscribe()
  }, [])

  
  useEffect(() => {
    const logoutTimer = setTimeout(() => {
      if (user) {
        signOut(auth)
          .then(() => {
            alert('Sesión cerrada por inactividad')
          })
          .catch((error) => {
            console.error('Error al cerrar sesión:', error)
          })
      }
    }, 60000) 

    return () => clearTimeout(logoutTimer) 
  }, [user, dispatch])

  const { isColorModeSet, setColorMode } = useColorModes('Sorteos BR')
  const storedTheme = useSelector((state) => state.theme)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
    }

    if (isColorModeSet()) {
      return
    }

    setColorMode(storedTheme)
  }, [isColorModeSet, setColorMode, storedTheme])

  return (
    <BrowserRouter>
      <React.Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>
          <Route exact path="/login" name="Login Page" element={<Login />} />
          <Route exact path="/register" name="Register Page" element={<Register />} />
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} />
          {user && <Route path="*" name="Home" element={<DefaultLayout />} />}
          {!user && <Route path="*" element={<Login />} />}
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  )
}

export default App

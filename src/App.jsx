import { Route, Routes } from 'react-router-dom'
import './App.css'
import { AuthProvider } from './contexts/AuthContext'
import { ProtectedRoute } from './components/ProtectedRouter'
import { Login } from './components/Login'
import { Home } from './components/Home'
import { Register } from './components/Register'
import Reservas from './components/Reservas'

function App() {

  return (
    <div>
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />

          {/* Link a Home */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home></Home>
            </ProtectedRoute>
          }
        />

          {/* Link a Reservas */}
        <Route
          path="/reservas"
          element={
            <ProtectedRoute>
              <Reservas></Reservas>
            </ProtectedRoute>
          }
        />
        
        <Route path="/register" element={<Register />} />
      </Routes>
    </AuthProvider>
  </div>
  )
}

export default App

import { createContext, useContext, useState } from 'react'

import { useRouter } from 'next/router'

const AuthContext = createContext()
const { Provider } = AuthContext

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: ''
  })

  const setUserAuthInfo = ({ data }) => {
    const token = localStorage.setItem("token", data.data)

    setAuthState({token})
  }
}
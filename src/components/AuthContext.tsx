import { createContext, useContext, useState, type ReactNode } from 'react'

const PARTNER_USERNAME = 'guest'
const PARTNER_PASSWORD = 'rsistems2026'

type AuthContextType = {
  isPartner: boolean
  login: (username: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  isPartner: false,
  login: () => false,
  logout: () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isPartner, setIsPartner] = useState(() => {
    return sessionStorage.getItem('partnerLoggedIn') === 'true'
  })

  const login = (username: string, password: string): boolean => {
    if (username.trim() === PARTNER_USERNAME && password === PARTNER_PASSWORD) {
      sessionStorage.setItem('partnerLoggedIn', 'true')
      setIsPartner(true)
      return true
    }
    return false
  }

  const logout = () => {
    sessionStorage.removeItem('partnerLoggedIn')
    setIsPartner(false)
  }

  return (
    <AuthContext.Provider value={{ isPartner, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

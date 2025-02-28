"use client"
import { createContext, useContext } from 'react';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';

interface AuthContextType {
  session: Session | null;
  loading: boolean;
  isProtectedRoute: (path: string) => boolean;
}

const protectedRoutes = ['/blog/new', '/blog/edit'];

const AuthContext = createContext<AuthContextType>({
  session: null,
  loading: true,
  isProtectedRoute: () => false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  const isProtectedRoute = (path: string) => {
    return protectedRoutes.some(route => path.startsWith(route));
  };

  // We still render children while loading to allow for better UX
  return (
    <AuthContext.Provider value={{ session, loading, isProtectedRoute }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

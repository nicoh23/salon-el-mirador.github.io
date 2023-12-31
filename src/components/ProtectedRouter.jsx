import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <h1>Espere por favor...</h1>;

  if (!user) return <Navigate to="/login" />;

  return <>{children}</>;
}

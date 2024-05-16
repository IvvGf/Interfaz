import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";


export default function RequireAuth({ children }) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to={"/"} />;
  }
  return <>{children}</>;
}
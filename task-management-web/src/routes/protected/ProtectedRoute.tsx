import { Navigate } from "react-router-dom";

import { useAppSelector } from "../../app/hooks";
import { selectCurrentAuth } from "../../features/auth/authSlice";

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const auth = useAppSelector(selectCurrentAuth);

  if (!auth.token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
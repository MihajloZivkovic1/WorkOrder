import { useLocation, Navigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
export default function ProtectedRoute({ component: Component, ...rest }) {
  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token;
  };
  const location = useLocation();

  return isAuthenticated() ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

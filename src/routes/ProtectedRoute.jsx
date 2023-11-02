import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = (props) => {
  const auth = localStorage.getItem("authorization");

  if (!auth) return <Navigate to="/login" />;

  return props.children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node,
};

export default ProtectedRoute;

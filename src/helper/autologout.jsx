// import React, { useEffect } from "react";
// import useAutoLogout from "./auth";

// function AutoLogoutComponent() {
//   const handleLogout = () => {
//     localStorage.removeItem("authorization");
//     window.location.href = "/login";
//   };

//   useEffect(() => {
//     const token = localStorage.getItem("authorization");
//     useAutoLogout(token, handleLogout);
//   }, [handleLogout]);

//   return null;
// }

// export default AutoLogoutComponent;

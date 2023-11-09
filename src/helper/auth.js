// import { useEffect } from "react";

// const useAutoLogout = (token, onLogout) => {
//   useEffect(() => {
//     const checkTokenExpiration = () => {
//       if (token) {
//         const tokenData = JSON.parse(atob(token.split(".")[1]));
//         const expirationTime = tokenData.exp * 1000;
//         const currentTime = Date.now();
//         if (currentTime > expirationTime) {
//           onLogout();
//         }
//       }
//     };

//     checkTokenExpiration();

//     const now = new Date();
//     const midnight = new Date(now);
//     midnight.setHours(0, 0, 0, 0);
//     const timeUntilMidnight = midnight - now;
//     setTimeout(() => {
//       onLogout();
//     }, timeUntilMidnight);

//     const interval = setInterval(checkTokenExpiration, 60000);
//     return () => clearInterval(interval);
//   }, [token, onLogout]);
// };

// export default useAutoLogout;

import router from "./routes/router";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";

// import AutoLogoutComponent from "./helper/autologout";

function App() {
  return (
    <div>
      <Provider store={store}>
        {/* <AutoLogoutComponent /> */}
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
}

export default App;

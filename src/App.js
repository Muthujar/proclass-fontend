import React from "react";
import PublicRoute from "./Routespage/PublicRoute";
import { isLoggedIn } from "./Utils/functions";
import PrivateRoute from "./Routespage/PrivateRoute";

function App() {
  return (
    <div>
      {isLoggedIn() ? <PrivateRoute /> : <PublicRoute />}
      {/* <PrivateRoute /> */}
    </div>
  );
}

export default App;

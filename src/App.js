import React from "react";
import Mainpage from "./pages/Mainpage";
import { ContextProvider } from "./data_manager/context";

function App() {
  return (
    <ContextProvider>
      <Mainpage/>
    </ContextProvider>
  );
}

export default App;

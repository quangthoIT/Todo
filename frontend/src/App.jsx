import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster, toast } from "sonner";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Toaster richColors closeButton position="top-right" />
        <Routes>
          <Route />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;

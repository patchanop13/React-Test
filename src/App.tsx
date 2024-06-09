import { BrowserRouter, Route, Routes } from "react-router-dom";

import NotFoundPage from "./pages/not-found";
import LayoutPage from "./pages/layout";
import FormPage from "./pages/form";
import HomePage from "./pages/home";
import LayoutComponent from "./components/Layout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutComponent />}>
          <Route index element={<HomePage />} />
          <Route path="/form" element={<FormPage />} />
          <Route path="/layout" element={<LayoutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

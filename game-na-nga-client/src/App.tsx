import { Route, Routes } from "react-router";

import { HomePage } from "./pages/HomePage/HomePage";
import { SignUpPage } from "./pages/SignUpPage/SignUpPage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import { PrivateRoute } from "./routes/PrivateRoute";

function App() {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<HomePage />} />
      </Route>
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;

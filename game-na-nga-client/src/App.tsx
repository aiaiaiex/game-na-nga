import { Route, Routes } from "react-router";

import { HomePage } from "./pages/HomePage/HomePage";
import { SignUpPage } from "./pages/SignUpPage/SignUpPage";
import { LogInPage } from "./pages/LogInPage/LogInPage";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import { LoggedInOnlyRoute } from "./routes/LoggedInOnlyRoute";

function App() {
  return (
    <Routes>
      <Route element={<LoggedInOnlyRoute />}>
        <Route path="/" element={<HomePage />} />
      </Route>
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={<LogInPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;

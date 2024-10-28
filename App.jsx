import "./App.css"
import { Route, Routes } from "react-router-dom"
import { DashboardPage, LoginPage } from "./pages/pages"
import ProtectedRoutes from "./layout/ProtectedRoutes"
import { ROUTE_URLS } from "./config/routes"

function App() {
  return (
    <>
      <Routes>
        <Route path={ROUTE_URLS.AUTH.LOGIN} element={<LoginPage />} />
        <Route path="/" element={<ProtectedRoutes />}>
          <Route index element={<DashboardPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App

import { lazyImport } from "../utils/react/react_helpers";

export const DashboardPage = lazyImport(() => import("./dashboard/Dashboard"))
export const LoginPage = lazyImport(() => import("./auth/login/Login"))
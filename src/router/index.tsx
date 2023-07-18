import { createBrowserRouter } from "react-router-dom";
import adminRoutes from "./admin";

const router = createBrowserRouter(
  Array.prototype.concat(adminRoutes)
)

export default router
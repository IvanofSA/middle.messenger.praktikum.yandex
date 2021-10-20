import { Router } from "./utils/router/router";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import Chats from "./pages/chats";
import Settings from "./pages/settings";
import Page404 from "./pages/page404";
import Page500 from "./pages/page500";
import "./style.scss";

const router = new Router("#app");
router
  .use("/", SignIn)
  .use("/sign-up", SignUp)
  .use("/settings", Settings)
  .use("/404", Page404)
  .use("/500", Page500)
  .use("/messenger", Chats)
  .start();

export default router;

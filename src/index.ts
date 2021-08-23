import { Router } from "../src/utils/router/router";
import SignIn from "../src/pages/signin";
import SignUp from "../src/pages/signup";
import Chats from "../src/pages/chats";
import Settings from "../src/pages/settings";
import Page404 from "../src/pages/page404";
import Page500 from "../src/pages/page500";

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

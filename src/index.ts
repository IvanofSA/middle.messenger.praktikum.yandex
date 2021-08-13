import { Router } from "../src/utils/router/router";
import SignIn from "../src/pages/signin";
import SignUp from "../src/pages/signup";
import Chats from "../src/pages/chats";
import Settings from "../src/pages/settings";
const router = new Router("#app");
router
  .use("/", SignIn)
  .use("/sign-up", SignUp)
  .use("/settings", Settings)
  .use("/messenger", Chats)
  .start();

export default router;

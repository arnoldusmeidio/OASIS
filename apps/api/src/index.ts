import createApp from "./app";
import { PORT } from "./config";

const main = () => {
   const app = createApp(); // Create and configure the app

   app.listen(PORT, () => {
      console.log(`  ➜  [API] Local: http://localhost:${PORT}/`);
   });
};

main();

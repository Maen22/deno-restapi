import { Application } from "https://deno.land/x/abc@v1.2.4/mod.ts";
import "https://deno.land/x/dotenv/load.ts";
import {
  // getAllContact,
  createContact,
  getOneContact,
  // updateContact,
  // deleteContact,
} from "./controllers/contacts.ts";
import { ErrorMiddleware, LogMiddleware } from "./utils/middlewares.ts";

const app = new Application();
app.use(LogMiddleware).use(ErrorMiddleware);

app
  .post("/contact", createContact)
  // .get("/contacts", getAllContact)
  .get("/contact/:id", getOneContact)
  // .put("/contact/:id", updateContact)
  // .delete("/contact/:id", deleteContact)
  .start({ port: 5000 });
// @ts-ignore
console.log(`server listening on http://localhost:5000`);

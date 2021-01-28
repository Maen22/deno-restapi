import { HandlerFunc, Context } from "https://deno.land/x/abc@v1.2.4/mod.ts";
import db from "./../models/db.ts";
import { ErrorHandler } from "../utils/middlewares.ts";

const database = db.getDatabase;
const contacts = database.collection("contacts");

interface Contact {
  _id: {
    $oid: string;
  };
  name: string;
  age: number;
  email: string;
  address: string;
}

export const createContact: HandlerFunc = async (c: Context) => {
  try {
    if (c.request.headers.get("content-type") !== "application/json") {
      throw new ErrorHandler("Invalid body", 422);
    }
    const body = (await c.body) as Contact;
    if (!Object.keys(body).length) {
      throw new ErrorHandler("Request body can not be empty!", 400);
    }
    const { name, age, email, address } = body;
    const insertedContract = await contacts.insertOne({
      name,
      age,
      email,
      address,
    });
    return c.json(insertedContract, 201);
  } catch (err) {
    throw new ErrorHandler(err.message, err.status | 500);
  }
};

export const getOneContact: HandlerFunc = async (c: Context) => {
  try {
    const { id } = c.params as { id: string };
    const contact = await contacts.findOne({
      _id: { $oid: id },
    });

    if (contact) {
      return c.json(contact);
    }

    throw new ErrorHandler("Contact not found", 404);
  } catch (err) {
    throw new ErrorHandler(err.message, err.status | 500);
  }
};

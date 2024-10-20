import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";

// Load environment variables from the .env file
dotenv.config();

// Initialize the Mailtrap client using the token from environment variables
export const mailtrapClient = new MailtrapClient({
  token: process.env.MAILTRAP_TOKEN,
});

// Define the sender's email and name for outgoing emails
export const sender = {
  email: "hello@demomailtrap.com",
  name: "Mailtrap Test",
};

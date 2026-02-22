//pages/api/webhook/index.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { Paddle, Environment } from "@paddle/paddle-node-sdk";

// IMPORTANT: disable bodyParser so we can access raw body
export const config = {
  api: {
    bodyParser: false,
  },
};

const paddle = new Paddle(process.env.PADDLE_SECRET_TOKEN!, {
   environment: Environment.sandbox,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Get raw body
    const chunks: Buffer[] = [];

    for await (const chunk of req) {
      chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
    }

    const rawBody = Buffer.concat(chunks).toString("utf8");

    const signature = req.headers["paddle-signature"] as string;
    const webhookSecret = process.env.WEBHOOK_SECRET_KEY!;

    if (!signature) {
      return res.status(400).json({ error: "Missing signature header" });
    }

    // Verify & parse webhook
    const event = await paddle.webhooks.unmarshal(
      rawBody,
      webhookSecret,
      signature
    );

    console.log("Webhook event type:", event.eventType);

    switch (event.eventType) {
      case "transaction.completed":
        console.log("Transaction completed:", event.data.id);
        break;

      case "subscription.updated":
        console.log("Subscription updated:", event.data.id);
        break;

      default:
        console.log("Unhandled event:", event.eventType);
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error("Webhook Error:", error);
    return res.status(400).json({ error: "Invalid webhook signature" });
  }
}
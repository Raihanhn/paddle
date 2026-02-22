// pages/api/payment/index.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { Environment, Paddle } from "@paddle/paddle-node-sdk";

const paddle = new Paddle(process.env.PADDLE_SECRET_TOKEN!, {
  environment: Environment.sandbox,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const txn = await paddle.transactions.create({
      items: [
        {
          quantity: 1,
          price: {
            name: "dynamic generated price",
            description: "Dynamically generated description",
            billingCycle:{
                interval:"month",
                frequency:1
            },
            unitPrice: {
              currencyCode: "USD",
              amount: "3000",
            },
            product: {
              name: "dynamic generated price",
              description: "Dynamically generated description",
              taxCategory: "saas",
            },
          },
        },
      ],
    });

    return res.status(200).json({ txn: txn.id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
}
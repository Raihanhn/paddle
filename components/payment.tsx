"use client";

import { initializePaddle, Paddle } from "@paddle/paddle-js";
import React, { useEffect, useState } from "react";

export default function Payment() {
  const [paddle, setPaddle] = useState<Paddle>();

  useEffect(() => {
    initializePaddle({
      environment: "sandbox",
      token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN!,
    }).then((paddle) => setPaddle(paddle));
  }, []);

  const handleCheckout = () => {
    if (!paddle) return alert("Paddle not intialized");

    paddle.Checkout.open({
      items: [{ priceId: "pri_01kj1ywq7y013ccyc0rq8wc831", quantity: 1 }],
      settings: {
        displayMode: "overlay",
        theme: "dark",
        successUrl: "http://localhost:3000/success",
      },
    });
  };

  return (
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded-md"
      onClick={handleCheckout}
    >
      Proceed to Payment
    </button>
  );
}

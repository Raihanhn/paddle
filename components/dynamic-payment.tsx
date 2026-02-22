"use client";

import { initializePaddle, Paddle } from "@paddle/paddle-js";
import React, { useEffect, useState } from "react";

export default function Payments() {
  const [paddle, setPaddle] = useState<Paddle>();

  useEffect(() => {
    initializePaddle({
      environment: "sandbox",
      token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN!,
    }).then((paddle) => setPaddle(paddle));
  }, []);

  const handleCheckout = async () => {
    if (!paddle) return alert("Paddle not intialized");

    const response = await fetch("api/payment");
    const data = await response.json()


    paddle.Checkout.open({
      transactionId: data.txn,
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

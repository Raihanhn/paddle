"use client"

import { initializePaddle, Paddle } from '@paddle/paddle-js'
import React, { useEffect, useState } from 'react'

export default function payment() {
    const [paddle, setPaddle] = useState<Paddle>();

    useEffect(() => {
        initializePaddle({
          environment: 'sandbox',
          token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN!,
        });
    }, [])

  return (
    <div>payment</div>
  )
}

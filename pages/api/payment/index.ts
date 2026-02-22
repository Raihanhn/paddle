import { Environment, Paddle } from '@paddle/paddle-node-sdk'

const paddle = new Paddle(process.env.PADDLE_SECRET_TOKEN!, {
    environment: Environment.sandbox
});

export async function GET(req: Request) {
    const txn = await paddle.transactions.create({
        items: [
            {
                quantity: 1,
                price: {
                    name: "dynamic generated price",
                    description: "Dynamically generated description",
                    unitPrice: {
                        currencyCode: "USD",
                        amount: "3000",
                    },
                    product:{
                        name: "dynamic generated price",
                    description: "Dynamically generated description",
                    taxCategory: "saas" 
                    }
                }
            }
        ]
    })
}
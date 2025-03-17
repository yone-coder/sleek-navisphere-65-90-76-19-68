import { serve } from "https://deno.land/std@0.131.0/http/server.ts";

const MONCASH_API_URL = 'https://sandbox.moncashbutton.digicelgroup.com/Api';

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), { status: 405 });
  }

  const { accessToken, amount } = await req.json();
  const orderId = `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  try {
    const response = await fetch(`${MONCASH_API_URL}/v1/CreatePayment`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: parseFloat(amount), orderId }),
    });

    const data = await response.json();
    if (!response.ok) {
      return new Response(JSON.stringify({ error: data.message || "Payment creation failed" }), { status: response.status });
    }

    if (data.payment_token?.token) {
      const paymentUrl = `https://sandbox.moncashbutton.digicelgroup.com/Moncash-middleware/Payment/Redirect?token=${data.payment_token.token}`;
      return new Response(JSON.stringify({ paymentUrl }), { status: 200 });
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal server error", details: error.message }), { status: 500 });
  }
});

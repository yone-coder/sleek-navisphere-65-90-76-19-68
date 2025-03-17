// Import required modules
import { serve } from "https://deno.land/std@0.131.0/http/server.ts";

// MonCash API details
const MONCASH_API_URL = 'https://sandbox.moncashbutton.digicelgroup.com/Api';

// Function to handle requests
serve(async (req) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), { status: 405 });
  }

  // Get API credentials from environment variables
  const CLIENT_ID = Deno.env.get("CLIENT_ID");
  const CLIENT_SECRET = Deno.env.get("CLIENT_SECRET");

  const auth = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);

  try {
    const response = await fetch(`${MONCASH_API_URL}/oauth/token`, {
      method: "POST",
      headers: {
        "Authorization": `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json",
      },
      body: "grant_type=client_credentials&scope=read,write",
    });

    const data = await response.json();
    if (!response.ok) {
      return new Response(JSON.stringify({ error: data.message || "Failed to get access token" }), { status: response.status });
    }

    return new Response(JSON.stringify({ accessToken: data.access_token }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal server error", details: error.message }), { status: 500 });
  }
});

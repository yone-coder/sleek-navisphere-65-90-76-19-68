
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const twilioAccountSid = Deno.env.get('TWILIO_ACCOUNT_SID')
const twilioAuthToken = Deno.env.get('TWILIO_AUTH_TOKEN')
const twilioPhoneNumber = Deno.env.get('TWILIO_PHONE_NUMBER')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { phoneNumber } = await req.json()
    
    // Generate a 6-digit verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString()
    
    // Set expiration time (15 minutes from now)
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString()

    // Create client with Twilio credentials
    const client = {
      accountSid: twilioAccountSid,
      authToken: twilioAuthToken,
    }

    // Send SMS via Twilio
    const twilioResponse = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${twilioAccountSid}/Messages.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(`${twilioAccountSid}:${twilioAuthToken}`),
        },
        body: new URLSearchParams({
          To: phoneNumber,
          From: twilioPhoneNumber!,
          Body: `Your verification code is: ${verificationCode}`,
        }),
      }
    )

    if (!twilioResponse.ok) {
      throw new Error('Failed to send SMS')
    }

    // Store verification code in database
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    const { error: dbError } = await supabaseClient
      .from('verification_codes')
      .insert({
        code: verificationCode,
        email: phoneNumber, // We're using the email column to store phone numbers too
        expires_at: expiresAt,
      })

    if (dbError) {
      throw new Error('Failed to store verification code')
    }

    console.log(`SMS sent to ${phoneNumber} with code ${verificationCode}`)
    
    return new Response(
      JSON.stringify({ message: 'Verification code sent successfully' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error in send-sms function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})

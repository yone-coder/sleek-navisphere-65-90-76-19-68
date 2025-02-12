
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

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
    
    if (!twilioAccountSid || !twilioAuthToken || !twilioPhoneNumber) {
      throw new Error('Missing Twilio credentials')
    }

    // Ensure phone numbers are in E.164 format
    const formattedRecipientNumber = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`
    const formattedTwilioNumber = twilioPhoneNumber.startsWith('+') ? twilioPhoneNumber : `+${twilioPhoneNumber}`

    // Generate a 6-digit verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString()
    
    // Set expiration time (15 minutes from now)
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString()

    console.log('Attempting to send SMS to:', formattedRecipientNumber)
    console.log('Sending from:', formattedTwilioNumber)

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
          To: formattedRecipientNumber,
          From: formattedTwilioNumber,
          Body: `Your verification code is: ${verificationCode}`,
        }),
      }
    )

    const twilioData = await twilioResponse.json()
    console.log('Twilio API response:', twilioData)

    if (!twilioResponse.ok) {
      throw new Error(`Twilio API error: ${JSON.stringify(twilioData)}`)
    }

    // Store verification code in database
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { error: dbError } = await supabaseClient
      .from('verification_codes')
      .insert({
        code: verificationCode,
        email: phoneNumber, // We're using the email column to store phone numbers too
        expires_at: expiresAt,
      })

    if (dbError) {
      console.error('Database error:', dbError)
      throw new Error('Failed to store verification code')
    }

    console.log(`SMS sent successfully to ${formattedRecipientNumber} with code ${verificationCode}`)
    
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

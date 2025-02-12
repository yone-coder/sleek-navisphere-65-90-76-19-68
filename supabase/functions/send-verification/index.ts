
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { Resend } from "npm:resend@2.0.0"
import twilio from "npm:twilio@4.22.0"

// Initialize services
const resend = new Resend(Deno.env.get('RESEND_API_KEY'));
const twilioClient = twilio(
  Deno.env.get('TWILIO_ACCOUNT_SID') || '',
  Deno.env.get('TWILIO_AUTH_TOKEN') || ''
);

// Define CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function formatPhoneNumber(phoneNumber: string): string {
  // Remove all non-digit characters
  const cleaned = phoneNumber.replace(/\D/g, '');
  
  // If the number doesn't start with '+' or country code, add '+1' (US/Canada)
  if (!phoneNumber.startsWith('+')) {
    // If it's a 10-digit number, add +1
    if (cleaned.length === 10) {
      return `+1${cleaned}`;
    }
    // If it's already 11 digits starting with 1
    if (cleaned.length === 11 && cleaned.startsWith('1')) {
      return `+${cleaned}`;
    }
  }
  
  // If it already has a '+', just clean it and return
  if (phoneNumber.startsWith('+')) {
    return `+${cleaned}`;
  }
  
  throw new Error('Invalid phone number format. Please use a valid international format (e.g., +1XXXXXXXXXX)');
}

serve(async (req) => {
  console.log('Received request:', req.method);
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS request');
    return new Response(null, {
      status: 204,
      headers: corsHeaders
    });
  }

  try {
    if (req.method !== 'POST') {
      throw new Error(`HTTP method ${req.method} is not allowed`);
    }

    const { email, phoneNumber, method } = await req.json();
    console.log('Received payload:', { email, phoneNumber, method });

    if (!email && !phoneNumber) {
      throw new Error('Either email or phone number must be provided');
    }

    // Validate and format phone number if method is phone
    const formattedPhoneNumber = method === 'phone' ? formatPhoneNumber(phoneNumber) : null;
    console.log('Formatted phone number:', formattedPhoneNumber);

    const verificationCode = generateVerificationCode();
    const contactMethod = method === 'email' ? email : formattedPhoneNumber;
    
    console.log(`Generating verification code for ${method}:`, contactMethod);
    console.log('Generated code:', verificationCode);
    
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();
    console.log('Expiration time:', expiresAt);

    // First, invalidate all existing unverified codes
    console.log('Invalidating old codes for:', contactMethod);
    const { error: invalidateError } = await supabaseClient
      .from('verification_codes')
      .update({ verified: true })
      .eq(method === 'email' ? 'email' : 'phone', contactMethod)
      .eq('verified', false);

    if (invalidateError) {
      console.error('Error invalidating old codes:', invalidateError);
      throw invalidateError;
    }

    // Store new verification code
    const insertData = {
      code: verificationCode,
      expires_at: expiresAt,
      verified: false,
      email: method === 'email' ? email : 'placeholder@temp.com', // Always provide an email
      phone: method === 'phone' ? formattedPhoneNumber : null
    };

    console.log('Inserting verification code:', insertData);
    
    const { data, error: dbError } = await supabaseClient
      .from('verification_codes')
      .insert(insertData)
      .select()
      .single();

    if (dbError) {
      console.error('Database insertion error:', dbError);
      throw new Error(`Database error: ${dbError.message}`);
    }

    // Send verification code
    if (method === 'email') {
      const { data: emailData, error: emailError } = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Your Verification Code',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Verification Code</h2>
            <p>Your verification code is:</p>
            <div style="background-color: #f4f4f4; padding: 20px; text-align: center; font-size: 24px; letter-spacing: 5px; margin: 20px 0;">
              <strong>${verificationCode}</strong>
            </div>
            <p>This code will expire in 10 minutes.</p>
            <p>If you didn't request this code, please ignore this email.</p>
          </div>
        `
      });

      if (emailError) {
        console.error('Email sending error:', emailError);
        throw new Error(`Email error: ${emailError.message}`);
      }
      console.log('Email sent successfully:', emailData);
    } else {
      console.log('Sending SMS to:', formattedPhoneNumber);
      const { sid: smsData, error: smsError } = await twilioClient.messages.create({
        body: `Your verification code is: ${verificationCode}. This code will expire in 10 minutes.`,
        to: formattedPhoneNumber!,
        from: Deno.env.get('TWILIO_PHONE_NUMBER') || '',
      });

      if (smsError) {
        console.error('SMS sending error:', smsError);
        throw new Error(`SMS error: ${smsError}`);
      }
      console.log('SMS sent successfully:', smsData);
    }

    return new Response(
      JSON.stringify({ 
        message: 'Verification code sent successfully',
        success: true 
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json'
        },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error in send-verification function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json'
        },
        status: 400
      }
    );
  }
});
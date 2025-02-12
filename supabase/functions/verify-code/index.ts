
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { method, contact, code } = await req.json();
    
    if (!method || !contact || !code) {
      return new Response(
        JSON.stringify({ 
          error: 'Missing required fields: method, contact, and code are required' 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400
        }
      );
    }
    
    console.log(`Verifying code for ${method}:`, contact, 'Code:', code);
    
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Find all verification codes for this contact to debug
    const { data: allCodes } = await supabaseClient
      .from('verification_codes')
      .select('*')
      .eq(method === 'email' ? 'email' : 'phone', contact)
      .order('created_at', { ascending: false });
    
    console.log('All verification codes found for contact:', allCodes);

    // Find the verification code
    const now = new Date().toISOString();
    console.log('Current timestamp:', now);
    
    // First check for exact matches that aren't expired
    const { data: verificationData, error: verificationError } = await supabaseClient
      .from('verification_codes')
      .select('*')
      .eq(method === 'email' ? 'email' : 'phone', contact)
      .eq('code', code)
      .eq('verified', false)
      .gt('expires_at', now)
      .order('created_at', { ascending: false })
      .maybeSingle();

    if (verificationError) {
      console.error('Verification query error:', verificationError);
      return new Response(
        JSON.stringify({ error: 'Database error occurred' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500
        }
      );
    }

    console.log('Verification data found:', verificationData);

    // If no valid code found, check why
    if (!verificationData) {
      // Check if there's an expired code
      const { data: expiredCode } = await supabaseClient
        .from('verification_codes')
        .select('*')
        .eq(method === 'email' ? 'email' : 'phone', contact)
        .eq('code', code)
        .order('created_at', { ascending: false })
        .maybeSingle();

      if (!expiredCode) {
        console.log('No code found at all');
        return new Response(
          JSON.stringify({ 
            error: 'Invalid verification code. Please check and try again.' 
          }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400
          }
        );
      }

      if (expiredCode.verified) {
        console.log('Code already verified:', expiredCode);
        return new Response(
          JSON.stringify({ 
            error: 'This code has already been used. Please request a new one.' 
          }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400
          }
        );
      }

      if (new Date(expiredCode.expires_at) <= new Date(now)) {
        console.log('Code expired:', expiredCode);
        return new Response(
          JSON.stringify({ 
            error: 'Verification code has expired. Please request a new one.' 
          }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400
          }
        );
      }

      console.log('Unexpected state for code:', expiredCode);
      return new Response(
        JSON.stringify({ 
          error: 'Invalid verification code state. Please request a new one.' 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400
        }
      );
    }

    // Return success without marking the code as verified yet
    // It will be marked as verified after successful OTP sign-in
    console.log('Code is valid:', verificationData.id);

    return new Response(
      JSON.stringify({ 
        message: 'Code verified successfully',
        data: verificationData
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error in verify-code function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'An unexpected error occurred during verification' 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});

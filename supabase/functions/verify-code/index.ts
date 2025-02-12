
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

    // Find the verification code
    const now = new Date().toISOString();
    console.log('Current timestamp:', now);
    
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

    if (!verificationData) {
      // Check if there's an expired code
      const { data: expiredCode } = await supabaseClient
        .from('verification_codes')
        .select('*')
        .eq(method === 'email' ? 'email' : 'phone', contact)
        .eq('code', code)
        .eq('verified', false)
        .lte('expires_at', now)
        .maybeSingle();

      if (expiredCode) {
        console.error('Found expired code:', expiredCode);
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

    // Mark the code as verified
    const { error: updateError } = await supabaseClient
      .from('verification_codes')
      .update({ verified: true })
      .eq('id', verificationData.id)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating verification status:', updateError);
      return new Response(
        JSON.stringify({ error: 'Failed to verify code' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500
        }
      );
    }

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

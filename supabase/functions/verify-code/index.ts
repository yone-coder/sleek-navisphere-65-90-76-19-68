
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
    
    console.log(`Verifying code for ${method}:`, contact);
    
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Find the verification code
    const { data: verificationData, error: verificationError } = await supabaseClient
      .from('verification_codes')
      .select()
      .eq(method === 'email' ? 'email' : 'phone', contact)
      .eq('code', code)
      .eq('verified', false)
      .gt('expires_at', new Date().toISOString())
      .maybeSingle();

    if (verificationError) {
      console.error('Verification query error:', verificationError);
      throw new Error(`Database error: ${verificationError.message}`);
    }

    if (!verificationData) {
      console.error('Invalid or expired verification code');
      return new Response(
        JSON.stringify({ 
          error: 'Invalid or expired verification code' 
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
      .eq('id', verificationData.id);

    if (updateError) {
      console.error('Error updating verification status:', updateError);
      throw new Error(`Database error: ${updateError.message}`);
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
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});

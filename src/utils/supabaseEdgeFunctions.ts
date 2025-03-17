
/**
 * Helper to call Supabase Edge Functions
 * 
 * @param functionName The name of the Supabase Edge Function
 * @param payload The payload to send to the function
 * @returns The response from the function
 */
export async function callEdgeFunction<T = any>(functionName: string, payload?: any): Promise<T> {
  // Always use the production URL when deployed
  // Local development should use Supabase CLI for local testing
  const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_REF || 'wkfzhcszhgewkvwukzes';
  const baseUrl = `https://${projectRef}.functions.supabase.co`;
  
  try {
    const response = await fetch(`${baseUrl}/${functionName}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add Authorization header if you're using Supabase Auth
        // 'Authorization': `Bearer ${supabaseClient.auth.session()?.access_token}`,
      },
      body: payload ? JSON.stringify(payload) : undefined,
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Error calling ${functionName}: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error calling ${functionName}:`, error);
    throw error;
  }
}

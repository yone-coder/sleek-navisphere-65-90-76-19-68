
/**
 * Helper to call Supabase Edge Functions
 * 
 * @param functionName The name of the Supabase Edge Function
 * @param payload The payload to send to the function
 * @returns The response from the function
 */
export async function callEdgeFunction<T = any>(functionName: string, payload?: any): Promise<T> {
  // Determine if we're in development or production
  const isDevelopment = import.meta.env.DEV;
  
  // Local testing often uses a different port like 54321
  const devUrl = 'http://localhost:54321/functions/v1';
  
  // Get the project URL from environment variables (if available)
  const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_REF || 'wkfzhcszhgewkvwukzes';
  const prodUrl = `https://${projectRef}.functions.supabase.co`;
  
  const baseUrl = isDevelopment ? devUrl : prodUrl;
  
  const response = await fetch(`${baseUrl}/${functionName}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: payload ? JSON.stringify(payload) : undefined,
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || `Error calling ${functionName}`);
  }
  
  return data;
}

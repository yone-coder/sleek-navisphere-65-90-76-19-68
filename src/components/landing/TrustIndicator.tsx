
import React from 'react';
import { Shield } from 'lucide-react';

export function TrustIndicator() {
  return (
    <div className="fixed bottom-24 left-4 bg-white p-3 rounded-lg shadow-lg flex items-center text-sm">
      <Shield className="text-green-600 mr-2 h-5 w-5" />
      <span>Secure Payments</span>
    </div>
  );
}


import React from 'react';
import MonCashTest from '@/components/payment/MonCashTest';

const MonCashTestPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-center mb-8">MonCash API Test</h1>
        <MonCashTest />
      </div>
    </div>
  );
};

export default MonCashTestPage;

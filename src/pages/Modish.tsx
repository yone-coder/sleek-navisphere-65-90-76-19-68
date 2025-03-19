
import React from 'react';
import { ModishHeader } from '@/components/modish/ModishHeader';
import { ModishProductDetails } from '@/components/modish/ModishProductDetails';
import { useParams } from 'react-router-dom';

const Modish = () => {
  const { id } = useParams();
  
  // Default to product ID 1 if none is provided
  const productId = id || '1';

  return (
    <div className="min-h-screen bg-white">
      <ModishHeader />
      <ModishProductDetails productId={productId} />
    </div>
  );
};

export default Modish;

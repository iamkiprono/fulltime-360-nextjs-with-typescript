// SkeletonLoader.js

import React from 'react';
import Skeleton from 'react-loading-skeleton';

const SkeletonLoader = () => {
  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* Heading Skeleton */}
      <h1 className="bg-gray-400 text-4xl font-bold mb-4">
        <Skeleton height={30} width={300} />
      </h1>

      {/* Content Area Skeleton */}
      <div className="mb-8">
        <Skeleton height={200} />
      </div>

      {/* Call to Action Skeletons */}
      <div className="flex justify-between">
        <div className="w-1/3 mr-2">
          <Skeleton height={50} />
        </div>
        <div className="w-1/3 mx-2">
          <Skeleton height={50} />
        </div>
        <div className="w-1/3 ml-2">
          <Skeleton height={50} />
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;

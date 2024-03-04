// SuccessCard.jsx
import React from 'react';

const SuccessCard = ({ message }) => {
  return (
    <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4">
      <div className="flex">
        <div className="py-1">
          <svg
            className="h-6 w-6 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="ml-2">
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default SuccessCard;


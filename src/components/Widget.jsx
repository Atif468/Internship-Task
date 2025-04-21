import React from 'react';

function Widget({ widget, handleRemoveWidget, categoryName }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all duration-200">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-800">{widget.name}</h3>
        <button
          onClick={() => handleRemoveWidget(categoryName, widget.id)}
          className="text-gray-400 hover:text-red-500 transition-colors duration-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <p className="text-gray-600 text-sm">{widget.text}</p>
    </div>
  );
}

export default Widget;

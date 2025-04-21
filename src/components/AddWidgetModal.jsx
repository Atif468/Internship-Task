import React, { useState } from 'react';

function AddWidgetModal({ handleAddWidget, setShowModal }) {
  const [widgetName, setWidgetName] = useState('');
  const [widgetText, setWidgetText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!widgetName.trim() || !widgetText.trim()) {
      setError('Both widget name and text are required');
      return;
    }
    handleAddWidget(widgetName, widgetText);
    setShowModal(false);
  };

  return (
    <div className="fixed inset-0 backdrop-blur-lg bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Add New Widget</h2>
          <button
            onClick={() => setShowModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-600 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Widget Name
            </label>
            <input
              type="text"
              value={widgetName}
              onChange={(e) => setWidgetName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter widget name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Widget Text
            </label>
            <textarea
              value={widgetText}
              onChange={(e) => setWidgetText(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
              placeholder="Enter widget content"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
            >
              Add Widget
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddWidgetModal;

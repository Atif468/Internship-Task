import React, { useState } from 'react';

function Sidebar({ categories, setCategories, setShowSidebar }) {
  const [activeTab, setActiveTab] = useState('CSPM');

  const tabs = ['CSPM', 'CWPP', 'Image', 'Ticket'];

  const handleWidgetToggle = (categoryName, widgetId) => {
    const updatedCategories = categories.map(category => {
      if (category.name === categoryName) {
        const updatedWidgets = category.widgets.map(widget => {
          if (widget.id === widgetId) {
            return { ...widget, isEnabled: !widget.isEnabled };
          }
          return widget;
        });
        return { ...category, widgets: updatedWidgets };
      }
      return category;
    });
    setCategories(updatedCategories); // This will trigger an immediate re-render
  };

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add Widget</h2>
          <button
            onClick={() => setShowSidebar(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex space-x-4 mb-6 border-b">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 ${
                activeTab === tab
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {categories.map(category => (
            <div key={category.name} className="space-y-2">
              <h3 className="font-medium text-gray-700">{category.name}</h3>
              {category.widgets.map(widget => (
                <label key={widget.id} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded">
                  <input
                    type="checkbox"
                    checked={widget.isEnabled !== false}
                    onChange={() => handleWidgetToggle(category.name, widget.id)}
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{widget.name}</span>
                </label>
              ))}
            </div>
          ))}
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={() => setShowSidebar(false)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={() => setShowSidebar(false)}
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

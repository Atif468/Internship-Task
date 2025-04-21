import React from 'react';
import Widget from './Widget';

function Category({ category, handleRemoveWidget, setCurrentCategory, setShowModal }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">{category.name}</h2>
      <button
        onClick={() => {
          setCurrentCategory(category.name);
          setShowModal(true);
        }}
        className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mb-6"
      >
        <svg className="w-5 h-5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
        </svg>
        Add Widget
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.widgets.map((widget) => (
          <Widget key={widget.id} widget={widget} handleRemoveWidget={handleRemoveWidget} categoryName={category.name} />
        ))}
      </div>
    </div>
  );
}

export default Category;

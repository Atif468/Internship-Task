import React, { useState } from 'react';
import Category from './Category';
import AddWidgetModal from './AddWidgetModal';
import categoriesData from '../data/categories.json';
import Sidebar from './Sidebar';

function Dashboard() {
  const [categories, setCategories] = useState(categoriesData.categories);
  const [showModal, setShowModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSidebar, setShowSidebar] = useState(false);

  const handleAddWidget = (widgetName, widgetText, type = 'default') => {
    const updatedCategories = categories.map((category) => {
      if (category.name === currentCategory) {
        const newWidget = {
          id: Date.now().toString(),
          name: widgetName,
          text: widgetText,
          type: type
        };
        category.widgets = [...category.widgets, newWidget];
      }
      return category;
    });
    setCategories(updatedCategories);
    setShowModal(false);
  };

  const handleRemoveWidget = (categoryName, widgetId) => {
    const updatedCategories = categories.map((category) => {
      if (category.name === categoryName) {
        category.widgets = category.widgets.filter((widget) => widget.id !== widgetId);
      }
      return category;
    });
    setCategories(updatedCategories);
  };

  const filteredWidgets = categories
    .flatMap((category) => 
      category.widgets
        .filter(widget => widget.isEnabled !== false) // Only show enabled widgets
        .map(widget => ({
          ...widget,
          categoryName: category.name
        }))
    )
    .filter((widget) => 
      widget.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">CNAPP Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="w-64">
              <input
                type="text"
                placeholder="Search widgets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={() => setShowSidebar(true)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
            </button>
          </div>
        </div>

        {searchQuery && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Search Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWidgets.map((widget) => (
                <div key={widget.id} className="bg-white rounded-lg shadow p-4">
                  <h3 className="font-semibold">{widget.name}</h3>
                  <p className="text-sm text-gray-600">{widget.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-6">
          {categories.map((category) => (
            <Category
              key={category.name}
              category={{
                ...category,
                widgets: category.widgets.filter(w => w.isEnabled !== false) // Only pass enabled widgets
              }}
              handleRemoveWidget={handleRemoveWidget}
              setCurrentCategory={setCurrentCategory}
              setShowModal={setShowModal}
            />
          ))}
        </div>

        {showModal && (
          <AddWidgetModal
            handleAddWidget={handleAddWidget}
            setShowModal={setShowModal}
          />
        )}

        {showSidebar && (
          <Sidebar 
            categories={categories}
            setCategories={setCategories}
            setShowSidebar={setShowSidebar}
          />
        )}
      </div>
    </div>
  );
}

export default Dashboard;

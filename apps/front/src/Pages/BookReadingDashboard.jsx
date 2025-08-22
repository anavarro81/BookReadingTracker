import React, { useState, useEffect } from "react";
import { FaBook, FaUniversity, FaBookmark, FaHandshake, FaChartBar, FaQuoteRight, FaChevronDown, FaChevronUp, FaEllipsisV } from "react-icons/fa";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const BookReadingDashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isReadingSectionCollapsed, setIsReadingSectionCollapsed] = useState(false);

  const categories = [
    { id: "all", label: "All", icon: FaBook, count: 145, color: "bg-blue-500" },
    { id: "library", label: "Library", icon: FaUniversity, count: 87, color: "bg-green-500" },
    { id: "wishlist", label: "Wishlist", icon: FaBookmark, count: 34, color: "bg-yellow-500" },
    { id: "borrowed", label: "Borrowed", icon: FaHandshake, count: 12, color: "bg-purple-500" },
    { id: "statistics", label: "Statistics", icon: FaChartBar, count: 0, color: "bg-red-500" },
    { id: "quotes", label: "Quotes", icon: FaQuoteRight, count: 56, color: "bg-indigo-500" }
  ];

  const currentlyReading = {
    title: "The Design of Everyday Things",
    author: "Don Norman",
    currentPage: 156,
    totalPages: 347,
    coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c",
    progress: 45
  };

  const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Pages Read",
        data: [23, 45, 32, 67, 89, 43, 56],
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 ${
                  selectedCategory === category.id ? "ring-2 ring-blue-500" : "bg-white"
                }`}
              >
                <div className="flex flex-col items-center space-y-2">
                  <div className={`p-3 rounded-full ${category.color}`}>
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-semibold text-gray-700">{category.label}</span>
                  <span className="text-sm px-2 py-1 bg-gray-100 rounded-full">{category.count}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">Currently Reading</h2>
              <button
                onClick={() => setIsReadingSectionCollapsed(!isReadingSectionCollapsed)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                {isReadingSectionCollapsed ? <FaChevronDown /> : <FaChevronUp />}
              </button>
            </div>

            {!isReadingSectionCollapsed && (
              <div className="flex space-x-4">
                <img
                  src={currentlyReading.coverImage}
                  alt={currentlyReading.title}
                  className="w-24 h-36 object-cover rounded-lg shadow"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">{currentlyReading.title}</h3>
                      <p className="text-gray-600">{currentlyReading.author}</p>
                    </div>
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                      <FaEllipsisV className="text-gray-500" />
                    </button>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Progress</span>
                      <span>{currentlyReading.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${currentlyReading.progress}%` }}
                      ></div>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">
                      {currentlyReading.currentPage} of {currentlyReading.totalPages} pages
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Reading Statistics</h2>
          <Line data={chartData} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
};

export default BookReadingDashboard;

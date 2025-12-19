import React from "react";
import { useFindSportQuery } from "../../redux/api/departmentApi";

const PhotoClasses = () => {
  const { data } = useFindSportQuery();

  // ✅ Only Display Card (No Update/Delete)
  const Card = ({ item }) => (
    <div className="bg-gradient-to-br from-white to-emerald-50 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-transform duration-300">
      {/* Image Section */}
      <div className="relative">
        <img
          src={item.image[0]}
          alt={item.name}
          className="w-full h-56 object-cover"
        />
        <span className="absolute top-3 right-3 bg-emerald-600 text-white text-xs px-3 py-1 rounded-full shadow">
          {item.category}
        </span>
      </div>

      {/* Content Section */}
      <div className="p-5 space-y-3">
        <h2 className="text-2xl font-extrabold text-gray-800">{item.name}</h2>
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-gray-700">Head:</span> {item.head}
        </p>
        <p className="text-gray-700 text-sm line-clamp-3">{item.desc}</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-emerald-700">
        📚 Classes
      </h1>

      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {data?.clasess?.map((item) => (
          <Card key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default PhotoClasses;

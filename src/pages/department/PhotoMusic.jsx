import React from "react";
import { useFindSportQuery } from "../../redux/api/departmentApi";

const PhotoMusic = () => {
    const { data } = useFindSportQuery();

    const Card = ({ item }) => (
        <div className="group relative bg-gradient-to-br from-purple-50 to-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden">
            {/* Image Section */}
            <div className="relative">
                <img
                    src={item.image[0]}
                    alt={item.name}
                    className="w-full h-56 object-cover rounded-t-2xl group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition"></div>
                <span className="absolute bottom-3 left-3 bg-white/90 text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                    {item.category}
                </span>
            </div>

            {/* Content Section */}
            <div className="p-5 space-y-3">
                <h2 className="text-xl font-bold text-gray-800 group-hover:text-purple-700 transition">
                    {item.name}
                </h2>
                <p className="text-sm text-gray-500 line-clamp-2">{item.desc}</p>
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">
                        Head: <span className="font-semibold text-gray-800">{item.head}</span>
                    </span>
                    <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                        #{item.category}
                    </span>
                </div>
            </div>
        </div>
    );

    return (
        <div className="px-4 py-10 max-w-7xl mx-auto">
            {/* Classical Section */}
            <div className="mb-16">
                <h1 className="text-4xl font-bold text-center mb-10 text-purple-800">
                    Classical
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {data?.classical?.map((item) => (
                        <Card key={item._id} item={item} />
                    ))}
                </div>
            </div>

            {/* Western Section */}
            <div>
                <h1 className="text-4xl font-bold text-center mb-10 text-purple-800">
                    Western
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {data?.western?.map((item) => (
                        <Card key={item._id} item={item} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PhotoMusic;

import React from "react";
import { useFindSportQuery } from "../../redux/api/departmentApi";

const PhotoNcc = () => {
    const { data } = useFindSportQuery();

    return (
        <div className="p-6">
            <h1 className="text-5xl font-extrabold text-center mb-10 text-indigo-600">
                NCC
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {data?.ncc?.map((item) => (
                    <div
                        key={item._id}
                        className="group rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-indigo-100 to-white hover:shadow-2xl hover:-translate-y-2 transform transition duration-500"
                    >
                        {/* Image */}
                        <div className="overflow-hidden">
                            <img
                                src={item.image[0]}
                                alt={item.name}
                                className="w-full h-56 object-cover transform group-hover:scale-110 transition duration-500"
                            />
                        </div>

                        {/* Content */}
                        <div className="p-5">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                {item.name}
                            </h2>
                            <p className="text-sm text-gray-600 mb-1">
                                <strong>Head:</strong> {item.head}
                            </p>
                            <p className="text-sm text-gray-600 mb-1 line-clamp-2">
                                <strong>Description:</strong> {item.desc}
                            </p>
                            <p className="text-sm text-gray-600">
                                <strong>Category:</strong> {item.category}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PhotoNcc;

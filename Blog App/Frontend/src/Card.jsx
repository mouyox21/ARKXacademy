import React from "react";

export default function Card({ title, content, onDelete, onEdit }) {

    const handleDeleteClick = () => {
    onDelete();
};
    const handleEditClick = () => {
    onEdit();
};

return (
    <div className="flex flex-col bg-white border shadow-sm rounded-xl p-4 md:p-5 dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
    <h3 className="text-lg font-bold text-gray-800 dark:text-white">
        {title}
    </h3>
    <p className="mt-1 text-xs font-medium uppercase text-gray-500 dark:text-gray-500">
        Blog App
    </p>
    <p className="mt-2 text-gray-500 dark:text-gray-400 line-clamp-3">{content}</p>
    <div className="flex justify-around items-end  ">

    <button 
        onClick={handleEditClick} className="inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-yellow-600 hover:text-yellow-800 dark:text-yellow-500 dark:hover:text-yellow-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
            Edit  
    </button>


    <button
        onClick={handleDeleteClick}
        className="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-red-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
            Delete
    </button>
            </div>
    </div>
);
}

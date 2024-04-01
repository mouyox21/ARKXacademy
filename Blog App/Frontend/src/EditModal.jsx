import React, { useState } from "react";

export default function EditModal({
  onSave,
  onCancel,
  title: initialTitle,
  content: initialcontent,
}) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setcontent] = useState(initialcontent);

  const handleSave = () => {
    onSave(title, content);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-6 rounded-lg z-10">
        <h2 className="text-xl font-semibold mb-4">Post</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 mb-2 px-3 py-2 rounded-md w-full"
          placeholder="Title"
        />
        <textarea
          value={content}
          onChange={(e) => setcontent(e.target.value)}
          className="border border-gray-300 mb-4 px-3 py-2 rounded-md w-full resize-none"
          rows="4"
          placeholder="content"
        ></textarea>
        <div className="flex justify-end">
          <button
            onClick={onCancel}
            className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

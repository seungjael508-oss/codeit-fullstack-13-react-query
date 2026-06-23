export default function Modal({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-xs w-full mx-4 text-center shadow-lg">
        <p className="text-gray-800 mb-5">{message}</p>
        <button
          onClick={onClose}
          className="px-8 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium"
        >
          확인
        </button>
      </div>
    </div>
  );
}

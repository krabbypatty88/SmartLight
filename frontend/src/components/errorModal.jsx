const ErrorModal = ({errorMessage, onConfirm}) => {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onConfirm}
    >
      <div
        className="relative w-[400px] rounded-2xl bg-red-200 p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onConfirm}
          className="absolute top-3 right-3 text-white text-xl font-bold hover:opacity-80"
          aria-label="Close error modal"
        >
          X
        </button>

        <h1 className="text-white text-xl font-semibold mb-3">
          Error
        </h1>

        <div className="text-white text-sm leading-relaxed">
          {errorMessage}
        </div>
      </div>
    </div>
  )
}

export default ErrorModal;
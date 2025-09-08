import React from 'react'

export default function DeleteBookModal({ onClose, onConfirm, bookToDelete }) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center" aria-hidden="false">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 transition-opacity" />

      {/* Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-desc"
        className="relative z-50 mx-4 w-full max-w-md bg-white p-6 rounded-lg shadow-lg transform transition-all"
      >
        <header className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
            {/* Icon: trash / warning (presentational) */}
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3" />
            </svg>
          </div>

          <div className="min-w-0 flex-1">
            <h2 id="delete-modal-title" className="text-lg font-semibold text-gray-900">Eliminar libro</h2>
            <p id="delete-modal-desc" className="mt-1 text-sm text-gray-600">¿Estás seguro que quieres eliminar este libro? Esta acción no se puede deshacer.</p>
            {bookToDelete.bookTitle && <p className="mt-2 text-sm text-gray-500">Libro: <span className="font-medium">{bookToDelete.bookTitle}</span></p>}
          </div>
        </header>

        <footer className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            className="px-4 py-2 rounded bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
            onClick={onClose}
          >
            Cancelar
          </button>

          <button
            type="button"
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400"
            onClick={() => onConfirm(bookToDelete.id)}
          >
            Aceptar
          </button>
        </footer>
      </div>
    </div>
  )
}

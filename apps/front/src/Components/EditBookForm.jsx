import React from 'react'

const EditBookForm = ({book}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="max-w-xl w-full mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4 text-center">Editar libro</h2>

        <form className="grid grid-cols-1 gap-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">Título</label>
            <input
              id="title"
              name="title"
              type="text"
              defaultValue={book.title || ''}
              className="w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-200"
            />
          </div>

          <div>
            <label htmlFor="author" className="block text-sm font-medium mb-1">Autor</label>
            <input
              id="author"
              name="author"
              type="text"
              defaultValue={book.author || ''}
              className="w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-200"
            />
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium mb-1">Estado</label>
            <select
              id="status"
              name="status"
              defaultValue={book.status || 'Pending'}
              className="w-full border border-gray-200 rounded px-3 py-2 bg-white"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="currentPage" className="block text-sm font-medium mb-1">Página actual</label>
              <input
                id="currentPage"
                name="currentPage"
                type="number"
                defaultValue={book.currentPage ?? ''}
                min="0"
                className="w-full border border-gray-200 rounded px-3 py-2"
              />
            </div>

            <div>
              <label htmlFor="totalPages" className="block text-sm font-medium mb-1">Páginas totales</label>
              <input
                id="totalPages"
                name="totalPages"
                type="number"
                defaultValue={book.totalPages ?? ''}
                min="1"
                className="w-full border border-gray-200 rounded px-3 py-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="startReading" className="block text-sm font-medium mb-1">Fecha de inicio</label>
              <input
                id="startReading"
                name="startReading"
                type="date"
                defaultValue={book.startReading ? new Date(book.startReading).toISOString().slice(0,10) : ''}
                className="w-full border border-gray-200 rounded px-3 py-2"
              />
            </div>

            <div>
              <label htmlFor="endReading" className="block text-sm font-medium mb-1">Fecha de fin</label>
              <input
                id="endReading"
                name="endReading"
                type="date"
                defaultValue={book.endReading ? new Date(book.endReading).toISOString().slice(0,10) : ''}
                className="w-full border border-gray-200 rounded px-3 py-2"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button"  className="px-4 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200">
              Cancelar
            </button>
            <button type="submit"  className="px-4 py-2 rounded bg-brand-500 text-white hover:bg-brand-600">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditBookForm

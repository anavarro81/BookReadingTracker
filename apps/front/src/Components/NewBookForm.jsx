

const NewBookForm = ({ onClose, onSubmit }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4 text-center">Agregar libro</h2>

      <form className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">Título</label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Título del libro"
            className="w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-200"
          />
        </div>

        <div>
          <label htmlFor="author" className="block text-sm font-medium mb-1">Autor</label>
          <input
            id="author"
            name="author"
            type="text"
            placeholder="Nombre del autor"
            className="w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-200"
          />
        </div>

        <div>
          <label htmlFor="totalPages" className="block text-sm font-medium mb-1">Páginas totales</label>
          <input
            id="totalPages"
            name="totalPages"
            type="number"
            min="1"
            placeholder="200"
            className="w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-200"
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200">
            Cancelar
          </button>
          <button type="submit" onClick={onSubmit} className="px-4 py-2 rounded bg-brand-500 text-white hover:bg-brand-600">
            Guardar
          </button>
        </div>
      </form>
    </div>
    </div>
  )
}

export default NewBookForm

import {useState} from 'react'
import {validateFields} from '../util/validator'
import {axiosInstance} from '../util/axios'



const EditBookForm = ({book, onClose, onSave}) => {

  const [errors, setErrors] = useState({})
  const [fields, setFields] = useState({})

  const handleChangeField = (e) => {  
    const {name, value } = e.target
    setFields(prev => ({...prev, [name]: value}))
  }

  const handleSave = async (e) => {

    e.preventDefault()    
    const result = validateFields(fields)

    console.log ('book ', book)

    console.log('result ', result)
    
    // Si no tiene propiedades, no hay ningun error
    if (Object.keys(result).length > 0) {
      setErrors(result)
    }else {
      // llamar al back para actualizar


      
      try {
        const res = await axiosInstance.put(`/book/${book.id}`, fields)  
        console.log ('libro actualizado ', res)
        onSave(res.data.updatedBook) 
        onClose()       
      } catch (error) {
        console.error('error al actualizar el libro: ', error)
      }
      

      

    }
      

    

  }

  

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
              onChange={handleChangeField}
            />
            {errors.title && <span className="text-red-500 text-sm"> {errors['title']} </span>}
          </div>

          <div>
            <label htmlFor="author" className="block text-sm font-medium mb-1">Autor</label>
            <input
              id="author"
              name="author"
              type="text"
              defaultValue={book.author || ''}
              className="w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-200"
              onChange={handleChangeField}
            />
            {errors.author && <span className="text-red-500 text-sm"> {errors['author']} </span>}
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium mb-1">Estado</label>
            <select
              id="status"
              name="status"
              defaultValue={book.status || 'Pending'}
              className="w-full border border-gray-200 rounded px-3 py-2 bg-white"
              onChange={handleChangeField}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            {errors.status && <span className="text-red-500 text-sm"> {errors['status']} </span>}
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
                onChange={handleChangeField}
              />
              {errors.currentPage && <span className="text-red-500 text-sm"> {errors['currentPage']} </span>}
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
                onChange={handleChangeField}
              />
              {errors.totalPages && <span className="text-red-500 text-sm"> {errors['totalPages']} </span>}
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
                onChange={handleChangeField}
              />
              {errors.startReading && <span className="text-red-500 text-sm"> {errors['startReading']} </span>}
            </div>

            <div>
              <label htmlFor="endReading" className="block text-sm font-medium mb-1">Fecha de fin</label>
              <input
                id="endReading"
                name="endReading"
                type="date"
                defaultValue={book.endReading ? new Date(book.endReading).toISOString().slice(0,10) : ''}
                className="w-full border border-gray-200 rounded px-3 py-2"
                onChange={handleChangeField}
              />
              {errors.endReading && <span className="text-red-500 text-sm"> {errors['endReading']} </span>}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button"  className="px-4 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button type="submit"  className="px-4 py-2 rounded bg-brand-500 text-white hover:bg-brand-600"
              onClick={handleSave}
            >
              Guardar              
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditBookForm

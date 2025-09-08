import { useState } from "react"
import { axiosInstance } from "../util/axios"

const NewBookForm = ({ onClose, onSave }) => {


  const [newBook, setNewBook] = useState({
    title: "", 
    author: "",
    totalPages: 0
  })

  const [errors, setErrors] = useState({})

  const handleSubmit = async (e) => {
    
    e.preventDefault()

    setErrors({})

    if(newBook.title.trim().length === 0) {
      setErrors(prev => ({...prev, title: 'El titulo no puede estar vacio'}))
    } else if(newBook.title.length < 3) {       
      setErrors(prev => ({...prev, title: 'El titulo tiene que tener al menes tres caracteres'}))
    }  
     

    if(newBook.author.length < 3) {
      setErrors(prev => ({...prev, author: 'El titulo tiene que tener al menes tres caracteres'}))

    }  else if (newBook.author.trim().length === 0) {    
      setErrors(prev => ({...prev, author: 'El autor no puede estar vacio'}))
    }    

    if (newBook.totalPages <= 0) {
      setErrors(prev => ({...prev, totalPages: 'El numero total de páginas tiene que ser mayor que cero'}))
      
    }    



    if (Object.keys(errors).length === 0) {     

      try {        
        const res = await axiosInstance.post('/book/', newBook)
        if (res.status === 201) {
          console.log('Libro dado de alta correctamente')
          console.log('new book ', res.data.book)
          onSave(res.data.book)
          onClose()
        }
      } catch (error) {
        console.log('Error en el alta del libro: ', error) 
      }        

    }


  }

  const handleChangeData = (e) => {  
    const {name, value} = e.target
    setNewBook(prev => ({...prev, [name]: name === 'totalPages' ? parseInt(value, 10) : value}))
  
  }


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
    <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
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
            onChange={handleChangeData}
          />
           { errors.title && <span className="text-red-500 text-sm"> {errors["title"]} </span> } 
        </div>

        <div>
          <label htmlFor="author" className="block text-sm font-medium mb-1">Autor</label>
          <input
            id="author"
            name="author"
            type="text"
            placeholder="Nombre del autor"
            onChange={handleChangeData}
            className="w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-200"
          />
           { errors.author && <span className="text-red-500 text-sm"> {errors["author"]} </span> } 
          
        </div>

        <div>
          <label htmlFor="totalPages" className="block text-sm font-medium mb-1">Páginas totales</label>
          <input
            id="totalPages"
            name="totalPages"
            type="number"
            min="1"
            placeholder="200"
            onChange={handleChangeData}
            className="w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-200"
          />
          { errors.totalPages && <span className="text-red-500 text-sm"> {errors["totalPages"]} </span> }
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200">
            Cancelar
          </button>
          <button type="submit" onClick={handleSubmit} className="px-4 py-2 rounded bg-brand-500 text-white hover:bg-brand-600">
            Guardar
          </button>
        </div>
      </form>
    </div>
    </div>
  )
}

export default NewBookForm

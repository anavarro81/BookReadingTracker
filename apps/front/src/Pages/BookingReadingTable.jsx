import React, { useState, useEffect } from "react";
import { FiBook, FiSearch, FiFilter, FiX, FiPlus, FiRefreshCw, FiEdit, FiTrash2 } from "react-icons/fi";
import { format } from "date-fns";
import ProgressModal from "../Components/ProgressModal";
import NewBookForm from "../Components/NewBookForm"
import DeleteBookModal from "../Components/DeleteBookModal"
import EditBookForm from "../Components/EditBookForm"
import {axiosInstance} from '../util/axios'
const BookingReadingTable = () => {

  


  const [books, setBoooks] = useState([])
  
  const [searchText, setSearchText] = useState("")
  const [typeFilter, setTypeFilter] = useState("All")
  const [sortBy, setSortedBy] = useState("title")
  const [showSetProgressModal, setshowSetProgressModal] = useState(false)
  const [editedBook, setEditedBook] = useState({})
  const [bookToDelete, setBookToDelete] = useState({})
  

  const [modalStatus, setModalStatus] = useState(
    {
      open:false, 
      currentPage:null, 
      totalPages:null, 
      bookId:null 
    }
  )

  const [newBookModalStatus, setNewBookModalStatus] = useState({
    open: false
  })

  const [editBookFormStatus, setEditBookFormStatus] = useState({
    open: false
  })

  const [deleteModalStatus, setDeleteModalStatus] = useState({
    open:false 
  })

  const status = {
    "Completed": "bg-green-500 p-2 rounded-full text-white",
    "In Progress": "bg-yellow-500 p-2 rounded-full text-white", 
    "Pending": "bg-red-500 p-2 rounded-full text-white"
  }

  const getBooks = async () => {
    const {data} = await axiosInstance.get('/book/')
    console.log('books ', data.books)
    setBoooks(data.books)
  }

  const handleUpdateBookInList = (updatedBook) => {  

    setBoooks(prev => prev.map(b => b._id === updatedBook._id ? updatedBook : b))

  }



  const handleEditBook = (book) => {

    console.log('handleEditBook ', book)

    setEditedBook({
      id:    book._id,
      title: book.title,
     author: book.author,
     status: book.status,
    currentPage: book.currentPage,
    totalPages: book.totalPages,
    startReading: book.startReading,
    endReading: book.startReading,
  })

    setEditBookFormStatus(prev => ({...prev, open: true}))

  }

  useEffect(() => {
    getBooks()
  
  }, [])
  

  const handleShowNewBookForm = () => {
    setNewBookModalStatus(prev => ({ ...prev, open: true }));
  }

  const handleFilterBook = (e) => {
    setSearchText(e.target.value)
  }

  const handleSetProgressStatus = (book) => {

    

    setModalStatus({open: true, currentPage: book.currentPage, totalPages: book.totalPages,  bookId: book._id})
  }

  const handleDeleteBook = async (id, title) => {
    console.log('deleteBook id ', id)
    console.log('deleteBook title ', title)     
    
    setBookToDelete({id: id, bookTitle: title})
    setDeleteModalStatus(prev => ({...prev, open:true}))
  }

  const deleteBookById = async (id) => {

    console.log('deleteBookById id ', id)

    try {
      const res = await axiosInstance.delete(`/book/${id}`)
      
      if (res.status === 200) {
        console.log ('Libro borrado con exito')
        setBoooks(books.filter(book => book._id !== id))
        setDeleteModalStatus(prev => ({...prev, open:false}))
      }

    } catch (error) {
      console.error ('Error al borrar el libro ', error)
    }


  }

  const filteredBooks = books
  .filter(book => book.title.toLowerCase().includes(searchText.toLowerCase()))
  .filter(book => typeFilter === "All" || book.status == typeFilter)
  .sort((a, b) => a.title.localeCompare(b.title))
  


  return (

    

    <div className="bg-gray-100 min-h-screen px-4 py-8"> 
      <div className="container mx-auto "> 
         
        {modalStatus.open && 
          <ProgressModal 
            open={modalStatus.open}
            modalStatus={modalStatus}  
            onClose={() => setModalStatus(prev => ({...prev, open: false}))}
            onSave={handleUpdateBookInList}
        />}

        {newBookModalStatus.open &&
        <NewBookForm
          onClose={prev => setNewBookModalStatus({...prev, open:false})}
        />

        }

        {editBookFormStatus.open &&
          <EditBookForm
            book={editedBook}
            onClose={() => setEditBookFormStatus(prev => ({...prev, open: false}))}
            onSave={handleUpdateBookInList}
          />
        }

        {deleteModalStatus.open &&
          <DeleteBookModal
            onClose={() => setDeleteModalStatus(prev => ({...prev, open: false}))}
            onConfirm={deleteBookById}
            bookToDelete={bookToDelete}
          />
        }


            
          

        <div className="flex bg-white rounded-lg justify-between px-4 py-2 mb-6 gap-4">        
          <div className="flex-1"> 
            <input type="text" 
              className="border rounded-md w-full pl-10"
              placeholder="Search book"
              onChange={handleFilterBook}
            />
          </div>
          <div className="flex gap-4">
            <select 
              name="" 
              id="status"
              className="border rounded-md w-full"
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="All">All Books</option>
              <option value="progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <select 
              name="" 
              id="sortBy"
              className="border rounded-md w-full"
            >
              <option value="title">Sort by Title</option>
              <option value="progress">Sort by Progress</option>          
            </select>
            <button 
              className="bg-blue-500 text-white px-5 py-2 rounded-full"
              onClick={handleShowNewBookForm}
              >
              <FiPlus               
              />
            </button>
          </div>
        </div>
        <div className="flex bg-white rounded-lg justify-between px-4 py-2"> 
          <table className="w-full">
            <thead className="text-left font-bold bg-gray-50">
              <tr className="border-t border-gray-200">
                <th className="p-4"> Title </th>
                <th className="p-4"> Author </th>
                <th className="p-4"> Status </th>
                <th className="p-4"> Progress </th>
                <th className="p-4"> Actions </th>
              </tr>
            </thead>
            <tbody className="">
              {
                filteredBooks.map( (book) => (
                 <tr key={book._id} className="border-t border-gray-200">
                    <td className="p-4"> {book.title} </td> 
                    <td className="p-4"> {book.author} </td>
                    <td className="p-4">
                      <span className={status[book.status]}>
                        {book.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className='w-full bg-gray-200 rounded h-2.5'>
	                      <div>                                                     
		                      <div className={`bg-blue-500 h-2.5 rounded`} style={{ width: `${book.currentPage/book.totalPages * 100}%` }}></div>
                        </div>
                    </div>                                            
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button
                          className="flex items-center gap-2 px-3 py-2 rounded-full border hover:bg-gray-50"
                          title="Actualizar progreso"
                          onClick={() => handleSetProgressStatus(book)}
                        >
                          <FiRefreshCw />
                         
                        </button>

                        <button
                          className="flex items-center gap-2 px-3 py-2 rounded-full border hover:bg-gray-50"
                          title="Editar libro"
                          onClick={() => handleEditBook(book)}
                        >
                          <FiEdit />
                          
                        </button>

                        <button
                          className="flex items-center gap-2 px-3 py-2 rounded-full border hover:bg-gray-50 text-red-600"
                          id="deleteBook"
                          title="Borrar libro"
                          onClick={() => handleDeleteBook(book._id, book.title)}
                        >
                          <FiTrash2 />
                          
                        </button>
                      </div>
                    </td>


                 </tr>
                ))
              } 
              
            </tbody>
          </table>
        </div> 
      </div>
    </div>
  );
};

export default BookingReadingTable;


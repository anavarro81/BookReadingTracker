import React, { useState, useEffect } from "react";
import { FiBook, FiSearch, FiFilter, FiX, FiPlus, FiRefreshCw, FiEdit, FiTrash2 } from "react-icons/fi";
import { format } from "date-fns";
import ProgressModal from "../Components/ProgressModal";
import {axiosInstance} from '../util/axios'
const BookingReadingTable = () => {

  

  // const [books, setBooks] = useState ([
  //   {
  //     id: 1, 
  //     title: "StarDust",
  //     format: "Hardcover",
  //     status: "completed",
  //     currentPage: 216,
  //     totalPages: 216,
  //     progress: 100,
  //     lastUpdate: new Date(2025,8,15)
  //   },

  //   {
  //     id: 2, 
  //     title: "The monk who sold his ferrari",
  //     format: "Hardcover",
  //     status: "progress",
  //     currentPage: 182,
  //     totalPages: 208,
  //     progress: 60,
  //     lastUpdate: new Date(2025,8,19)

  //   },

  //   {
  //     id: 3, 
  //     title: "Invicto",
  //     format: "Hardcover",
  //     status: "progress",
  //     currentPage: 90, 
  //     totalPages: 280,
  //     progress: 60,
  //     lastUpdate: new Date(2025,8,19)

  //   }

  //   ])

  const [books, setBoooks] = useState([])
  
  const [searchText, setSearchText] = useState("")
  const [typeFilter, setTypeFilter] = useState("All")
  const [sortBy, setSortedBy] = useState("title")
  const [showSetProgressModal, setshowSetProgressModal] = useState(false)
  

  const [modalStatus, setModalStatus] = useState(
    {
      open:false, 
      currentPage:null, 
      totalPages:null, 
      bookId:null 
    }
  )

  const status = {
    "completed": "bg-green-500 p-2 rounded-full text-white",
    "progress": "bg-yellow-500 p-2 rounded-full text-white", 
    "wishlist": "bg-red-500 p-2 rounded-full text-white"
  }

  const getBooks = async () => {
    const {data} = await axiosInstance.get('/book/')
    console.log('books ', data.books)
    setBoooks(data.books)
  }

  useEffect(() => {
    getBooks()
  
  }, [])
  

  

  const handleFilterBook = (e) => {
    setSearchText(e.target.value)
  }

  const handleSetProgressStatus = (book) => {
    setModalStatus({open: true, currentPage: book.currentPage, totalPages: book.totalPages,  bookId: book.id})
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
            
        />}
            
          

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
            <button className="bg-blue-500 text-white px-5 py-2 rounded-full">
              <FiPlus/>
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
                          
                        >
                          <FiEdit />
                          
                        </button>

                        <button
                          className="flex items-center gap-2 px-3 py-2 rounded-full border hover:bg-gray-50 text-red-600"
                          title="Borrar libro"
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


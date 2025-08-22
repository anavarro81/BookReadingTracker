import React, { useState, useEffect } from "react";
import { FiBook, FiSearch, FiFilter, FiX, FiPlus } from "react-icons/fi";
import { format } from "date-fns";

const BookingReadingTable = () => {

  

  const [books, setBooks] = useState ([
    {
      id: 1, 
      title: "StarDust",
      format: "Hardcover",
      status: "completed",
      progress: 100,
      lastUpdate: new Date(2025,8,15)
    },

    {
      id: 2, 
      title: "The monk who sold his ferrari",
      format: "Hardcover",
      status: "progress",
      progress: 60,
      lastUpdate: new Date(2025,8,19)

    },

    {
      id: 3, 
      title: "Invicto",
      format: "Hardcover",
      status: "progress",
      progress: 60,
      lastUpdate: new Date(2025,8,19)

    }

    ])
  
  const [searchText, setSearchText] = useState("")
  const [typeFilter, setTypeFilter] = useState("All")
  const [sortBy, setSortedBy] = useState("title")

  const status = {
    "completed": "bg-green-500 p-2 rounded-full text-white",
    "progress": "bg-yellow-500 p-2 rounded-full text-white", 
    "wishlist": "bg-red-500 p-2 rounded-full text-white"
  }

  

  const handleFilterBook = (e) => {
    setSearchText(e.target.value)
  }

  const filteredBooks = books
  .filter(book => book.title.toLowerCase().includes(searchText.toLowerCase()))
  .filter(book => typeFilter === "All" || book.status == typeFilter)
  .sort((a, b) => a.title.localeCompare(b.title))
  


  return (
    <div className="bg-gray-100 min-h-screen px-4 py-8"> 
      <div className="container mx-auto "> 
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
                <th className="p-4"> Format </th>
                <th className="p-4"> Status </th>
                <th className="p-4"> Progress </th>
                <th className="p-4"> Last Updated </th>
              </tr>
            </thead>
            <tbody className="">
              {
                filteredBooks.map( (book) => (
                 <tr key={book.id} className="border-t border-gray-200">
                    <td className="p-4"> {book.title} </td> 
                    <td className="p-4"> {book.format} </td>
                    <td className="p-4">
                      <span className={status[book.status]}>
                        {book.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className='w-full bg-gray-200 rounded h-2.5'>
	                      <div>                                                     
		                      <div className={`bg-blue-500 h-2.5 rounded`} style={{ width: `${book.progress}%` }}></div>
                        </div>
                    </div>                                            
                    </td>
                    <td className="p-4">
                      {format(book.lastUpdate, "dd/MM/yyyy")}
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

      // id: 1, 
      // title: "StarDust",
      // format: "Hardcover",
      // status: "completed",
      // progress: 100,
      // lastUpdate: new Date(2025,8,15)

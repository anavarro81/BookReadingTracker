import { FaMinus, FaPlus, FaRegCalendarAlt, FaTimes } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";

const ProgressModal = ({props}) => {

    // const { totalPages, currentPage, onPageChange, onDateChange } = props;

    registerLocale("es", es);

    const data = {
        currentPage: 198,
        totPage: 216
    }

    const currentDate = new Date();

    const [currentPageState, setcurrentPageState] = useState(data.currentPage)

    const [showDatePicker, setShowDatePicker] = useState(true)

    const [selectedDate, setSelectedDate] = useState(new Date())    

    const handleCloseDate = () => {
        
        setShowDatePicker(true)
        setSelectedDate(null)
    }
    


    const incrementCurrentPage = () => {
        if (currentPageState < data.totPage) {
            setcurrentPageState(currentPageState + 1)        
        }
    }

    const decrementCurrentPage = () => {
        
        if (currentPageState > 0 && currentPageState > data.currentPage ) {
            setcurrentPageState(currentPageState - 1)        
        }

    }

    

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">        
            <div className='bg-white p-4 rounded shadow-md max-w-md '>
                
                <h2 className='text-xl font-semibold mb-4 text-center'>Progreso de lectura</h2>
                
                <div className='flex items-center flex-col space-y-4  mb-4'>
                    
                    
                    <div className="flex  items-center justify-end"> 
                        <button 
                            className='rounded-full w-15 aspect-square text-white  flex justify-center items-center bg-brand-500 hover:bg-turquoise-600'
                            onClick={decrementCurrentPage}
                            >
                            <FaMinus className=""/>
                        </button>
                        
                        <div  className="flex flex-col items-center">
                            <input 
                                id='currentPage' 
                                type="number" 
                                placeholder="199" 
                                value={currentPageState}
                                className="w-1/2 text-center font-bold text-6xl"/> 
                            <span id='totalPages' className="text-gray-600"> de {data.totPage} paginas </span>
                        </div>

                        <button 
                            className='rounded-full w-15 aspect-square text-white  flex justify-center items-center bg-brand-500 hover:bg-turquoise-600'
                            onClick={incrementCurrentPage} >                            
                            <FaPlus />
                        </button>
                    </div>


                    <input 
                        type="range" 
                        id="currentPageSlider" 
                        name="totPages" 
                        min="0"
                        max={data.totPage} 
                        value={currentPageState}
                        onChange={(e) => setcurrentPageState(e.target.value)}
                        className="w-full"
                        />
                        
                    {/* Date select */}  
                
                    <div className="flex w-full justify-center items-center gap-2"> 

                       

                        {showDatePicker ? <> 

                        <DatePicker
                        locale="es"
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        dateFormat="dd/MM/yyyy"
                    />        
                        
                      
                            <button 
                                className="rounded-full w-7 h-7 aspect-square text-white  flex justify-center items-center bg-gray-500 hover:bg-turquoise-600"
                                onClick={() => setShowDatePicker(false)}
                                >
                            <FaTimes className="w-2"/>
                            </button>
                        </>
                        : 
                        
                         <button className='px-2 rounded-full  h-12 text-white  bg-brand-500 hover:bg-turquoise-600 flex items-center justify-center gap-2'
                         onClick={handleCloseDate}
                         >
                            <FaRegCalendarAlt /> Añadir fecha
                        </button>
        
                        }
                        
                    </div>    

                </div>

                <div className="flex justify-center gap-2">
                    <button                         
                        className="w-full h-12 bg-brand-200 rounded-full text-brand-500 font-medium"
                        > 
                        Cancelar 
                    </button>
                    <button                         
                        className="w-full h-12 bg-brand-500 rounded-full font-medium text-white"
                        id="saveButton"
                        disabled={data.currentPage === currentPageState}
                        >
                         Salvar 
                    </button>
                    
                </div>
            </div>
        
    </div>

                                    


  )
}

export default ProgressModal

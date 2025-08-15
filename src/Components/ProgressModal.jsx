import { FaMinus, FaPlus, FaRegCalendarAlt, FaRegClock } from "react-icons/fa";
import React, { useState } from "react";


const ProgressModal = ({props}) => {

    // const { totalPages, currentPage, onPageChange, onDateChange } = props;

    const data = {
        currentPage: 198,
        totPage: 216
    }



    const [currentPageState, setcurrentPageState] = useState(data.currentPage)

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
    <div className="flex items-center justify-center h-screen bg-gray-400">        
            <div className='bg-white p-4 rounded shadow-md'>
                <h2 className='text-xl font-semibold mb-4 text-center'>Progreso de lectura</h2>
                
                <div className='flex items-center flex-col space-y-2 ustify-between mb-4'>
                    
                    
                    <div className="flex"> 
                        <button 
                            className='rounded-full w-12 h-12 text-white  flex justify-center items-center bg-brand-500 hover:bg-turquoise-600'
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
                            className='rounded-full w-12 h-12 text-white  flex justify-center items-center bg-brand-500 hover:bg-turquoise-600'
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
                        />
                        

                    <button className='p-1 rounded-full text-white bg-brand-500 hover:bg-turquoise-600 flex items-center gap-1'>
                        <FaRegClock /> Añadir fecha
                    </button>

                </div>

                <div className="flex justify-center gap-2">

                    <button 
                        className="rounded-xl text-white bg-brand-500 px-4 py-2"> 
                        Cancelar 
                    </button>
                    <button 
                        className="rounded-xl text-white bg-brand-500 px-4 py-2 disabled:bg-gray-400"
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

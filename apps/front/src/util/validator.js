// Validation function signatures (no implementation)
export function validateTitle(value) { 
    
    if(value.trim().length === 0) {
      return 'El titulo no puede estar vacio'
    } else if(value < 3) {       
      return 'El titulo tiene que tener al menes tres caracteres'     
    }

    return null
    
}

export function validateAuthor(value) { 

    if(value.length < 3) {
      return 'El autor tiene que tener al menos tres caracteres'
    }  else if (value.length === 0) {    
      return 'El autor no puede estar vacio'
    }  

}

export function validateStatus(value) { 

    const allowedStatus = ["Pending", "In Progress", "Completed"]

    if (!allowedStatus.includes(value)) {
        return "El estado no es valido"
    }


}
export function validateCurrentPage(value) { 

    if (value < 0) {
        return 'La pagina actual tiene que ser mayor que cero'    
    }
}

export function validateTotalPages(value) { 

    if (value < 0) {
        return 'Las paginas totales tienen que ser mayor que cero'    
    }



}
export function validateStartReading(value) { }
export function validateEndReading(value) { }



/**
 * validateFields receives an object with keys as field names and values to validate.
 * It dispatches validation to the corresponding function using a switch and
 * returns an object with validation results per field (implementation functions
 * currently empty so results will be undefined until implemented).
 *
 * Example input: { title: 'My book', totalPages: 200 }
 */
export function validateFields(fields) {
    const results = {}

    for (const [field, value] of Object.entries(fields)) {
        switch (field) {
            case 'title':
                const err = validateTitle(value)                
                if (err) results.title = err                    
                break
            case 'author':
                results.author = validateAuthor(value)
                break
            case 'status':
                results.status = validateStatus(value)
                break
            case 'currentPage':
                results.currentPage = validateCurrentPage(value)
                break
            case 'totalPages':
                results.totalPages = validateTotalPages(value)
                break
            case 'startReading':
                results.startReading = validateStartReading(value)
                break
            case 'endReading':
                results.endReading = validateEndReading(value)
                break
            default:
                // unknown field: ignore
                break
        }
    }

    return results
}

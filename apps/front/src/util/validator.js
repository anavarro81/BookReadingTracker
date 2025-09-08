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

    return null

}

export function validateStatus(value) { 

    const allowedStatus = ["Pending", "In Progress", "Completed"]

    if (!allowedStatus.includes(value)) {
        return "El estado no es valido"
    }

    return null


}
export function validateCurrentPage(value) { 

    if (value < 0) {
        return 'La pagina actual tiene que ser mayor que cero'    
    }

    return null
}

export function validateTotalPages(value) { 

    if (value < 0) {
        return 'Las paginas totales tienen que ser mayor que cero'    
    }

    return null



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
    let err = ''

    for (const [field, value] of Object.entries(fields)) {
        switch (field) {
            case 'title':
                err = validateTitle(value)                
                if (err) results.title = err                    
                break
            case 'author':
                err = validateAuthor(value)
                if (err) results.author = err
                break
            case 'status':
                err = validateStatus(value)
                if (err) results.status = err
                break
            case 'currentPage':
                err = validateCurrentPage(value)
                if (err) results.currentPage = err
                break
            case 'totalPages':
                err = validateTotalPages(value)
                if (err) results.totalPages = err                
                break
            case 'startReading':
                err = validateStartReading(value)
                if (err) results.startReading = err
                break
            case 'endReading':
                err = validateEndReading(value)
                if (err) results.endReading = err
                break
            default:
                // unknown field: ignore
                break
        }
    }

    return results
}

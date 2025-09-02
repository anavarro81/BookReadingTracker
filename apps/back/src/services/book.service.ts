import BookModel, {IBook} from '../models/book.model'

export const newBook = async (data: Partial<IBook>): Promise<IBook> => {

    try {

        const book = new BookModel(data)
        return await book.save()
        
    } catch (error) {
        throw error
        
    }

} 

export const deleteBook = async (id: string): Promise<IBook|null> => {

    try {
        return await BookModel.findByIdAndDelete(id)        
        
    } catch (error) {
        throw error
        
    }

}

export const updateProgress = async (id: string, totalPages: number, currentPage: number ): Promise<IBook| null> => {    
    
        let data: Partial<IBook> = { currentPage };

        console.log('totalPages: ', totalPages)
        console.log('currentPage: ', currentPage)
        console.log('tipo de totalPage ', typeof totalPages) 
        console.log('tipo de currentPage ', typeof currentPage) 


        if (currentPage == totalPages) {
            data = {...data, status: "completed", endReading: new Date()}
        }

        return await BookModel.findByIdAndUpdate(id, data, { new: true })

        


}

// export const updateBook = async(data: Partial<IBook>): Promise<IBook> => {

// }


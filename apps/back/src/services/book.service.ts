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

        const book = await BookModel.findById(id)

        if (book){
         
            if (book.currentPage === 0){
             data = {...data, status: "In Progress"}
            }    
        }


        if (currentPage == totalPages) {
            data = {...data, status: "completed", endReading: new Date()}
        }

        return await BookModel.findByIdAndUpdate(id, data, { new: true })

        


}

export const updateBook = async(id: string, data: Partial<IBook>): Promise<IBook | null> => {

    try {
         console.log('id ==> ', id)
         console.log('data ==> ', data)
        const updatedBook = await BookModel.findByIdAndUpdate(id, data, { new: true })        
        console.log('updatedBook  ', updatedBook )
        return updatedBook 
    } catch (error) {
        console.log('doy errorrrrr')
        throw error
    }

}

export const getAllBooks = async (): Promise<IBook []> => {
    
    try {

        const books = await BookModel.find()
        return books
        
    } catch (error) {
        throw error
        
    }
}


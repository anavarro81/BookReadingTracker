import mongoose, { Schema, Document, model } from "mongoose";

export interface IBook extends Document {
    title: string;
    author: string;
    status: string;
    currentPage: number;
    totalPages: number;
    startReading: Date;
    endReading: Date;
}

const BookSchema = new Schema({
    title: { 
        type: String, 
        required: true,
        minlength: 3,
        maxlength: 200, 
        // Valida que no sea una cadena vacia (solo espacios)
        validate: {
            validator: function (v: unknown ): boolean {        
            return !!v && (typeof v === 'string') && v.trim().length > 0;
        },
      message: 'El nombre no puede estar vacío o contener solo espacios.'
    }

    },
    author: {
        type: String, 
        required: true, 
        minlength: 3,
        maxlength: 200,
        // Valida que no sea una cadena vacia (solo espacios)
        validate: {
            validator: function (v: unknown ): boolean {        
            return !!v && (typeof v === 'string') && v.trim().length > 0;
        },
      message: 'El autor no puede estar vacío o contener solo espacios.'
    }

        
    }, 
    status: {
        type: String, 
        required: false, 
        enum: ["Pending", "In Progress", "Completed"],
        default: "Pending"
    },

    totalPages: {
        type: Number,
        required: true, 
        min: 1,
        
    },

    
    currentPage: {
        type: Number,
        required: false, 
        default: 0,
        min: 0,
        validate: {
            // Se indica que this es de tipo IBook para que TS reconozca this.totalPages como parte del documento. 
            validator: function (this: IBook, v: unknown): boolean {
                return typeof v === "number" && v <= this.totalPages
            },
            message: "La pagina actual no puede ser posterior al numero de paginas totales"
        }
    },

    startReading: {
        type: Date,
        required: false,
        default: null
    },

    // Comprueba que le llega una fecha: (v instanceof Date), que tiene formato valido: isNaN(v.getTime()
    // Si startReading existe, compara v >= this.startReading.    
    endReading: {
        type: Date,
        required: false,
        default: null,
        validate: {
            validator: function (this: IBook, v: Date | undefined | null): boolean {
                if (!v) return true; // si no se proporciona, no hay error
                if (!(v instanceof Date) || isNaN(v.getTime())) return false;

                if (this.startReading) {
                    return v >= this.startReading;
                }

              return true; // si no hay fecha de inicio, aceptamos cualquier endReading
        },
        message: "La fecha de finalización debe ser igual o posterior a la de inicio de lectura"
  }

    }





}, {
    timestamps: true,
});

const BookModel = model<IBook>("Book", BookSchema);
export default BookModel;
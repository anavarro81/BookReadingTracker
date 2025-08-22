export class AppError extends Error {

    public readonly status: number; 

    constructor (message: string, status = 500, type="AppError") {
        super(message)
        this.status = status
        this.name = type;
        // Garantiza que instanceof AppError funcione como esperas.
        Object.setPrototypeOf(this, new.target.prototype)
    }

    static badRequest(message="Peticion no valida") {
        return new AppError(message, 400, "BadRequestError")
    }

    static unauthorized(message="No autorizado") {
        return new AppError(message, 401, "UnauthorizedError")
    }

    static forbidden(message="Operacion no autorizada") {
        return new AppError(message, 403, "ForbiddenError")
    }

    static notFound(message="No encontrado") {
        return new AppError(message, 403, "NotFoundError")
    }

    static conflict(message="Conflicto") {
        return new AppError(message, 409, "ConflictError")
    }

    static internal(message="Error en el servidor") {
        return new AppError(message, 500, "ServerError")
    }

}
export const handleValidationError = (error, res) => {
    return res.status(400).json({
        message: "Erro de validação.",
        errors: error.issues.map(err => ({
            field: err.path.join('.'),
            message: err.message
        }))
    });
};

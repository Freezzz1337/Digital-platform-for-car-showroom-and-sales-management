const SupplierValidator = (formData) => {
    const errors = {};

    if (!formData.name) {
        errors.name = 'Поле "Назва" не повинне бути порожнім';
    }

    return errors;
};

export default SupplierValidator;
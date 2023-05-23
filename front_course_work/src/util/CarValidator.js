const CarValidator = (formData) => {
    const errors = {};

    if (!formData.name) {
        errors.name = 'Поле "Назва" не повинне бути порожнім';
    }
    if (!formData.color) {
        errors.color = 'Поле "Колір авто" не повинне бути порожнім';
    }
    if (!formData.mileage) {
        errors.mileage = 'Поле "Пробіг" не повинне бути порожнім';
    }
    if (!formData.fuel) {
        errors.fuel = 'Поле "Паливо" не повинне бути порожнім';
    }
    if (!formData.engine) {
        errors.engine = 'Поле "Об\'єм двигуна:" не повинне бути порожнім';
    }
    if (!formData.price) {
        errors.price = 'Поле "Ціна" не повинне бути порожнім';

    }if (!formData.equipment) {
        errors.equipment = 'Поле "Комплектація" не повинне бути порожнім';
    }
    if (!formData.dateOfManufacture) {
        errors.dateOfManufacture = 'Поле "Дата" не повинне бути порожнім';
    }
    if (!formData.description) {
        errors.description = 'Поле "Опис" не повинне бути порожнім';
    }

    return errors;
};

export default CarValidator;
const WorkerValidator = (formData) => {
    const errors = {};

    if (!formData.name) {
        errors.name = 'Поле "Ім\'я" не повинне бути порожнім';
    }

    if (!formData.login) {
        errors.login = 'Поле "Логін" не повинне бути порожнім';
    }

    if (!formData.password) {
        errors.password = 'Поле "Пароль" не повинне бути порожнім';
    } else if (formData.password.length < 8) {
        errors.password = 'Пароль повинен містити не менше 8 символів';
    }

    return errors;
};

export default WorkerValidator;
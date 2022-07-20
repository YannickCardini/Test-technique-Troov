export function isPasswordOk(form) {
    if (form.password === form.repeat && form.password.length >= 8)
        return true;
    return false;
}

export function hashPassword(password) {
    const encryptPassword = require("encrypt-password");
    return encryptPassword(password, "troov");
}
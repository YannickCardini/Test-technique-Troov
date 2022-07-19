export function isPasswordIsOk(form) {
    if (form.password === form.repeat) {
        if (form.password.length >= 1)
            return true;
    }
    return false;
}
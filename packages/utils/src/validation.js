"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidUrl = isValidUrl;
exports.isValidPrice = isValidPrice;
exports.isValidPrompt = isValidPrompt;
exports.isValidEmail = isValidEmail;
exports.sanitizeInput = sanitizeInput;
function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    }
    catch {
        return false;
    }
}
function isValidPrice(price) {
    return typeof price === 'number' && price > 0 && isFinite(price);
}
function isValidPrompt(prompt, minLength = 10, maxLength = 200) {
    return (typeof prompt === 'string' &&
        prompt.trim().length >= minLength &&
        prompt.trim().length <= maxLength);
}
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
function sanitizeInput(input) {
    return input
        .replace(/[<>]/g, '')
        .replace(/javascript:/gi, '')
        .trim();
}
//# sourceMappingURL=validation.js.map
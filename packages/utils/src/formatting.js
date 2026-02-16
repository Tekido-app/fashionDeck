"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatPrice = formatPrice;
exports.formatPriceRange = formatPriceRange;
exports.truncateText = truncateText;
exports.capitalizeWords = capitalizeWords;
function formatPrice(price) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(price);
}
function formatPriceRange(minPrice, maxPrice) {
    return `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`;
}
function truncateText(text, maxLength) {
    if (text.length <= maxLength)
        return text;
    return text.slice(0, maxLength - 3) + '...';
}
function capitalizeWords(text) {
    return text
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}
//# sourceMappingURL=formatting.js.map
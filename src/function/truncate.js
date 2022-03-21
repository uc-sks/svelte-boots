export function truncate(input) {
    if (input.length > 80) {
        return input.substring(0, 80) + '...';
    }
    return input;
}
;
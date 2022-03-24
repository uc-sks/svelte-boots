export function truncate(input) {
    if (input.length > 18) {
        return input.substring(0, 18) + '...';
    }
    return input;
}
;
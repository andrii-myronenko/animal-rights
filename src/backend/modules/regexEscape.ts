export function regexEscape(toEscape: string) {
    return toEscape.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
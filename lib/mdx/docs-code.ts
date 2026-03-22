export function normalizeDocsCode(code: string) {
    return code
        .replace(/\r\n/g, "\n")
        .replace(/\\r\\n/g, "\n")
        .replace(/\\n/g, "\n")
        .replace(/\\t/g, "\t")
        .replace(/\n[ \t]+\n/g, "\n\n")
        .replace(/\n{3,}/g, "\n\n")
        .trim()
}
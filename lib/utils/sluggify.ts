export function sluggify(text: string) {
    return (
        text
            // Normalize Unicode characters
            .normalize('NFKD')
            // Replace non-alphanumeric characters with hyphens
            .replace(/[^\w\s-]/g, '')
            // Convert spaces to hyphens
            .replace(/[\s_]+/g, '-')
            // Remove consecutive hyphens
            .replace(/-+/g, '-')
            // Convert to lowercase
            .toLowerCase()
            // Trim hyphens from start and end
            .replace(/^-+|-+$/g, '')
    )
}

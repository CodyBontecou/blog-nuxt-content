export function sluggify(input: string): string {
    return input
        .toLowerCase() // Convert to lowercase
        .trim() // Trim whitespace from both ends
        .replace(/\s+/g, '-') // Replace one or more whitespace characters with a hyphen
        .replace(/[^\w\-]+/g, '') // Remove all non-word characters (except hyphens)
        .replace(/--+/g, '-') // Replace multiple hyphens with a single hyphen
        .replace(/^-+|-+$/g, '') // Remove leading and trailing hyphens
}

import type { ParsedContent } from '@nuxt/content'

export const getTopics = (posts: ParsedContent[] | null) => {
    const allTopics = posts
        ?.flatMap(post => post.topics || [])
        .filter(Boolean)
        .map(topic => topic.toLowerCase())

    return [...new Set(allTopics)].sort()
}

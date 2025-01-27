import { serverQueryContent } from '#content/server'
import RSS from 'rss'

export default defineEventHandler(async event => {
    const baseUrl = 'https://codybontecou.com'

    const feed = new RSS({
        title: 'Cody Bontecou',
        site_url: baseUrl,
        feed_url: `${baseUrl}/rss.xml`,
    })

    const docs = await serverQueryContent(event)
        .sort({ date: -1 })
        .where({ draft: false, ignore: false })
        .find()

    for (const doc of docs) {
        feed.item({
            title: doc.title ?? '-',
            url: baseUrl + doc._path,
            date: doc.date,
            description: doc.description,
        })
    }

    const feedString = feed.xml({ indent: true })

    event.node.res.setHeader('content-type', 'text/xml')
    event.node.res.end(feedString)
})

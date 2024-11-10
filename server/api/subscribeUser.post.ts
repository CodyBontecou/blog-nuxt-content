import { H3Event } from 'h3'

export default defineEventHandler(async (event: H3Event) => {
    const body = await readBody(event)
    const { email } = body

    if (!email) {
        throw createError({
            statusCode: 400,
            message: 'Email is required',
        })
    }

    try {
        const config = useRuntimeConfig()
        const MAILCHIMP_AUDIENCE_ID = config.MAILCHIMP_AUDIENCE_ID
        const MAILCHIMP_SECRET_KEY = config.MAILCHIMP_SECRET_KEY
        const MAILCHIMP_API_SERVER = config.MAILCHIMP_API_SERVER

        const data = {
            email_address: email,
            status: 'subscribed',
        }

        const response = await fetch(
            `https://${MAILCHIMP_API_SERVER}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members`,
            {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    Authorization: `apikey ${MAILCHIMP_SECRET_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        )

        if (!response.ok) {
            throw createError({
                statusCode: 400,
                message:
                    "There was an error subscribing to the newsletter. Hit me up peter@peterlunch.com and I'll add you the old fashioned way :(.",
            })
        }

        return { error: '' }
    } catch (error) {
        throw createError({
            statusCode: 500,
            message: error.message || 'An unexpected error occurred',
        })
    }
})

import rateLimit from 'express-rate-limit'
export const limiter = rateLimit({
    windowMs: 1 * 1000,
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'You have been ratelimited, please try again in 1 second.', // response message
    status: 429 
})


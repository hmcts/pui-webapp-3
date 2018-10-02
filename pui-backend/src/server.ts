import * as cookieParser from 'cookie-parser'
import * as express from 'express'
import * as session from 'express-session'
import * as globalTunnel from 'global-tunnel-ng'
import * as log4js from 'log4js'

// PUI imports
import * as auth from './auth'
import * as cases from './cases'
import { config } from './config'

import * as sessionFileStore from 'session-file-store'

const app = express()
const PORT = config.port

const logger = log4js.getLogger('server')
logger.level = 'info'

logger.info('Using Config:\n', config)

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

if (config.proxy) {
    globalTunnel.initialize({
        host: config.proxy.host,
        port: config.proxy.port,
    })
}

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'private, no-cache, no-store, max-age=0')
    res.setHeader('Pragma', 'no-cache')
    res.setHeader('Expires', '0')
    next()
})

const FileStore = sessionFileStore(session)

app.use(
    session({
        cookie: {
            httpOnly: true,
            maxAge: 31536000,
            secure: config.secureCookie,
        },
        name: 'pui-webapp-2',
        resave: true,
        saveUninitialized: true,
        secret: config.sessionSecret,
        store: new FileStore({
            path: process.env.NOW ? `/tmp/sessions` : `.sessions`,
        }),
    })
)

app.use(cookieParser())

app.get('/oauth2/callback', auth.oauth)

app.use(auth.attach)
app.get('/api/user', auth.user)
app.get('/api/cases', cases.get)

// Start !
app.listen(PORT, () => {
    logger.info(`listening on port ${PORT}`)
})

import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { config as loadDotenv } from 'dotenv'
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'

import onboarding from './routes/onboarding.js'
import journal from './routes/journal.js'
import wins from './routes/wins.js'

const here = path.dirname(fileURLToPath(import.meta.url))
loadDotenv({ path: path.resolve(here, '../.env') })

const app = new Hono()

app.use('*', cors({ origin: ['http://localhost:5173', 'http://127.0.0.1:5173'] }))
app.get('/api/health', (c) => c.json({ ok: true, product: 'lifemaxxing' }))

app.route('/', onboarding)
app.route('/', journal)
app.route('/', wins)

const port = Number(process.env.PORT ?? 8788)

serve({ fetch: app.fetch, port, hostname: '127.0.0.1' })

console.log(`[lifemaxxing/server] listening on http://127.0.0.1:${port}`)

if (!process.env.AI_GATEWAY_API_KEY) {
  console.warn('[lifemaxxing] AI_GATEWAY_API_KEY not set — /api/journal will fail.')
}

import crypto from 'crypto'

function checkTelegramInitData(initData, botToken) {
  const params = new URLSearchParams(initData)
  const hash = params.get('hash')
  if (!hash) return false
  params.delete('hash')

  const dataCheckString = Array.from(params.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}=${v}`)
    .join('\n')

  const secret = crypto.createHash('sha256').update(botToken).digest()
  const hmac = crypto.createHmac('sha256', secret).update(dataCheckString).digest('hex')
  return hmac === hash
}

export default async function handler(req, res) {
  try {
    const initData = req.method === 'POST' ? (req.body?.initData ?? '') : (req.query?.initData ?? '')
    if (!initData) return res.status(400).json({ ok:false, error:'initData is required' })

    const BOT_TOKEN = process.env.BOT_TOKEN
    if (!BOT_TOKEN) return res.status(500).json({ ok:false, error:'BOT_TOKEN not set' })

    const ok = checkTelegramInitData(initData, BOT_TOKEN)
    if (!ok) return res.status(401).json({ ok:false, error:'invalid initData' })

    return res.json({ ok:true })
  } catch (e) {
    return res.status(500).json({ ok:false, error:String(e) })
  }
}

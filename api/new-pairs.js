export default async function handler(req, res) {
  try {
    const { minutes='30', minTvl='100000', networks='evm' } = req.query
    const nets = String(networks).split(',').map(s => s.trim().toLowerCase())
    const min = Number(minTvl) || 0

    // TODO: replace with real data source
    const sample = [
      { id:'evm-AAA', symbol:'AAA', tvl:250000, chain:'evm', createdAt: Date.now()-5*60*1000,
        dexscreener:'https://dexscreener.com/ethereum/0x...' },
      { id:'sol-BBB', symbol:'BBB', tvl:150000, chain:'solana', createdAt: Date.now()-12*60*1000,
        dexscreener:'https://dexscreener.com/solana/...' }
    ]

    const filtered = sample.filter(p => nets.includes(p.chain) && p.tvl >= min)
    return res.json(filtered)
  } catch (e) {
    return res.status(500).json({ ok:false, error:String(e) })
  }
}

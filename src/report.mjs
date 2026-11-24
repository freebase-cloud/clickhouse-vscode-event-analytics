export function report(rows) {
  if (!Array.isArray(rows) || !rows.length) throw new Error('Expected at least one sample record');
  rows=rows.map(row=>({...row}));
  for (const row of rows) {
    if (["id","event","hits"].some(k=>row[k]==null)) throw new Error('Missing required field');
    if (typeof row.hits==='string' && row.hits.trim()) row.hits=Number(row.hits);
    if (!Number.isFinite(row.hits)) throw new Error('Expected a numeric metric');
  }
  const total=rows.reduce((s,r)=>s+r.hits,0); return {total,events:rows.toSorted((a,b)=>b.hits-a.hits).map(r=>({event:r.event,share:Math.round(r.hits/total*1000)/10}))};
}

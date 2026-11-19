// Logbook PK HD - penyimpanan data bersama di Google Sheet (Apps Script)
const TOKEN = 'GANTI-DENGAN-KODE-RAHASIA-ANDA'; // harus sama dengan token di config.js
const W = 12; // kolom: key, waktu, lalu maks 10 potongan data
function sh_(){const s=SpreadsheetApp.getActiveSpreadsheet();return s.getSheetByName('data')||s.insertSheet('data')}
function out_(o){return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON)}
function parse_(r){return JSON.parse(r.slice(2).filter(String).map(c=>String(c).slice(1)).join('')||'null')}
function doGet(e){
  if((e.parameter.t||'')!==TOKEN) return out_({err:'token'});
  const since=+e.parameter.since||0, last=+PropertiesService.getScriptProperties().getProperty('last')||0, d={};
  if(last>since){
    const s=sh_(), n=s.getLastRow();
    if(n>0){
      const ab=s.getRange(1,1,n,2).getValues(), idx=[];
      ab.forEach((r,i)=>{if(+r[1]>since) idx.push(i+1)});
      if(idx.length>150){ s.getRange(1,1,n,W).getValues().forEach(r=>{if(+r[1]>since) d[r[0]]=parse_(r)}) }
      else idx.forEach(i=>{const r=s.getRange(i,1,1,W).getValues()[0]; d[r[0]]=parse_(r)});
    }
  }
  return out_({ok:1,last:last,d:d});
}
function doPost(e){
  const b=JSON.parse(e.postData.contents);
  if(b.t!==TOKEN) return out_({err:'token'});
  const lock=LockService.getScriptLock(); lock.waitLock(25000);
  try{
    const s=sh_(), n=s.getLastRow(), ts=Date.now(), pos={};
    if(n>0) s.getRange(1,1,n,1).getValues().forEach((r,i)=>pos[r[0]]=i+1);
    let next=n+1;
    for(const k in b.items){
      const ch=(JSON.stringify(b.items[k]).match(/[\s\S]{1,45000}/g)||['null']).map(c=>'~'+c);
      if(ch.length>W-2) return out_({err:'terlalu besar: '+k});
      const row=[k,ts].concat(ch); while(row.length<W) row.push('');
      let r=pos[k]; if(!r){r=next++; pos[k]=r}
      if(r>s.getMaxRows()) s.insertRowsAfter(s.getMaxRows(), r-s.getMaxRows()+100);
      s.getRange(r,1,1,W).setValues([row]);
    }
    PropertiesService.getScriptProperties().setProperty('last',String(ts));
    return out_({ok:1,last:ts});
  } finally { lock.releaseLock() }
}

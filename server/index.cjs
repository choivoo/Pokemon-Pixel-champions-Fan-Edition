'use strict';
const http=require('node:http');
const WebSocket=require('ws');
const {BattleStream,getPlayerStreams}=require('pokemon-showdown');
const port=Number(process.env.PORT||3001);
const origin=(process.env.ALLOWED_ORIGIN||'').trim();
const server=http.createServer((req,res)=>{res.writeHead(200,{'content-type':'application/json','access-control-allow-origin':origin||'*'});res.end(JSON.stringify({service:'Pixel Champions Showdown PvP',online:true,formats:['gen7ou','gen9ou']}))});
const wss=new WebSocket.Server({server,maxPayload:32768});
const waiting=new Map(),games=new Map();
const send=(ws,data)=>{if(ws.readyState===WebSocket.OPEN)ws.send(JSON.stringify(data))};
const clean=s=>String(s||'').replace(/[^a-zA-Z0-9가-힣 _-]/g,'').slice(0,24);
const choices=/^(move [1-4](?: (?:mega|zmove|dynamax|terastallize))?|switch [1-6]|team [1-6]{1,6}|default)$/;
function start(a,b,format){
const id=require('node:crypto').randomUUID(),sim=new BattleStream(),streams=getPlayerStreams(sim);
const game={id,format,sim,streams,users:[a,b],closed:false};games.set(id,game);
a.game=b.game=game;a.side='p1';b.side='p2';
send(a,{type:'match',id,side:'p1',format});send(b,{type:'match',id,side:'p2',format});
for(const [peer,stream] of [[a,streams.p1],[b,streams.p2]])(async()=>{try{for await(const chunk of stream){if(game.closed)break;send(peer,{type:'protocol',text:chunk});if(chunk.includes('|win|')||chunk.includes('|tie|')){game.closed=true;games.delete(id);break}}}catch(e){send(peer,{type:'error',message:'배틀 서버 오류'})}})();
streams.omniscient.write('>start '+JSON.stringify({formatid:format}));
streams.omniscient.write('>player p1 '+JSON.stringify({name:a.nick}));
streams.omniscient.write('>player p2 '+JSON.stringify({name:b.nick}));
}
wss.on('connection',(ws,req)=>{if(origin&&req.headers.origin!==origin){ws.close(1008,'Origin blocked');return}
ws.nick='트레이너';ws.side=null;ws.game=null;
ws.on('message',raw=>{let d;try{d=JSON.parse(String(raw))}catch{return}
if(d.type==='queue'&&!ws.game){const format=['gen7randombattle','gen9randombattle'].includes(d.format)?d.format:'gen7randombattle';ws.nick=clean(d.nick)||'트레이너';if(waiting.has(format)&&waiting.get(format)!==ws){const other=waiting.get(format);waiting.delete(format);if(other.readyState===WebSocket.OPEN)start(other,ws,format);else waiting.set(format,ws)}else{waiting.set(format,ws);send(ws,{type:'queued',format})}}
else if(d.type==='choose'&&ws.game&&!ws.game.closed&&typeof d.choice==='string'&&choices.test(d.choice.trim())){ws.game.streams[ws.side].write(d.choice.trim())}
else if(d.type==='forfeit'&&ws.game&&!ws.game.closed){ws.game.streams[ws.side].write('forfeit')}
});
ws.on('close',()=>{for(const [f,x] of waiting)if(x===ws)waiting.delete(f);if(ws.game&&!ws.game.closed){ws.game.streams[ws.side].write('forfeit');ws.game.closed=true;games.delete(ws.game.id);for(const peer of ws.game.users)if(peer!==ws)send(peer,{type:'disconnect',message:'상대가 나갔습니다'})}});
});
server.listen(port,'0.0.0.0',()=>console.log('Pixel Champions PvP listening on',port));

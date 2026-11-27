{
const $=id=>document.getElementById(id);
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const norm=s=>String(s).normalize('NFD').replace(/\p{M}/gu,'').toUpperCase();
const KEEP=new Set(["ADN","PID","CREO","PSC","SER","AFE","MIP","EP","CNT","IESS","ESPE","CEAACES","CONAGOPARE","MAGP","EMAPA-I","EMOV","RTVECUADOR","CONQUITO","RCRS","GAD","II","(CNT","(EMAPA-I)","(IESS)","(CEAACES)","(CONAGOPARE)","06D01","19D01","EP.","E.P.,"]);
const SMALL=new Set(["de","del","la","las","los","y","e","en","el","por","para","con","un","una","a","o","al","es","tu","di","in","per","lo","of","and"]);
const tc=s=>s.split(/(\s+)/).map((w,i)=>{if(/^\s+$/.test(w)||KEEP.has(w))return w;const l=w.toLocaleLowerCase('es');if(i>0&&SMALL.has(l))return l;return l.replace(/^([("“]?)(\p{L})/u,(m,p,c)=>p+c.toLocaleUpperCase('es'))}).join('');
const lc=s=>s.split(/(\s+)/).map(w=>KEEP.has(w)?w:w.toLocaleLowerCase('es')).join('');
const gad=s=>s.replace(/GOBIERNO AUTÓNOMO DESCENTRALIZADO/g,'GAD');
const PAL=['#3b1d2e','#1d2b3b','#2f2a17','#1f3328','#3a2016','#26213b','#3b1a1a','#173236','#33281b','#2b1d36','#1a2f22'];
const CIOLOR=['#b3121c','#1f5fa8','#c27a12','#2f7d4f','#7b3fb0','#0f7f86','#c2421f','#4a5a9c','#8f6a1b','#a3306f','#2d6a2d'];
const OVR={"DI DONATO YEROVI HECTOR ENRIQUE":"Héctor Di Donato"};
const CHECKS=[["a","Antecedentes penales","Registro del Ministerio del Interior"],["t","Obligaciones tributarias","En firme, pendientes de pago"],["p","Pensiones alimenticias","Obligaciones pendientes de pago"]];
const CITIES=window.CITIES.map(([id,name,sub,list],ci)=>{
 const meta=window.META[id]||{},prop=(window.PROP||{})[id]||{};
 const c={id,name,sub,ci,color:CIOLOR[ci],list:[]};
 c.list=list.map((r,j)=>{const words=r[0].split(' ');const sur=norm(words[0]);const m=meta[sur];
  const short=m?m[1]:(OVR[r[0]]||tc(words[2]?words[2]+' '+words[0]:words.slice(-1)+' '+words[0]));
  const exp=(r[3]?r[3].split('|'):[]).map(x=>{const k=x.indexOf(' - ');return k<0?[x,'']:[x.slice(0,k),x.slice(k+3)]});
  const cne=((window.PLAN_CNE||{})[id]||{})[sur];const scan=((window.SCAN||{})[id]||[]).includes(sur);const logo=((window.LOGOS||{})[id]||{})[sur];const per=((window.PERIODOS||{})[id]||{})[sur]||[];const ult=((window.ULTIMO||{})[id]||{})[sur]||null;
  return {key:id+'|'+j,sur,c,j,full:tc(r[0]),short,org:m?m[2]:tc(r[1]),lista:m?m[0]:'',plan:m&&m[3]?window.PLAN_BASE+m[3]:(cne?window.CNE_BASE+cne:''),scan,
   f:r[2]?r[2].split('|'):[],e:exp,fl:r[4]||'',nc:!!(window.NOCONS||{})[id],prop:prop[sur]||null,p2:((window.PROPS2||{})[id]||{})[sur]||null,logo:logo?(window.LOGO_BASE||'')+logo+'.webp':'',per,ult,pc:PAL[(ci*3+j)%PAL.length]}});
 return c});
const ALL=CITIES.flatMap(c=>c.list);
const byKey=k=>ALL.find(r=>r.key===k);
const wasMayor=r=>r.e.some(([cg])=>/\bALCALDES?A?\b|^ALCALDE/.test(cg));
const wasAssembly=r=>r.e.some(([cg])=>/^ASAMBLE[IÍ]STA/.test(cg));
function roleTag(cargo,inst){const c=norm(cargo),i=norm(inst||'');
 if(/\bALCALDES?A?\b/.test(c))return['Alcaldía','#ff3b30'];if(/VICEALCALDE/.test(c))return['Vicealcaldía','#ff3b30'];
 if(/PREFECT|CONSEJER[OA] PROVINCIAL|VICEPREFECT/.test(c))return['Prefectura','#ff9f0a'];
 if(/ASAMBLE|DIPUTAD|PARLAMENT|LEGISLATIV/.test(c)||/ASAMBLEA NACIONAL/.test(i))return['Asamblea','#5e5ce6'];
 if(/MINISTR/.test(c)||/^MINISTERIO|PRESIDENCIA|VICEPRESIDENCIA|SECRETARIA NACIONAL/.test(i))return['Gobierno nacional','#30b0c7'];
 if(/GOBERNAD|JEFE POLITICO|TENIENTE POLITICO/.test(c)||/GOBERNACION/.test(i))return['Gobernación','#30b0c7'];
 if(/CONCEJAL/.test(c))return['Concejo','#ffd60a'];
 if(/GOBIERNO AUTONOMO|MUNICIP|GAD|EMPRESA PUBLICA|\bEP\b|EMAPA|EMOV/.test(i))return['Municipio / empresa pública','#34c759'];
 if(/UNIVERSIDAD|ESCUELA|INSTITUTO|COLEGIO/.test(i))return['Academia','#bf5af2'];
 return['Sector público','#8e8e93']}
function rolePeriod(r,cargo){for(const [rx,lab] of (r.per||[])){if(rx.test(norm(cargo)))return lab}return ''}
function trayText(r){
 if(!r.e.length)return 'La hoja de vida inscrita no registra cargos públicos previos.';
 const n=r.e.length;const acts=r.e.map(([a,b],i)=>{const per=rolePeriod(r,a);return `Acto ${i+1}${per?' · '+per:''}: ${tc(a)}${b?' ('+tc(gad(b))+')':''}`});
 let s=`${n===1?'Una temporada de un solo acto':'Una temporada de '+n+' actos'}. `+acts.join(' · ');
 if(r.ult)s+=`. Último cargo público registrado: ${r.ult[0]}, ${r.ult[1]} (${r.ult[2]}).`;
 return s}
function timeline(r,cur){return `<div class="tl">${r.e.map((_,i)=>`<i class="${i<cur?'done':i===cur?'now':''}"></i>`).join('')}</div>`}
/* ---------- voz Tintaflix ---------- */
const B=t=>`<b>${esc(t)}</b>`;
const CITYN=r=>r.c.id==='galapagos'?'San Cristóbal':r.c.name;
function sameCityMayor(r){const c=norm(r.c.id==='galapagos'?'SAN CRISTOBAL':r.c.name);return r.e.find(([a,b])=>/\bALCALDES?A?\b/.test(norm(a))&&!/VICE/.test(norm(a))&&norm(b||'').includes(c))}
function firstRole(r,rx){return r.e.find(([a])=>rx.test(norm(a)))}
function incumbent(r){const m=sameCityMayor(r);return m&&/en funciones/.test(rolePeriod(r,m[0]))}
function yearsSpan(r){const ys=[];(r.per||[]).forEach(([,lab])=>{(lab.match(/\d{4}/g)||[]).forEach(y=>ys.push(+y))});if(r.ult)ys.push(r.ult[2]);if(!ys.length)return '';const a=Math.min(...ys),b=Math.max(...ys);return a===b?String(a):`${a}–${b}`}
function synopsisHTML(r){
 const city=CITYN(r),n=r.e.length,f0=r.f[0]?lc(r.f[0]).replace(/\.$/,''):'';
 const mayor=sameCityMayor(r),pref=firstRole(r,/PREFECT/),gob=firstRole(r,/GOBERNADOR/),min=firstRole(r,/^MINISTR|^VICEMINISTR/),asam=firstRole(r,/^ASAMBLE|DIPUTAD|PARLAMENTARI/),conc=firstRole(r,/^CONCEJAL/),otherMayor=!mayor&&firstRole(r,/\bALCALDES?A?\b/);
 const per=x=>x?rolePeriod(r,x[0]):'';
 let a='';
 if(mayor&&incumbent(r)) a=`${r.short} ${B('ya tiene las llaves del Municipio')}: gobierna ${city} desde 2023 y ahora pide ${B('la reelección')} por ${r.org}. La temporada anterior se juzga en esta papeleta.`;
 else if(mayor) a=`${r.short} ${B('ya fue '+(/A$/.test(norm(mayor[0]))?'alcaldesa':'alcalde')+' de '+city)}${per(mayor)?' ('+per(mayor)+')':''} y vuelve al ring por ${r.org}. ¿Segunda temporada o repetición?`;
 else if(pref||gob) a=`${r.short} viene de la ${pref?'Prefectura':'Gobernación'}${per(pref||gob)?' ('+per(pref||gob)+')':''} y ahora apunta ${B('al sillón municipal de '+city)} con ${r.org}. Cambio de escenario, misma provincia.`;
 else if(min) a=`${r.short} baja del Gobierno nacional al territorio: fue ${B(lc(min[0]))}${per(min)?' ('+per(min)+')':''} y ahora quiere ${B('la Alcaldía de '+city)} por ${r.org}.`;
 else if(otherMayor) a=`${r.short} ya gobernó un cantón: ${B(lc(otherMayor[0])+(otherMayor[1]?' en '+tc(gad(otherMayor[1])):''))}${per(otherMayor)?' ('+per(otherMayor)+')':''}. Ahora sube la apuesta: ${B(city)}, por ${r.org}.`;
 else if(asam) a=`${r.short} pasó por ${B('la Asamblea')}${per(asam)?' ('+per(asam)+')':''} y ahora cambia la curul por ${B('la Alcaldía de '+city)}, con ${r.org}.`;
 else if(conc) a=`${r.short} conoce el Concejo de ${city} por dentro: fue ${B('concejal')}${per(conc)?' ('+per(conc)+')':''}. Ahora quiere ${B('presidirlo como alcalde'+(/A$/.test(norm(r.short.split(' ')[0]))?'sa':''))}, por ${r.org}.`;
 else if(n) a=`${r.short} llega por ${r.org} ${B('sin cargos de elección popular')}, pero con ${n===1?'un cargo':n+' cargos'} en el sector público en la hoja de vida.${r.ult?' El último: '+lc(r.ult[0])+' ('+r.ult[2]+').':''}`;
 else a=`${r.short} ${B('debuta en la papeleta')} por ${r.org}: la hoja de vida inscrita no registra cargos públicos previos. Carta nueva sobre la mesa de ${city}.`;
 const b=f0?`De formación, ${tc(f0)}.`:'La hoja de vida no registra formación académica.';
 const c=(r.p2||r.prop)?`Promete en ${B('seguridad, movilidad, agua y ambiente')}: siete capítulos para ver si el guion aguanta.`:(r.plan?'Su plan de trabajo está en revisión; los capítulos de propuestas llegan pronto.':'Su plan de trabajo no está disponible en el CNE: cuatro capítulos sin guion.');
 return `${a} ${b} ${c}<br><br>📍 Capítulo final: 29 de noviembre de 2026.`}
function synopsis(r){return synopsisHTML(r).replace(/<br>/g,' ').replace(/<[^>]+>/g,'')}
function originHTML(r){if(!r.f.length)return `Toda serie tiene un piloto, pero aquí ${B('la hoja de vida no registra formación académica')}. El capítulo arranca directo en la cancha.`;
 const f=r.f.map(x=>tc(x).replace(/\.$/,''));return `Antes de la papeleta, ${B(f[0])}${f.length>1?' y '+(f.length-1===1?'un título más: '+f[1]:(f.length-1)+' títulos más: '+f.slice(1).join(', ')):''}. ${f.length>2?'Un origen con varias temporadas de aula.':'Así empieza la historia.'}`}
function trayHTML(r){if(!r.e.length)return `El capítulo más corto de la temporada: ${B('ningún cargo público previo')} en la hoja de vida inscrita. Todo por escribir.`;
 const n=r.e.length,span=yearsSpan(r);const acts=r.e.slice(0,4).map(([a,b],i)=>{const per=rolePeriod(r,a);return `${B('Acto '+(i+1))}${per?' ('+per+')':''}: ${tc(a)}${b?', '+tc(gad(b)):''}`});
 let s=`${n===1?'Una temporada de un solo acto':'Una temporada de '+n+' actos'}${span&&span.includes('–')?' entre '+span:''}. `+acts.join(' · ')+(n>4?` · y ${n-4} más`:'')+'.';
 if(r.ult)s+=` Última escena registrada: ${B(r.ult[0]+', '+r.ult[1]+' ('+r.ult[2]+')')}.`;
 return s+' ¿Suma o resta en la papeleta?'}
function expHTML(r){if(r.nc)return `Para las candidaturas de ${esc(r.c.name)} ${B('no hicimos')} la consulta a registros públicos (antecedentes penales, obligaciones con el SRI y pensiones alimenticias): no afirmamos ni descartamos nada sobre esos tres registros.`;const hits=CHECKS.filter(([f])=>r.fl.includes(f)).map(([,l])=>l);const miss=CHECKS.filter(([f])=>!r.fl.includes(f)).map(([,l])=>l);
 if(!hits.length)return `El capítulo que nadie quiere protagonizar: antecedentes penales, obligaciones con el SRI y pensiones alimenticias. ${r.short} ${B('no registra nada en los tres')}. Expediente limpio en esta consulta.`;
 return `El capítulo que nadie quiere protagonizar. En la consulta a registros públicos, ${r.short} ${B('SÍ registra: '+hits.join(' y '))}${miss.length?'; no registra '+lc(miss.join(' ni ')):''}. Dato duro, sin adjetivos.`}
const slugify=t=>norm(t).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
function foto(r,kind){const F=(window.FOTOS||{})[r.key];if(F){const P='fotos/'+r.c.id+'-'+F;if(kind==='foto')return P+'-foto.webp';if(kind==='clg')return P+'-clg.webp';if(r.c.id==='quito'){if(kind==='retrato')return P+'-retrato.webp';if(kind==='recorte'||kind==='portada')return P+'-recorte.webp'}if(/^g\d$/.test(kind))return P+'-'+kind+'.webp';if(kind==='cara')return P+'-cara.webp'}
 const base=r.c.id+'-'+slugify(r.short);const list=window.FOTOS_OK||[];const f=base+'-'+kind;if(list.includes(f))return (window.FOTO_BASE||'fotos/')+f+'.jpg';
 if(kind.startsWith('eje-')){const g=r.c.id+'-'+kind.slice(4);if(list.includes(g))return (window.FOTO_BASE||'fotos/')+g+'.jpg'}return ''}
/* =====================================================================
   TINTAFLIX 2026 · aplicación
   ===================================================================== */
const md=s=>esc(s).replace(/\*\*(.+?)\*\*/g,'<b>$1</b>');
const paras=s=>String(s||'').split(/\n\n+/).map(p=>`<p>${md(p)}</p>`).join('');
const NODET=/^El plan no (detalla|incluye)/i;
const THEMES=[
 {k:'seg',ax:'Seguridad',t:'¿Quién vigila la ciudad?',tag:'Cámaras, barrios, prevención y coordinación entre instituciones.',c:'#ffb340',c2:'#ff5a3c',ic:'escudo',sc:'seguridad'},
 {k:'mov',ax:'Movilidad',t:'Atrapados en el tráfico',tag:'Metro, buses, obras viales, veredas y baches.',c:'#4da3ff',c2:'#7b6bff',ic:'bus',sc:'movilidad'},
 {k:'agua',ax:'Agua',t:'Cuando el grifo deja de sonar',tag:'Agua potable, alcantarillado, ríos y lluvias.',c:'#3fd3ff',c2:'#2a7bff',ic:'gota',sc:'agua'},
 {k:'amb',ax:'Ambiente y riesgos',t:'Una ciudad bajo presión',tag:'Basura, riesgos, áreas verdes y clima.',c:'#5ddc8a',c2:'#1fa86a',ic:'arbol',sc:'ambiente'}];
const TH=Object.fromEntries(THEMES.map(t=>[t.k,t]));
const DOCTH={origen:{c:'#e3c58f',c2:'#8a6a3a',ic:'birrete',sc:'origen'},tray:{c:'#e3c58f',c2:'#8a6a3a',ic:'maletin',sc:'tray'},exp:{c:'#ff6b5e',c2:'#7a1d17',ic:'sello',sc:'exp'}};
const thOf=id=>TH[id]||DOCTH[id];
const EPS=[{id:'origen',k:'Formación',def:'El origen'},{id:'tray',k:'Trayectoria',def:'La trayectoria'},{id:'exp',k:'Consultas públicas',def:'El expediente'},...THEMES.map(t=>({id:t.k,k:t.ax,def:t.t}))];
const STL={titulo:'',apertura:'Así empieza',indice:'En este capítulo',problema:'El problema',propuesta:'La propuesta',significa:'¿Qué significa?',como:'¿Cómo lo haría?',detalles:'Los detalles',falta:'Lo que el plan no dice',puente:'Siguiente',cierre:'El cierre',archivo:'Del archivo',final:'Fin del capítulo'};
const VOPTS=[['si','Me convence'],['info','Me falta información'],['no','No me cierra']];
const VLBL=Object.fromEntries(VOPTS);
const PLAY='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>';
const SVGI={
 home:'<path d="M4 11l8-7 8 7v9h-5v-6H9v6H4z"/>',grid:'<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',
 cmp:'<rect x="3" y="5" width="7" height="14" rx="1.5"/><rect x="14" y="5" width="7" height="14" rx="1.5"/><path d="M12 3v18"/>',list:'<path d="M4 6h16M4 12h16M4 18h10"/>',
 back:'<path d="M15 5l-7 7 7 7"/>',close:'<path d="M6 6l12 12M18 6L6 18"/>',next:'<path d="M9 5l7 7-7 7"/>',plus:'<path d="M12 5v14M5 12h14"/>',check:'<path d="m5 12 5 5 9-10"/>',
 doc:'<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4M9.5 12h6M9.5 16h6"/>',pause:'<path d="M8 5v14M16 5v14"/>',pin:'<path d="M12 21s-6-6.5-6-11a6 6 0 0 1 12 0c0 4.5-6 11-6 11z"/><circle cx="12" cy="10" r="2"/>',down:'<path d="M6 9l6 6 6-6"/>',trash:'<path d="M5 7h14M10 7V4h4v3M7 7l1 13h8l1-13"/>',ext:'<path d="M14 4h6v6M20 4l-9 9M18 14v6H4V6h6"/>'};
const svg=n=>`<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">${SVGI[n]}</svg>`;

/* ---------- estado persistente ---------- */
const store={get(k,d){try{return JSON.parse(localStorage.getItem('tfx2_'+k))??d}catch(e){return d}},set(k,v){try{localStorage.setItem('tfx2_'+k,JSON.stringify(v))}catch(e){}}};
const ST={city:store.get('city',null),cmp:store.get('cmp',{}),prog:store.get('prog',{}),verd:store.get('verd',{}),season:store.get('season',{}),cmpTheme:store.get('cmpTheme',null)};
const save=k=>store.set(k,ST[k]);
const cityById=id=>CITIES.find(c=>c.id===id);
const curCity=()=>cityById(ST.city)||CITIES[0];
const cmpList=()=>(ST.cmp[curCity().id]||[]).filter(k=>byKey(k));
const inCmp=k=>cmpList().includes(k);
function toggleCmp(k,quiet){const id=byKey(k).c.id;const L=(ST.cmp[id]||[]).filter(x=>x!==k);const add=!inCmp(k);if(add)L.push(k);ST.cmp[id]=L;save('cmp');syncCmp();if(window.CINE)CINE.onCmp();if(quiet)return;
 const r=byKey(k);toast(add?`${svg('check')} <b>${esc(r.short)}</b>: añadida a tu lista`:`${esc(r.short)} salió de tu lista`,add&&cmpList().length>=2?{label:`Comparar candidaturas (${cmpList().length})`,go:'#comparar'}:add?{label:'Ver lista',go:'#milista'}:null)}
function syncCmp(){const n=cmpList().length;document.querySelectorAll('[data-cmpcount]').forEach(e=>{e.textContent=n;e.hidden=!n});
 document.querySelectorAll('[data-cmp]').forEach(b=>{const on=inCmp(b.dataset.cmp);b.classList.toggle('on',on);b.setAttribute('aria-pressed',on);b.innerHTML=on?`${svg('check')}<span>${b.dataset.short?'En tu lista':'Añadido a tu lista'}</span>`:`${svg('plus')}<span>${b.dataset.short?'Comparar':'Añadir para comparar'}</span>`});
 const tray=$('tray');if(tray){tray.hidden=!n||/^#(comparar|ver|intro|ciudad)/.test(location.hash)||!location.hash;tray.innerHTML=n?`<div class="trayin"><span class="tavs">${cmpList().map(k=>`<i style="--pc:${byKey(k).pc}">${esc(initials(byKey(k)))}</i>`).join('')}</span><span class="tt">${n===1?'1 candidatura en tu lista · añade otra para comparar':n+' candidaturas en tu lista'}</span><a class="btn ${n>=2?'pri':'ghost'}" href="#comparar">${n>=2?'Comparar '+n:'Ver lista'}</a></div>`:''}}
const initials=r=>{const p=r.short.split(' ');return (p[0][0]+(p.length>1?p[p.length-1][0]:'')).toUpperCase()};
const progOf=(r,id)=>ST.prog[r.key+'|'+id];
const verdKey=(r,id)=>r.key+'|'+id;

/* ---------- toasts ---------- */
let toastT=0;
function toast(html,act){const t=$('toast');t.innerHTML=`<span>${html}</span>${act?`<a class="tbtn" href="${act.go}">${act.label}</a>`:''}`;t.classList.add('on');clearTimeout(toastT);toastT=setTimeout(()=>t.classList.remove('on'),4200)}

/* ---------- contenido por candidatura ---------- */
const rich=r=>(window.RICH||{})[r.c.id+':'+r.sur]||null;
const listN=r=>{const n=parseInt(r.lista);return isNaN(n)?999:n};
const FIRST={quito:'MERINO'};
const cityList=c=>{const L=c.list.slice().sort((a,b)=>listN(a)-listN(b)||a.short.localeCompare(b.short,'es'));const f=FIRST[c.id];if(f){const i=L.findIndex(r=>r.sur===f);if(i>0)L.unshift(L.splice(i,1)[0])}return L};
function props(r,k){const R=rich(r);if(R&&R[k]&&R[k].props)return R[k].props.map(p=>({...p,rich:true}));
 const L=r.p2&&r.p2[k];if(!L)return null;
 return L.map((x,i)=>({id:k+i,t:x.t,q:x.q,c:x.c,p:[x.p],icon:((window.iconsFor?iconsFor(x.t+' '+x.q,1):[])[0]||[TH[k].ic])[0],nodet:NODET.test(x.c)}))}
function genericSyn(r,e){
 if(e.id==='origen')return `<p>${originHTML(r)}</p>`;if(e.id==='tray')return `<p>${trayHTML(r)}</p>`;if(e.id==='exp')return `<p>${expHTML(r)}</p>`;
 const L=props(r,e.id);
 if(!L)return `<p>${r.scan?'Episodio en transcripción: el CNE publicó este plan como imagen escaneada.':(r.plan?'Episodio en producción: estamos revisando su plan de trabajo.':'El plan de trabajo no está disponible en el CNE: no hay guion para este capítulo.')}</p>`;
 if(!L.length)return `<p><b>El plan no incluye propuestas sobre ${esc(lc(e.k))}.</b> Lo decimos tal cual: este capítulo no tiene guion.</p>`;
 const n=L.length;return `<p>${n>=3?`<b>${n} propuestas</b> en este capítulo`:`<b>Solo ${n} ${n===1?'propuesta':'propuestas'}</b> en este tema; el plan no contiene más`}: ${L.map(x=>esc(x.t)).join(' · ')}.</p>`}
function genericWhen(r,e){if(e.id==='origen')return 'Hoja de vida';if(e.id==='tray')return yearsSpan(r)||'Hoja de vida';if(e.id==='exp')return r.nc?'Hoja de vida':'Consulta 2026';return props(r,e.id)?'Plan de trabajo 2027–2031':'Próximamente'}
function epList(r){const E=(rich(r)||{}).eps||{},X=((window.ED||{})[r.key]||{}).eps||{};
 return EPS.map((e,i)=>{const o={...(E[e.id]||{}),...(X[e.id]||{})};return {...e,k:o.k||e.k,n:i+1,t:o.t||e.def,when:o.when||genericWhen(r,e),d:o.d?paras(o.d):genericSyn(r,e),pilot:!!o.pilot,
  ok:['origen','tray','exp'].includes(e.id)||!!props(r,e.id)}})}
function synopsisFor(r){const R=rich(r),X=(window.ED||{})[r.key];if(X&&X.syn)return `<p>${esc(X.syn)}</p>`;return R&&R.synopsis?paras(R.synopsis):`<p>${synopsisHTML(r).replace(/<br><br>/g,'</p><p>')}</p>`}

/* ---------- piezas visuales ---------- */
function cityBg(r){const L=(window.CIUDAD_FOTOS||{})[r.c.id]||[];const n=+String(r.key).split('|')[1]||0;return L.length?L[n%L.length]:''}
const vtn=k=>'p-'+String(k).replace(/[^a-z0-9]/gi,'');
function poster(r,o={}){const ph=foto(r,'foto');const fp=(window.FOCO||{})[r.key]||'50% 22%';const p=r.short.split(' ');const n1=p.length>1?p.slice(0,-1).join(' '):'',n2=p[p.length-1];
 return `<div class="poster nf ${o.cls||''}" style="--pc:${r.pc}">${ph?`<img class="ph" src="${esc(ph)}" alt="" loading="lazy" style="object-position:${fp}">`:`<span class="nophoto" aria-hidden="true"><span>Fotografía pendiente</span></span>`}<span class="grad"></span>
  <img class="tfm" src="img/tintaflix-logo.png" alt="" aria-hidden="true">
  <span class="nm" style="--len:${Math.max(n2.length,4)}"><span class="n1">${esc(n1)}</span><span class="n2">${esc(n2)}</span><span class="org">${esc(r.org)}${r.lista?` · Lista ${esc(r.lista)}`:''}</span></span></div>`}
const THC={seg:['seg-plaza','seg-guardia','seg-camara'],mov:['mov-basilica','mov-metro','mov-ciclista'],agua:['agua-represa','agua-grifo','agua-tubo'],amb:['amb-cascada','amb-guayacan','amb-colibri']};
const THP={seg:['#d93a2b','#f5b301'],mov:['#e5484d','#ffd21f'],agua:['#2f6fb0','#ffd21f'],amb:['#3f8f3a','#ffd21f']};
/* sin ilustraciones vectoriales: las portadas temáticas usan el collage de su capítulo */
window.episodeScene=(type)=>{const m={seguridad:'seg',movilidad:'mov',agua:'agua',ambiente:'amb'}[type];const E=m&&THC[m];
 if(!E)return `<span class="tclg" style="--c1:#2a2a2a;--c2:#3a3a3a"></span>`;
 return `<span class="tclg" style="--c1:${THP[m][0]};--c2:${THP[m][1]}"><img class="b" src="clg/${E[0]}.webp" alt=""><img class="o1" src="clg/${E[1]}.webp" alt=""><img class="o2" src="clg/${E[2]}.webp" alt=""></span>`};
function thumb(r,e){const th=thOf(e.id);const pr=progOf(r,e.id);const E=THC[e.id];const ph=foto(r,'foto');
 /* miniaturas: los episodios temáticos adelantan su collage; los biográficos usan la foto real */
 const BIO={origen:['#ffd21f','#e5484d'],tray:['#e5484d','#2f6fb0'],exp:['#3a3a3a','#ffd21f']}[e.id];const cp=foto(r,'clg');
 const art=BIO?`<span class="tclg bio" style="--c1:${BIO[0]};--c2:${BIO[1]}">${cp?`<img class="cand" src="${esc(cp)}" alt="">`:''}</span>`:E?`<span class="tclg" style="--c1:${THP[e.id][0]};--c2:${THP[e.id][1]}"><img class="b" src="clg/${E[0]}.webp" alt=""><img class="o1" src="clg/${E[1]}.webp" alt=""><img class="o2" src="clg/${E[2]}.webp" alt=""></span>`
  :ph?`<img class="tph" src="${esc(ph)}" alt="" style="object-position:${(window.FOCO||{})[r.key]||'50% 22%'}">`:(window.episodeScene?episodeScene(e.ok?th.sc:'soon',th.c):'');
 return `<div class="thumb${E?' isclg':''}" style="--th:${th.c}">${art}
  <span class="tn">${e.n}</span>${e.ok?`<span class="tplay">${PLAY}</span>`:''}${pr?`<span class="tbar"><i style="width:${Math.round(100*(pr.i+1)/pr.n)}%"></i></span>`:''}</div>`}
const cmpBtn=(r,short)=>`<button class="btn cmpb${short?' sm':''}" data-cmp="${r.key}"${short?' data-short="1"':''} type="button"></button>`;

/* ---------- router ---------- */
const view=()=>$('view');
function route(){const h=decodeURIComponent(location.hash.slice(1));const [v,...a]=h.split('/');
 document.body.dataset.v=v||'intro';closeSheet();if(v!=='ver')try{sessionStorage.removeItem('tfx_ret')}catch(_){}
 if(v!=='ver'&&window.CINE&&CINE.isOpen())CINE.close(true);
 if(!v||v==='intro'){showIntro();return}
 hideIntro();
 if(v==='ciudad'){renderCities();return}
 if((v==='serie'||v==='ver')&&byKey(a[0])&&ST.city!==byKey(a[0]).c.id){ST.city=byKey(a[0]).c.id;save('city')}
 if(!ST.city){location.hash='#ciudad';return}
 setNav(v);
 if(v==='inicio')renderHome();
 else if(v==='serie'&&byKey(a[0]))renderSerie(byKey(a[0]));
 else if(v==='temas')renderTemas();
 else if(v==='tema'&&TH[a[0]])renderTema(a[0]);
 else if(v==='comparar')renderCmp(a[0]);
 else if(v==='milista')renderMiLista();
 else if(v==='apoya'){renderHome();if(window.POSTCRED)POSTCRED.open({from:'menu',onClose:()=>{history.replaceState(null,'','#inicio')}})}
 else if(v==='ver'&&byKey(a[0]))openCine(byKey(a[0]),a[1],+a[2]||0);
 else location.hash='#inicio';
 syncCmp();if(v!=='ver')window.scrollTo(0,0)}
function setNav(v){const m={inicio:'inicio',serie:'inicio',temas:'temas',tema:'temas',comparar:'comparar',milista:'milista'}[v];document.querySelectorAll('[data-nav]').forEach(a=>a.classList.toggle('on',a.dataset.nav===m));
 $('cityName').textContent=CITYN({c:curCity()})}
window.addEventListener('hashchange',route);
/* Continuidad entre escenarios: View Transitions API (con alternativa sin ella) */
function navVT(h){if(!document.startViewTransition||reduce){location.hash=h;return}
 document.startViewTransition(()=>{history.pushState(null,'',h);route()})}
document.addEventListener('click',ev=>{const a=ev.target.closest('a[data-vt]');if(!a||ev.metaKey||ev.ctrlKey)return;const tgt=a.querySelector('.poster,.thumb')||a;
 if(!document.startViewTransition||reduce)return;ev.preventDefault();tgt.style.viewTransitionName=a.dataset.vt;navVT(a.getAttribute('href'))});

/* ---------- INTRO: televisor ---------- */
let introStage=0,introRaf=0,introT=[];
function showIntro(){if(window.INTRO2&&window.INTRO_SCREENS){const I=$('intro');I.hidden=false;document.body.classList.add('lock');if(INTRO2.start(()=>enterTV(true)))return}
 const I=$('intro');I.hidden=false;document.body.classList.add('lock');I.classList.remove('enter','on','logo');introStage=0;
 introT.forEach(clearTimeout);introT=[];
 const cv=$('crt'),cx=cv.getContext('2d');
 const draw=()=>{const d=cx.createImageData(cv.width,cv.height);for(let i=0;i<d.data.length;i+=4){const v=Math.random()*255|0;d.data[i]=v*.85;d.data[i+1]=v*.9;d.data[i+2]=v;d.data[i+3]=255}cx.putImageData(d,0,0);introRaf=requestAnimationFrame(draw)};
 cancelAnimationFrame(introRaf);
 if(!reduce)draw();
 introT.push(setTimeout(()=>I.classList.add('on'),reduce?0:350));
 introT.push(setTimeout(()=>{I.classList.add('logo');cancelAnimationFrame(introRaf)},reduce?0:2300));
 setTimeout(()=>$('enterBtn').focus({preventScroll:true}),reduce?50:2400)}
function hideIntro(){const I=$('intro');if(I.hidden)return;if(window.INTRO2)INTRO2.stop();cancelAnimationFrame(introRaf);introT.forEach(clearTimeout);I.hidden=true;document.body.classList.remove('lock')}
function enterTV(skip){const I=$('intro');store.set('seenIntro',1);
 const go=()=>{location.hash='#ciudad'};
 if(skip||reduce){go();return}
 I.classList.add('enter');setTimeout(go,1150)}

/* ---------- CIUDADES ---------- */
function renderCities(){document.body.dataset.v='ciudad';const CP=window.CIUDAD_FOTOS_COLOR||{};
 view().innerHTML=`<section class="cities nfc"><img class="clogo" src="img/tintaflix-logo.png" alt="TINTAFLIX">
  <h1>¿Qué ciudad quieres ver?</h1><p class="lead">Cada ciudad es una temporada con sus candidaturas a la alcaldía.</p>
  <div class="cgrid2">${CITIES.map((c,i)=>`<a class="city2${c.id===ST.city?' on':''}${CP[c.id]?' has':''}" href="#inicio" data-city="${c.id}" style="--i:${i}">${CP[c.id]?`<img src="${CP[c.id]}" alt="">`:''}<span class="cg"></span><b>${esc(CITYN({c}))}</b><small>${c.list.length} candidaturas${CP[c.id]?'':' · fotografía pendiente'}</small>${window.proxHTML?proxHTML(c.id,CITYN({c}),'chip'):''}</a>`).join('')}</div></section>${window.apoyoHTML?apoyoHTML():''}`;
 view().querySelectorAll('[data-city]').forEach(a=>a.addEventListener('click',ev=>{ST.city=a.dataset.city;save('city');const im=a.querySelector('img');if(im){ev.preventDefault();im.style.viewTransitionName='cityhero';navVT('#inicio')}}))}

/* ---------- INICIO / CATÁLOGO ---------- */
function continueItems(c){return Object.entries(ST.prog).map(([k,v])=>{const [cid,j,ep]=k.split('|');return {r:byKey(cid+'|'+j),ep,v}}).filter(x=>x.r&&x.r.c.id===c.id&&x.v.i<x.v.n-1).sort((a,b)=>b.v.ts-a.v.ts).slice(0,8)}
function contCard(x){const e=epList(x.r).find(e=>e.id===x.ep);return `<a class="cont" data-vt="epcanvas" href="#ver/${encodeURIComponent(x.r.key)}/${x.ep}/${x.v.i}">${thumb(x.r,e)}<span class="ctx"><b>${esc(x.r.short)}</b><span>Cap. ${e.n}: «${esc(e.t)}»</span><small>${Math.round(100*(x.v.i+1)/x.v.n)}% visto · Continuar</small></span></a>`}
function themeCover(k,c){const t=TH[k];return `<a class="tcover" href="#tema/${k}" style="--th:${t.c};--th2:${t.c2}"><span class="tart">${window.episodeScene?episodeScene(t.sc,t.c):''}</span><span class="ttx"><small>${esc(t.ax)}</small><b>${esc(t.t)}</b><span>${esc(t.tag)}</span></span></a>`}
function renderHome(){const c=curCity(),L=cityList(c),cont=continueItems(c),n=cmpList().length;
 const hp=(window.CIUDAD_FOTOS_COLOR||{})[c.id];
 view().innerHTML=`<section class="hero${hp?' photo':''}">${hp?`<div class="hbg"><img src="${hp}" alt="${esc(CITYN({c}))}" style="view-transition-name:cityhero"></div>`:''}<div class="heroin"><p class="kick">Seccionales 2026 · ${esc(CITYN({c}))}</p>
  <h1>La próxima temporada de ${esc(CITYN({c}))}</h1>
  <p class="lead">Conoce las historias, las propuestas y los planes de quienes buscan gobernarla. Elige una candidatura o empieza por el problema que más te preocupa.</p>${window.proxHTML?proxHTML(c.id,CITYN({c}),'hero'):''}
  <div class="hbtns"><a class="btn pri" href="#temas">${svg('grid')}<span>Explorar por tema</span></a><a class="btn ghost" href="#comparar">${svg('cmp')}<span>Comparar</span><i class="badge" data-cmpcount hidden></i></a></div></div></section>
  ${cont.length?`<section class="row"><h2>Continúa explorando</h2><div class="scroller">${cont.map(contCard).join('')}</div></section>`:''}
  <section class="row"><div class="rowh"><h2>Explora las candidaturas</h2><small>${L.length} series · orden de presentación</small></div>
   <div class="scroller posters">${L.map(r=>`<div class="pcard"><a href="#serie/${encodeURIComponent(r.key)}" data-vt="${vtn(r.key)}" aria-label="Ver la serie de ${esc(r.short)}, ${esc(r.org)}">${poster(r)}</a><div class="pmeta">${cmpBtn(r,true)}</div></div>`).join('')}</div></section>
  <section class="row"><div class="rowh"><h2>¿Qué te preocupa de ${esc(CITYN({c}))}?</h2><small>Explora por problema</small></div><div class="scroller tcovers">${THEMES.map(t=>themeCover(t.k,c)).join('')}</div></section>
  <section class="row"><div class="cmpbox"><div><h2>Tu lista de comparación</h2><p>${n?`${n} ${n===1?'candidatura añadida. Añade otra para comparar sus propuestas tema por tema.':'candidaturas añadidas.'}`:'Añade dos o más candidaturas con «Comparar» y míralas lado a lado, tema por tema.'}</p></div><a class="btn ${n>=2?'pri':'ghost'}" href="#comparar">${n>=2?`Comparar ${n} candidatos`:'Ir al comparador'}</a></div></section>
  ${footer()}`;
 syncCmp()}
const footer=()=>(window.apoyoHTML?apoyoHTML():'')+`<footer class="foot"><img src="img/tinta-digital.jpg" alt="Tinta Digital" width="60" height="97"><div><p><b>TINTAFLIX</b> es una producción de Tinta Digital. La gráfica está inspirada en plataformas de streaming; este no es un producto comercial.</p><p>Fuentes: hojas de vida y planes de trabajo inscritos en el CNE; consultas a registros públicos (corte: 24 de noviembre de 2026). No es una encuesta ni recomienda votos. @tintadigitaal</p></div></footer>`;

/* ---------- SERIE (perfil) ---------- */
function renderSerie(r){const eps=epList(r);const R=rich(r);
 const next=eps.find(e=>{const p=progOf(r,e.id);return e.ok&&(!p||p.i<p.n-1)})||eps[0];const np=progOf(r,next.id);
 view().innerHTML=`<section class="serie" style="--pc:${r.pc}">
  <div class="cover nf" style="view-transition-name:${vtn(r.key)}">${foto(r,'foto')?`<img class="ph" src="${esc(foto(r,'foto'))}" alt="${esc(r.short)}" style="object-position:${(window.FOCO||{})[r.key]||'50% 22%'}">`:`<span class="nophoto wide"><span>Fotografía pendiente</span></span>`}<span class="grad"></span>
   <div class="covtx">${r.logo?`<span class="plogo big"><img src="${esc(r.logo)}" alt="${esc(r.org)}"></span>`:''}</div></div>
  <div class="sbody"><a class="backl" href="#inicio">${svg('back')}<span>Catálogo</span></a>
   <p class="smeta">${r.lista?`<span class="lbox">LISTA ${esc(r.lista)}</span>`:''}<span>Seccionales 2026</span><span>Alcaldía de ${esc(CITYN(r))}</span></p>
   <h1 class="sname">${esc(r.short)}</h1>
   <p class="sorg">${esc(r.org)}</p>
   <p class="sgen">Temporada 2026 | 7 capítulos | Política | Drama basado en hechos reales</p>
   <div class="sbtns"><a class="btn pri big" href="#ver/${encodeURIComponent(r.key)}/${next.id}/${np&&np.i<np.n-1?np.i:0}">${PLAY}<span>${np?'Continuar':'Reproducir'}</span></a>${cmpBtn(r)}</div>
   ${np?`<p class="snext">Cap. ${next.n}: «${esc(next.t)}» · ${Math.round(100*(np.i+1)/np.n)}% visto</p>`:''}
   <div class="syn">${synopsisFor(r)}</div>
   <dl class="facts"><div><dt>En la papeleta</dt><dd>${esc(r.full)}</dd></div><div><dt>Organización</dt><dd>${esc(r.org)}</dd></div>${r.plan?`<div><dt>Plan de trabajo</dt><dd><a href="${esc(r.plan)}" target="_blank" rel="noopener">Abrir el PDF del CNE ${svg('ext')}</a></dd></div>`:''}</dl>
   ${window.proxHTML?proxHTML(r.c.id,CITYN(r),'serie'):''}<div class="eph"><h2>Episodios</h2><span class="season">Temporada 2026</span></div>
   <ol class="eps">${eps.map(e=>`<li class="ep${e.ok?'':' off'}" style="--th:${thOf(e.id).c}">${e.ok?`<a href="#ver/${encodeURIComponent(r.key)}/${e.id}/0" data-vt="epcanvas" aria-label="Reproducir capítulo ${e.n}">${thumb(r,e)}</a>`:thumb(r,e)}
     <div class="eptx"><h3>Capítulo ${e.n}: «${esc(e.t)}»</h3><p class="epmeta"><span class="tchip">${esc(e.k)}</span><span>${esc(e.when)}</span>${e.pilot?'<span class="nchip">Nuevo formato</span>':''}</p><div class="epd">${e.d}</div>
     ${verdChip(r,e.id)}</div></li>`).join('')}</ol>
  </div></section>${footer()}`;
 syncCmp()}
function verdChip(r,id){const v=ST.verd[verdKey(r,id)];return v?`<p class="vchip">Tu impresión: <b>${VLBL[v.v]}</b> · <a href="#milista">ver en Mi lista</a></p>`:''}

/* ---------- TEMAS ---------- */
function renderTemas(){const c=curCity();view().innerHTML=`<section class="pageh"><p class="kick">${esc(CITYN({c}))} · Explorar por problema</p><h1>¿Qué te preocupa de tu ciudad?</h1><p class="lead">Elige un tema y mira qué plantea cada candidatura, sin pasar por cada perfil.</p></section>
 <section class="tgrid">${THEMES.map(t=>themeCover(t.k,c)).join('')}</section>${footer()}`}
function renderTema(k){const c=curCity(),t=TH[k],L=cityList(c);
 view().innerHTML=`<section class="temah" style="--th:${t.c};--th2:${t.c2}"><span class="tart">${window.episodeScene?episodeScene(t.sc,t.c):''}</span><div class="temtx"><a class="backl" href="#temas">${svg('back')}<span>Temas</span></a><p class="kick">${esc(t.ax)} · ${esc(CITYN({c}))}</p><h1>${esc(t.t)}</h1><p class="lead">${esc(t.tag)} Esto plantea cada una de las ${L.length} candidaturas.</p></div></section>
  <section class="tlist">${L.map(r=>{const P2=props(r,k);const e=epList(r).find(e=>e.id===k);
   return `<article class="tcand" style="--pc:${r.pc}"><header><span class="av">${esc(initials(r))}</span><div><h2>${esc(r.short)}</h2><p>${r.lista?'Lista '+esc(r.lista)+' · ':''}${esc(r.org)}</p></div></header>
    ${P2===null?`<p class="muted">${r.plan?'Su plan está en revisión.':'Su plan de trabajo no está disponible en el CNE.'}</p>`:!P2.length?`<p class="muted">Su plan no incluye propuestas sobre este tema.</p>`:
    `<p class="pcount">${P2.length>=3?P2.length+' propuestas':'Solo '+P2.length+(P2.length===1?' propuesta':' propuestas')+' (el plan no contiene más)'}</p><ol class="plist">${P2.map(x=>`<li>${window.ICON?`<span class="pi">${ICON(x.icon||t.ic)}</span>`:''}<span>${esc(x.t)}${x.nodet?' <small class="nd">sin mecanismo</small>':''}</span></li>`).join('')}</ol>`}
    <div class="tbtns">${P2?`<a class="btn sm" href="#ver/${encodeURIComponent(r.key)}/${k}/0">${PLAY}<span>Cap. ${e.n}: «${esc(e.t)}»</span></a>`:''}${cmpBtn(r,true)}</div></article>`}).join('')}</section>
  <div class="tfoot"><a class="btn pri" href="#comparar/${k}">${svg('cmp')}<span>Comparar candidaturas en ${esc(lc(t.ax))}</span></a></div>${footer()}`;
 syncCmp()}

/* ---------- COMPARADOR ---------- */
const CMPT=[['tray','Trayectoria'],...THEMES.map(t=>[t.k,t.ax])];
function subOf(k,x){const S=(window.SUBS||{})[k]||[];if(x.sub)return x.sub;const txt=x.t+' '+(x.q||'');const hit=S.filter(([,,rx])=>rx.test(x.t));if(hit.length)return [hit[0][0]];const h2=S.find(([,,rx])=>rx.test(txt));return [h2?h2[0]:'otros']}
function cmpEntry(r,k,x){if(x.cmp){const c=x.cmp;return {t:x.t,propone:c.propone,significa:c.significa,como:c.como,inst:c.inst,rec:c.rec,plazo:c.plazo,ind:c.ind,falta:x.falta,p:c.p,official:x.official}}
 return {t:x.t,propone:null,significa:x.q,como:NODET.test(x.c)?null:x.c.split(/;\s+/),cnodet:NODET.test(x.c)?x.c:null,p:x.p}}
function srcLinks(r,pages){return (pages||[]).filter(Boolean).map(p=>r.plan?`<a href="${esc(r.plan)}#page=${p}" target="_blank" rel="noopener">p. ${p}</a>`:`p. ${p}`).join(', ')}
/* Comparador v2: fotografías, encabezado fijo, tres niveles de lectura. Misma investigación y misma agrupación. */
function face(r,cls){const p=foto(r,'cara');return `<span class="face${cls?' '+cls:''}">${p?`<img src="${esc(p)}" alt="" loading="lazy" decoding="async">`:`<i>${esc(initials(r))}</i>`}</span>`}
let CMP_NEW=null,CMP_OPEN=false,CMP_IO=null;
function cmpGo(k,anchor){const sel=anchor&&anchor.dataset.anchor,top=anchor?anchor.getBoundingClientRect().top:null;
 const run=()=>{renderCmp(k,true);if(sel){const n=view().querySelector(`[data-anchor="${sel}"]`);if(n)window.scrollBy(0,n.getBoundingClientRect().top-top)}};
 if(document.startViewTransition&&!reduce)document.startViewTransition(run);else run()}
function renderCmp(k,keep){const c=curCity();const L=cmpList().map(byKey);if(k&&!CMPT.some(([x])=>x===k))k=null;k=k||(L.length>=2?ST.cmpTheme:null);
 const n=L.length,all=cityList(c);
 let h=`<section class="pageh cmph"><p class="kick">${esc(CITYN({c}))} · Comparador</p><h1>Misma ciudad. Diferentes propuestas.</h1><p class="lead">Elige a quienes quieres comparar y descubre qué proponen para tu ciudad.</p><p class="note">Sin puntajes ni ganadores: las conclusiones son tuyas.</p></section>
 <section class="cmpstep cmpsel"><div class="selh"><h2>Tu selección</h2><small>${n} de ${all.length} candidaturas</small></div>
  ${n?`<div class="selrow">${L.map(r=>`<div class="ccard2${r.key===CMP_NEW?' pop':''}">${face(r,'lg')}<div><b>${esc(r.short)}</b><span>${r.lista?'Lista '+esc(r.lista)+' · ':''}${esc(r.org)}</span></div><button class="iconb" data-rm="${r.key}" aria-label="Quitar a ${esc(r.short)} de la comparación">${svg('close')}</button></div>`).join('')}</div>`:''}
  ${n<2?`<p class="hint">${n?'Elige una candidatura más para empezar a comparar.':'Todavía no has elegido candidaturas. Toca sus fotos para añadirlas.'}</p>`:''}
  <details class="addmore"${n<2||CMP_OPEN?' open':''}><summary>${svg('plus')} ${n?'Añadir o quitar candidaturas':'Elige candidaturas de '+esc(CITYN({c}))}</summary>
   <div class="pick">${all.map(r=>{const on=inCmp(r.key);return `<button class="ptile${on?' on':''}" type="button" data-pick="${r.key}" data-anchor="p-${r.key}" aria-pressed="${on}">${face(r,'lg')}<span class="pt-n"><b>${esc(r.short)}</b><small>${esc(r.org)}</small></span><span class="pt-st" aria-hidden="true">${svg(on?'check':'plus')}</span></button>`}).join('')}</div></details></section>`;
 if(n>=2){h+=`<section class="cmpstep" data-anchor="themes"><h2 class="cq">¿Qué quieres comparar hoy?</h2><div class="chips" role="tablist">${CMPT.map(([x,l])=>`<a class="chipb${x===k?' on':''}" href="#comparar/${x}" data-th="${x}" role="tab" aria-selected="${x===k}">${esc(l)}</a>`).join('')}</div></section>`;
  if(k){ST.cmpTheme=k;save('cmpTheme');h+=`<section class="cmpstep cmpres"><div class="csent" aria-hidden="true"></div>${cmpHead(L,k)}<div class="cmpbody"><h2 class="cmpt">${esc(CMPT.find(([x])=>x===k)[1])}</h2>${k==='tray'?cmpTray(L):cmpTheme(L,k)}</div></section>`}
  else h+=`<p class="hint center">Elige un tema para ver la comparación.</p>`}
 view().innerHTML=h+footer();CMP_NEW=null;
 const V=view();
 V.querySelectorAll('[data-rm]').forEach(b=>b.addEventListener('click',()=>{toggleCmp(b.dataset.rm,true);cmpGo(k,V.querySelector('.cmpsel'))}));
 V.querySelectorAll('[data-pick]').forEach(b=>b.addEventListener('click',()=>{const key=b.dataset.pick;CMP_NEW=inCmp(key)?null:key;CMP_OPEN=true;toggleCmp(key,true);cmpGo(k,b)}));
 const am=V.querySelector('.addmore');am.addEventListener('toggle',()=>{if(!am.open)CMP_OPEN=false});
 V.querySelectorAll('[data-th]').forEach(a=>a.addEventListener('click',ev=>{if(ev.metaKey||ev.ctrlKey)return;ev.preventDefault();const x=a.dataset.th;if(x===k)return;history.replaceState(null,'','#comparar/'+x);cmpGo(x,V.querySelector('[data-anchor="themes"]'))}));
 V.querySelectorAll('[data-vset]').forEach(b=>b.addEventListener('click',()=>{setVerd(byKey(b.dataset.vk),b.dataset.vep,b.dataset.vset);renderCmp(k)}));
 /* encabezado fijo: se compacta al desplazarse y acompaña el desplazamiento horizontal */
 const tp=document.querySelector('.top');document.documentElement.style.setProperty('--toph',(tp?tp.offsetHeight:56)+'px');
 const ch=V.querySelector('.chead'),cs=V.querySelector('.csent'),cx=V.querySelector('.cmpx');
 if(CMP_IO)CMP_IO.disconnect();
 if(ch&&cs&&'IntersectionObserver' in window){CMP_IO=new IntersectionObserver(([e])=>ch.classList.toggle('mini',!e.isIntersecting&&e.boundingClientRect.top<0),{rootMargin:`-${(tp?tp.offsetHeight:56)+4}px 0px 0px 0px`});CMP_IO.observe(cs)}
 if(ch&&cx){const hi=ch.querySelector('.chin');cx.addEventListener('scroll',()=>{hi.style.transform=`translateX(${-cx.scrollLeft}px)`},{passive:true})}
 let ry=null;try{ry=sessionStorage.getItem('tfx_ry');sessionStorage.removeItem('tfx_ry')}catch(_){}
 if(ry!=null&&!keep){const y=+ry;setTimeout(()=>window.scrollTo(0,y),0);setTimeout(()=>window.scrollTo(0,y),400)}
 syncCmp()}
/* recuerda desde dónde se abrió un episodio del comparador (fase de captura: otras capas animan el clic) */
window.addEventListener('click',ev=>{const a=ev.target.closest&&ev.target.closest('a[data-ret]');if(!a)return;try{sessionStorage.setItem('tfx_ret',JSON.stringify({key:a.dataset.ret,hash:location.hash,y:window.scrollY,ts:Date.now()}))}catch(_){}},true);
function cmpHead(L,k){return `<div class="chead" style="--n:${L.length}"><div class="chin">${L.map(r=>{const v=k!=='tray'&&ST.verd[verdKey(r,k)];return `<div class="chc">${face(r)}<div class="chn"><b>${esc(r.short)}</b><small>${esc(r.org)}</small>${v?`<span class="myv">Tu impresión: ${VLBL[v.v]}</span>`:''}</div></div>`}).join('')}</div></div>`}
const who=r=>`<p class="who">${face(r,'sm')}<b>${esc(r.short)}</b></p>`;
function cmpTheme(L,k){const S=[...((window.SUBS||{})[k]||[]),['otros','Otras propuestas']];
 const per=L.map(r=>{const P2=props(r,k);return {r,P2,by:{}}});
 per.forEach(o=>(o.P2||[]).forEach(x=>subOf(k,x).forEach(s=>{(o.by[s]=o.by[s]||[]).push(x)})));
 const used=S.filter(([s])=>per.some(o=>o.by[s]));
 let h=`<p class="note">Agrupación por subtemas hecha por Tinta para facilitar la lectura. Que una candidatura no aparezca en un subtema solo significa que su plan no lo menciona, no que se oponga.</p>`;
 if(per.every(o=>!o.P2||!o.P2.length))return h+`<p class="hint">Ninguna de estas candidaturas tiene propuestas documentadas sobre este tema.</p>`;
 const seen=new Set();h+=`<div class="cmpx" style="--n:${L.length}">`;
 used.forEach(([s,label])=>{h+=`<div class="subt"><h3>${esc(label)}</h3><div class="sgrid">${per.map(o=>{const xs=o.by[s];
   return `<div class="scol">${who(o.r)}${o.P2===null?`<p class="none">Plan no disponible o en revisión.</p>`:!xs?`<p class="none">No aparece en su plan de trabajo.</p>`:xs.map(x=>{const id=o.r.key+x.id;if(seen.has(id)){const nt=x.cmp&&x.cmp.subnote&&x.cmp.subnote[s];return `<article class="pcmp ref"><h4>${esc(x.t)}</h4>${nt?`<p>${esc(nt)}</p>`:''}<p class="note">Es la misma propuesta que aparece más arriba; aquí se destaca la parte que toca este subtema.</p></article>`}seen.add(id);return cmpCard(o.r,k,x,s)}).join('')}</div>`}).join('')}</div></div>`});
 h+=`</div>`;
 const eps=L.map(r=>({r,e:epList(r).find(e=>e.id===k)})).filter(o=>o.e&&props(o.r,k));
 if(eps.length)h+=`<section class="epx"><h3 class="epx-h">¿Quieres entenderlo mejor? <span>Mira el capítulo completo.</span></h3><div class="epx-row">${eps.map(({r,e})=>`<a class="epc" href="#ver/${encodeURIComponent(r.key)}/${k}/0" data-ret="${esc(r.key)}" aria-label="Ver el capítulo ${e.n} de ${esc(r.short)}: ${esc(e.t)}"><span class="epc-th">${thumb(r,e)}<span class="epc-play" aria-hidden="true">${PLAY}</span></span><span class="epc-tx">${face(r,'sm')}<span><b>${esc(r.short)}</b><small>Cap. ${e.n} · «${esc(e.t)}»</small></span></span></a>`).join('')}</div></section>`;
 return h}
function cmpCard(r,k,x){const e=cmpEntry(r,k,x);const ND=t=>`<p class="nd">${t}</p>`;
 const lead=e.propone||e.significa||'';const usedSig=!e.propone&&e.significa;
 const como=e.como||[],c1=como.slice(0,3),c2=como.slice(3);
 const howV=como.length?`<ul>${c1.map(s=>`<li>${esc(s)}</li>`).join('')}</ul>${e.plazo?`<p class="plz"><b>Plazo:</b> ${esc(e.plazo)}</p>`:''}`:(e.plazo?`<p class="plz"><b>Plazo:</b> ${esc(e.plazo)}</p>`:'')+ND('El plan no especifica cómo lo haría.')+(e.cnodet&&e.cnodet.length>45?`<p class="ndx">${esc(e.cnodet.replace(NODET,'').replace(/^[;.,\s]+/,''))}</p>`:'');
 const row=(l,v)=>v?`<div class="crow"><dt>${l}</dt><dd>${v}</dd></div>`:'';
 return `<article class="pcmp"><h4>${esc(e.t)}</h4>
  ${lead?`<div class="lv"><p class="lq">¿Qué propone?</p><p class="l1">${esc(lead)}</p></div>`:''}
  <div class="lv"><p class="lq">¿Cómo lo haría?</p>${howV}</div>
  <div class="lv"><p class="lq">¿Con qué recursos?</p>${e.rec?`<p>${esc(e.rec)}</p>`:ND('El plan no especifica presupuesto ni financiamiento.')}</div>
  <details class="more"><summary><span>Ver más detalles</span>${svg('next')}</summary><div class="mbody"><dl>
   ${c2.length?row('Más acciones',`<ul>${c2.map(s=>`<li>${esc(s)}</li>`).join('')}</ul>`):''}
   ${usedSig?'':row('¿Qué significa?',esc(e.significa||''))}
   ${row('Instituciones',esc(e.inst||''))}${row('Indicadores',esc(e.ind||''))}
   ${row('El plan no especifica',e.falta&&e.falta.length?`<ul class="falta">${e.falta.map(s=>`<li>${esc(s)}</li>`).join('')}</ul>`:'')}
   ${row('Fuente',`Plan de trabajo (CNE), ${srcLinks(r,e.p)}`)}</dl></div></details></article>`}
function cmpTray(L){const row=(l,f)=>`<div class="subt"><h3>${l}</h3><div class="sgrid">${L.map(r=>`<div class="scol">${who(r)}${f(r)}</div>`).join('')}</div></div>`;
 return `<p class="note">Datos de la hoja de vida inscrita en el CNE y de consultas a registros públicos (corte: 24 de noviembre de 2026).</p><div class="cmpx" style="--n:${L.length}">
  ${row('Formación',r=>r.f.length?`<ul>${r.f.map(x=>`<li>${esc(tc(x))}</li>`).join('')}</ul>`:'<p class="none">No registra formación académica.</p>')}
  ${row('Cargos públicos en la hoja de vida',r=>r.e.length?`<ul>${r.e.map(([a,b])=>{const per=rolePeriod(r,a);return `<li><b>${esc(tc(a))}</b>${b?`, ${esc(tc(gad(b)))}`:''}${per?` <small>(${esc(per)})</small>`:''}</li>`}).join('')}</ul>`:'<p class="none">No registra cargos públicos previos.</p>')}
  ${row('Último cargo registrado',r=>r.ult?`<p>${esc(r.ult[0])}, ${esc(r.ult[1])} (${r.ult[2]})</p>`:'<p class="none">No especificado.</p>')}
  ${row('Consultas públicas',r=>r.nc?'<p class="none">No consultado.</p>':`<ul>${CHECKS.map(([f,l])=>`<li>${esc(l)}: <b>${r.fl.includes(f)?'sí registra':'no registra'}</b></li>`).join('')}</ul>`)}</div>`}

/* ---------- MI LISTA ---------- */
function setVerd(r,id,v){const k=verdKey(r,id);if(v==='del')delete ST.verd[k];else ST.verd[k]={v,ts:Date.now()};save('verd')}
function renderMiLista(){const c=curCity();const cont=continueItems(c);
 const vs=Object.entries(ST.verd).map(([k,v])=>{const [cid,j,ep]=k.split('|');return {r:byKey(cid+'|'+j),ep,v}}).filter(x=>x.r&&x.r.c.id===c.id).sort((a,b)=>b.v.ts-a.v.ts);
 const L=cmpList().map(byKey);
 view().innerHTML=`<section class="pageh"><p class="kick">${esc(CITYN({c}))}</p><h1>Mi lista</h1><p class="lead">Tu progreso, tus impresiones y tu lista de comparación. Todo se guarda solo en este dispositivo.</p></section>
  <section class="row"><h2>Continúa explorando</h2>${cont.length?`<div class="scroller">${cont.map(contCard).join('')}</div>`:'<p class="hint">Cuando empieces un episodio, aparecerá aquí para retomarlo donde lo dejaste.</p>'}</section>
  <section class="row"><h2>Tus impresiones</h2><p class="note">Notas personales para reflexionar. No son una encuesta, no suman puntos y no se comparten.</p>
   ${vs.length?`<ul class="vlist">${vs.map(x=>{const e=epList(x.r).find(e=>e.id===x.ep);return `<li style="--pc:${x.r.pc}"><div><b>${esc(x.r.short)}</b><span>Cap. ${e.n}: «${esc(e.t)}» · ${esc(e.k)}</span></div>
     <div class="vopts">${VOPTS.map(([v,l])=>`<button class="chipb sm${x.v.v===v?' on':''}" data-vk="${x.r.key}" data-vep="${x.ep}" data-vset="${v}">${l}</button>`).join('')}<button class="iconb" data-vk="${x.r.key}" data-vep="${x.ep}" data-vset="del" aria-label="Borrar impresión">${svg('trash')}</button></div></li>`}).join('')}</ul>`:'<p class="hint">Al final de cada capítulo de propuestas puedes dejar tu impresión: «Me convence», «Me falta información» o «No me cierra».</p>'}</section>
  ${(()=>{const SL={no:'Por ahí no es',mmm:'Mmm… sigo pensando',si:'Sí, va conmigo'};const ss=Object.entries(ST.season).map(([k,v])=>({r:byKey(k),v})).filter(x=>x.r&&x.r.c.id===c.id&&SL[x.v.v]).sort((a,b)=>b.v.ts-a.v.ts);return ss.length?`<section class="row"><h2>Tus reacciones de fin de temporada</h2><p class="note">Solo tuyas. No son votos ni rankings.</p><ul class="vlist">${ss.map(x=>`<li style="--pc:${x.r.pc}"><div><b>${esc(x.r.short)}</b><span>¿Sus propuestas van contigo?</span></div><div class="vopts"><span class="chipb sm on">${SL[x.v.v]}</span><button class="iconb" data-sdel="${x.r.key}" aria-label="Borrar reacción">${svg('trash')}</button></div></li>`).join('')}</ul></section>`:''})()}
  <section class="row"><h2>Tu lista de comparación</h2>${L.length?`<div class="clist">${L.map(r=>`<div class="ccard" style="--pc:${r.pc}"><span class="av">${esc(initials(r))}</span><div><small>${r.lista?'LISTA '+esc(r.lista):''}</small><b>${esc(r.short)}</b><span>${esc(r.org)}</span></div></div>`).join('')}</div><p><a class="btn ${L.length>=2?'pri':'ghost'}" href="#comparar">${L.length>=2?'Comparar '+L.length+' candidatos':'Añade otra para comparar'}</a></p>`:'<p class="hint">Aún no has añadido candidaturas.</p>'}</section>${footer()}`;
 view().querySelectorAll('[data-sdel]').forEach(b=>b.addEventListener('click',()=>{delete ST.season[b.dataset.sdel];save('season');toast('Reacción borrada');renderMiLista()}));
 view().querySelectorAll('[data-vset]').forEach(b=>b.addEventListener('click',()=>{const r=byKey(b.dataset.vk);setVerd(r,b.dataset.vep,b.dataset.vset);toast(b.dataset.vset==='del'?'Impresión borrada':`${svg('check')} Impresión actualizada: <b>${VLBL[b.dataset.vset]}</b>`);renderMiLista()}))}

/* =====================================================================
   REPRODUCTOR · escenas
   ===================================================================== */
function sc(o){return Object.assign({pi:-1,p:[],src:'plan'},o)}
function buildScenes(r,e){const th=thOf(e.id);const S=[];
 S.push(sc({st:'titulo',h:e.t,b:e.d,src:'none'}));
 if(e.id==='origen'){
  S.push(sc({st:'archivo',h:r.f.length?'Lo que dice la hoja de vida':'Sin títulos registrados',b:r.f.length?`<p>${originHTML(r)}</p>`:'<p>La hoja de vida inscrita no registra formación académica.</p>',viz:'diplomas',vizo:{items:r.f.map(x=>tc(x).replace(/\.$/,''))},src:'hv'}));
 }else if(e.id==='tray'){
  if(!r.e.length)S.push(sc({st:'archivo',h:'Ningún cargo público previo',b:'<p>La hoja de vida inscrita no registra cargos públicos. Todo por escribir.</p>',viz:'icono',vizo:{icon:'documento'},src:'hv'}));
  r.e.forEach(([a,b],i)=>{const per=rolePeriod(r,a);const tag=roleTag(a,b);S.push(sc({st:'archivo',h:tc(a),b:`<p>${b?esc(tc(gad(b))):''}${per?` · <b>${esc(per)}</b>`:''}</p><p class="tagl" style="--tg:${tag[1]}">${esc(tag[0])}</p>`,viz:'archivo',vizo:{r,i},src:'hv',kick:`Acto ${i+1} de ${r.e.length}`}))});
  if(r.ult)S.push(sc({st:'archivo',h:'Última escena registrada',b:`<p><b>${esc(r.ult[0])}</b>, ${esc(r.ult[1])} (${r.ult[2]}).</p>`,viz:'archivo',vizo:{r,i:-1},src:'hv'}));
 }else if(e.id==='exp'){
  S.push(r.nc?sc({st:'archivo',h:'Consulta no realizada',b:`<p>${expHTML(r)}</p>`,viz:'icono',vizo:{icon:'idea'},src:'consulta'}):sc({st:'archivo',h:'Tres consultas, una respuesta',b:`<p>${expHTML(r)}</p>`,viz:'expediente',vizo:{r},src:'consulta'}));
 }else{const R=rich(r);const RX=R&&R[e.id];const L=props(r,e.id)||[];const n=L.length;
  if(RX&&RX.open)RX.open.forEach(s=>S.push(sc({...s,b:paras(s.b)})));
  else S.push(sc({st:'indice',h:n?(n>=3?`${n} propuestas en este capítulo`:`Solo ${n} ${n===1?'propuesta':'propuestas'} en este tema`):'Este plan no incluye propuestas sobre el tema',b:n?(n<3?'<p>El plan no contiene más propuestas sobre este tema. Las vemos una por una: qué plantea, qué significa y cómo dice que lo haría.</p>':'<p>Las vemos una por una: qué plantea, qué significa y cómo dice que lo haría.</p>'):'<p>Revisamos el plan de trabajo completo inscrito en el CNE.</p>',viz:'indice',src:'plan'}));
  L.forEach((x,pi)=>{const base={pi,pn:n,pt:x.t};
   if(x.rich&&x.scenes){x.scenes.forEach(s=>S.push(sc({...base,...s,b:paras(s.b)})))}
   else{S.push(sc({...base,st:'propuesta',h:x.t,b:'',viz:'icono',vizo:{icon:x.icon},p:x.p}));
    S.push(sc({...base,st:'significa',h:x.t,b:paras(x.q),viz:'icono',vizo:{icon:'idea'},p:x.p}));
    if(x.nodet){const rest=x.c.replace(NODET,'').replace(/^[;.,:\s]+/,'');S.push(sc({...base,st:'como',h:x.t,b:`<p class="stamp">El plan no detalla cómo se implementaría</p>${rest?`<p>${md(rest.charAt(0).toUpperCase()+rest.slice(1))}</p>`:''}`,viz:'icono',vizo:{icon:'pregunta'},p:x.p}))}
    else{const steps=x.c.split(/;\s+/);S.push(sc({...base,st:'como',h:x.t,b:steps.length>1?'':paras(x.c),viz:'pasos',vizo:{items:steps},p:x.p}))}}
   if(x.falta&&x.falta.length)S.push(sc({...base,st:'falta',h:'Lo que el plan no dice',b:`<ul class="falta">${x.falta.map(s=>`<li>${esc(s)}</li>`).join('')}</ul>`,viz:'lupa',p:[]}));
   S.push(sc({...base,st:'puente',h:pi<n-1?L[pi+1].t:'Cierre del capítulo',b:'',next:pi<n-1?L[pi+1]:null,src:'none'}))});
  if(RX&&RX.close)RX.close.forEach(s=>S.push(sc({...s,b:paras(s.b)})));
 }
 S.push(sc({st:'final',h:'',b:'',src:'none'}));
 return S}

const P={r:null,e:null,S:[],i:0,auto:false,timer:0};
function openPlayer(r,id,i){const e=epList(r).find(x=>x.id===id&&x.ok);if(!e){location.hash='#serie/'+encodeURIComponent(r.key);return}
 const fresh=P.r!==r||!P.e||P.e.id!==id;P.r=r;P.e=e;if(fresh)P.S=buildScenes(r,e);P.i=Math.max(0,Math.min(i,P.S.length-1));
 const pl=$('player'),th=thOf(e.id);pl.hidden=false;document.body.classList.add('lock');pl.style.setProperty('--th',th.c);pl.style.setProperty('--th2',th.c2);pl.dataset.ep=e.id;
 $('pTitle').innerHTML=`<b>${esc(r.short)}</b><span>Cap. ${e.n} · «${esc(e.t)}»</span>`;
 $('pBg').innerHTML=window.episodeScene?episodeScene(th.sc,th.c):'';
 if(fresh&&!reduce){const w=$('wipe');w.innerHTML=`<div>${window.ICON?ICON(th.ic):''}<b>Capítulo ${e.n} · ${esc(e.k)}</b><span>${esc(e.t)}</span></div>`;w.classList.remove('go');void w.offsetWidth;w.classList.add('go')}
 renderScene(fresh)}
function closePlayer(silent){const pl=$('player');pl.hidden=true;document.body.classList.remove('lock');clearTimeout(P.timer);P.auto=false;const r=P.r;P.r=null;P.e=null;if(!silent&&r)location.hash='#serie/'+encodeURIComponent(r.key)}
function goScene(i,push){P.i=Math.max(0,Math.min(i,P.S.length-1));history.replaceState(null,'',`#ver/${encodeURIComponent(P.r.key)}/${P.e.id}/${P.i}`);renderScene()}
function renderScene(){const s=P.S[P.i],r=P.r,e=P.e,n=P.S.length;
 ST.prog[r.key+'|'+e.id]={i:P.i,n,ts:Date.now()};save('prog');
 /* nivel 1: propuestas del capítulo */
 const pn=P.S.reduce((m,x)=>Math.max(m,x.pi+1),0);
 $('pL1').innerHTML=pn?`<div class="segs" style="--n:${pn}">${Array.from({length:pn},(_,k)=>{const first=P.S.findIndex(x=>x.pi===k);const done=s.pi>k||(s.pi<0&&P.i>first);return `<button class="seg${s.pi===k?' now':done?' done':''}" data-go="${first}" aria-label="Ir a la propuesta ${k+1}"></button>`}).join('')}</div><p class="l1t">${s.pi>=0?`<b>Propuesta ${s.pi+1} de ${pn}</b> · ${esc(s.pt)}`:P.i===0?`${pn} ${pn===1?'propuesta':'propuestas'} en este capítulo`:s.st==='final'?'Capítulo completo':P.S.slice(0,P.i).some(x=>x.pi>=0)?'Cierre del capítulo':'Antes de las propuestas: el contexto'}</p>`
  :`<div class="segs one"><span class="fill" style="width:${Math.round(100*(P.i+1)/n)}%"></span></div><p class="l1t">Escena ${P.i+1} de ${n}</p>`;
 /* nivel 2: momento de la propuesta */
 const steps=s.pi>=0?P.S.map((x,k)=>[x,k]).filter(([x])=>x.pi===s.pi):[];const si=steps.findIndex(([,k])=>k===P.i);
 const l2=steps.length?`<div class="l2"><div class="l2bar">${steps.map(([x,k],j)=>`<button class="${j<si?'done':j===si?'now':''}" data-go="${k}" aria-label="${esc(STL[x.st]||'')}"></button>`).join('')}</div><span>${esc(STL[s.st]||'')}<small> · momento ${si+1} de ${steps.length}</small></span></div>`:'';
 const st=$('pStage');st.dataset.st=s.st;
 let vis='',txt='';
 if(s.st==='titulo'){vis=`<div class="opener"><div class="oico">${window.ICON?ICON(thOf(e.id).ic):''}</div></div>`;
  txt=`<p class="kick">Capítulo ${e.n} · ${esc(e.k)}</p><h2 class="cap">«${esc(e.t)}»</h2><p class="when">${esc(e.when)} · ${esc(r.short)}</p><div class="body">${e.d}</div>`}
 else if(s.st==='puente'){vis=`<div class="bridge"><span class="okc">${svg('check')}</span></div>`;
  txt=`<p class="kick">Propuesta ${s.pi+1} de ${s.pn} · vista</p><h2>${s.next?'Sigue: «'+esc(s.next.t)+'»':'Ya viste todas las propuestas'}</h2><p class="body">${s.next?'Toca «Siguiente» para entrar a la próxima propuesta, o vuelve atrás para repasar esta.':'Queda el cierre del capítulo.'}</p>`}
 else if(s.st==='final'){vis=`<div class="opener"><div class="oico">${svg('check')}</div></div>`;txt=finalHTML(r,e)}
 else if(s.viz==='indice'){const L=props(r,e.id)||[];vis=`<div class="icog">${L.map((x,k)=>`<span style="--d:${.1+k*.1}s"><i>${k+1}</i>${window.ICON?ICON(x.icon||thOf(e.id).ic):''}</span>`).join('')}</div>`;
  txt=`<p class="kick">${esc(STL[s.st])}</p><h2>${esc(s.h)}</h2>${L.length?`<ol class="idx2">${L.map((x,k)=>`<li><b>${k+1}</b><span>${esc(x.t)}</span></li>`).join('')}</ol>`:''}<div class="body">${s.b}</div>`}
 else{vis=vizHTML(s);
  txt=`${l2?l2.replace('</small></span></div>','</small>'+(s.ctx?' <span class="ctxt">Contexto Tinta</span>':'')+'</span></div>'):`<p class="kick">${esc(s.kick||STL[s.st]||'')}${s.ctx?' <span class="ctxt">Contexto Tinta</span>':''}</p>`}<h2 class="${s.st==='propuesta'?'big':''}">${esc(s.h)}</h2><div class="body">${s.b}</div>${s.gl?`<p class="gl"><b>${esc(s.gl[0])}:</b> ${esc(s.gl[1])}</p>`:''}`}
 st.innerHTML=`<div class="sv" aria-hidden="${s.st==='titulo'?'true':'false'}">${vis}</div><div class="stx" tabindex="-1">${txt}</div>`;
 st.querySelector('.stx').scrollTop=0;
 /* pie */
 $('pPrev').disabled=P.i===0;
 const last=P.i===n-1;$('pNext').hidden=last;
 $('pNext').querySelector('span').textContent=s.st==='titulo'?'Empezar':'Siguiente';
 const pages=(s.p||[]).filter(Boolean);
 $('pSrc').hidden=s.src==='none';$('pSrc').querySelector('span').textContent=s.src==='hv'?'Fuente: hoja de vida':s.src==='consulta'?'Fuente: registros públicos':pages.length?`Fuente p. ${pages.join(', ')}`:(s.ctx?'Fuente: contexto Tinta':'Fuente: plan de trabajo');
 $('pAuto').hidden=last;
 $('player').querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>goScene(+b.dataset.go));
 st.querySelectorAll('[data-verd]').forEach(b=>b.onclick=()=>{setVerd(r,e.id,b.dataset.verd);toast(`${svg('check')} Guardado en <b>Mi lista › Tus impresiones</b>: ${VLBL[b.dataset.verd]}`,{label:'Ver',go:'#milista'});renderScene()});
 st.querySelectorAll('[data-delverd]').forEach(b=>b.onclick=()=>{setVerd(r,e.id,'del');toast('Impresión borrada');renderScene()});
 st.querySelectorAll('[data-cmpgo]').forEach(b=>b.onclick=()=>{if(!inCmp(r.key))toggleCmp(r.key);location.hash='#comparar/'+(TH[e.id]?e.id:'tray')});
 schedule()}
function finalHTML(r,e){const eps=epList(r);const nx=eps.slice(e.n).find(x=>x.ok);const isAx=!!TH[e.id];const v=ST.verd[verdKey(r,e.id)];
 return `<p class="kick">Fin del capítulo ${e.n}</p><h2>«${esc(e.t)}»</h2>
 ${isAx?`<div class="verd"><h3>¿Qué te dejó este capítulo?</h3><p class="note">Es una nota personal para tu reflexión: se guarda solo en este dispositivo. No es una encuesta ni suma puntos.</p><div class="vopts">${VOPTS.map(([k,l])=>`<button class="chipb${v&&v.v===k?' on':''}" data-verd="${k}" aria-pressed="${!!(v&&v.v===k)}">${l}</button>`).join('')}</div>
  ${v?`<p class="vsaved">${svg('check')} Guardado: <b>${VLBL[v.v]}</b>. Lo encuentras en <a href="#milista">Mi lista</a> y en el comparador. <button class="linkb" data-delverd>Borrar</button></p>`:''}</div>`:''}
 <div class="endacts">${nx?`<a class="btn pri" href="#ver/${encodeURIComponent(r.key)}/${nx.id}/0">${PLAY}<span>Siguiente: Cap. ${nx.n} «${esc(nx.t)}»</span></a>`:''}
  <a class="btn" href="#serie/${encodeURIComponent(r.key)}">${svg('list')}<span>Volver a los capítulos</span></a>
  <button class="btn" data-cmpgo>${svg('cmp')}<span>Comparar ${isAx?'estas propuestas':'trayectorias'}</span></button>
  <a class="btn ghost" href="#${TH[e.id]?'tema/'+e.id:'inicio'}">${svg('grid')}<span>Continuar explorando</span></a></div>`}
function vizHTML(s){
 if(s.viz==='pasos'){return `<ol class="pasos">${(s.vizo.items||[]).map((x,k)=>`<li style="--d:${.2+k*.35}s"><span class="n">${k+1}</span><span>${md(x.charAt(0).toUpperCase()+x.slice(1))}</span></li>`).join('')}</ol>`}
 if(s.viz==='diplomas'){return `<div class="dipl">${(s.vizo.items.length?s.vizo.items:['Sin registro']).map((x,k)=>`<div class="dp" style="--d:${.2+k*.3}s">${window.ICON?ICON('birrete'):''}<span>${esc(x)}</span></div>`).join('')}</div>`}
 if(s.viz==='archivo'){const r=s.vizo.r;return `<ol class="arch">${r.e.map(([a,b],k)=>{const per=rolePeriod(r,a);return `<li class="${k===s.vizo.i?'now':''}" style="--d:${.1+k*.12}s;--tg:${roleTag(a,b)[1]}"><b>${esc(tc(a))}</b><small>${per?esc(per)+' · ':''}${esc(tc(gad(b||'')))}</small></li>`}).join('')}</ol>`}
 if(s.viz==='expediente'){const r=s.vizo.r;return `<ul class="expv">${CHECKS.map(([f,l,d],k)=>{const hit=r.fl.includes(f);return `<li class="${hit?'hit':''}" style="--d:${.2+k*.35}s"><span class="mk">${hit?'!':svg('check')}</span><span><b>${esc(l)}</b><small>${esc(d)}</small></span><em>${hit?'Sí registra':'No registra'}</em></li>`}).join('')}</ul>`}
 return window.VIZ?VIZ(s.viz||'icono',s.vizo):''}
function nextScene(){if(P.i<P.S.length-1)goScene(P.i+1)}
function prevScene(){if(P.i>0)goScene(P.i-1)}
function schedule(){clearTimeout(P.timer);$('pAuto').innerHTML=P.auto?`${svg('pause')}<span class="al">Pausar</span>`:`${PLAY}<span class="al">Auto</span>`;$('pAuto').setAttribute('aria-label',P.auto?'Pausar avance automático':'Avance automático');$('pAuto').setAttribute('aria-pressed',P.auto);
 if(!P.auto)return;const s=P.S[P.i];if(s.st==='final'){P.auto=false;schedule();return}
 const words=($('pStage').querySelector('.stx').textContent||'').split(/\s+/).length;P.timer=setTimeout(nextScene,Math.max(4500,words*330+2500))}
function openSheet(){const s=P.S[P.i],r=P.r;const pages=(s.p||[]).filter(Boolean);
 let type,doc,links='';
 if(s.src==='hv'){type='Hoja de vida';doc=`Hoja de vida de ${r.full} inscrita en el CNE`}
 else if(s.src==='consulta'){type='Consulta a registros públicos';doc='Antecedentes penales (Ministerio del Interior), obligaciones tributarias en firme (SRI) y pensiones alimenticias pendientes. Corte: 24 de noviembre de 2026.'}
 else{type=s.ctx?'Contexto de Tinta + plan de trabajo':(s.st==='problema'?'Diagnóstico del plan de trabajo':'Propuesta de gobierno');doc=`Plan de trabajo de ${r.short} (${r.org}) inscrito en el Consejo Nacional Electoral`;
  links=r.plan?(pages.length?pages.map(p=>`<a class="btn sm" href="${esc(r.plan)}#page=${p}" target="_blank" rel="noopener">${svg('doc')}<span>Abrir página ${p}</span></a>`).join(''):`<a class="btn sm" href="${esc(r.plan)}" target="_blank" rel="noopener">${svg('doc')}<span>Abrir el plan completo</span></a>`):'<p class="note">El documento no está disponible en línea.</p>'}
 $('sheetBody').innerHTML=`<p class="kick">${esc(type)}</p><h3>Ver fuente</h3><p>${esc(doc)}</p>${pages.length?`<p><b>Páginas:</b> ${pages.join(', ')} (numeración del PDF)</p>`:''}${s.ctx?'<p class="note">Las frases marcadas como «Contexto Tinta» son explicaciones nuestras para entender el tema; no forman parte del plan.</p>':''}<div class="slinks">${links}</div>`;
 $('sheet').hidden=false;requestAnimationFrame(()=>$('sheet').classList.add('on'));$('sheetClose').focus()}
function closeSheet(){const sh=$('sheet');if(!sh)return;sh.classList.remove('on');sh.hidden=true}

/* ---------- eventos globales ---------- */
document.addEventListener('click',ev=>{const b=ev.target.closest('[data-cmp]');if(b){ev.preventDefault();toggleCmp(b.dataset.cmp)}});
$('enterBtn').addEventListener('click',()=>enterTV(false));$('skipBtn').addEventListener('click',()=>enterTV(true));
$('tvScreen').addEventListener('click',()=>{if($('intro').classList.contains('logo'))enterTV(false)});
$('pClose').addEventListener('click',()=>closePlayer());$('pNext').addEventListener('click',nextScene);$('pPrev').addEventListener('click',prevScene);
$('pAuto').addEventListener('click',()=>{P.auto=!P.auto;schedule()});$('pSrc').addEventListener('click',openSheet);
$('sheetClose').addEventListener('click',closeSheet);$('sheet').addEventListener('click',e=>{if(e.target.id==='sheet')closeSheet()});
document.addEventListener('keydown',e=>{if($('player').hidden)return;if(!$('sheet').hidden){if(e.key==='Escape')closeSheet();return}
 if(e.key==='ArrowRight'){nextScene();e.preventDefault()}else if(e.key==='ArrowLeft'){prevScene();e.preventDefault()}else if(e.key==='Escape')closePlayer()});
(()=>{let x0=null,y0=0;const el=$('pStage');el.addEventListener('touchstart',e=>{x0=e.touches[0].clientX;y0=e.touches[0].clientY},{passive:true});
 el.addEventListener('touchend',e=>{if(x0===null)return;const dx=e.changedTouches[0].clientX-x0,dy=e.changedTouches[0].clientY-y0;if(Math.abs(dx)>60&&Math.abs(dx)>Math.abs(dy)*1.5){dx<0?nextScene():prevScene()}x0=null},{passive:true})})();
$('cityBtn').addEventListener('click',()=>{location.hash='#ciudad'});
/* ---------- puente con el reproductor cinematográfico (cine.js) ---------- */
const API={props,rich,th:thOf,tc,gad,rolePeriod,CHECKS,foto,epList,inCmp,toggleCmp,cmpCount:()=>cmpList().length,TH,VOPTS,VLBL,
 verdOf:(r,id)=>ST.verd[verdKey(r,id)],setVerd,seasonOf:r=>ST.season[r.key],setSeason:(r,v)=>{if(v==='del')delete ST.season[r.key];else ST.season[r.key]={v,ts:Date.now()};save('season')},saveProg:(r,id,t,n)=>{ST.prog[r.key+'|'+id]={i:t,n,ts:Date.now()};save('prog')}};
function openCine(r,id,t){const e=epList(r).find(x=>x.id===id&&x.ok);if(!e){location.hash='#serie/'+encodeURIComponent(r.key);return}
 if(!window.CINE){openPlayer(r,id,0);return}
 CINE.open(r,e,t,API)}
window.__T={synopsisFor,byKey,CITIES,ST,P,buildScenes,epList,props,API};

route();
}
/* parallax del billboard del catálogo */
{let tk=0;addEventListener('scroll',()=>{if(tk)return;tk=requestAnimationFrame(()=>{tk=0;const y=Math.min(scrollY,900);const R=document.documentElement.style;R.setProperty('--sy',y+'px');R.setProperty('--so',Math.max(0,1-y/650).toFixed(3))})},{passive:true})}

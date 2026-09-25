"use client";

import { useMemo, useState } from "react";

type Article={id:number;category:string;title:string;summary:string;source:string;time:string;image:string;read:number};
const articles:Article[]=[
{id:1,category:"Tecnologia",title:"A nova corrida pela computação pessoal com inteligência artificial",summary:"Novos dispositivos estão mudando a forma como pessoas trabalham, pesquisam e criam conteúdo.",source:"PAM Tech",time:"18 min atrás",image:"https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",read:6},
{id:2,category:"Brasil",title:"Cidades brasileiras aceleram projetos de mobilidade urbana",summary:"Investimentos em transporte público e integração digital ganham espaço nas grandes regiões metropolitanas.",source:"PAM Brasil",time:"42 min atrás",image:"https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80",read:5},
{id:3,category:"Ciência",title:"O que os novos mapas do oceano revelam sobre o planeta",summary:"Pesquisadores ampliam a resolução de dados usados para estudar correntes e mudanças ambientais.",source:"PAM Ciência",time:"1 h atrás",image:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",read:7},
{id:4,category:"Economia",title:"Pequenos negócios encontram novas formas de vender pela internet",summary:"Ferramentas de pagamento, logística e atendimento estão reduzindo barreiras para empreendedores.",source:"PAM Economia",time:"2 h atrás",image:"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",read:4},
{id:5,category:"Mundo",title:"Uma década de mudanças que redesenhou o mapa da tecnologia",summary:"Da nuvem aos chips, uma retrospectiva das transformações que chegaram ao cotidiano.",source:"PAM Mundo",time:"3 h atrás",image:"https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",read:8},
{id:6,category:"Cultura",title:"Por que os livros continuam encontrando novos leitores",summary:"Clubes, comunidades digitais e bibliotecas estão criando novas portas de entrada para a leitura.",source:"PAM Cultura",time:"4 h atrás",image:"https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80",read:5}
];

const Icon=({name}:{name:string})=>({home:<svg viewBox="0 0 24 24"><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1Z"/></svg>,search:<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>,bookmark:<svg viewBox="0 0 24 24"><path d="M6 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18l-6-4-6 4Z"/></svg>,user:<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>,arrow:<svg viewBox="0 0 24 24"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>,sun:<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>}[name] as React.ReactNode);

export default function Home(){
 const [category,setCategory]=useState("Para você"); const [query,setQuery]=useState(""); const [dark,setDark]=useState(false);
 const [saved,setSaved]=useState<number[]>([]); const [modal,setModal]=useState<"login"|"signup"|null>(null); const [logged,setLogged]=useState(false);
 const cats=["Para você","Brasil","Mundo","Tecnologia","Ciência","Economia","Cultura"];
 const filtered=useMemo(()=>articles.filter(a=>(category==="Para você"||a.category===category)&&(!query||a.title.toLowerCase().includes(query.toLowerCase()))),[category,query]);
 const toggle=(id:number)=>setSaved(s=>s.includes(id)?s.filter(x=>x!==id):[...s,id]);
 return <main className={dark?"dark":""}>
  <header className="top"><div className="wrap nav">
   <div className="brand">PAM<span>.</span></div>
   <nav>{cats.slice(0,5).map(c=><button className={category===c?"active":""} onClick={()=>setCategory(c)} key={c}>{c}</button>)}</nav>
   <div className="actions"><button className="icon" onClick={()=>setDark(!dark)} aria-label="Tema"><Icon name="sun"/></button><button className="login" onClick={()=>setModal(logged?null:"login")}>{logged?<><Icon name="user"/> Gabriel</>: "Entrar"}</button></div>
  </div></header>
  <section className="hero wrap"><div className="eyebrow">SEXTA, 25 DE SETEMBRO</div><h1>O que está acontecendo<br/><em>agora.</em></h1><p>Notícias selecionadas para você, sem ruído e sem transformar cada assunto em uma emergência nacional.</p>
   <div className="search"><Icon name="search"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar notícias, temas ou assuntos..."/><kbd>⌘ K</kbd></div>
  </section>
  <section className="wrap content"><div className="section-head"><div><span className="eyebrow">EM DESTAQUE</span><h2>Leitura do dia</h2></div><button className="link">Ver tudo <Icon name="arrow"/></button></div>
   <div className="featured"><article className="lead"><img src={articles[0].image}/><div className="overlay"><span>{articles[0].category}</span><h3>{articles[0].title}</h3><p>{articles[0].summary}</p><small>{articles[0].source} · {articles[0].time} · {articles[0].read} min</small></div></article>
   <div className="side">{articles.slice(1,3).map(a=><ArticleCard key={a.id} a={a} saved={saved.includes(a.id)} toggle={toggle}/>)}</div></div>
  </section>
  <section className="wrap feed"><div className="section-head"><div><span className="eyebrow">MAIS RECENTES</span><h2>Para acompanhar</h2></div><div className="filters">{cats.slice(1).map(c=><button className={category===c?"sel":""} onClick={()=>setCategory(c)} key={c}>{c}</button>)}</div></div>
   <div className="grid">{filtered.map(a=><ArticleCard key={a.id} a={a} saved={saved.includes(a.id)} toggle={toggle}/>)}</div>
  </section>
  <section className="newsletter wrap"><div><span className="eyebrow">PAM BRIEF</span><h2>As notícias importantes,<br/>sem a gritaria.</h2><p>Um resumo curto no seu e-mail, de segunda a sexta.</p></div><div className="subscribe"><input placeholder="seu@email.com"/><button>Assinar</button></div></section>
  <footer><div className="wrap footer"><div className="brand">PAM<span>.</span></div><p>Informação clara para uma internet barulhenta.</p><span>© 2026 PAM</span></div></footer>
  {modal&&<div className="backdrop" onMouseDown={()=>setModal(null)}><div className="modal" onMouseDown={e=>e.stopPropagation()}><button className="close" onClick={()=>setModal(null)}>×</button><div className="brand">PAM<span>.</span></div><h2>{modal==="login"?"Bem-vindo de volta.":"Crie sua conta."}</h2><p>{modal==="login"?"Entre para salvar notícias e personalizar seu feed.":"Uma conta simples para deixar seu PAM do seu jeito."}</p><input placeholder="E-mail"/><input placeholder="Senha" type="password"/><button className="primary" onClick={()=>{setLogged(true);setModal(null)}}>{modal==="login"?"Entrar":"Criar conta"}</button><button className="switch" onClick={()=>setModal(modal==="login"?"signup":"login")}>{modal==="login"?"Ainda não tenho conta":"Já tenho uma conta"}</button></div></div>}
 </main>
}
function ArticleCard({a,saved,toggle}:{a:Article;saved:boolean;toggle:(id:number)=>void}){return <article className="card"><div className="thumb"><img src={a.image}/><button onClick={()=>toggle(a.id)} className={saved?"saved":""}><Icon name="bookmark"/></button></div><div className="meta"><span>{a.category}</span><span>{a.time}</span></div><h3>{a.title}</h3><p>{a.summary}</p><small>{a.source} · {a.read} min de leitura</small></article>}

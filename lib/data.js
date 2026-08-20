export const categories = ["Vino", "Sake", "Olio", "Clima", "Cultura"];

const vitae = "Fonte originale: Vitae / AIS Italia";

export const articles = [
  {
    slug: "intervista-alterata-fabio-rizzari",
    title: "Un'intervista alterata a Fabio Rizzari",
    subtitle: "Critica, memoria, musica e vino: una conversazione che tratta il bicchiere come fatto culturale.",
    category: "Cultura",
    date: "30 marzo 2026",
    publishedAt: "2026-03-30",
    author: "Carmen Buongiovanni",
    region: "Italia",
    difficulty: "Curioso",
    readTime: "8 min",
    featured: true,
    image: "/images/rizzari.png",
    imageAlt: "Fabio Rizzari durante una conversazione pubblica dedicata al vino",
    textFile: "Fabio Rizzari.txt",
    sourceUrl: "https://vitae.aisitalia.it/un-intervista-alterata-a-fabio-rizzari/",
    sourceLabel: vitae,
    pullQuote: "Il vino diventa più interessante quando smette di essere solo degustazione e torna a essere linguaggio.",
    content: [
      {
        heading: "Una voce prima della tecnica",
        paragraphs: [
          "L'articolo parte dall'incontro con la scrittura di Fabio Rizzari: non una scheda, non una classifica, ma il desiderio di capire una persona che ha attraversato critica, editoria, musica e vino.",
          "Questo è il tono giusto per Kroinos: la cultura viene prima del tecnicismo. Il lettore entra da una storia e solo dopo incontra le parole della degustazione."
        ]
      },
      {
        heading: "Critica come relazione",
        paragraphs: [
          "Nel ritratto emerge un'idea di critica lontana dalla posa del giudizio. Il vino non è ridotto a pregio e difetto, ma diventa una rete di rimandi: memoria, letteratura, musica, ironia, persone.",
          "Per questo ogni articolo di Kroinos dovrebbe tenere insieme racconto e precisione: poche informazioni, ma ordinate; pochi effetti, ma molta attenzione."
        ]
      }
    ],
    glossary: [
      { term: "Critica", text: "Non solo valutazione: un modo di dare contesto e parole all'esperienza." },
      { term: "Sinestesia", text: "Quando una percezione richiama un altro senso: gusto, suono, immagine, memoria." }
    ],
    bottle: "Articolo di cultura del vino",
    notes: { acidity: 42, body: 58, tannins: 22, sweetness: 8, finish: 86 }
  },
  {
    slug: "grandi-langhe-sergio-germano",
    title: "Grandi Langhe e il Piemonte secondo Sergio Germano",
    subtitle: "Dal salone torinese al futuro del Barolo: territorio, clima, comunicazione e nuove forme del vino piemontese.",
    category: "Vino",
    date: "27 febbraio 2026",
    publishedAt: "2026-02-27",
    author: "Carmen Buongiovanni",
    region: "Piemonte",
    difficulty: "Intermedio",
    readTime: "9 min",
    image: "/images/grandi-langhe.png",
    imageAlt: "Sergio Germano interviene a Grandi Langhe",
    textFile: "Grandi Langhe.txt",
    sourceTitle: "Grandi Langhe e il Piemonte del vino secondo Sergio Germano",
    sourceUrl: "https://vitae.aisitalia.it/grandi-langhe-e-il-piemonte-del-vino-secondo-sergio-germano/",
    sourceLabel: vitae,
    pullQuote: "Le Langhe non sono solo un luogo del vino: sono una squadra che deve imparare a raccontarsi insieme.",
    content: [
      {
        heading: "Un evento come termometro",
        paragraphs: [
          "Grandi Langhe diventa il punto da cui leggere una regione intera. Dalla crescita degli espositori all'apertura verso tutto il Piemonte, il salone racconta un territorio che non vuole restare chiuso nella sola fama dei suoi nomi storici.",
          "La voce di Sergio Germano porta il discorso dal successo della fiera alle questioni più decisive: giovani, mercati esteri, sostenibilità, clima, comunicazione."
        ]
      },
      {
        heading: "Tradizione che si muove",
        paragraphs: [
          "Il tema non è sostituire il fascino del Barolo o del Barbaresco, ma capire come proteggerlo in un mondo che cambia. Bag in box, tappo a vite, disciplinari, acqua e calore diventano strumenti di adattamento, non tradimenti automatici.",
          "Il messaggio più utile per Kroinos è semplice: la grandezza di un territorio non si difende rendendolo immobile."
        ]
      }
    ],
    glossary: [
      { term: "Consorzio", text: "Organismo che tutela e promuove denominazioni, produttori e regole di un territorio." },
      { term: "Disciplinare", text: "Insieme di norme che definiscono come può essere prodotto un vino a denominazione." }
    ],
    bottle: "Barolo / Barbaresco / Langhe Nebbiolo",
    notes: { acidity: 82, body: 66, tannins: 84, sweetness: 4, finish: 90 }
  },
  {
    slug: "indicazioni-geografiche-protette-giappone",
    title: "Indicazioni Geografiche Protette in Giappone",
    subtitle: "Un percorso tra identità territoriali, tutela delle origini e cultura produttiva giapponese.",
    category: "Sake",
    date: "30 gennaio 2026",
    publishedAt: "2026-01-30",
    author: "Carmen Buongiovanni",
    region: "Giappone",
    difficulty: "Intermedio",
    readTime: "7 min",
    image: "/images/giappone-igp.png",
    imageAlt: "Grappolo d'uva fotografato in controluce",
    textFile: "Indicazioni geografiche Giappone.txt",
    sourceUrl: "https://vitae.aisitalia.it/indicazioni-geografiche-protette-in-giappone/",
    sourceLabel: vitae,
    pullQuote: "Anche nel sake il territorio non è un fondale: è una grammatica di acqua, riso, clima e tradizione.",
    content: [
      {
        heading: "Origine come identità",
        paragraphs: [
          "Il tema delle indicazioni geografiche in Giappone permette di leggere il sake non come bevanda generica, ma come prodotto legato a luoghi, materie prime e saperi locali.",
          "Per Kroinos è un articolo utile perché avvicina il lettore al concetto di tutela: non un sigillo burocratico, ma un modo per rendere visibile la relazione tra prodotto e territorio."
        ]
      },
      {
        heading: "Cosa significa per chi beve",
        paragraphs: [
          "Una denominazione aiuta a chiedersi da dove venga ciò che si beve e quali caratteristiche siano considerate riconoscibili. Nel vino è un tema familiare; nel sake diventa una porta di ingresso verso un altro sistema culturale.",
          "La scheda Kroinos mantiene il taglio essenziale: luogo, idea centrale, termini chiave, profilo gustativo."
        ]
      }
    ],
    glossary: [
      { term: "Indicazione geografica", text: "Tutela che collega un prodotto a un'origine e a caratteristiche riconoscibili." },
      { term: "Sake", text: "Bevanda fermentata da riso, koji, acqua e lieviti." }
    ],
    bottle: "Sake a indicazione geografica",
    notes: { acidity: 55, body: 48, tannins: 0, sweetness: 22, finish: 72 }
  },
  {
    slug: "mille-modi-per-dire-sake",
    title: "Mille modi per dire sake",
    subtitle: "Mito, nomi, categorie e prime parole per entrare nel lessico del nihonshu.",
    category: "Sake",
    date: "29 dicembre 2025",
    publishedAt: "2025-12-29",
    author: "Carmen Buongiovanni",
    region: "Giappone",
    difficulty: "Accessibile",
    readTime: "8 min",
    image: "/images/processo-sake.png",
    imageAlt: "Dettaglio della lavorazione del sake, introduzione al lessico del nihonshu",
    textFile: "Mille modi per dire sake.txt",
    sourceUrl: "https://vitae.aisitalia.it/mille-modi-per-dire-sake/",
    sourceLabel: vitae,
    pullQuote: "Prima della classificazione arriva il racconto: un dio, un mostro, otto barili e una bevanda antica.",
    content: [
      {
        heading: "Dal mito al vocabolario",
        paragraphs: [
          "L'articolo introduce il sake partendo da una leggenda giapponese: un modo narrativo, non scolastico, per avvicinare una materia complessa.",
          "Da lì il testo passa ai nomi: nihonshu per i giapponesi, sake per il resto del mondo, seishu nel linguaggio legale."
        ]
      },
      {
        heading: "La complessità resa semplice",
        paragraphs: [
          "La forza del pezzo è spiegare termini tecnici senza trasformarli in un elenco sterile. Genshu, tezukuri, ki-ippon e kijoshu diventano modi diversi di raccontare produzione, stile e intenzione.",
          "È il tipo di articolo che Kroinos deve imitare: cultura all'inizio, tecnica nel mezzo, chiarezza fino alla fine."
        ]
      }
    ],
    glossary: [
      { term: "Nihonshu", text: "Nome giapponese del sake." },
      { term: "Genshu", text: "Sake non diluito, più intenso per gradazione e struttura." }
    ],
    bottle: "Nihonshu / Sake",
    notes: { acidity: 50, body: 46, tannins: 0, sweetness: 28, finish: 76 }
  },
  {
    slug: "i-premium-sake",
    title: "I Premium Sake",
    subtitle: "Classificazioni, riso levigato e categorie speciali: come leggere l'architettura dei sake di qualità.",
    category: "Sake",
    date: "21 luglio 2025",
    publishedAt: "2025-07-21",
    author: "Carmen Buongiovanni",
    region: "Giappone",
    difficulty: "Tecnico",
    readTime: "8 min",
    image: "/images/premium-sake.png",
    imageAlt: "Bottiglie di sake premium disposte in una vetrina",
    textFile: "I premium sake.txt",
    sourceUrl: "https://vitae.aisitalia.it/i-premium-sake/",
    sourceLabel: vitae,
    pullQuote: "Nel premium sake la qualità passa anche da una percentuale invisibile: quanto riso resta dopo la levigatura.",
    content: [
      {
        heading: "Dalla tassa alla qualità",
        paragraphs: [
          "L'articolo ricostruisce il passaggio da vecchi sistemi di classificazione, legati anche alla fiscalità, al disciplinare moderno dei sake a designazione speciale.",
          "Il punto chiave è che non tutto il sake viene letto allo stesso modo: ingredienti, alcol aggiunto e levigatura del riso cambiano profondamente lo stile."
        ]
      },
      {
        heading: "Una mappa per orientarsi",
        paragraphs: [
          "Il seimaibuai, cioè la percentuale di riso che rimane dopo la levigatura, è una parola tecnica ma molto concreta: indica quanto il chicco è stato lavorato prima della fermentazione.",
          "Per il lettore, questa scheda diventa un promemoria: dietro la parola premium non c'è lusso generico, ma una grammatica produttiva."
        ]
      }
    ],
    glossary: [
      { term: "Seimaibuai", text: "Percentuale di riso rimasta dopo la levigatura." },
      { term: "Futsushu", text: "Sake ordinario, fuori dalle categorie premium." }
    ],
    bottle: "Junmai / Ginjo / Daiginjo",
    notes: { acidity: 48, body: 44, tannins: 0, sweetness: 18, finish: 82 }
  },
  {
    slug: "max-d-addario-stilista-olio",
    title: "Max D'Addario, lo stilista dell'olio",
    subtitle: "Un'intervista sull'olio come misura, materia, memoria familiare e gesto sartoriale.",
    category: "Olio",
    date: "30 aprile 2025",
    publishedAt: "2025-04-30",
    author: "Carmen Buongiovanni",
    region: "Abruzzo",
    difficulty: "Curioso",
    readTime: "10 min",
    image: "/images/olio.png",
    imageAlt: "Max D'Addario durante una degustazione di olio",
    textFile: "Lo stilista dell'olio.txt",
    sourceUrl: "https://vitae.aisitalia.it/max-d-addario-lo-stilista-dell-olio/",
    sourceLabel: vitae,
    pullQuote: "L'olio può essere sartoriale: non accompagna soltanto un piatto, lo modifica.",
    content: [
      {
        heading: "L'olio come abito su misura",
        paragraphs: [
          "Max D'Addario racconta l'olio con una metafora precisa: il sarto. Ogni cucina ha misure diverse e l'extravergine può essere costruito per valorizzarla.",
          "L'intervista intreccia famiglia, agricoltura, biodinamica, ristorazione e tecnica di frantoio."
        ]
      },
      {
        heading: "Perché resta utile a un sito sul vino",
        paragraphs: [
          "L'articolo non parla solo di olio. Parla di assaggio, materia prima, sensibilità agricola, blend, conservazione e relazione con la tavola: tutti temi vicini al vino.",
          "Per questo Kroinos lo conserva con una nota sensoriale: non una valutazione enologica, ma una traduzione del suo profilo in linguaggio da degustazione."
        ]
      }
    ],
    glossary: [
      { term: "Blend", text: "Assemblaggio di oli o vini lavorati separatamente." },
      { term: "Olivaggio", text: "Lavorazione con cultivar diverse molite insieme." }
    ],
    bottle: "Profilo sensoriale: olio extravergine",
    notes: { acidity: 18, body: 72, tannins: 34, sweetness: 6, finish: 88 }
  },
  {
    slug: "cambiamenti-climatici-scenari-futuri",
    title: "Cambiamenti climatici: scenari futuri",
    subtitle: "Risorse idriche, suolo, biodiversità e agricoltura: il clima come tema centrale anche per il vino.",
    category: "Clima",
    date: "29 aprile 2025",
    publishedAt: "2025-04-29",
    author: "Carmen Buongiovanni",
    region: "Italia",
    difficulty: "Intermedio",
    readTime: "8 min",
    image: "/images/clima.png",
    imageAlt: "Paesaggio agricolo osservato attraverso il tema del cambiamento climatico",
    textFile: "Cambiamenti climatici.txt",
    sourceUrl: "https://vitae.aisitalia.it/cambiamenti-climatici-la-situazione-attuale-e-gli-scenari-futuri/",
    sourceLabel: vitae,
    pullQuote: "Parlare di clima significa parlare anche di acqua, suolo, agricoltura e futuro del bicchiere.",
    content: [
      {
        heading: "Dal convegno alla vigna",
        paragraphs: [
          "Il testo parte da un convegno napoletano sui cambiamenti climatici e allarga il discorso alle risorse idriche, al suolo, alle migrazioni degli uccelli e agli scenari agricoli.",
          "Per Kroinos è importante perché ricorda che il vino non è separato dall'ambiente: dipende da piogge, temperature, acqua disponibile, equilibrio biologico."
        ]
      },
      {
        heading: "Tradurre il clima nel bicchiere",
        paragraphs: [
          "Annate più calde, stress idrico e fenomeni estremi cambiano maturazioni, acidità, alcol, rese e scelte agronomiche.",
          "La scheda non trasforma il clima in allarme generico: lo mette accanto al vino come una delle sue condizioni materiali."
        ]
      }
    ],
    glossary: [
      { term: "Stress idrico", text: "Condizione in cui la pianta non dispone dell'acqua necessaria al suo equilibrio." },
      { term: "Flash flood", text: "Alluvione improvvisa, spesso legata a piogge intense e concentrate." }
    ],
    bottle: "Impatto atteso sui vini mediterranei",
    notes: { acidity: 68, body: 60, tannins: 40, sweetness: 10, finish: 78 }
  },
  {
    slug: "la-questione-nolo",
    title: "La questione NoLo",
    subtitle: "Vini no alcol e low alcol: legislazione, tecnica e domanda culturale sul futuro del bere.",
    category: "Vino",
    date: "4 aprile 2025",
    publishedAt: "2025-04-04",
    author: "Carmen Buongiovanni",
    region: "Europa",
    difficulty: "Tecnico",
    readTime: "7 min",
    image: "/images/nolo.png",
    imageAlt: "Calici e strumenti di laboratorio per l'analisi dei vini NoLo",
    textFile: "Questione NoLo.txt",
    sourceUrl: "https://vitae.aisitalia.it/la-questione-nolo/",
    sourceLabel: vitae,
    pullQuote: "Il NoLo non chiede solo meno alcol: chiede di ridefinire cosa siamo disposti a chiamare vino.",
    content: [
      {
        heading: "Un ritardo culturale e legislativo",
        paragraphs: [
          "L'articolo affronta l'ingresso dei vini dealcolati e low alcol nella discussione italiana, tra ritardi normativi, timori identitari e confronto con l'Europa.",
          "Il punto non è soltanto tecnico: riguarda il modo in cui una cultura del vino protegge la propria idea di eccellenza senza ignorare i cambiamenti del consumo."
        ]
      },
      {
        heading: "La tecnica dietro la sottrazione",
        paragraphs: [
          "Dealcolare non significa semplicemente togliere alcol. Tecniche come osmosi inversa, nanofiltrazione e spinning cone cercano di intervenire sul fermentato preservando il più possibile il profilo aromatico.",
          "La domanda resta aperta: quanto può cambiare un vino prima di diventare un'altra cosa?"
        ]
      }
    ],
    glossary: [
      { term: "NoLo", text: "No alcol o low alcol: bevande senza alcol o a basso contenuto alcolico." },
      { term: "Dealcolazione", text: "Processo con cui si rimuove totalmente o parzialmente l'alcol da un vino." }
    ],
    bottle: "Vino dealcolato / low alcol",
    notes: { acidity: 58, body: 30, tannins: 20, sweetness: 16, finish: 46 }
  },
  {
    slug: "sake-processo-produttivo",
    title: "Il sake, il processo produttivo",
    subtitle: "Dal riso al koji, dalla fermentazione alla pressatura: una guida narrativa alla bevanda degli dei.",
    category: "Sake",
    date: "29 gennaio 2025",
    publishedAt: "2025-01-29",
    author: "Carmen Buongiovanni",
    region: "Giappone",
    difficulty: "Tecnico",
    readTime: "10 min",
    image: "/images/processo-sake.png",
    imageAlt: "Fasi della lavorazione tradizionale del sake",
    textFile: "Il sake, il processo produttivo.txt",
    sourceUrl: "https://vitae.aisitalia.it/il-sake-il-processo-produttivo/",
    sourceLabel: vitae,
    pullQuote: "Il sake nasce d'inverno: riso, acqua, koji e tempo lavorano come una piccola liturgia.",
    content: [
      {
        heading: "Una produzione stagionale",
        paragraphs: [
          "L'articolo apre con il santuario Omiwa e con la dimensione rituale della produzione, poi porta il lettore dentro le fasi tecniche.",
          "La lavorazione tradizionale del sake si concentra nei mesi freddi: una scelta storica, agricola e qualitativa."
        ]
      },
      {
        heading: "Tre fasi essenziali",
        paragraphs: [
          "Preparazione del riso, saccarificazione e fermentazione, poi pressatura e imbottigliamento: il processo viene reso leggibile senza perdere la sua complessità.",
          "Il koji è il cuore della trasformazione, perché permette agli amidi del riso di diventare zuccheri fermentabili."
        ]
      }
    ],
    glossary: [
      { term: "Koji", text: "Riso inoculato con un fungo che rende disponibili gli zuccheri per la fermentazione." },
      { term: "Kurabito", text: "Operaio specializzato che lavora nella sakagura, la fabbrica del sake." }
    ],
    bottle: "Sake artigianale",
    notes: { acidity: 46, body: 50, tannins: 0, sweetness: 24, finish: 80 }
  }
];

export const regions = [
  {
    id: "piemonte",
    name: "Piemonte",
    country: "Italia",
    climate: "Colline, nebbia, escursioni, memoria",
    tone: "Nebbiolo, consorzi, adattamento climatico",
    image: "/images/grandi-langhe.png",
    imageAlt: "Un incontro pubblico dedicato al vino piemontese",
    introduction: "Le Langhe come sistema vivo: vigne, denominazioni e persone che cercano un equilibrio tra reputazione, clima e futuro.",
    coordinates: "44.7009° N / 7.9999° E",
    focus: ["Nebbiolo", "Langhe", "Consorzi"]
  },
  {
    id: "giappone",
    name: "Giappone",
    country: "Giappone",
    climate: "Riso, acqua, inverno, fermentazioni",
    tone: "Sake, koji, indicazioni geografiche",
    image: "/images/premium-sake.png",
    imageAlt: "Bottiglie di sake giapponese",
    introduction: "Un arcipelago letto attraverso acqua, riso, koji e lessico: la tecnica del sake diventa una chiave culturale.",
    coordinates: "36.2048° N / 138.2529° E",
    focus: ["Sake", "Koji", "Geografie"]
  },
  {
    id: "abruzzo",
    name: "Abruzzo",
    country: "Italia",
    climate: "Collina, argilla, calcare, ulivi",
    tone: "Olio, vino naturale, agricoltura sartoriale",
    image: "/images/olio.png",
    imageAlt: "Una degustazione di olio abruzzese",
    introduction: "Tra Appennino e Adriatico, la materia agricola diventa racconto di misura, memoria e lavorazione artigianale.",
    coordinates: "42.1920° N / 13.7289° E",
    focus: ["Olio", "Artigianato", "Paesaggio"]
  }
];

export const cellarAnalyses = articles
  .filter((article) => ["Vino", "Sake", "Olio"].includes(article.category))
  .map((article) => ({
  slug: article.slug,
  title: article.bottle,
  context: article.title,
  category: article.category,
  region: article.region,
  image: article.image,
  imageAlt: article.imageAlt,
  notes: article.notes,
  sourceUrl: article.sourceUrl,
  articleUrl: `/article/${article.slug}`
  }));

// שלב 4 – מתקדמים: הבית והעיר, שעה ושגרה, עבר ועתיד, ספרד, שיחות
const q = (he, es, options, a) => ({ he, es, options, a });

export const level4 = {
  id: 'L4',
  title: 'שלב 4 · מתקדמים',
  subtitle: 'הבית והעיר, שגרה, עבר ועתיד, מסורת ספרדית ושיחות',
  units: [
    {
      id: 'casa', title: 'Casa y ciudad · בית ועיר', emoji: '🏘️', color: '#27ae60',
      lessons: [
        { id: 'casa-1', title: 'החדרים בבית', type: 'vocab', items: [
          'la casa|הבית|🏠', 'la cocina|המטבח|🍳', 'el salón|הסלון|🛋️', 'el dormitorio|חדר השינה|🛏️',
          'el baño|חדר הרחצה|🛁', 'la puerta|הדלת|🚪', 'la ventana|החלון|🪟', 'el jardín|הגינה|🌳',
        ] },
        { id: 'casa-2', title: 'מקומות בעיר', type: 'vocab', items: [
          'el parque|הפארק|🏞️', 'la playa|הים|🏖️', 'el supermercado|הסופרמרקט|🛒', 'el hospital|בית החולים|🏥',
          'la piscina|הבריכה|🏊', 'la biblioteca|הספרייה|📚', 'la panadería|המאפייה|🥖', 'la farmacia|בית המרקחת|💊',
        ] },
        { id: 'casa-3', title: 'תחבורה', type: 'vocab', items: [
          'el coche|המכונית|🚗', 'el autobús|האוטובוס|🚌', 'el metro|הרכבת התחתית|🚇', 'el tren|הרכבת|🚆',
          'el avión|המטוס|✈️', 'el barco|האונייה|🚢', 'a pie|ברגל|🚶',
        ] },
        { id: 'casa-4', title: 'איפה זה?', type: 'phrases', tracks: ['older'], items: [
          '¿Dónde está el baño?|איפה השירותים?|🚻', 'Está a la derecha.|זה מימין.|👉', 'Está a la izquierda.|זה משמאל.|👈',
          'Todo recto.|ישר.|⬆️', 'Está cerca.|זה קרוב.|📍', 'Está lejos.|זה רחוק.|🗺️', 'Vivo en un piso.|אני גר בדירה.|🏢',
        ] },
      ],
    },
    {
      id: 'rutina', title: 'La hora y mi día · שעה ושגרה', emoji: '⏰', color: '#8e44ad',
      lessons: [
        { id: 'rutina-1', title: 'מה השעה?', type: 'phrases', items: [
          '¿Qué hora es?|מה השעה?|⏰', 'Es la una.|השעה אחת.|🕐', 'Son las dos.|השעה שתיים.|🕑',
          'Son las tres y media.|השעה שלוש וחצי.|🕞', 'Son las ocho y cuarto.|השעה שמונה ורבע.|🕗',
          'Son las nueve menos cuarto.|השעה רבע לתשע.|🕘',
        ] },
        { id: 'rutina-2', title: 'מה אני עושה כל יום', type: 'phrases', items: [
          'Me levanto a las siete.|אני קם בשבע.|⏰', 'Me lavo los dientes.|אני מצחצח שיניים.|🪥',
          'Desayuno cereales.|אני אוכל דגני בוקר לארוחת בוקר.|🥣', 'Voy al cole en autobús.|אני נוסע לבית הספר באוטובוס.|🚌',
          'Como en el comedor.|אני אוכל בחדר האוכל.|🍽️', 'Hago los deberes.|אני מכין שיעורי בית.|📝',
          'Me ducho por la noche.|אני מתקלח בערב.|🚿', 'Me acuesto a las nueve.|אני הולך לישון בתשע.|🛏️',
        ] },
        { id: 'rutina-3', title: 'פעלים חוזרים: me levanto', type: 'grammar', tracks: ['older'],
          explain: [
            'פעלים שהפעולה בהם חוזרת אל עצמי מקבלים מילה קטנה לפניהם: me, te, se, nos, os, se.',
            'levantarse (לקום): me levanto = אני מקים את עצמי, כלומר קם.',
            'כך גם lavarse (להתרחץ), ducharse (להתקלח), acostarse (ללכת לישון) ו-llamarse (להיקרא): Me llamo…',
          ],
          table: { title: 'levantarse – לקום', rows: ['yo|me levanto|אני קם', 'tú|te levantas|אתה קם', 'él / ella|se levanta|הוא קם', 'nosotros|nos levantamos|אנחנו קמים', 'vosotros|os levantáis|אתם קמים', 'ellos / ellas|se levantan|הם קמים'] },
          quiz: [
            'Yo ___ levanto temprano.|me|te,se|אני קם מוקדם.',
            '¿Cómo ___ llamas?|te|me,se|איך קוראים לך?',
            'Mi hermana ___ llama Maya.|se|me,te|לאחותי קוראים מאיה.',
            'Nosotros ___ lavamos las manos.|nos|os,se|אנחנו שוטפים ידיים.',
            '¿A qué hora ___ acostáis?|os|nos,se|באיזו שעה אתם הולכים לישון?',
          ] },
      ],
    },
    {
      id: 'tiempos', title: 'Ayer y mañana · עבר ועתיד', emoji: '🕰️', color: '#d35400', tracks: ['older'],
      lessons: [
        { id: 'tiempos-1', title: 'מה עשיתי היום: he comido', type: 'grammar',
          explain: [
            'בספרד, כשמספרים מה קרה היום או הרגע, משתמשים בזמן pretérito perfecto: he + פועל.',
            'בפעלי -ar מוסיפים -ado: jugar → he jugado. בפעלי -er ו-ir מוסיפים -ido: comer → he comido.',
            'חריגים נפוצים: hacer → hecho, ver → visto, escribir → escrito, decir → dicho.',
          ],
          table: { title: 'haber + participio', rows: ['yo|he comido|אכלתי', 'tú|has comido|אכלת', 'él / ella|ha comido|הוא אכל', 'nosotros|hemos comido|אכלנו', 'vosotros|habéis comido|אכלתם', 'ellos / ellas|han comido|הם אכלו'] },
          quiz: [
            'Hoy yo ___ jugado al fútbol.|he|has,ha|היום שיחקתי כדורגל.',
            '¿___ hecho los deberes?|Has|He,Han|הכנת את שיעורי הבית?',
            'Mamá ha ___ una tarta.|hecho|hacido,hace|אמא הכינה עוגה.',
            'Nosotros hemos ___ una película.|visto|veído,vemos|ראינו סרט.',
            'Los niños han ___ mucho.|comido|comado,comen|הילדים אכלו הרבה.',
            'Esta mañana he ___ a mi abuela.|llamado|llamido,llamo|הבוקר התקשרתי לסבתא שלי.',
          ] },
        { id: 'tiempos-2', title: 'אתמול: עבר פשוט -ar', type: 'grammar',
          explain: [
            'כשמספרים על אתמול, על השבוע שעבר או על שנה קודמת, משתמשים בזמן pretérito indefinido.',
            'סיומות -ar: é, aste, ó, amos, asteis, aron.',
            'שימו לב: nosotros נשמע אותו דבר בהווה ובעבר (hablamos).',
          ],
          table: { title: 'jugar – לשחק (עבר)', rows: ['yo|jugué|שיחקתי', 'tú|jugaste|שיחקת', 'él / ella|jugó|הוא שיחק', 'nosotros|jugamos|שיחקנו', 'vosotros|jugasteis|שיחקתם', 'ellos / ellas|jugaron|הם שיחקו'] },
          quiz: [
            'Ayer yo ___ con mis amigos.|jugué|jugó,jugaste|אתמול שיחקתי עם החברים שלי.',
            '¿Tú ___ en la fiesta?|bailaste|bailé,bailó|רקדת במסיבה?',
            'Mi padre ___ la cena.|preparó|preparé,preparaste|אבא שלי הכין את ארוחת הערב.',
            'Ellos ___ a España en avión.|viajaron|viajó,viajamos|הם טסו לספרד במטוס.',
            'El año pasado ___ en Israel.|estudié|estudió,estudiaron|בשנה שעברה למדתי בישראל.',
          ] },
        { id: 'tiempos-3', title: 'אתמול: עבר פשוט -er ו-ir', type: 'grammar',
          explain: [
            'לפעלי -er ו-ir יש אותן סיומות בעבר: í, iste, ió, imos, isteis, ieron.',
            'comer → comí, comiste, comió. vivir → viví, viviste, vivió.',
            'שני פעלים חריגים וחשובים: ir (ללכת) ו-ser (להיות) נראים זהים בעבר: fui, fuiste, fue, fuimos, fuisteis, fueron.',
          ],
          table: { title: 'comer – לאכול (עבר)', rows: ['yo|comí|אכלתי', 'tú|comiste|אכלת', 'él / ella|comió|הוא אכל', 'nosotros|comimos|אכלנו', 'vosotros|comisteis|אכלתם', 'ellos / ellas|comieron|הם אכלו'] },
          quiz: [
            'Ayer ___ paella.|comí|comió,comiste|אתמול אכלתי פאייה.',
            '¿___ el libro?|Leíste|Leí,Leyó|קראת את הספר?',
            'Mi hermano ___ una carta.|escribió|escribí,escribiste|אח שלי כתב מכתב.',
            'El sábado ___ al zoo.|fuimos|fui,fueron|בשבת הלכנו לגן החיות.',
            'Mis abuelos ___ en Tel Aviv.|vivieron|vivió,vivimos|סבא וסבתא שלי גרו בתל אביב.',
          ] },
        { id: 'tiempos-4', title: 'מחר: voy a…', type: 'grammar',
          explain: [
            'הדרך הקלה לדבר על העתיד: ir (בהווה) + a + פועל בשם הפועל.',
            'Voy a jugar = אני הולך לשחק, כלומר אשחק.',
            'Mañana vamos a ir a la playa = מחר נלך לים.',
          ],
          table: { title: 'ir a + infinitivo', rows: ['yo|voy a comer|אני אוכל (אוכַל)', 'tú|vas a comer|אתה תאכל', 'él / ella|va a comer|הוא יאכל', 'nosotros|vamos a comer|נאכל', 'vosotros|vais a comer|תאכלו', 'ellos / ellas|van a comer|הם יאכלו'] },
          quiz: [
            'Mañana ___ a jugar al fútbol.|voy|vamos,van|מחר אשחק כדורגל.',
            '¿Qué ___ a hacer el sábado?|vas|voy,va|מה תעשה בשבת?',
            'Nosotros ___ a viajar a Israel.|vamos|vais,van|אנחנו ניסע לישראל.',
            'Va a ___ esta tarde.|llover|llueve,llovió|אחר הצהריים ירד גשם.',
            'Mis amigos van ___ venir a mi casa.|a|de,en|החברים שלי יבואו אליי הביתה.',
          ] },
      ],
    },
    {
      id: 'espana', title: 'España · מסורת ספרדית', emoji: '🇪🇸', color: '#e74c3c',
      lessons: [
        { id: 'espana-1', title: 'חגים ומנהגים', type: 'story',
          origin: 'הכירו את החגים והמנהגים שתפגשו בספרד.',
          pages: [
            'El 6 de enero llegan los Reyes Magos. Los niños reciben regalos.|ב-6 בינואר מגיעים "שלושת המלכים". הילדים מקבלים מתנות.|👑',
            'Ese día se come el roscón de Reyes, un pastel redondo con una sorpresa dentro.|ביום הזה אוכלים "רוסקון": עוגה עגולה עם הפתעה בפנים.|🥯',
            'En Nochevieja se comen doce uvas, una con cada campanada.|בערב השנה החדשה אוכלים שנים-עשר ענבים, אחד עם כל צלצול של השעון.|🍇',
            'En febrero es Carnaval: los niños se disfrazan, como en Purim.|בפברואר יש קרנבל: הילדים מתחפשים, כמו בפורים.|🎭',
            'En Valencia, en marzo, son las Fallas: figuras enormes y muchos petardos.|בוולנסיה, במרץ, חוגגים את ה"פאיאס": פסלי ענק והרבה זיקוקים.|🎆',
            'En Buñol, en agosto, es la Tomatina: ¡todos se tiran tomates!|בבוניול, באוגוסט, יש "טומטינה": כולם זורקים עגבניות!|🍅',
          ],
          questions: [
            q('מתי מגיעים שלושת המלכים?', '¿Cuándo llegan los Reyes Magos?', ['👑|el 6 de enero|ב-6 בינואר', '🎄|el 25 de diciembre|ב-25 בדצמבר', '🏖️|en agosto|באוגוסט'], 0),
            q('כמה ענבים אוכלים בערב השנה החדשה?', '¿Cuántas uvas se comen en Nochevieja?', ['🍇|doce|שתים-עשרה', '3️⃣|tres|שלוש', '🔟|diez|עשר'], 0),
            q('מה זורקים בטומטינה?', '¿Qué se tiran en la Tomatina?', ['🍅|tomates|עגבניות', '🍊|naranjas|תפוזים', '💧|agua|מים'], 0),
          ] },
        { id: 'espana-2', title: 'החיים בספרד', type: 'story',
          origin: 'כמה דברים שמפתיעים ילדים ישראלים בספרד.',
          pages: [
            'En España se cena tarde, ¡a las nueve de la noche!|בספרד אוכלים ארוחת ערב מאוחר, בתשע בערב!|🌙',
            'La comida es la comida más grande del día, a las dos.|ארוחת הצהריים היא הארוחה הגדולה ביותר ביום, בשתיים.|🍽️',
            'En el recreo, muchos niños comen un bocadillo.|בהפסקה, הרבה ילדים אוכלים כריך בבגט.|🥪',
            'Los españoles se saludan con dos besos, uno en cada mejilla.|הספרדים מברכים זה את זה בשתי נשיקות, אחת על כל לחי.|😘',
            'En verano hay vacaciones largas, desde junio hasta septiembre.|בקיץ יש חופשה ארוכה, מיוני עד ספטמבר.|🏖️',
            'El fin de semana es sábado y domingo. ¡El domingo no hay cole!|סוף השבוע הוא שבת וראשון. ביום ראשון אין בית ספר!|📅',
          ],
          questions: [
            q('באיזו שעה אוכלים ארוחת ערב בספרד?', '¿A qué hora se cena?', ['🌙|a las nueve|בתשע', '🌅|a las cinco|בחמש', '☀️|a las doce|בשתים-עשרה'], 0),
            q('איך מברכים לשלום בספרד?', '¿Cómo se saludan los españoles?', ['😘|con dos besos|בשתי נשיקות', '🙇|con una reverencia|בקידה', '👊|con el puño|באגרוף'], 0),
            q('מה הרבה ילדים אוכלים בהפסקה?', '¿Qué comen en el recreo?', ['🥪|un bocadillo|כריך', '🍕|pizza|פיצה', '🍜|sopa|מרק'], 0),
          ] },
        { id: 'espana-3', title: 'El Ratoncito Pérez', type: 'story',
          origin: 'העכבר פרס הוא "פיית השיניים" של ספרד. את הסיפור כתב לואיס קולומה ב-1894 עבור המלך הילד אלפונסו ה-13, והוא נחלת הכלל. במדריד יש לו אפילו מוזיאון קטן!',
          pages: [
            'El Ratoncito Pérez es un ratón pequeño que vive en Madrid.|העכבר פרס הוא עכבר קטן שגר במדריד.|🐭',
            'Cuando a un niño se le cae un diente, lo pone debajo de la almohada.|כשלילד נופלת שן, הוא שם אותה מתחת לכרית.|🦷',
            'Por la noche, el Ratoncito Pérez entra en la habitación sin hacer ruido.|בלילה, העכבר פרס נכנס לחדר בלי לעשות רעש.|🌙',
            'Se lleva el diente y deja un regalo o una moneda.|הוא לוקח את השן ומשאיר מתנה או מטבע.|🪙',
            'Por la mañana, el niño se despierta y ¡qué sorpresa!|בבוקר, הילד מתעורר, ואיזו הפתעה!|🎁',
          ],
          questions: [
            q('איפה גר העכבר פרס?', '¿Dónde vive el Ratoncito Pérez?', ['🏙️|en Madrid|במדריד', '🏖️|en la playa|ליד הים', '🌳|en el bosque|ביער'], 0),
            q('איפה שמים את השן?', '¿Dónde se pone el diente?', ['🛏️|debajo de la almohada|מתחת לכרית', '👟|en el zapato|בנעל', '📦|en una caja|בקופסה'], 0),
            q('מה העכבר משאיר?', '¿Qué deja el ratoncito?', ['🪙|una moneda|מטבע', '🦷|otro diente|שן אחרת', '🧀|queso|גבינה'], 0),
          ] },
        { id: 'espana-4', title: 'La lechera', type: 'story', tracks: ['older'],
          origin: 'משל מאת פליקס מריה סמניגו, משורר ספרדי מהמאה ה-18 שכתב משלים לילדים. "החולבת" הוא המשל המפורסם ביותר שלו וכל ילד בספרד מכיר אותו. זו גרסה מפושטת.',
          pages: [
            'Una niña iba al mercado con un cántaro de leche en la cabeza.|נערה הלכה לשוק עם כד חלב על הראש.|🥛',
            'Mientras caminaba, pensaba: «Con el dinero de la leche compraré huevos».|בזמן שהלכה, חשבה: "בכסף של החלב אקנה ביצים".|🥚',
            '«De los huevos saldrán pollitos, y venderé los pollitos».|"מהביצים ייצאו אפרוחים, ואמכור את האפרוחים".|🐣',
            '«Con ese dinero compraré un cerdo, y después una vaca».|"בכסף הזה אקנה חזיר, ואחר כך פרה".|🐄',
            'La niña saltó de alegría… ¡y el cántaro se cayó y se rompió!|הנערה קפצה משמחה… והכד נפל ונשבר!|💥',
            'Toda la leche se perdió. No hay que contar los pollos antes de que nazcan.|כל החלב נשפך. לא סופרים את האפרוחים לפני שהם בוקעים.|💭',
          ],
          questions: [
            q('מה נשאה הנערה על הראש?', '¿Qué llevaba la niña en la cabeza?', ['🥛|un cántaro de leche|כד חלב', '🧺|una cesta de pan|סל לחם', '🎩|un sombrero|כובע'], 0),
            q('מה רצתה לקנות ראשון?', '¿Qué quería comprar primero?', ['🥚|huevos|ביצים', '🐄|una vaca|פרה', '👗|un vestido|שמלה'], 0),
            q('למה הכד נשבר?', '¿Por qué se rompió el cántaro?', ['🦘|porque saltó|כי היא קפצה', '🐕|por un perro|בגלל כלב', '🌧️|por la lluvia|בגלל הגשם'], 0),
          ] },
        { id: 'espana-5', title: 'La cigarra y la hormiga', type: 'story',
          origin: 'משל עתיק של איזופוס, שגם סמניגו הספרדי כתב גרסה משלו. בעברית הוא מוכר כ"הצרצר והנמלה".',
          pages: [
            'Era verano. La cigarra cantaba y cantaba todo el día.|היה קיץ. הצרצר שר ושר כל היום.|🎶',
            'La hormiga trabajaba y guardaba comida para el invierno.|הנמלה עבדה ואגרה אוכל לחורף.|🐜',
            '«¿Por qué trabajas tanto? ¡Ven a cantar!», dijo la cigarra.|"למה את עובדת כל כך קשה? בואי לשיר!", אמר הצרצר.|🦗',
            'Llegó el invierno. Hacía frío y no había comida.|הגיע החורף. היה קר ולא היה אוכל.|❄️',
            'La cigarra tenía hambre y fue a casa de la hormiga.|הצרצר היה רעב והלך לבית של הנמלה.|🏠',
            'La hormiga le dio comida, y la cigarra aprendió a trabajar también.|הנמלה נתנה לו אוכל, והצרצר למד לעבוד גם הוא.|🤝',
          ],
          questions: [
            q('מה עשה הצרצר בקיץ?', '¿Qué hacía la cigarra en verano?', ['🎶|cantaba|שר', '🐜|trabajaba|עבד', '😴|dormía|ישן'], 0),
            q('מה עשתה הנמלה?', '¿Qué hacía la hormiga?', ['🧺|guardaba comida|אגרה אוכל', '💃|bailaba|רקדה', '🏊|nadaba|שחתה'], 0),
            q('מה קרה בחורף?', '¿Qué pasó en invierno?', ['❄️|hacía frío|היה קר', '🏖️|hacía calor|היה חם', '🎉|hubo una fiesta|הייתה מסיבה'], 0),
          ] },
        { id: 'espana-6', title: 'שיר: Debajo un botón', type: 'song',
          origin: 'שיר ילדים מסורתי מספרד. כל שורה מסתיימת בהד של ההברה האחרונה: "botón, ton, ton". מעולה לתרגול צלילים!',
          lines: [
            'Debajo un botón, ton, ton,|מתחת לכפתור, תון, תון,',
            'que encontró Martín, tin, tin,|שמצא מרטין, טין, טין,',
            'había un ratón, ton, ton,|היה עכבר, תון, תון,',
            '¡ay, qué chiquitín, tin, tin!|אוי, כמה קטנטן, טין, טין!',
            '¡Ay, qué chiquitín, tin, tin,|אוי, כמה קטנטן, טין, טין,',
            'era aquel ratón, ton, ton,|היה העכבר ההוא, תון, תון,',
            'que encontró Martín, tin, tin,|שמצא מרטין, טין, טין,',
            'debajo un botón, ton, ton!|מתחת לכפתור, תון, תון!',
          ] },
      ],
    },
    {
      id: 'charlas', title: 'Conversaciones · שיחות', emoji: '💬', color: '#1abc9c', tracks: ['older'],
      lessons: [
        { id: 'charlas-1', title: 'חבר חדש', type: 'phrases', items: [
          '¡Hola! Soy nuevo en el cole.|היי! אני חדש בבית הספר.|👋', 'Vengo de Israel.|אני בא מישראל.|🇮🇱',
          'Todavía no hablo bien español.|אני עוד לא מדבר טוב ספרדית.|🗣️', '¿Me ayudas, por favor?|תעזור לי, בבקשה?|🙏',
          '¿Cuál es tu juego favorito?|מה המשחק האהוב עליך?|🎮', '¿Quieres venir a mi casa el sábado?|רוצה לבוא אליי בשבת?|🏠',
        ] },
        { id: 'charlas-2', title: 'בחנות', type: 'phrases', items: [
          'Buenos días, quiero una barra de pan.|בוקר טוב, אני רוצה בגט אחד.|🥖', '¿Cuánto cuesta?|כמה זה עולה?|💶',
          'Cuesta dos euros.|זה עולה שני יורו.|2️⃣', 'Aquí tiene.|הנה, בבקשה.|🤲', '¿Algo más?|עוד משהו?|➕',
          'No, gracias. Adiós.|לא, תודה. להתראות.|👋',
        ] },
        { id: 'charlas-3', title: 'אצל הרופא', type: 'phrases', items: [
          '¿Qué te pasa?|מה קרה לך?|🩺', 'Me duele la garganta.|כואב לי הגרון.|😷', 'Desde ayer.|מאתמול.|📅',
          'Abre la boca, por favor.|תפתח את הפה, בבקשה.|👄', 'Tienes que descansar.|אתה צריך לנוח.|🛌',
          '¡Que te mejores!|רפואה שלמה!|💐',
        ] },
        { id: 'charlas-4', title: 'הסופ"ש שלי', type: 'phrases', items: [
          'El fin de semana fui a la playa.|בסוף השבוע הלכתי לים.|🏖️', 'Comí un helado de fresa.|אכלתי גלידת תות.|🍦',
          'Jugué con mi hermano en el parque.|שיחקתי עם אחי בפארק.|🏞️', 'Fue un día muy divertido.|זה היה יום מאוד כיפי.|😄',
          'El próximo sábado voy a ir al cine.|בשבת הבאה אני הולך לקולנוע.|🎬',
        ] },
      ],
    },
  ],
};

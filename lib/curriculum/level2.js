// שלב 2 – העולם שלי
export const level2 = {
  id: 'L2',
  title: 'שלב 2 · העולם שלי',
  subtitle: 'משפחה, חיות, גוף, אוכל, בגדים, רגשות ומשחקים',
  units: [
    {
      id: 'familia', title: 'La familia · המשפחה', emoji: '👨‍👩‍👧‍👦', color: '#ff7a59',
      lessons: [
        { id: 'familia-1', title: 'בני המשפחה', type: 'vocab', items: [
          'la mamá|אמא|👩', 'el papá|אבא|👨', 'el hermano|האח|👦', 'la hermana|האחות|👧',
          'el abuelo|סבא|👴', 'la abuela|סבתא|👵', 'el bebé|התינוק|👶', 'la familia|המשפחה|👨‍👩‍👧',
        ] },
        { id: 'familia-2', title: 'עוד קרובים', type: 'vocab', items: [
          'el tío|הדוד|🧔', 'la tía|הדודה|👩‍🦰', 'el primo|בן הדוד|🧒', 'la prima|בת הדודה|👧',
          'el perro de la familia|הכלב של המשפחה|🐕', 'los padres|ההורים|👫',
        ] },
        { id: 'familia-3', title: 'המשפחה שלי', type: 'phrases', items: [
          'Tengo un hermano.|יש לי אח.|👦', 'Tengo dos hermanas.|יש לי שתי אחיות.|👧👧',
          'No tengo hermanos.|אין לי אחים.|🙅', 'Mi mamá se llama Dana.|לאמא שלי קוראים דנה.|👩',
          'Mi abuela vive en Israel.|סבתא שלי גרה בישראל.|🇮🇱', 'Quiero mucho a mi familia.|אני מאוד אוהב את המשפחה שלי.|❤️',
        ] },
      ],
    },
    {
      id: 'animales', title: 'Los animales · חיות', emoji: '🐾', color: '#3fae5a',
      lessons: [
        { id: 'animales-1', title: 'חיות בחווה', type: 'vocab', items: [
          'el perro|הכלב|🐶', 'el gato|החתול|🐱', 'la vaca|הפרה|🐄', 'el caballo|הסוס|🐴',
          'el cerdo|החזיר|🐷', 'la oveja|הכבשה|🐑', 'la gallina|התרנגולת|🐔', 'el pato|הברווז|🦆',
        ] },
        { id: 'animales-2', title: 'חיות בג׳ונגל ובספארי', type: 'vocab', items: [
          'el león|האריה|🦁', 'el tigre|הנמר|🐯', 'el elefante|הפיל|🐘', 'el mono|הקוף|🐵',
          'la jirafa|הג׳ירפה|🦒', 'el oso|הדוב|🐻', 'la serpiente|הנחש|🐍', 'la cebra|הזברה|🦓',
        ] },
        { id: 'animales-3', title: 'חיות קטנות', type: 'vocab', items: [
          'el ratón|העכבר|🐭', 'el conejo|הארנב|🐰', 'la rana|הצפרדע|🐸', 'la tortuga|הצב|🐢',
          'la mariposa|הפרפר|🦋', 'el pájaro|הציפור|🐦', 'el pez|הדג|🐟', 'la abeja|הדבורה|🐝',
        ] },
        { id: 'animales-4', title: 'שיר: Los pollitos dicen', type: 'song',
          origin: 'שיר ערש מסורתי שכל ילד בספרד ובאמריקה הלטינית מכיר. מקורו בשיר עם, והגרסה המוכרת מיוחסת למשורר הצ׳יליאני איסמאל פרגס (נפטר ב-1917), ולכן היא נחלת הכלל.',
          lines: [
            'Los pollitos dicen pío, pío, pío,|האפרוחים אומרים פיו, פיו, פיו,',
            'cuando tienen hambre, cuando tienen frío.|כשהם רעבים, כשקר להם.',
            'La gallina busca el maíz y el trigo,|התרנגולת מחפשת תירס וחיטה,',
            'les da la comida y les presta abrigo.|נותנת להם אוכל ומחממת אותם.',
            'Bajo sus dos alas, acurrucaditos,|מתחת לשתי כנפיה, מכורבלים,',
            'duermen los pollitos hasta el otro día.|ישנים האפרוחים עד למחרת.',
          ] },
        { id: 'animales-5', title: 'שיר: Cinco lobitos', type: 'song',
          origin: 'שיר אצבעות מסורתי מספרד. שרים אותו לתינוקות ולילדים קטנים ומסובבים את כף היד, כמו "חמש אצבעות" אצלנו.',
          lines: [
            'Cinco lobitos tiene la loba,|לזאבה יש חמישה זאבונים,',
            'blancos y negros detrás de la escoba.|לבנים ושחורים מאחורי המטאטא.',
            'Cinco tenía, cinco criaba,|חמישה היו לה, חמישה גידלה,',
            'y a todos los cinco leche les daba.|ולכל החמישה נתנה חלב.',
          ] },
        { id: 'animales-6', title: 'מה החיות עושות?', type: 'phrases', items: [
          'El perro dice guau guau.|הכלב אומר הַאו הַאו.|🐶', 'El gato dice miau.|החתול אומר מיאו.|🐱',
          'La vaca dice mu.|הפרה אומרת מוּ.|🐄', 'El pájaro vuela.|הציפור עפה.|🐦',
          'El pez nada.|הדג שוחה.|🐟', 'La rana salta.|הצפרדע קופצת.|🐸',
        ] },
      ],
    },
    {
      id: 'cuerpo', title: 'El cuerpo · הגוף', emoji: '🧍', color: '#e2604f',
      lessons: [
        { id: 'cuerpo-1', title: 'הפנים', type: 'vocab', items: [
          'la cabeza|הראש|🙂', 'el ojo|העין|👁️', 'la nariz|האף|👃', 'la boca|הפה|👄',
          'la oreja|האוזן|👂', 'el pelo|השיער|💇', 'el diente|השן|🦷', 'la lengua|הלשון|👅',
        ] },
        { id: 'cuerpo-2', title: 'הגוף', type: 'vocab', items: [
          'la mano|היד|✋', 'el brazo|הזרוע|💪', 'el pie|כף הרגל|🦶', 'la pierna|הרגל|🦵',
          'la barriga|הבטן|🫃', 'el dedo|האצבע|☝️', 'la espalda|הגב|🔙', 'el corazón|הלב|❤️',
        ] },
        { id: 'cuerpo-3', title: 'שיר: Tengo una muñeca vestida de azul', type: 'song',
          origin: 'שיר חצר מסורתי מספרד. שרים אותו בזמן קפיצה בחבל ובמשחקי מחיאות כפיים. בסוף השיר יש גם תרגיל חשבון!',
          lines: [
            'Tengo una muñeca vestida de azul,|יש לי בובה לבושה בכחול,',
            'con sus zapatitos y su canesú.|עם נעליים קטנות וחולצונת.',
            'La saqué a paseo, se me constipó,|הוצאתי אותה לטיול, והיא הצטננה,',
            'la tengo en la cama con mucho dolor.|היא שוכבת במיטה וכואב לה מאוד.',
            'Esta mañanita me dijo el doctor|הבוקר אמר לי הרופא',
            'que le dé jarabe con un tenedor.|לתת לה סירופ עם מזלג.',
            'Dos y dos son cuatro, cuatro y dos son seis,|שתיים ועוד שתיים זה ארבע, ארבע ועוד שתיים זה שש,',
            'seis y dos son ocho, y ocho dieciséis.|שש ועוד שתיים זה שמונה, ושמונה ושמונה שש-עשרה.',
          ] },
        { id: 'cuerpo-4', title: 'אצל הרופא', type: 'phrases', items: [
          'Me duele la cabeza.|כואב לי הראש.|🤕', 'Me duele la barriga.|כואבת לי הבטן.|🤢',
          'Me duele el diente.|כואבת לי השן.|🦷', 'Estoy enfermo.|אני חולה.|🤒',
          'Tengo fiebre.|יש לי חום.|🌡️', 'Estoy mejor.|אני מרגיש יותר טוב.|💪',
        ] },
      ],
    },
    {
      id: 'comida', title: 'La comida · אוכל', emoji: '🍎', color: '#f2994a',
      lessons: [
        { id: 'comida-1', title: 'פירות', type: 'vocab', items: [
          'la manzana|התפוח|🍎', 'el plátano|הבננה|🍌', 'la naranja|התפוז|🍊', 'la fresa|התות|🍓',
          'la uva|הענב|🍇', 'la sandía|האבטיח|🍉', 'la pera|האגס|🍐', 'el limón|הלימון|🍋',
        ] },
        { id: 'comida-2', title: 'ארוחות ומאכלים', type: 'vocab', items: [
          'el pan|הלחם|🍞', 'el agua|המים|💧', 'la leche|החלב|🥛', 'el queso|הגבינה|🧀',
          'el huevo|הביצה|🥚', 'el pollo|העוף|🍗', 'el pescado|הדג (אוכל)|🐟', 'el arroz|האורז|🍚',
          'el bocadillo|הכריך|🥪', 'el zumo|המיץ|🧃', 'el helado|הגלידה|🍦', 'la galleta|העוגייה|🍪',
        ] },
        { id: 'comida-3', title: 'ירקות', type: 'vocab', items: [
          'el tomate|העגבנייה|🍅', 'la patata|תפוח האדמה|🥔', 'la zanahoria|הגזר|🥕', 'la lechuga|החסה|🥬',
          'el pepino|המלפפון|🥒', 'la cebolla|הבצל|🧅', 'el maíz|התירס|🌽',
        ] },
        { id: 'comida-4', title: 'רעב? צמא?', type: 'phrases', items: [
          'Tengo hambre.|אני רעב.|😋', 'Tengo sed.|אני צמא.|🥤', 'Quiero agua, por favor.|אני רוצה מים, בבקשה.|💧',
          '¡Qué rico!|איזה טעים!|🤤', 'No me gusta.|אני לא אוהב את זה.|🙅', '¿Qué hay para comer?|מה יש לאכול?|🍽️',
          'Estoy lleno.|אני שבע.|😌',
        ] },
        { id: 'comida-5', title: 'שיר: Al corro de la patata', type: 'song',
          origin: 'שיר מעגל מסורתי מספרד, מקביל ל"נדנדה נדנדה" או "מעגל" שלנו. הילדים מסתובבים במעגל ובסוף מתיישבים על הרצפה.',
          lines: [
            'Al corro de la patata,|למעגל של תפוח האדמה,',
            'comeremos ensalada,|נאכל סלט,',
            'como comen los señores,|כמו שאוכלים האדונים,',
            'naranjitas y limones.|תפוזים קטנים ולימונים.',
            '¡Achupé, achupé,|אַצ׳וּפֶּה, אַצ׳וּפֶּה,',
            'sentadito me quedé!|ונשארתי לשבת!',
          ] },
        { id: 'comida-6', title: 'שיר: Arroz con leche', type: 'song',
          origin: 'שיר עם מסורתי מספרד שעבר לכל העולם הדובר ספרדית. arroz con leche הוא גם קינוח פופולרי בספרד: אורז מבושל בחלב עם קינמון.',
          lines: [
            'Arroz con leche, me quiero casar|אורז בחלב, אני רוצה להתחתן',
            'con una señorita de San Nicolás,|עם עלמה מסן ניקולס,',
            'que sepa coser, que sepa bordar,|שיודעת לתפור, שיודעת לרקום,',
            'que sepa abrir la puerta para ir a jugar.|שיודעת לפתוח את הדלת כדי לצאת לשחק.',
          ] },
      ],
    },
    {
      id: 'ropa', title: 'Ropa y tiempo · בגדים ומזג אוויר', emoji: '👕', color: '#4a90e2',
      lessons: [
        { id: 'ropa-1', title: 'בגדים', type: 'vocab', items: [
          'la camiseta|החולצה|👕', 'los pantalones|המכנסיים|👖', 'el vestido|השמלה|👗', 'los zapatos|הנעליים|👟',
          'los calcetines|הגרביים|🧦', 'el abrigo|המעיל|🧥', 'el gorro|הכובע|🧢', 'la bufanda|הצעיף|🧣',
        ] },
        { id: 'ropa-2', title: 'מזג האוויר', type: 'vocab', items: [
          'hace sol|שמשי|☀️', 'hace calor|חם|🥵', 'hace frío|קר|🥶', 'llueve|יורד גשם|🌧️',
          'nieva|יורד שלג|❄️', 'hace viento|יש רוח|💨', 'está nublado|מעונן|☁️',
        ] },
        { id: 'ropa-3', title: 'ימות השבוע', type: 'vocab', items: [
          'lunes|יום שני|1️⃣', 'martes|יום שלישי|2️⃣', 'miércoles|יום רביעי|3️⃣', 'jueves|יום חמישי|4️⃣',
          'viernes|יום שישי|5️⃣', 'sábado|שבת|6️⃣', 'domingo|יום ראשון|7️⃣',
        ] },
        { id: 'ropa-4', title: 'עונות השנה', type: 'vocab', items: [
          'la primavera|האביב|🌷', 'el verano|הקיץ|🏖️', 'el otoño|הסתיו|🍂', 'el invierno|החורף|⛄',
        ] },
        { id: 'ropa-5', title: 'חודשי השנה', type: 'vocab', tracks: ['older'], items: [
          'enero|ינואר|⛄', 'febrero|פברואר|🎭', 'marzo|מרץ|🌱', 'abril|אפריל|🌷', 'mayo|מאי|🌼', 'junio|יוני|🏖️',
          'julio|יולי|🍉', 'agosto|אוגוסט|🌞', 'septiembre|ספטמבר|🎒', 'octubre|אוקטובר|🍂', 'noviembre|נובמבר|🌧️', 'diciembre|דצמבר|🎄',
        ] },
        { id: 'ropa-6', title: 'מה לובשים היום?', type: 'phrases', items: [
          'Hoy hace frío.|היום קר.|🥶', 'Ponte el abrigo.|תלבש את המעיל.|🧥', 'Hoy es lunes.|היום יום שני.|📅',
          'En verano vamos a la playa.|בקיץ הולכים לים.|🏖️', 'Me gusta la nieve.|אני אוהב שלג.|❄️',
        ] },
      ],
    },
    {
      id: 'juegos', title: 'Sentimientos y juegos · רגשות ומשחקים', emoji: '🎈', color: '#9b59b6',
      lessons: [
        { id: 'juegos-1', title: 'איך אני מרגיש?', type: 'vocab', items: [
          'contento|שמח|😃', 'triste|עצוב|😢', 'enfadado|כועס|😠', 'cansado|עייף|😴',
          'asustado|מפוחד|😱', 'nervioso|לחוץ|😬', 'tranquilo|רגוע|😌', 'sorprendido|מופתע|😮',
        ] },
        { id: 'juegos-2', title: 'צעצועים ומשחקים', type: 'vocab', items: [
          'la pelota|הכדור|⚽', 'la muñeca|הבובה|🪆', 'la bici|האופניים|🚲', 'el columpio|הנדנדה|🛝',
          'la comba|החבל לקפיצה|🪢', 'los dibujos|הציורים|🖍️', 'el videojuego|משחק המחשב|🎮', 'el puzle|הפאזל|🧩',
        ] },
        { id: 'juegos-3', title: 'בוא נשחק', type: 'phrases', items: [
          'Estoy contento.|אני שמח.|😃', 'Estoy un poco triste.|אני קצת עצוב.|😢',
          '¿Jugamos al fútbol?|נשחק כדורגל?|⚽', '¿Jugamos al escondite?|נשחק מחבואים?|🙈',
          '¡Te pillé!|תפסתי אותך!|🏃', '¡He ganado!|ניצחתי!|🏆',
        ] },
        { id: 'juegos-4', title: 'שיר: Cucú cantaba la rana', type: 'song',
          origin: 'שיר חצר מסורתי מספרד, ממשחקי הקפיצה בחבל. אנשים שונים עוברים ליד הצפרדע, כל אחד בתורו.',
          lines: [
            'Cucú, cucú, cantaba la rana,|קוקו, קוקו, שרה הצפרדע,',
            'cucú, cucú, debajo del agua.|קוקו, קוקו, מתחת למים.',
            'Cucú, cucú, pasó un caballero,|קוקו, קוקו, עבר אביר,',
            'cucú, cucú, con capa y sombrero.|קוקו, קוקו, עם גלימה וכובע.',
            'Cucú, cucú, pasó una señora,|קוקו, קוקו, עברה גברת,',
            'cucú, cucú, con traje de cola.|קוקו, קוקו, עם שמלה ושובל.',
            'Cucú, cucú, pasó un marinero,|קוקו, קוקו, עבר מלח,',
            'cucú, cucú, vendiendo romero.|קוקו, קוקו, ומכר רוזמרין.',
          ] },
        { id: 'juegos-5', title: 'שיר: Cumpleaños feliz', type: 'song',
          origin: 'הגרסה הספרדית של "יום הולדת שמח" (המנגינה היא נחלת הכלל). בספרד מוסיפים לעיתים בסוף: "¡Que cumplas muchos más!", כלומר "שתחגוג עוד הרבה ימי הולדת!".',
          lines: [
            'Cumpleaños feliz,|יום הולדת שמח,',
            'cumpleaños feliz,|יום הולדת שמח,',
            'te deseamos todos,|כולנו מאחלים לך,',
            'cumpleaños feliz.|יום הולדת שמח.',
            '¡Que cumplas muchos más!|שתחגוג עוד הרבה!',
          ] },
      ],
    },
  ],
};

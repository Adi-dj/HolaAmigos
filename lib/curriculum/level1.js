// שלב 1 – צעדים ראשונים
// Item format: "español|עברית|emoji"
export const level1 = {
  id: 'L1',
  title: 'שלב 1 · צעדים ראשונים',
  subtitle: 'ברכות, האלף-בית, מספרים, צבעים ובית הספר',
  units: [
    {
      id: 'saludos', title: '¡Hola! שלום!', emoji: '👋', color: '#ff8a5b',
      lessons: [
        { id: 'saludos-1', title: 'שלום ולהתראות', type: 'vocab', items: [
          'hola|שלום|👋', 'adiós|להתראות|🙋', 'buenos días|בוקר טוב|🌅', 'buenas tardes|צהריים טובים|☀️',
          'buenas noches|לילה טוב|🌙', 'hasta mañana|להתראות מחר|📅',
        ] },
        { id: 'saludos-2', title: 'מילות נימוס', type: 'vocab', items: [
          'por favor|בבקשה|🙏', 'gracias|תודה|💐', 'de nada|על לא דבר|😊', 'perdón|סליחה|😔',
          'sí|כן|👍', 'no|לא|👎',
        ] },
        { id: 'saludos-3', title: 'מה שלומך?', type: 'phrases', items: [
          '¿Qué tal?|מה נשמע?|🙂', 'Muy bien, gracias.|טוב מאוד, תודה.|😄', 'Regular.|ככה ככה.|😐',
          '¿Y tú?|ואתה?|👉', '¡Hasta luego!|נתראה אחר כך!|👋',
        ] },
        { id: 'saludos-4', title: 'נעים להכיר', type: 'phrases', items: [
          '¿Cómo te llamas?|איך קוראים לך?|❓', 'Me llamo Noa.|קוראים לי נועה.|👧',
          '¿Cuántos años tienes?|בן כמה אתה?|🎂', 'Tengo ocho años.|אני בן שמונה.|8️⃣',
          'Soy de Israel.|אני מישראל.|🇮🇱', 'Mucho gusto.|נעים מאוד.|🤝',
        ] },
      ],
    },
    {
      id: 'abc', title: 'El abecedario · האלף-בית', emoji: '🔤', color: '#7c5cff',
      lessons: [
        // letters: "Letter|name|example|עברית|emoji"
        { id: 'abc-1', title: 'האותיות A עד I', type: 'letters', items: [
          'A|a|abeja|דבורה|🐝', 'B|be|barco|סירה|⛵', 'C|ce|casa|בית|🏠', 'D|de|dedo|אצבע|☝️',
          'E|e|elefante|פיל|🐘', 'F|efe|flor|פרח|🌸', 'G|ge|gato|חתול|🐱', 'H|hache|helado|גלידה|🍦',
          'I|i|isla|אי|🏝️',
        ] },
        { id: 'abc-2', title: 'האותיות J עד Q', type: 'letters', items: [
          'J|jota|jirafa|ג׳ירפה|🦒', 'K|ka|kiwi|קיווי|🥝', 'L|ele|luna|ירח|🌙', 'M|eme|mano|יד|✋',
          'N|ene|nube|ענן|☁️', 'Ñ|eñe|niño|ילד|👦', 'O|o|oso|דוב|🐻', 'P|pe|pato|ברווז|🦆',
          'Q|cu|queso|גבינה|🧀',
        ] },
        { id: 'abc-3', title: 'האותיות R עד Z', type: 'letters', items: [
          'R|erre|ratón|עכבר|🐭', 'S|ese|sol|שמש|☀️', 'T|te|tren|רכבת|🚂', 'U|u|uva|ענב|🍇',
          'V|uve|vaca|פרה|🐄', 'W|uve doble|wifi|וויי-פיי|📶', 'X|equis|xilófono|קסילופון|🎶',
          'Y|i griega|yogur|יוגורט|🥛', 'Z|zeta|zapato|נעל|👞',
        ] },
        { id: 'abc-4', title: 'צלילים מיוחדים', type: 'explain', tracks: ['older'],
          explain: [
            'בספרדית קוראים כמעט כל אות בדיוק כמו שהיא כתובה. יש כמה כללים שכדאי לזכור:',
            'H – אות שקטה! hola נשמע "אוֹלָה".',
            'J – נשמעת כמו ח׳ גרונית: jirafa = "חִירָאפָה".',
            'LL – נשמעת כמו י׳: lluvia = "יוּבְיָה".',
            'Ñ – נשמעת כמו "ני": niño = "נִינְיוֹ".',
            'RR – ר׳ מתגלגלת וחזקה: perro.',
            'CH – כמו צ׳: chocolate.',
            'בספרד, Z וגם C לפני E ו-I נשמעות כמו th באנגלית: zapato, cine.',
            'V נשמעת כמעט כמו B: vaca.',
          ],
          items: [
            'hola|שלום|👋', 'jirafa|ג׳ירפה|🦒', 'lluvia|גשם|🌧️', 'niño|ילד|👦', 'perro|כלב|🐶',
            'chocolate|שוקולד|🍫', 'cine|קולנוע|🎬', 'zapato|נעל|👞',
          ] },
      ],
    },
    {
      id: 'numeros', title: 'Los números · מספרים', emoji: '🔢', color: '#2bb673',
      lessons: [
        { id: 'numeros-1', title: '1 עד 5', type: 'vocab', items: [
          'uno|אחת|1️⃣', 'dos|שתיים|2️⃣', 'tres|שלוש|3️⃣', 'cuatro|ארבע|4️⃣', 'cinco|חמש|5️⃣', 'cero|אפס|0️⃣',
        ] },
        { id: 'numeros-2', title: '6 עד 10', type: 'vocab', items: [
          'seis|שש|6️⃣', 'siete|שבע|7️⃣', 'ocho|שמונה|8️⃣', 'nueve|תשע|9️⃣', 'diez|עשר|🔟',
        ] },
        { id: 'numeros-3', title: 'שיר: Un elefante se balanceaba', type: 'song',
          origin: 'שיר ילדים מסורתי מספרד ומאמריקה הלטינית, נחלת הכלל. שרים אותו בגנים ובבתי ספר וסופרים איתו פילים.',
          lines: [
            'Un elefante se balanceaba|פיל אחד התנדנד',
            'sobre la tela de una araña.|על קורי עכביש.',
            'Como veía que resistía,|כשראה שהקורים מחזיקים,',
            'fue a llamar a otro elefante.|הלך לקרוא לפיל נוסף.',
            'Dos elefantes se balanceaban|שני פילים התנדנדו',
            'sobre la tela de una araña.|על קורי עכביש.',
            'Como veían que resistía,|כשראו שהקורים מחזיקים,',
            'fueron a llamar a otro elefante.|הלכו לקרוא לפיל נוסף.',
            'Tres elefantes se balanceaban…|שלושה פילים התנדנדו…',
          ] },
        { id: 'numeros-4', title: '11 עד 20', type: 'vocab', tracks: ['older'], items: [
          'once|אחת-עשרה|1️⃣1️⃣', 'doce|שתים-עשרה|1️⃣2️⃣', 'trece|שלוש-עשרה|1️⃣3️⃣', 'catorce|ארבע-עשרה|1️⃣4️⃣',
          'quince|חמש-עשרה|1️⃣5️⃣', 'dieciséis|שש-עשרה|1️⃣6️⃣', 'diecisiete|שבע-עשרה|1️⃣7️⃣',
          'dieciocho|שמונה-עשרה|1️⃣8️⃣', 'diecinueve|תשע-עשרה|1️⃣9️⃣', 'veinte|עשרים|2️⃣0️⃣',
        ] },
        { id: 'numeros-5', title: 'עשרות עד 100', type: 'vocab', tracks: ['older'], items: [
          'treinta|שלושים|3️⃣0️⃣', 'cuarenta|ארבעים|4️⃣0️⃣', 'cincuenta|חמישים|5️⃣0️⃣', 'sesenta|שישים|6️⃣0️⃣',
          'setenta|שבעים|7️⃣0️⃣', 'ochenta|שמונים|8️⃣0️⃣', 'noventa|תשעים|9️⃣0️⃣', 'cien|מאה|💯',
          'veintiuno|עשרים ואחת|2️⃣1️⃣', 'treinta y dos|שלושים ושתיים|3️⃣2️⃣',
        ] },
      ],
    },
    {
      id: 'colores', title: 'Los colores · צבעים', emoji: '🎨', color: '#ff5fa2',
      lessons: [
        { id: 'colores-1', title: 'צבעים בסיסיים', type: 'vocab', items: [
          'rojo|אדום|🟥', 'azul|כחול|🟦', 'amarillo|צהוב|🟨', 'verde|ירוק|🟩', 'naranja|כתום|🟧', 'morado|סגול|🟪',
        ] },
        { id: 'colores-2', title: 'עוד צבעים', type: 'vocab', items: [
          'blanco|לבן|⬜', 'negro|שחור|⬛', 'rosa|ורוד|🌸', 'marrón|חום|🟫', 'gris|אפור|🩶',
        ] },
        { id: 'colores-3', title: 'הכול צבעוני', type: 'phrases', items: [
          'El sol es amarillo.|השמש צהובה.|☀️', 'La hierba es verde.|הדשא ירוק.|🌱', 'El mar es azul.|הים כחול.|🌊',
          'La fresa es roja.|התות אדום.|🍓', 'El elefante es gris.|הפיל אפור.|🐘', '¿De qué color es?|באיזה צבע זה?|🎨',
        ] },
        { id: 'colores-4', title: 'זכר ונקבה בצבעים', type: 'grammar', tracks: ['older'],
          explain: [
            'כמו בעברית, גם בספרדית צבע משתנה לפי המילה שהוא מתאר.',
            'צבע שמסתיים ב-o משתנה ל-a בנקבה: el coche rojo, la casa roja.',
            'צבעים כמו verde, azul, gris ו-naranja לא משתנים בין זכר לנקבה.',
            'ברבים מוסיפים s או es: rojos, azules.',
          ],
          quiz: [
            'La casa es ___.|roja|rojo,rojos|הבית אדום.',
            'El perro es ___.|negro|negra,negras|הכלב שחור.',
            'Las flores son ___.|amarillas|amarillo,amarilla|הפרחים צהובים.',
            'Los coches son ___.|azules|azul,azula|המכוניות כחולות.',
            'La mesa es ___.|blanca|blanco,blancos|השולחן לבן.',
            'El gato es ___.|blanco|blanca,blancas|החתול לבן.',
          ] },
      ],
    },
    {
      id: 'escuela', title: 'En el cole · בבית הספר', emoji: '🏫', color: '#ffb400',
      lessons: [
        { id: 'escuela-1', title: 'כלי כתיבה וציוד', type: 'vocab', items: [
          'el lápiz|העיפרון|✏️', 'el libro|הספר|📕', 'la mochila|התיק|🎒', 'las tijeras|המספריים|✂️',
          'la regla|הסרגל|📏', 'el cuaderno|המחברת|📓', 'la goma|המחק|🧽', 'el estuche|הקלמר|👝',
        ] },
        { id: 'escuela-2', title: 'בכיתה', type: 'vocab', items: [
          'la clase|הכיתה|🏫', 'la profe|המורה|👩‍🏫', 'la mesa|השולחן|🪑', 'la pizarra|הלוח|🟩',
          'el patio|החצר|⛹️', 'el recreo|ההפסקה|🔔', 'el compañero|החבר לכיתה|🧒', 'el baño|השירותים|🚻',
        ] },
        { id: 'escuela-3', title: 'משפטי הצלה בכיתה', type: 'phrases', items: [
          '¿Puedo ir al baño?|אפשר ללכת לשירותים?|🚻', 'No entiendo.|אני לא מבין.|🤷',
          '¿Puedes repetir, por favor?|אפשר לחזור על זה, בבקשה?|🔁', 'Hablo hebreo.|אני מדבר עברית.|🗣️',
          '¿Cómo se dice en español?|איך אומרים את זה בספרדית?|💬', 'Necesito ayuda.|אני צריך עזרה.|🆘',
          'Tengo una pregunta.|יש לי שאלה.|✋', 'Ya he terminado.|כבר סיימתי.|✅',
        ] },
        { id: 'escuela-4', title: 'בחצר ובהפסקה', type: 'phrases', items: [
          '¿Quieres jugar conmigo?|רוצה לשחק איתי?|⚽', '¿Puedo jugar?|אפשר לשחק?|🙋',
          '¡Es mi turno!|זה התור שלי!|☝️', '¡Vamos!|קדימה!|🏃', '¿Somos amigos?|אנחנו חברים?|🤝',
          '¡Qué guay!|איזה מגניב!|😎', 'Me toca a mí.|עכשיו תורי.|👆',
        ] },
      ],
    },
  ],
};

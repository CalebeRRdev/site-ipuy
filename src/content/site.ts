// igreja-site/src/content/site.ts
export const site = {
  name: "Iglesia Presbiteriana del Uruguay",
  shortName: "IPUY",
  verse: {
    reference: "Salmo 46:1",
    text: "Dios es nuestro refugio y fortaleza, nuestro pronto auxilio en las tribulaciones.",
  },
  colors: {
    primary: "#057cff",
    primaryAlt: "#22447a",
    darkBg: "#15181b",
    lightBg: "#ffffff",
  },
  links: {
    youtubeChannelUrl: "https://www.youtube.com/channel/UCSoXPaxtyCxTBsnb7TCuvaQ",
    instagramUrl: "https://www.instagram.com/ipuyorguy/",
    facebookUrl: "https://www.facebook.com/ipuy.deluruguay/",
    whatsappUrl: "",
  },
  contact: {
    email: "secretaria@ipuy.org.uy",
    phoneChurch: "22005532",
    phonePastor: "098421504",
  },
  youtube: {
    featuredVideoId: "https://www.youtube.com/watch?v=s_HbUK2xYeY",
  },
  schedule: [
    { day: "Domingo", time: "10:00", title: "Escuela Dominical" },
    { day: "Domingo", time: "11:00", title: "Culto" },
    { day: "Jueves", time: "19:30", title: "Oración y Estudio" },
  ],
  schedulesByCongregation: [
    {
      key: "montevideo",
      title: "Montevideo",
      items: [
        { day: "Jueves", time: "19:30", title: "Reunión de oración y estudio bíblico" },
        { day: "1er Sábado del mes", time: "19:30", title: "Reunión de Mujeres" },
        { day: "2do y 4to Sábado del mes", time: "15:00", title: "Club Feliz" },
        { day: "2do y 4to Sábado del mes", time: "19:30", title: "Reunión de Jóvenes" },
        { day: "3ro Sábado del mes", time: "19:30", title: "Reunión de Hombres" },
        { day: "Domingo", time: "10:00", title: "EBD (Escuela Bíblica Dominical)" },
        { day: "Domingo", time: "11:00", title: "Culto y Adoración" },
      ],
    },
    {
      key: "mercedes",
      title: "Mercedes",
      items: [
        { day: "Jueves", time: "19:30", title: "Reunión de oración y estudio bíblico" },
        { day: "Domingo", time: "10:00", title: "EBD (Escuela Bíblica Dominical)" },
        { day: "Domingo", time: "11:00", title: "Culto y Adoración" },
      ],
    },
    {
      key: "las-piedras",
      title: "Las Piedras",
      items: [
        { day: "Domingo", time: "10:00", title: "Escuela Bíblica" },
        { day: "Domingo", time: "11:00", title: "Culto de Adoración" },
      ],
    },
    {
      key: "ciudad-de-la-costa",
      title: "Ciudad de La Costa",
      items: [
        { day: "Jueves", time: "19:30", title: "Reunión de estudio bíblico y oración" },
        { day: "Domingo", time: "10:00", title: "Escuela Bíblica Dominical" },
        { day: "Domingo", time: "11:00", title: "Culto Solemne" },
      ],
    },
  ] as Array<{
    key: string;
    title: string;
    items?: Array<{ day: string; time: string; title: string }>;
    variants?: Array<{
      key: string;
      label: string;
      dateRange?: { from: string; to: string };
      items: Array<{ day: string; time: string; title: string }>;
    }>;
  }>,
  location: {
    addressLine: "Gral. Farías 2764 esq. Carlos Princevalle (Bella Vista)",
    googleMapsQuery: "Gral. Farías 2764, Montevideo, Uruguay",
    googleMapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d104739.24284620285!2d-56.351839802734425!3d-34.8788015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x959f800348139d6f%3A0xad80b75558a0b175!2sIglesia%20Presbiteriana%20del%20Uruguay!5e0!3m2!1sen!2suy!4v1767507254634!5m2!1sen!2suy",
    photosPlaceholders: 3,
  },
  about: {
    sectionId: "sobre",
    title: "¿Quiénes somos?",
    logoImageSrc: "/images/site-logo-ipuy.png",
    logoImageAlt: "Iglesia Presbiteriana del Uruguay",
    intro: [
      "Te presentamos de manera breve lo que es nuestra Iglesia. Es una Iglesia de historia y tradición, que nació en la Reforma Protestante del siglo XVI y que hoy se encuentra en muchos países del mundo.",
      "En Montevideo el trabajo presbiteriano empezó en abril de 2010.",
    ],
    purposesTitle: "Los propósitos de esta Iglesia son:",
    purposes: [
      {
        title: "Adoración",
        text: "Rendir toda la gloria a Dios, por todo lo que es y por todo lo que hace en nuestras vidas, es decir, que nuestras vidas y acciones son para expresar glorias a Dios.",
      },
      {
        title: "Proclamación",
        text: "Compartir de manera sencilla y humilde el más precioso mensaje de Dios a los hombres: Las Buenas Nuevas de salvación, que Jesucristo vino al mundo para dar salvación eterna.",
      },
      {
        title: "Comunión",
        text: "Proveer un ambiente familiar basados en los principios de la Palabra de Dios donde uno se siente cómodo y asistido por su comunidad en las más diversas necesidades.",
      },
    ],
    originTitle: 'Origen de la Iglesia y significado del nombre "presbiteriano":',
    originText: [
      'Las iglesias presbiterianas forman parte de la familia de iglesias de teología reformada calvinista, que derivan su nombre de la palabra griega presbyteros (πρεσβύτερος), que significa literalmente "anciano".',
      "El origen del presbiterianismo se remonta a la iglesia del Nuevo Testamento (Hechos 14:23, 15:2, 4, 20:17), teniendo su principio como denominación en la Reforma Protestante del siglo 16 (agosto de 1560), más precisamente a las reformas protestantes suizas y escocesa, lideradas por personajes como Juan Calvino, Ulrico Zuinglio y Juan Knox.",
      'El nombre "presbiteriano" viene de la forma (sistema de gobierno) en que la iglesia es administrada a través de "presbíteros", elegidos democráticamente por las comunidades de cristianos locales. Los presbíteros junto con el pastor forman una junta (consistorio) para cuidar del bienestar espiritual de los miembros. Los presbíteros se dividen en dos oficios: presbíteros regentes (ancianos gobernantes laicos, que se encargan del gobierno y la supervisión) y presbíteros docentes (los pastores ordenados, que se encargan de la enseñanza, los sacramentos y el cuidado pastoral). Estos oficiales también integran los concilios de la iglesia, que son los Presbiterios, y el conjunto de Presbiterios forman el Sínodo. Los presbíteros pueden ser regentes (que gobiernan) y docentes (que enseñan), es decir, los pastores.',
    ],
    teachingsTitle: "Entre las enseñanzas bíblicas de la Iglesia Presbiteriana están:",
    teachings: [
      "la Soberanía de Dios",
      "la autoridad de la Biblia como Palabra de Dios y regla de fe y práctica de todo cristiano.",
      "La Elección que Dios hace de sus escogidos, la cual tiene un carácter irresistible, por lo cual el elegido no puede rehusarla.",
      "la justificación sólo por medio de la fe",
      "la salvación por gracia y no por obras, para lo que es necesario creer y confiar en Jesús El Cristo como único y suficiente salvador.",
    ],
    confessionNote:
      'Las enseñanzas bíblicas de la Iglesia Presbiteriana fueron resumidas por la Asamblea instituida en Westminster (Londres), en el año de 1643 que confeccionó la "Confesión de Fe de Westminster" de nuestra iglesia. Al aceptar esta confesión nos declaramos así una Iglesia Confesional.',
    leadershipTitle: "Liderazgo y congregaciones asociadas",
    leadersByCity: [
      {
        city: "Montevideo",
        names: ["Pr. Mauricio Rolim", "Presb. Melvyn Oliveras", "Presb. Fabian Romano", "Diac. Omar Taglioretti"],
      },
      {
        city: "Mercedes",
        names: ["Pr. Gilberto Santos", "Presb. Bruno Muriguenez", "Diac. Adrian Capurro"],
      },
      {
        city: "Ciudad de La Costa",
        names: ["Pr. Salomón Tavares"],
      },
      {
        city: "Las Piedras",
        names: ["Pr. Marcos Paulo Vieira"],
      },
    ],
    congregations: [
      {
        key: "montevideo",
        title: "Montevideo",
        imageSrc: "/images/montevideo.jpeg",
        instagramUrl: "https://www.instagram.com/ipuyorguy/",
        whatsappNumber: "598098421504",
        note: "Congregación en Montevideo.",
      },
      {
        key: "mercedes",
        title: "Mercedes",
        imageSrc: "/images/mercedes.jpeg",
        instagramUrl: "https://www.instagram.com/ipuymercedes?igsh=bmdnM2RhNDFpZ2J5",
        whatsappNumber: "5547989181401",
        note: "Congregación en Mercedes.",
      },
      {
        key: "las-piedras",
        title: "Las Piedras",
        imageSrc: "/images/las-piedras.jpeg",
        instagramUrl:
          "https://www.instagram.com/presbiteriana_las.piedras?igsh=MW9scTlzeHhzeWlxdA%3D%3D",
        whatsappNumber: "598096604060",
        note: "Congregación en Las Piedras.",
      },
      {
        key: "ciudad-de-la-costa",
        title: "Ciudad de La Costa",
        imageSrc: "/images/ciudad-de-la-costa.jpeg",
        instagramUrl:
          "https://www.instagram.com/iglesiapresbiterianadelacosta?igsh=MThkY2EwOXV1amdwaw%3D%3D",
        whatsappNumber: "598099017367",
        note: "Congregación en Ciudad de La Costa.",
      },
    ],
  },
  reformers: {
    title: "Trasfondo Histórico",
    subtitle:
      "Tres figuras clave relacionadas con la Reforma Protestante y el origen de la tradición reformada/presbiteriana.",
    items: [
      {
        key: "luther",
        name: "Martín Lutero",
        imageSrc: "/images/martin-lutero.png",
        bio: `Martin Lutero nació el 10 de noviembre de 1483, en Eisleben, Sajonia (casi 200 km al sudoeste del Berlín moderno). Hijo de Hans y Margarette Lutero.

Hans Lutero sabía que la minería era un negocio difícil y quería que su hijo tuviera algo mejor: quería que se convirtiera en abogado. A los siete años, Martin Lutero ingresó a la escuela en Mansfeld. A los 14 años Martin Lutero fue al norte de Magdeburgo, donde continuó sus estudios. En 1498, regresó a Eisleben y se matriculó en una escuela, estudiando gramática, retórica y lógica.

En 1501, Martin Lutero se convirtió en un estudiante en la Universidad de Erfurt. A pedido de su padre, tomó la ley, pero pronto abandonó la ley, prefiriendo estudiar a Aristóteles y los temas de filosofía y teología.

Martin obtuvo su bachillerato y su maestría en el tiempo más corto permitido por los estatutos de la universidad. Demostró ser tan experto en los debates públicos que se ganó el sobrenombre de "El filósofo".

Su padre quería que estudiara derecho, pero Martin estaba más interesado en la religión. Por lo tanto, ingresó en el monasterio agustino de Erfurt en 1505, ya que pensaba que ser monje era la mejor manera de estar seguro de ser salvo. Fue ordenado sacerdote en 1507. Fue en el monasterio donde encontró una Biblia, la primera Biblia que tuvo la oportunidad de leer; y ahora él dedicó todo su tiempo libre a estudiar las Escrituras.

En 1510, Martin fue enviado a Roma por asuntos de monasterios. Mientras estaba en este viaje, vio cuán corrupta se había vuelto la iglesia de su tiempo y cuán ignorante era la gente. Después de su regreso, continuó sus estudios y se doctoró en Teología en 1512. Luego fue llamado para convertirse en profesor de la Universidad de Wittenberg, cargo que ocupó hasta su muerte.

Lutero fue extraordinariamente dedicado como monje. Se dedicaba a la oración, el ayuno y las prácticas ascéticas: se quedó sin dormir, soportó un frío escalofriante sin una manta y se flageló a sí mismo. Aunque buscó por estos medios amar a Dios plenamente, no encontró consuelo. Estaba cada vez más aterrorizado por la ira de Dios: "Cuando es tocado por esta inundación pasajera de lo eterno, el alma siente y bebe nada más que el castigo eterno".

Habiendo comentado más tarde, "si alguien podría haber ganado el cielo por la vida de un monje, era yo".

A través de sus estudios de las escrituras, Martin Lutero recibió la gracia de ser iluminado en el entendimiento de las escrituras. Comenzando en 1513, mientras preparaba las conferencias, Lutero leyó la primera línea del Salmo 22, que Cristo gimió en su clamor por la misericordia en la cruz, un grito similar a la propia desilusión de Lutero con Dios y la religión. Dos años más tarde, mientras preparaba una conferencia sobre la Epístola de Pablo a los Romanos, leyó: "Los justos vivirán por la fe". Reflexionó sobre esta afirmación durante un tiempo. Fue allí donde hizo su gran "descubrimiento": que una persona no es salvada por sus buenas obras, sino por creer en los méritos y en la muerte sustitutoria de Jesucristo: "Al fin, meditando día y noche, por la misericordia de Dios, comencé a entender que la justicia de Dios es aquella por la cual los justos viven por un don de Dios, es decir, por la fe ... Aquí me sentí como si hubiera nacido completamente de nuevo y entrado en el paraíso a través de las puertas que habían sido abiertas ". Esta enseñanza bíblica había sido olvidada casi por completo durante varios cientos de años entre los monjes y sacerdotes de la iglesia, simplemente porque la Biblia misma rara vez era estudiada, incluso por los sacerdotes.

Este período marcó un cambio importante en su vida y puso en marcha la Reforma.

En 1517, otro sacerdote, Juan Tetzel, llegó a un pueblo cercano en una provincia situada más allá de la frontera de Sajonia en su misión de vender indulgencias. Se les dijo a las personas que, mediante la compra de estos certificados de penitencia, ellos podrían obtener la liberación del purgatorio y de la condenación de sus pecados, para ellos o sus parientes o amigos, aun a los que habían muerto. Lutero decidió que debía compartir sin demora con otros lo que había aprendido sobre el camino a la salvación. Publicó 95 tesis (oraciones) que mostraban cuán lejos la iglesia se había distanciado de la enseñanza de la Biblia. Esto fue el 31 de octubre de 1517, que ahora celebramos como el Día de la Reforma porque marca el comienzo de la gran Reforma de la Iglesia.

Lutero continuó muy ocupado. Él enseñó sus clases en la universidad; él predicó varias veces a la semana; escribió himnos, artículos, libros y cartas, tantos que sus escritos llenan más de cincuenta grandes volúmenes en inglés. Murió el 18 de febrero de 1546, a la edad de 62 años, en Eisleben, donde había nacido, uno de los más grandes siervos que Dios le había dado a su Iglesia.

Las denominaciones protestantes o evangélicas surgen como resultado de este movimiento que nace con Martin Lutero en el 31 de octubre de 1517.`,
      },
      {
        key: "calvin",
        name: "Juan Calvino",
        imageSrc: "/images/juan-calvino.png",
        bio: `Juan Calvino nació en Noyon, el noreste de Francia, el 10 de julio de 1509. Su padre, Gérard Cauvin, era abogado de los religiosos y secretario del obispo local. Su madre, Jeanne Lefranc, falleció cuando tenía seis años. A los 12, recibió un beneficio eclesiástico, cuya renta le sirvió como beca.

Cursó estudios de teología, humanidades y derecho, estas dos últimas por disposición de su padre que lo envió la Universidad de París. Calvino estudió teología en el College de la Marche, distinguido centro donde estudiaron otros personajes coetáneos importantes como Erasmo de Rotterdam. Luego, consigue doctorarse en Derecho en la Universidad de Orleans.

Se convirtió a la fe evangélica, probablemente bajo la influencia de su primo Robert Olivétan en 1533, de la que escribe en el prólogo de su comentario sobre los salmos.

En marzo de 1536 fue publicada en Basilea la primera edición de la Institución de la Religión Cristiana.

Calvino fue persuadido por Guillaume Farel para que lo acompañara a Ginebra en un intento de reformar la ciudad. Inicialmente, los magistrados de la ciudad de Ginebra rechazaron a los reformadores, pero en 1541 Calvino pudo obtener su aceptación y fundó allí una Iglesia Reformada, que se convertiría en el centro del calvinismo.

En 1559 hubo varios acontecimientos significativos, Calvino se convirtió en ciudadano de Ginebra e inauguró la Academia de Ginebra, embrión de la futura universidad, destinada primordialmente a la preparación de pastores reformados. En el mismo año, Calvino publicó la última edición de la Institución de la Religión Cristiana.

Aunque estaba constantemente enfermo, desarrolló intensa actividad como pastor, predicador, administrador, profesor y escritor.

Juan Calvino murió con casi 55 años el 27 de mayo de 1564. A su pedido fue sepultado discretamente en un lugar desconocido, pues no deseaba que nada, ni mismo un posible homenaje póstumo a su persona viniera a oscurecer la gloria de Dios. Uno de los emblemas que aparecen en las obras del reformador muestra una mano sosteniendo un corazón y las palabras latinas "Cor meum tibi offero Domine, prompte et sincere" (Mi corazón te ofrezco, oh Señor, de modo listo y sincero).

La Reforma avanzó más allá de Ginebra, los misioneros calvinistas viajaron a Francia, los Países Bajos y Alemania. John Knox, uno de los discípulos de Calvino, llevó la fe reformada a Escocia, donde la Iglesia Presbiteriana tiene sus raíces.`,
      },
      {
        key: "knox",
        name: "Juan Knox",
        imageSrc: "/images/juan-knox.png",
        bio: `La fecha y el lugar de nacimiento de John Knox son inciertos (1513-1515), siendo aceptada la fecha de 1513 como la más probable. Es posible que Knox haya nacido en el pueblo de Haddington, a las orillas del río Tyne, districto de Lothian Oriental, a unos 30 Km a al este de Edinburgo. Su padre, William Knox era hombre del campo y su madre era miembro de la familia Sinclair. Su madre falleció cuando aún era niño. Fue educado por su madrastra, que era cariñosa y comprensiva.

En 1528 las ideas luteranas del joven pastor Patrick Hamilton, que había estudiado en Marburgo y Wittenberg, con Lutero, fueron una causa positiva del inicio de la reforma en Escocia. Él enseñaba la justificación por la fe y llamó al Papa de anticristo. La muerte prematura de Patrick Hamilton, quemado de forma inhumana lentamente en la hoguera como hereje, marcó profundamente a John Knox, que tenía alrededor de 15 años en esa época.

Alrededor de 1529 ingresó en la Universidad de St. Andrews y pasó a estudiar teología. Fue ordenado en la Iglesia Católica Romana en 1536 convirtiéndose en un notario-sacerdote.

En lugar de servir a una parroquia local, Knox se convirtió en tutor de los hijos de la nobleza escocesa menor.

La conversión de John Knox fue influenciada por reformistas como Patrick Hamilton y Thomas Guillaume, "quien fue el primero en darle a Knox un sabor de la verdad". Knox se convirtió en discípulo de George Wishart, que introdujo los ideales de la reforma zuingliana en Escocia. Wishart tradujo al inglés en 1536, la Confesión Suiza. Knox se convirtió en guardaespaldas del feroz predicador George Wishart predicando a favor de la Reforma en toda Escocia "portando una espada de dos manos para defenderlo" y ganando el apodo de "Protestante con un Espada". En 1546, el Cardenal Beaton hizo que Wishart fuera arrestado, juzgado, estrangulado y quemado.

Después del martirio de Wishart, Knox llegó a San Andrés con algunos de sus jóvenes estudiantes y, en 1547, se unió al grupo de reformadores que pasaron a vivir en el castillo tras el asesinato del Cardenal Beaton. Cuando fue nombrado para predicar, rechazó, pero fue prácticamente forzado a aceptar un llamado de la congregación del castillo para convertirse en su ministro. En cuestión de meses, sin embargo, el castillo quedó bajo el cerco de barcos franceses en la bahía de Santo André. Knox y otros fueron capturados, y se convirtió en un esclavo en una galera por el próximo un año y medio.

Trabajó por 19 meses como esclavo en la galera de un barco militar francés hasta su liberación en el canje de prisioneros. En la galera sufrió, no sólo los rigores de ese tipo de vida, como también mucha crueldad, debilitando su salud.

Después de diecinueve meses de cautiverio y esclavitud, fue liberado y se refugió en Inglaterra.

John Knox predicó en Inglaterra durante cinco años y su reputación como predicador creció. Predicó ante el rey Eduardo y la corte durante la Cuaresma. Él era "un hombre de Dios, la luz de Escocia, el consuelo de la Iglesia, el espejo de la piedad y patrón y ejemplo para todos los verdaderos ministros en la pureza de la vida, en la firmeza de la doctrina y en la osadía para reprobar la maldad".

Cuando el rey Eduardo murió, María Tudor (la sanguinaria) restableció el catolicismo romano en Inglaterra, restaurando la misa a todas las iglesias. Como el país ya no era seguro para los predicadores protestantes, Knox salió de Inglaterra hacia Francia en 1554 y se dirigió a Ginebra.

Entre 1554-1559 estuvo en Ginebra y se convirtió en alumno de Juan Calvino, quien describió a Knox como "un hermano que trabaja enérgicamente por la fe", “un notable siervo de Dios”. Tan impresionado estaba Juan Knox con la Ginebra de Calvino, que la llamó "la escuela de Cristo más perfecta que haya existido en la tierra desde los días de los apóstoles". Viajando a Frankfurt, conoció a otros protestantes y pronto comenzó un debate. Discutieron, pero no pudieron ponerse de acuerdo sobre el orden de la adoración en la iglesia. El debate se caldeó. Salieron furiosos de la iglesia diciendo que no adorarían con Knox. Las autoridades de Frankfurt se dieron cuenta del folleto de Knox atacando al Sacro Emperador Romano llamándolo "no menos enemigo de Cristo que Nero" y se le pidió que abandonara Frankfurt. Regresó a su casa en Escocia.

De regreso en Escocia, los protestantes estaban redoblando sus esfuerzos y se estaban formando congregaciones en todo el país. Un grupo se comprometió a hacer del protestantismo la religión de la tierra. En 1555, invitaron a Knox a regresar a Escocia para inspirar la tarea de reforma. Knox pasó nueve meses predicando extensa y persuasivamente en Escocia antes de verse obligado a regresar a Ginebra.

En noviembre de 1555, regresó a Ginebra. Él llevó una vida feliz allí, predicando tres sermones por semana que a veces duraban más de dos horas.

A pedido de Calvino en 1559, escribió su único tratado teológico; Treatise on Predestination (Tratado sobre la Predestinación). Viendo la actitud de la reina Elizabeth I para con la reforma inglesa, escribió una Breve Exhortación a Inglaterra a abrazar rápidamente el Evangelio de Cristo De ahora en adelante, a la supresión y al progreso de la tiranía de María. La reina de Inglaterra le hizo una fuerte objeción, por considerar una intromisión de un escocés en los negocios de Inglaterra; también porque Knox había usado un lenguaje muy fuerte. Predicaba contra los obispados ingleses y afirmaba que el reinado de María Tudor fuera un juicio de Dios sobre Inglaterra por no llevar a continuación la reforma de la iglesia.

Knox regresó a Escocia en abril de ese año, predicando en la iglesia de S. Giles, en Edimburgo.

Knox dirigió la Reforma Protestante en Escocia con los nobles escoceses. Knox ayudó a escribir The Scots Confession of 1560 (Confesión Escocesa). Fue el primer estándar para la iglesia protestante en Escocia e incluía The Book of Discipline (libro de disciplina), que enfatiza el derecho de las personas a elegir sus propios ministros; y el Libro de Orden Común, que describía la forma en que los ministros deben cuidar de su rebaño y tratar de glorificar a Dios.

Aun en 1560:

- Se puso fin al dominio papal en la iglesia escocesa.

- La misa es declarada ilegal.

- Revocación de todos los decretos contra los herejes (protestantes).

- Aceptación de la Confesión de Fe de los Seis Juans (Confesión Escocesa), escrita en cuatro días, a petición del Parlamento por seis lideres con nombre Juan entre ellos Knox. Esta confesión, de inspiración notablemente calvinista fue la principal confesión de fe escocesa hasta la adopción de la Confesión de Fe de Westminster en 1647.

- Organización de la iglesia en presbiterios, sínodos y una asamblea general, semejantes a los de Ginebra. En ese mismo año se reunió por primera vez la Asamblea General de la Iglesia de Escocia. Fueron formalmente implantados en 1567.

En 1572, próximo a la fecha que marcó la noche de S. Bartolomé, en Francia (24 de agosto) Knox sufrió un ataque de parálisis y se retiró del liderazgo de la reforma. Sin embargo, al saber de los acontecimientos de esa noche, hizo un gran esfuerzo para volver al púlpito, advirtiendo a sus compatriotas que igual destino les caería si flaquean en la lucha.

En la mañana del 24 de noviembre, en el lecho de muerte, estaba rodeado de nobles escoceses, y pidió a su esposa para leer 1 Corintios 15 para él, que habla de la resurrección, y alrededor de las cinco horas su última petición fue: "Lea donde yo lancé mi primera ancla", y ella leyó Juan 17, la oración sacerdotal de Cristo. Alrededor de las 22 horas, su médico le preguntó si oyó las oraciones de los presentes a su favor, al que respondió: "Quisiera Dios que ustedes y todos los hombres las oyeran como yo las oí; y a Dios alabado por este sonido celestial... La hora ha llegado”. Estas fueron las últimas palabras, entonces falleció.

El legado de Knox es grande: su progenie espiritual incluye unos 750.000 presbiterianos en Escocia, 3 millones en los Estados Unidos y muchos millones más en todo el mundo.`,
      },
    ],
  },
  resources: {
    sectionId: "recursos",
    title: "Recursos",
    intro:
      "Ponemos a tu disposición materiales bíblicos y enseñanzas diseñadas para fortalecer tu fe, profundizar en la Palabra de Dios y acompañarte en tu caminar cristiano. Descarga libremente estos recursos y úsalos para tu estudio personal, familiar o comunitario.",
    categories: [] as Array<{
      key: string;
      title: string;
      items: Array<{ title: string; href: string }>;
    }>,
    mintsDriveUrl: "https://drive.google.com/drive/folders/1OOIUEMQX2DrRw_68yyPgfozszQjryvaO",
  },
} as const;
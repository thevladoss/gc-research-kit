// СГЕНЕРИРОВАНО scripts/build-data.mjs — не редактировать руками.
// Источник: synthesis/aggregate.json + adjudication/*.ruling.json (2026-07-06).
export interface DossierClaim { id: string; chapter: number; quote: string; asWritten: string; weakened: string | null; gap: number | null; kind: string | null; confidence: string | null; loadBearing: boolean; chainInherited: boolean; period: string | null }
export interface DossierCard { dossier: string; slug: string; chapters: number[]; narrative_ru: string; claims: DossierClaim[] }
export const dossierCards: readonly DossierCard[] = [
  {
    "dossier": "D01",
    "slug": "chronology-1844",
    "chapters": [
      18,
      22,
      23,
      26
    ],
    "narrative_ru": "Досье проверяет арифметическую цепочку 457 г. до н.э. - 1844 г., на которой держится вся миллеритско-адвентистская хронология книги. Сама арифметика везде верна, а конечные даты в том виде, как они напечатаны, держатся на спорном якоре: клинописная хронология ставит седьмой год Артаксеркса I на 458, а не 457 год, дату распятия в 31 году астрономические реконструкции исключают, крещение 'осенью 27 года' опирается на отвергнутый ныне счёт лет Тиверия. Формулы 'установлено вне всякого сомнения' и 'остаётся неопровержимым' противоречат документированной картине: вычисление оспаривали и современные учёные, и сами миллериты в 1844 году. При этом смягчённые версии почти всех утверждений подтверждаются: дата 457 была стандартной библейской хронологией эпохи (поля Библий короля Иакова), события вокруг 34 года (мученичество Стефана, гонение) попадают в научно допустимое окно, а вычисление внутренне последовательно. Разрыв между риторикой уверенности и защитимой сутью - главный итог досье: страдает не столько фактическая основа эпохи, сколько абсолютные формулировки 1911 года. Картину изменили бы документы, показывающие осенний отсчёт лет персидских царей у иудейских писцов, либо новые данные о календаре Иудеи 20-30-х годов I века.",
    "claims": [
      {
        "id": "GC-18-058",
        "chapter": 18,
        "quote": "the seventy weeks must therefore be a part of the 2300 days, and the two periods must begin together.",
        "asWritten": "out-of-scope",
        "weakened": "n/a",
        "gap": null,
        "kind": null,
        "confidence": "high",
        "loadBearing": true,
        "chainInherited": false,
        "period": null
      },
      {
        "id": "GC-18-060",
        "chapter": 18,
        "quote": "In the seventh chapter of Ezra the decree is found.(540) In its completest form it was issued by Artaxerxes, king of Persia, B.C. 457.",
        "asWritten": "improbable",
        "weakened": "probable",
        "gap": 2,
        "kind": "fact",
        "confidence": "medium",
        "loadBearing": true,
        "chainInherited": false,
        "period": "period-scholarship"
      },
      {
        "id": "GC-18-062",
        "chapter": 18,
        "quote": "These three kings, in originating, re-affirming, and completing the decree, brought it to the perfection required by the prophecy to mark the begin…",
        "asWritten": "probable",
        "weakened": "well-supported",
        "gap": 1,
        "kind": "fact",
        "confidence": "medium",
        "loadBearing": true,
        "chainInherited": false,
        "period": null
      },
      {
        "id": "GC-18-063",
        "chapter": 18,
        "quote": "The decree of Artaxerxes went into effect in the autumn of B.C. 457.",
        "asWritten": "improbable",
        "weakened": "probable",
        "gap": 2,
        "kind": "fact",
        "confidence": "medium",
        "loadBearing": true,
        "chainInherited": true,
        "period": null
      },
      {
        "id": "GC-18-065",
        "chapter": 18,
        "quote": "In the autumn of A.D. 27, Christ was baptized by John, and received the anointing of the Spirit.",
        "asWritten": "improbable",
        "weakened": "well-supported",
        "gap": 3,
        "kind": "fact",
        "confidence": "medium",
        "loadBearing": true,
        "chainInherited": true,
        "period": "period-scholarship"
      },
      {
        "id": "GC-18-069",
        "chapter": 18,
        "quote": "During this time, extending from A.D. 27 to A.D. 34, Christ, at first in person and afterward by His disciples, extended the gospel invitation espe…",
        "asWritten": "improbable",
        "weakened": "well-supported",
        "gap": 3,
        "kind": "fact",
        "confidence": "medium",
        "loadBearing": false,
        "chainInherited": true,
        "period": null
      },
      {
        "id": "GC-18-071",
        "chapter": 18,
        "quote": "In A.D. 31, three and a half years after His baptism, our Lord was crucified.",
        "asWritten": "improbable",
        "weakened": "well-supported",
        "gap": 3,
        "kind": "fact",
        "confidence": "high",
        "loadBearing": true,
        "chainInherited": false,
        "period": null
      },
      {
        "id": "GC-18-073",
        "chapter": 18,
        "quote": "The seventy weeks, or 490 years, especially allotted to the Jews, ended, as we have seen, in A.D. 34.",
        "asWritten": "improbable",
        "weakened": "probable",
        "gap": 2,
        "kind": "fact",
        "confidence": "medium",
        "loadBearing": true,
        "chainInherited": true,
        "period": null
      },
      {
        "id": "GC-18-078",
        "chapter": 18,
        "quote": "the beginning of the seventy weeks is fixed beyond question at B.C. 457, and their expiration in A.D. 34.",
        "asWritten": "discredited",
        "weakened": "well-supported",
        "gap": 4,
        "kind": "frame",
        "confidence": "high",
        "loadBearing": true,
        "chainInherited": false,
        "period": null
      },
      {
        "id": "GC-18-081",
        "chapter": 18,
        "quote": "Consequently the 2300 days of Dan. 8:14 terminate in 1844.",
        "asWritten": "improbable",
        "weakened": "well-supported",
        "gap": 3,
        "kind": "fact",
        "confidence": "medium",
        "loadBearing": true,
        "chainInherited": true,
        "period": null
      },
      {
        "id": "GC-22-039",
        "chapter": 22,
        "quote": "That which led to this movement was the discovery that the decree of Artaxerxes for the restoration of Jerusalem, which formed the starting-point f…",
        "asWritten": "improbable",
        "weakened": "well-supported",
        "gap": 3,
        "kind": "fact",
        "confidence": "medium",
        "loadBearing": true,
        "chainInherited": true,
        "period": null
      },
      {
        "id": "GC-23-008",
        "chapter": 23,
        "quote": "The 2300 days had been found to begin when the commandment of Artaxerxes for the restoration and building of Jerusalem, went into effect, in the au…",
        "asWritten": "improbable",
        "weakened": "well-supported",
        "gap": 3,
        "kind": "fact",
        "confidence": "medium",
        "loadBearing": true,
        "chainInherited": true,
        "period": null
      },
      {
        "id": "GC-23-009",
        "chapter": 23,
        "quote": "Sixty-nine weeks, the first 483 of the 2300 years, were to reach to the Messiah, the Anointed One; and Christ’s baptism and anointing by the Holy S…",
        "asWritten": "improbable",
        "weakened": "probable",
        "gap": 2,
        "kind": "fact",
        "confidence": "medium",
        "loadBearing": true,
        "chainInherited": true,
        "period": null
      },
      {
        "id": "GC-23-010",
        "chapter": 23,
        "quote": "Three and a half years after His baptism, Christ was crucified, in the spring of A.D. 31.",
        "asWritten": "improbable",
        "weakened": "well-supported",
        "gap": 3,
        "kind": "fact",
        "confidence": "high",
        "loadBearing": true,
        "chainInherited": true,
        "period": null
      },
      {
        "id": "GC-23-012",
        "chapter": 23,
        "quote": "At the expiration of this period, the nation sealed its rejection of Christ by the persecution of His disciples, and the apostles turned to the Gen…",
        "asWritten": "improbable",
        "weakened": "well-supported",
        "gap": 3,
        "kind": "fact",
        "confidence": "medium",
        "loadBearing": true,
        "chainInherited": true,
        "period": null
      },
      {
        "id": "GC-26-069",
        "chapter": 26,
        "quote": "The computation of the prophetic periods on which that message was based, placing the close of the 2300 days in the autumn of 1844, stands without…",
        "asWritten": "discredited",
        "weakened": "well-supported",
        "gap": 4,
        "kind": "frame",
        "confidence": "high",
        "loadBearing": true,
        "chainInherited": false,
        "period": null
      }
    ]
  },
  {
    "dossier": "D02",
    "slug": "sabbath-sunday-origins",
    "chapters": [
      3,
      26,
      35
    ],
    "narrative_ru": "Досье проверяло восемь утверждений книги о том, когда, где и чьей волей воскресенье вытеснило субботу в раннем христианстве. В авторских формулировках почти все они не устояли: приписывание перемены «папской власти», происхождение воскресенья «от Рима» и папский дворец как источник подложного «небесного свитка» противоречат датировкам и географии источников, а тезис «субботу соблюдали все христиане» опровергают Иустин и Послание Варнавы уже во II веке. Ослабленные версии тех же тезисов оказались прочными: римская церковь документированно принижала субботу (субботний пост, декреталия Иннокентия I), католические авторы от Тридентского собора до катехизисов XIX века сами называли перемену дня делом власти церкви, и прямой библейской заповеди о воскресенье нет, что признают и его защитники. Вопрос, восходит ли воскресное богослужение к апостолам или сложилось после них, остаётся открытым и среди специалистов без конфессиональной привязки. Картину изменили бы находки уровня римского декрета II века о дне собраний, документов канцелярии о свитке 1201 года или свидетельств того, что епископы побуждали Константина к закону 321 года.",
    "claims": [
      {
        "id": "GC-35-057",
        "chapter": 35,
        "quote": "the principal object contemplated is the enforcement of Sunday observance,—a custom which originated with Rome, and which she claims as the sign of…",
        "asWritten": "improbable",
        "weakened": "probable",
        "gap": 2,
        "kind": "fact",
        "confidence": "high",
        "loadBearing": true,
        "chainInherited": false,
        "period": null
      },
      {
        "id": "GC-26-014",
        "chapter": 26,
        "quote": "When the Sabbath was changed by the papal power, the seal was taken from the law.",
        "asWritten": "improbable",
        "weakened": "probable",
        "gap": 2,
        "kind": "fact",
        "confidence": "medium",
        "loadBearing": false,
        "chainInherited": false,
        "period": null
      },
      {
        "id": "GC-26-025",
        "chapter": 26,
        "quote": "The breach was made in the law of God when the Sabbath was changed by the Roman power.",
        "asWritten": "improbable",
        "weakened": "probable",
        "gap": 2,
        "kind": "fact",
        "confidence": "medium",
        "loadBearing": false,
        "chainInherited": true,
        "period": null
      },
      {
        "id": "GC-35-103",
        "chapter": 35,
        "quote": "With Protestant teachers there is the same claim of divine authority for Sunday-keeping, and the same lack of scriptural evidence, as with the papa…",
        "asWritten": "improbable",
        "weakened": "well-supported",
        "gap": 3,
        "kind": "fact",
        "confidence": "medium",
        "loadBearing": false,
        "chainInherited": false,
        "period": null
      },
      {
        "id": "GC-03-032",
        "chapter": 3,
        "quote": "In the first centuries the true Sabbath had been kept by all Christians.",
        "asWritten": "discredited",
        "weakened": "well-supported",
        "gap": 4,
        "kind": "fact",
        "confidence": "high",
        "loadBearing": false,
        "chainInherited": false,
        "period": "expositor-tradition"
      },
      {
        "id": "GC-35-076",
        "chapter": 35,
        "quote": "But in fact, the pontifical palace at Rome was the source whence it proceeded.",
        "asWritten": "improbable",
        "weakened": "well-supported",
        "gap": 3,
        "kind": "fact",
        "confidence": "medium",
        "loadBearing": false,
        "chainInherited": false,
        "period": null
      },
      {
        "id": "GC-03-039",
        "chapter": 3,
        "quote": "He was urged to do this by the bishops of the church, who, inspired by ambition and thirst for power, perceived that if the same day was observed b…",
        "asWritten": "improbable",
        "weakened": "probable",
        "gap": 2,
        "kind": "fact",
        "confidence": "medium",
        "loadBearing": false,
        "chainInherited": false,
        "period": null
      },
      {
        "id": "GC-03-050",
        "chapter": 3,
        "quote": "The observance of Sunday as a Christian institution had its origin in that “mystery of lawlessness” which, even in Paul’s day, had begun its work.",
        "asWritten": "genuinely-open",
        "weakened": "well-supported",
        "gap": 2,
        "kind": "fact",
        "confidence": "medium",
        "loadBearing": false,
        "chainInherited": false,
        "period": null
      }
    ]
  },
  {
    "dossier": "D03",
    "slug": "millerite-independence-and-1840",
    "chapters": [
      18,
      20
    ],
    "narrative_ru": "Досье проверяет два сюжета миллеритской истории: тезис, что адвентистская весть возникла в разных странах независимо, «исключительно через изучение Писания», и рассказ о предсказании Джосайи Литча про падение османской власти 11 августа 1840 года. Цитату Литча книга передаёт точно, с его собственными оговорками и с верной датировкой, поэтому это утверждение переведено в подтверждённые. Сам «исполнившийся точный срок» проверки не выдерживает: Порта приняла защиту держав конвенцией 15 июля 1840 года, ультиматум довели до Мухаммеда Али 16-19 августа, а 11 августа в Александрию лишь прибыл пароход с посланником, и позднее сам Литч отказался от этого толкования. Тезис о возникновении веры «исключительно из Писания» в изолированных группах противоречит задокументированным связям: перевод Лакунсы Ирвингом, конференции в Олбери с участием Вольфа, общая традиция толкования пророчеств; в ослабленной форме («сходные выводы при малом прямом контакте», как у Бенгеля, Лакунсы и Миллера) картина правдоподобна. Оценки сдвинули бы османский документ о формальном акте подчинения именно 11 августа или архивные свидетельства о группах, пришедших к датированному адвентистскому ожиданию вне этих сетей и литературы.",
    "claims": [
      {
        "id": "GC-20-016",
        "chapter": 20,
        "quote": "In different lands there were isolated bodies of Christians who, solely by the study of the Scriptures, arrived at the belief that the Saviour’s ad…",
        "asWritten": "improbable",
        "weakened": "probable",
        "gap": 2,
        "kind": "fact",
        "confidence": "medium",
        "loadBearing": true,
        "chainInherited": false,
        "period": null
      },
      {
        "id": "GC-18-119",
        "chapter": 18,
        "quote": "“Allowing the first period, 150 years, to have been exactly fulfilled before Deacozes ascended the throne by permission of the Turks, and that the…",
        "asWritten": "well-supported",
        "weakened": "well-supported",
        "gap": 0,
        "kind": "fact",
        "confidence": "high",
        "loadBearing": false,
        "chainInherited": false,
        "period": null
      },
      {
        "id": "GC-18-120",
        "chapter": 18,
        "quote": "At the very time specified, Turkey, through her ambassadors, accepted the protection of the allied powers of Europe, and thus placed herself under…",
        "asWritten": "improbable",
        "weakened": "well-supported",
        "gap": 3,
        "kind": "fact",
        "confidence": "high",
        "loadBearing": false,
        "chainInherited": false,
        "period": null
      }
    ]
  },
  {
    "dossier": "D04",
    "slug": "french-revolution-rev11",
    "chapters": [
      15
    ],
    "narrative_ru": "Досье проверяет три утверждения главы о Французской революции: интервал ровно в три с половиной года между отменой религии в 1793 году и её восстановлением «тем же собранием», лозунг «раздавите гадину» как направленный лично против Христа и слова «после меня хоть потоп» в устах Людовика XV. Законодательная хроника опровергает первую конструкцию: Конвент подтвердил свободу культов уже 6 декабря 1793 года, закон 3 вантоза (21 февраля 1795 года) восстановил свободное отправление религии через пятнадцать месяцев, а к июню 1797 года Конвента не существовало, так что «то же собрание» ничего отменить не могло. Исследователи Вольтера (Бестерман, Питер Гей, Помо) читают «l'infame» как суеверие, фанатизм и гонящую церковь; чтение «то есть Христос» в науке поддержки не имеет. Фразу о потопе самый ранний источник приписывает мадам де Помпадур, причём уже в 1756 году Мирабо называл её ходячей поговоркой. В ослабленных версиях все три утверждения устойчивы: кампания дехристианизации с публичным сожжением Библий, антихристианский смысл вольтеровского лозунга и беспечный фатализм двора Людовика XV документированы. Картину изменили бы находка в парламентских архивах конкретных актов 1793 и 1797 годов, письмо Вольтера с «l'infame» о самом Христе или прижизненная запись слов короля.",
    "claims": [
      {
        "id": "GC-15-142",
        "chapter": 15,
        "quote": "Three years and a half later a resolution rescinding these decrees, thus granting toleration to the Scriptures, was adopted by the same body.",
        "asWritten": "discredited",
        "weakened": "well-supported",
        "gap": 4,
        "kind": "fact",
        "confidence": "high",
        "loadBearing": true,
        "chainInherited": false,
        "period": "expositor-tradition"
      },
      {
        "id": "GC-15-069",
        "chapter": 15,
        "quote": "Jesus Christ was declared to be an impostor, and the rallying cry of the French infidels was, “Crush the Wretch,” meaning Christ.",
        "asWritten": "improbable",
        "weakened": "well-supported",
        "gap": 3,
        "kind": "fact",
        "confidence": "high",
        "loadBearing": false,
        "chainInherited": false,
        "period": "expositor-tradition"
      },
      {
        "id": "GC-15-113",
        "chapter": 15,
        "quote": "The doom awaiting France was but too truly pictured in his indolent and selfish answer,—“After me, the deluge!”",
        "asWritten": "improbable",
        "weakened": "well-supported",
        "gap": 3,
        "kind": "fact",
        "confidence": "medium",
        "loadBearing": false,
        "chainInherited": false,
        "period": "expositor-tradition"
      }
    ]
  },
  {
    "dossier": "D05",
    "slug": "pella-flight-ad70",
    "chapters": [
      1
    ],
    "narrative_ru": "Досье разбирает рассказ «Великой борьбы» о судьбе христиан при гибели Иерусалима: ни один христианин не погиб, община бежала в Пеллу за Иорданом, а окно для бегства открыл отход Цестия Галла в 66 году. Отход Цестия и преследование его армии Иосиф Флавий описывает подробно, и знатные жители города в тот момент действительно уходили из него. Сам уход общины в Пеллу засвидетельствован только Евсевием и Епифанием спустя столетия; после книги Брэндона 1951 года историки спорят о его реальности (скептики Людеманн и Верхейден против защитников ядра традиции Кёстера и Бургеля), и спор не решён. Абсолют «ни один не погиб» не встречается ни у одного древнего автора: Евсевий его не утверждает, формула родилась у комментаторов XVII–XIX веков (Хаммонд, Ньютон, Кларк) как довод от молчания и попала в книгу почти дословно из этой традиции. Как написано, утверждение о нулевых потерях получило оценку «improbable»; ослабленные версии (община в основном спаслась; окно для ухода было реальным) стоят от «genuinely-open» до «well-supported». Картину изменили бы находки следов иудео-христианских беженцев I века в Пелле или доевсевиевский источник о судьбе иерусалимской общины.",
    "claims": [
      {
        "id": "GC-01-079",
        "chapter": 1,
        "quote": "Not one Christian perished in the destruction of Jerusalem.",
        "asWritten": "improbable",
        "weakened": "genuinely-open",
        "gap": 1,
        "kind": "fact",
        "confidence": "medium",
        "loadBearing": true,
        "chainInherited": false,
        "period": "expositor-tradition"
      },
      {
        "id": "GC-01-082",
        "chapter": 1,
        "quote": "Upon the retreat of Cestius, the Jews, sallying from Jerusalem, pursued after his retiring army; and while both forces were thus fully engaged, the…",
        "asWritten": "genuinely-open",
        "weakened": "well-supported",
        "gap": 2,
        "kind": "fact",
        "confidence": "medium",
        "loadBearing": false,
        "chainInherited": false,
        "period": null
      },
      {
        "id": "GC-01-084",
        "chapter": 1,
        "quote": "Without delay they fled to a place of safety,—the city of Pella, in the land of Perea, beyond Jordan.",
        "asWritten": "genuinely-open",
        "weakened": "genuinely-open",
        "gap": 0,
        "kind": "fact",
        "confidence": "medium",
        "loadBearing": false,
        "chainInherited": false,
        "period": null
      }
    ]
  },
  {
    "dossier": "D06",
    "slug": "eden-sabbath",
    "chapters": [
      25
    ],
    "narrative_ru": "Досье проверяло одно несущее утверждение книги: суббота как установление существует с самого творения, от Эдема. Документированная история этого не подтверждает: ни у одного народа до Израиля не засвидетельствованы ни семидневная неделя, ни еженедельный день покоя, а сама книга Бытия не упоминает соблюдения субботы никем от Адама до Моисея. Академическая наука прослеживает субботу как израильское установление, которое рассказ о творении обосновывает задним числом; защита эдемского происхождения опирается на богословское прочтение текста, а не на исторические свидетельства. Ослабленная версия устояла: суббота действительно древнее установление, и сама библейская традиция с самого начала связывает её с творением как его памятник. Богословский тезис, что субботу установил Бог и с какой целью, остаётся за рамками исторической проверки. Картину изменила бы находка до-израильского памятника с непрерывным семидневным циклом и повторяющимся днём покоя.",
    "claims": [
      {
        "id": "GC-25-051",
        "chapter": 25,
        "quote": "It was to keep this truth ever before the minds of men, that God instituted the Sabbath in Eden;",
        "asWritten": "improbable",
        "weakened": "well-supported",
        "gap": 3,
        "kind": "fact",
        "confidence": "medium",
        "loadBearing": true,
        "chainInherited": false,
        "period": "period-scholarship"
      }
    ]
  },
  {
    "dossier": "D07",
    "slug": "rome-and-the-bible",
    "chapters": [
      4,
      15,
      21,
      32,
      35,
      37
    ],
    "narrative_ru": "Досье проверяет шесть утверждений книги о том, что Рим прятал Библию от народа, от средневековья до настоящего времени 1911 года. В авторских формулировках ни одно не устояло: единой всеобщей политики сокрытия не существовало, до Лютера в Германии напечатали не менее 18 полных Библий, а к 1911 году папы сами поощряли чтение одобренных переводов, вплоть до индульгенции за ежедневное чтение Евангелия (1898). При этом ослабленные версии всех шести утверждений подтверждаются: Рим веками ограничивал доступ мирян к Писанию на народном языке, после Тридентского собора в Италии и Испании действовал почти полный запрет, документированный по архивам инквизиции (Fragnito), а самостоятельное толкование Писания церковь официально запрещала. Главный итог досье и есть этот разрыв: абсолютная риторика ложна, ограничительное ядро документировано. Картину изменил бы найденный соборный декрет общецерковного действия о сокрытии Писания или доказательства, что разрешения 1897-1911 годов оставались мертвой буквой по всей церкви.",
    "claims": [
      {
        "id": "GC-15-028",
        "chapter": 15,
        "quote": "It had been Rome’s policy, under a profession of reverence for the Bible, to keep it locked up in an unknown tongue, and hidden away from the people.",
        "asWritten": "improbable",
        "weakened": "well-supported",
        "gap": 3,
        "kind": "fact",
        "confidence": "high",
        "loadBearing": false,
        "chainInherited": false,
        "period": null
      },
      {
        "id": "GC-21-082",
        "chapter": 21,
        "quote": "Rome withheld the Bible from the people, and required all men to accept her teachings in its place. It was the work of the Reformation to restore t…",
        "asWritten": "improbable",
        "weakened": "well-supported",
        "gap": 3,
        "kind": "fact",
        "confidence": "high",
        "loadBearing": false,
        "chainInherited": false,
        "period": "period-scholarship"
      },
      {
        "id": "GC-32-017",
        "chapter": 32,
        "quote": "The papal leaders select such portions of Scripture as best serve their purpose, interpret to suit themselves, and then present these to the people…",
        "asWritten": "improbable",
        "weakened": "well-supported",
        "gap": 3,
        "kind": "fact",
        "confidence": "high",
        "loadBearing": false,
        "chainInherited": false,
        "period": null
      },
      {
        "id": "GC-35-017",
        "chapter": 35,
        "quote": "They are not allowed access to His word, and therefore they do not discern the truth.",
        "asWritten": "discredited",
        "weakened": "well-supported",
        "gap": 4,
        "kind": "fact",
        "confidence": "high",
        "loadBearing": false,
        "chainInherited": false,
        "period": null
      },
      {
        "id": "GC-37-029",
        "chapter": 37,
        "quote": "On the ground that ecclesiastics alone are competent to explain God’s word, it is withheld from the common people.",
        "asWritten": "improbable",
        "weakened": "well-supported",
        "gap": 3,
        "kind": "fact",
        "confidence": "high",
        "loadBearing": false,
        "chainInherited": false,
        "period": null
      },
      {
        "id": "GC-04-005",
        "chapter": 4,
        "quote": "Rome endeavored also to destroy every record of her cruelty toward dissenters. Papal councils decreed that books and writings containing such recor…",
        "asWritten": "improbable",
        "weakened": "well-supported",
        "gap": 3,
        "kind": "fact",
        "confidence": "medium",
        "loadBearing": false,
        "chainInherited": false,
        "period": null
      }
    ]
  },
  {
    "dossier": "D08",
    "slug": "immortality-genealogy",
    "chapters": [
      33,
      36
    ],
    "narrative_ru": "Досье проверяет родословную двух учений: вечных мук и природного бессмертия души. Историки догмы и сами адвентистские авторы (Фрум) сходятся в том, что концепция бессмертной по природе души вошла в христианское богословие из греческой философии. Книга, однако, приписывает это заимствование Риму, тогда как усвоение произошло у отцов II-V веков (Афинагор, Тертуллиан, Ориген, Августин), за столетия до средневекового папства, и восточные церкви держатся тех же учений без римского посредничества. Все три утверждения в авторской формулировке получили оценку improbable, а их ослабленные версии (наследование протестантами этих доктрин через средневековую латинскую церковь, позднейшая догматизация Римом в 1336 и 1513 годах, уязвимость протестантов перед спиритизмом) устояли на уровне well-supported и probable. Картину изменили бы документы, показывающие специфически римский канал внедрения этих доктрин в раннее христианство.",
    "claims": [
      {
        "id": "GC-33-034",
        "chapter": 33,
        "quote": "They received it from Rome, as they received the false sabbath.",
        "asWritten": "improbable",
        "weakened": "well-supported",
        "gap": 3,
        "kind": "fact",
        "confidence": "medium",
        "loadBearing": false,
        "chainInherited": false,
        "period": null
      },
      {
        "id": "GC-33-099",
        "chapter": 33,
        "quote": "The theory of the immortality of the soul was one of those false doctrines that Rome, borrowing from paganism, incorporated into the religion of Ch…",
        "asWritten": "improbable",
        "weakened": "well-supported",
        "gap": 3,
        "kind": "fact",
        "confidence": "high",
        "loadBearing": false,
        "chainInherited": false,
        "period": null
      },
      {
        "id": "GC-36-044",
        "chapter": 36,
        "quote": "Clinging to the papal error of natural immortality and man’s consciousness in death, they have rejected the only defense against the delusions of S…",
        "asWritten": "improbable",
        "weakened": "probable",
        "gap": 2,
        "kind": "fact",
        "confidence": "medium",
        "loadBearing": false,
        "chainInherited": false,
        "period": null
      }
    ]
  },
  {
    "dossier": "D09",
    "slug": "luther-narrative-layer",
    "chapters": [
      7,
      8,
      10
    ],
    "narrative_ru": "Досье объединяет четыре эпизода лютеровской истории, которые «Великая борьба» пересказывает по Д'Обинье. Знаменитая фраза «На сём стою» есть в первом печатном издании речи 1521 года, но отсутствует в протоколах рейхстага, и учёные до сих пор расходятся, произнёс ли её Лютер; суть его ответа в Вормсе подлинна. Сцена на Святой лестнице с «голосом как гром» и характеристика Мюнцера как честолюбца в записанном виде не выдержали проверки: первая опирается на позднее семейное предание, драматизированное Д'Обинье, вторая противоречит документированным апокалиптико-богословским мотивам самого Мюнцера. Абсолютное отрицание «малейшего основания» у обвинения Лютера в Крестьянской войне также расходится с современной историографией, хотя сам Лютер восстание осуждал и к нему не призывал. В ослабленных формулировках три из четырёх утверждений хорошо подтверждены, а картину изменили бы новые документы XVI века: независимое свидетельство о словах в Вормсе, ранняя запись эпизода на лестнице или письмо Мюнцера с карьерными мотивами.",
    "claims": [
      {
        "id": "GC-08-088",
        "chapter": 8,
        "quote": "The Reformer answered: “Since your most serene majesty and your high mightinesses require from me a clear, simple, and precise answer, I will give…",
        "asWritten": "genuinely-open",
        "weakened": "well-supported",
        "gap": 2,
        "kind": "fact",
        "confidence": "high",
        "loadBearing": false,
        "chainInherited": false,
        "period": null
      },
      {
        "id": "GC-07-036",
        "chapter": 7,
        "quote": "Luther was one day devoutly climbing these steps, when suddenly a voice like thunder seemed to say to him, “The just shall live by faith.”(165) He…",
        "asWritten": "improbable",
        "weakened": "genuinely-open",
        "gap": 1,
        "kind": "fact",
        "confidence": "medium",
        "loadBearing": false,
        "chainInherited": false,
        "period": null
      },
      {
        "id": "GC-10-066",
        "chapter": 10,
        "quote": "Although this charge was without the slightest foundation, it could not but cause the Reformer great distress.",
        "asWritten": "improbable",
        "weakened": "well-supported",
        "gap": 3,
        "kind": "fact",
        "confidence": "medium",
        "loadBearing": false,
        "chainInherited": false,
        "period": "period-scholarship"
      },
      {
        "id": "GC-10-054",
        "chapter": 10,
        "quote": "He was ambitious to obtain position and influence, and was unwilling to be second, even to Luther.",
        "asWritten": "improbable",
        "weakened": "well-supported",
        "gap": 3,
        "kind": "motive",
        "confidence": "medium",
        "loadBearing": false,
        "chainInherited": false,
        "period": "period-scholarship"
      }
    ]
  },
  {
    "dossier": "D10",
    "slug": "constantinian-fall-and-syncretism",
    "chapters": [
      2,
      3
    ],
    "narrative_ru": "Это досье разбирает картину «константиновского падения» церкви: слияние христианства с язычеством после прекращения гонений, подмену идолов образами святых и утрату Библии как мерила веры. Фактическое ядро подтвердилось: исследователи (Макмаллен, Браун, Франкфуртер) признают массовый приток поверхностно обращённых язычников и переход многих функций языческого культа к культу святых. Тотальные формулировки книги проверку не прошли: тезисы о «победившем язычестве», о большинстве христиан, понизивших свой уровень, и о чистилище как «изобретении язычества» расходятся с балансом специальных исследований, а слова о том, что Библию не признавали мерилом веры, опровергаются текстами отцов церкви и средневековых богословов. В ослабленных версиях семь из восьми утверждений получили оценку «хорошо подтверждено», ещё одно «вероятно», поэтому главная находка досье состоит в разрыве между риторикой и фактической основой. Картину изменили бы документы эпохи, показывающие сознательное введение поклонения образам ради привлечения язычников или официальный отказ церкви той эпохи от авторитета Писания.",
    "claims": [
      {
        "id": "GC-02-053",
        "chapter": 2,
        "quote": "The Bible was not accepted as the standard of faith.",
        "asWritten": "discredited",
        "weakened": "well-supported",
        "gap": 4,
        "kind": "fact",
        "confidence": "high",
        "loadBearing": false,
        "chainInherited": false,
        "period": null
      },
      {
        "id": "GC-02-050",
        "chapter": 2,
        "quote": "Thus, as long as persecution continued, the church remained comparatively pure. But as it ceased, converts were added who were less sincere and dev…",
        "asWritten": "probable",
        "weakened": "well-supported",
        "gap": 1,
        "kind": "frame",
        "confidence": "medium",
        "loadBearing": false,
        "chainInherited": false,
        "period": null
      },
      {
        "id": "GC-02-038",
        "chapter": 2,
        "quote": "Idolaters were led to receive a part of the Christian faith, while they rejected other essential truths.",
        "asWritten": "probable",
        "weakened": "well-supported",
        "gap": 1,
        "kind": "frame",
        "confidence": "medium",
        "loadBearing": false,
        "chainInherited": false,
        "period": null
      },
      {
        "id": "GC-02-041",
        "chapter": 2,
        "quote": "Most of the Christians at last consented to lower their standard, and a union was formed between Christianity and paganism.",
        "asWritten": "improbable",
        "weakened": "well-supported",
        "gap": 3,
        "kind": "frame",
        "confidence": "medium",
        "loadBearing": false,
        "chainInherited": false,
        "period": "period-scholarship"
      },
      {
        "id": "GC-02-042",
        "chapter": 2,
        "quote": "Although the worshipers of idols professed to be converted, and united with the church, they still clung to their idolatry, only changing the objec…",
        "asWritten": "improbable",
        "weakened": "well-supported",
        "gap": 3,
        "kind": "fact",
        "confidence": "medium",
        "loadBearing": false,
        "chainInherited": false,
        "period": null
      },
      {
        "id": "GC-03-009",
        "chapter": 3,
        "quote": "Paganism, while appearing to be vanquished, became the conqueror. Her spirit controlled the church.",
        "asWritten": "improbable",
        "weakened": "well-supported",
        "gap": 3,
        "kind": "frame",
        "confidence": "medium",
        "loadBearing": false,
        "chainInherited": false,
        "period": "period-scholarship"
      },
      {
        "id": "GC-03-027",
        "chapter": 3,
        "quote": "To afford converts from heathenism a substitute for the worship of idols, and thus to promote their nominal acceptance of Christianity, the adorati…",
        "asWritten": "improbable",
        "weakened": "well-supported",
        "gap": 3,
        "kind": "fact",
        "confidence": "medium",
        "loadBearing": false,
        "chainInherited": false,
        "period": null
      },
      {
        "id": "GC-03-088",
        "chapter": 3,
        "quote": "Then the way was prepared for the introduction of still another invention of paganism, which Rome named purgatory, and employed to terrify the cred…",
        "asWritten": "improbable",
        "weakened": "probable",
        "gap": 2,
        "kind": "fact",
        "confidence": "high",
        "loadBearing": false,
        "chainInherited": false,
        "period": "period-scholarship"
      }
    ]
  },
  {
    "dossier": "D11",
    "slug": "papal-doctrine-continuity",
    "chapters": [
      3,
      35
    ],
    "narrative_ru": "Досье проверяет три утверждения книги о неизменности папской доктрины: что принципы Григория VII и Иннокентия III остаются принципами Рима в 1911 году, что церковь провозглашает правило «с еретиками не следует держать слова» и что средневековых мирян учили видеть в папе единственного земного посредника на пути к Богу. Средневековое документальное ядро каждого утверждения реально: Dictatus Papae закрепил право низлагать императоров, булла Unam Sanctam объявила подчинение папе необходимым для спасения, а Констанцский собор 23 сентября 1415 года постановил, что охранная грамота не защищает еретика от церковного суда, и это стоило Гусу жизни. В авторских формулировках все три утверждения получили оценку «improbable»: к 1911 году церковь не заявляла право низложения как действующее, её официальные авторы прямо отрицали максиму о еретиках, а мирян учили приступать к Богу через Христа, таинства и святых, но не через папу лично. Ослабленные версии тех же утверждений оцениваются как «well-supported»: собор действительно издал такой декрет и никогда его не отменял, Рим не отрёкся от средневековых притязаний и в 1906 году всё ещё осуждал отделение церкви от государства, а подчинение папе средневековая доктрина объявляла условием спасения. Картину изменили бы документы начала XX века, в которых Рим утверждал бы низложение государей или максиму о еретиках как действующее учение.",
    "claims": [
      {
        "id": "GC-35-110",
        "chapter": 35,
        "quote": "The principles of Gregory VII. and Innocent III. are still the principles of the Roman Catholic Church.",
        "asWritten": "improbable",
        "weakened": "well-supported",
        "gap": 3,
        "kind": "fact",
        "confidence": "medium",
        "loadBearing": false,
        "chainInherited": false,
        "period": null
      },
      {
        "id": "GC-35-049",
        "chapter": 35,
        "quote": "“Faith ought not to be kept with heretics, nor persons suspected of heresy,”(1006) she declares.",
        "asWritten": "improbable",
        "weakened": "well-supported",
        "gap": 3,
        "kind": "fact",
        "confidence": "high",
        "loadBearing": false,
        "chainInherited": false,
        "period": null
      },
      {
        "id": "GC-03-061",
        "chapter": 3,
        "quote": "They were taught that the pope was their earthly mediator, and that none could approach God except through him; and further, that he stood in the p…",
        "asWritten": "improbable",
        "weakened": "well-supported",
        "gap": 3,
        "kind": "fact",
        "confidence": "medium",
        "loadBearing": false,
        "chainInherited": false,
        "period": null
      }
    ]
  },
  {
    "dossier": "D12",
    "slug": "waldensian-albigensian-character",
    "chapters": [
      4,
      15
    ],
    "narrative_ru": "Досье проверяет портрет вальденсов и альбигойцев в книге: студентов с рукописями в перешитой одежде, протопротестантскую сотериологию, «семена Реформации» и альбигойцев как «братьев по вере». Современные исследователи (Камерон, Одизио, Биллер) подтверждают документированное ядро этих сцен: тайных странствующих проповедников-барбов, годы заучивания Писания наизусть, ремесленные прикрытия, отказ от индульгенций и чистилища, мученичество в Пьемонте. Однако конкретные детали книги (учёба в городских школах Франции и Италии, специально приготовленная одежда, полная неуловимость для инквизиции, вера в спасение без заслуг дел) восходят к романтической историографии XIX века, тогда как выучка барбов была внутренней и покаянной, а Реформация Уиклифа и Лютера возникла независимо от вальденсов. Именование альбигойцев «братьями» вальденсов не поддерживает ни традиционная наука, считающая катаров дуалистами, ни ревизионисты вроде Пегга и Мура, у которых верования альбигойцев вообще не поддаются реконструкции. В ослабленных формулировках почти все утверждения досье подтверждаются, а вопрос о том, было ли средневековое благочестие гнётом без утешения, остаётся честно открытым: спор Озмента и Даффи продолжается. Картину изменили бы находки вроде инквизиционных протоколов об учёбе вальденской молодёжи в университетах или корпуса альбигойских текстов с библейской, недуалистической верой.",
    "claims": [
      {
        "id": "GC-04-069",
        "chapter": 4,
        "quote": "From their schools in the mountains some of the youth were sent to institutions of learning in the cities of France or Italy, where was a more exte…",
        "asWritten": "improbable",
        "weakened": "probable",
        "gap": 2,
        "kind": "fact",
        "confidence": "medium",
        "loadBearing": false,
        "chainInherited": false,
        "period": "period-scholarship"
      },
      {
        "id": "GC-04-070",
        "chapter": 4,
        "quote": "Their garments were so prepared as to conceal their greatest treasure,—the precious manuscripts of the Scriptures.",
        "asWritten": "improbable",
        "weakened": "well-supported",
        "gap": 3,
        "kind": "fact",
        "confidence": "medium",
        "loadBearing": false,
        "chainInherited": false,
        "period": "period-scholarship"
      },
      {
        "id": "GC-04-071",
        "chapter": 4,
        "quote": "Converts to the true faith were won in these institutions of learning, and frequently its principles were found to be permeating the entire school;…",
        "asWritten": "improbable",
        "weakened": "well-supported",
        "gap": 3,
        "kind": "fact",
        "confidence": "medium",
        "loadBearing": false,
        "chainInherited": false,
        "period": "period-scholarship"
      },
      {
        "id": "GC-04-081",
        "chapter": 4,
        "quote": "Taught to trust to their good works to save them, they were ever looking to themselves, their minds dwelling upon their sinful condition, seeing th…",
        "asWritten": "genuinely-open",
        "weakened": "probable",
        "gap": 1,
        "kind": "frame",
        "confidence": "medium",
        "loadBearing": false,
        "chainInherited": false,
        "period": null
      },
      {
        "id": "GC-04-082",
        "chapter": 4,
        "quote": "The doctrine that good works can atone for the transgression of God’s law, they held to be based upon falsehood.",
        "asWritten": "improbable",
        "weakened": "well-supported",
        "gap": 3,
        "kind": "fact",
        "confidence": "medium",
        "loadBearing": false,
        "chainInherited": false,
        "period": "period-scholarship"
      },
      {
        "id": "GC-04-113",
        "chapter": 4,
        "quote": "Scattered over many lands, they planted the seeds of the Reformation that began in the time of Wycliffe, grew broad and deep in the days of Luther,…",
        "asWritten": "improbable",
        "weakened": "probable",
        "gap": 2,
        "kind": "fact",
        "confidence": "medium",
        "loadBearing": false,
        "chainInherited": false,
        "period": "period-scholarship"
      },
      {
        "id": "GC-15-043",
        "chapter": 15,
        "quote": "While the Waldenses laid down their lives upon the mountains of Piedmont “for the word of God, and for the testimony of Jesus Christ,” similar witn…",
        "asWritten": "improbable",
        "weakened": "well-supported",
        "gap": 3,
        "kind": "fact",
        "confidence": "medium",
        "loadBearing": false,
        "chainInherited": false,
        "period": "period-scholarship"
      }
    ]
  },
  {
    "dossier": "D13",
    "slug": "biblical-composition-frame",
    "chapters": [
      0,
      1,
      17
    ],
    "narrative_ru": "Досье проверяет рамку композиции Библии в «Великой борьбе»: письменное откровение началось с Моисея, Библию писали 1600 лет от Моисея до Иоанна, Иоиль писал за 2500 лет до 1780 года, а предупреждение Второзакония прозвучало за четырнадцать веков до разрушения Иерусалима в 70 году нашей эры. Современная библеистика датирует древнейшие библейские книги первым тысячелетием до нашей эры, а ядро Второзакония связывает с седьмым веком, поэтому четыре утверждения из пяти в написанном виде получили оценки от «маловероятно» до «опровергнуто»; опровергнута только рамка «первые 2500 лет человеческой истории», требующая начала человечества около 4000 года до нашей эры. Датировка Иоиля остаётся честно открытым вопросом: специалисты предлагают даты от девятого до четвёртого века до нашей эры, и цифра «2500 лет» попадает внутрь этого диапазона. В ослабленных версиях (Библия складывалась около тысячелетия и дольше, предупреждение Второзакония на много веков старше 70 года) четыре утверждения из пяти хорошо подтверждены. Картину изменили бы датируемые рукописи или надписи второго тысячелетия до нашей эры с библейским текстом.",
    "claims": [
      {
        "id": "GC-00-005",
        "chapter": 0,
        "quote": "During the first twenty-five hundred years of human history, there was no written revelation.",
        "asWritten": "discredited",
        "weakened": "well-supported",
        "gap": 4,
        "kind": "fact",
        "confidence": "high",
        "loadBearing": false,
        "chainInherited": false,
        "period": "period-scholarship"
      },
      {
        "id": "GC-00-007",
        "chapter": 0,
        "quote": "The preparation of the written word began in the time of Moses.",
        "asWritten": "improbable",
        "weakened": "genuinely-open",
        "gap": 1,
        "kind": "fact",
        "confidence": "high",
        "loadBearing": false,
        "chainInherited": false,
        "period": null
      },
      {
        "id": "GC-00-008",
        "chapter": 0,
        "quote": "This work continued during the long period of sixteen hundred years,—from Moses, the historian of creation and the law, to John, the recorder of th…",
        "asWritten": "improbable",
        "weakened": "well-supported",
        "gap": 3,
        "kind": "fact",
        "confidence": "high",
        "loadBearing": false,
        "chainInherited": true,
        "period": "period-scholarship"
      },
      {
        "id": "GC-17-066",
        "chapter": 17,
        "quote": "recorded by the prophet Joel, twenty-five hundred years previous to their fulfilment",
        "asWritten": "genuinely-open",
        "weakened": "well-supported",
        "gap": 2,
        "kind": "fact",
        "confidence": "medium",
        "loadBearing": false,
        "chainInherited": false,
        "period": null
      },
      {
        "id": "GC-01-097",
        "chapter": 1,
        "quote": "Again was fulfilled the warning prophecy given fourteen centuries before: “The tender and delicate woman among you, which would not adventure to se…",
        "asWritten": "improbable",
        "weakened": "well-supported",
        "gap": 3,
        "kind": "fact",
        "confidence": "high",
        "loadBearing": false,
        "chainInherited": true,
        "period": "period-scholarship"
      }
    ]
  },
  {
    "dossier": "D14",
    "slug": "medieval-sabbatarian-residue",
    "chapters": [
      35
    ],
    "narrative_ru": "Досье проверяло одну оговорку из главы 35: среди гонимых Римом вальденсов «некоторые соблюдали субботу». Сами гонения подтверждены полностью, но субботство вальденсов современная медиевистика отвергает: их прозвище insabbatati происходит от особых сандалий проповедников, а богатые протоколы инквизиции описывают общину, чтившую воскресенье и отвергавшую церковные праздники. Аргументы в пользу утверждения восходят к глоссам семнадцатого века и к смешению вальденсов с ломбардской сектой пассагиев, действительно соблюдавшей субботу; слабость этих аргументов признают и адвентистские справочники. Единственный прямой документ, враждебный каталог заблуждений пятнадцатого века из Богемии со словами «некоторые празднуют субботу с иудеями», оставляет открытым лишь сильно ослабленный вариант о поздней богемской периферии движения. Как написано, утверждение получило оценку «маловероятно»; ослабленная версия остаётся открытым вопросом, пока специалисты не изучат богемский документ.",
    "claims": [
      {
        "id": "GC-35-086",
        "chapter": 35,
        "quote": "A striking illustration of Rome’s policy toward those who disagree with her was given in the long and bloody persecution of the Waldenses, some of…",
        "asWritten": "improbable",
        "weakened": "genuinely-open",
        "gap": 1,
        "kind": "fact",
        "confidence": "medium",
        "loadBearing": false,
        "chainInherited": false,
        "period": null
      }
    ]
  },
  {
    "dossier": "D15",
    "slug": "lisbon-1755",
    "chapters": [
      17
    ],
    "narrative_ru": "Глава 17 описывает лиссабонское землетрясение 1755 года цифрами из справочников девятнадцатого века: 60 тысяч погибших за шесть минут, 90 тысяч за день и мраморная набережная, ушедшая под воду со всеми людьми. Современные исследования (Перейра, Честер, Араужо) насчитывают в Лиссабоне 30-40 тысяч жертв, а по всему региону 40-50 тысяч, поэтому оба числа книги завышены примерно вдвое. Рассказ о набережной Каиш-де-Педра имеет реальное ядро: причал действительно осел из-за разжижения грунта и укрывшиеся на нём люди погибли, но слой «все до единого, ни одно тело не всплыло» историки относят к преувеличениям очевидцев. В ослабленных формулировках («десятки тысяч погибших», «набережная разрушилась, погибло много людей») все три утверждения подтверждаются. Уайт при этом точно цитирует свои источники (Лайель и Encyclopaedia Americana 1831 года); устарели сами источники, а не её пересказ. Картину изменило бы демографическое исследование приходских книг, которое подтвердило бы потери, близкие к 90 тысячам.",
    "claims": [
      {
        "id": "GC-17-042",
        "chapter": 17,
        "quote": "In the course of about six minutes, sixty thousand persons perished.",
        "asWritten": "improbable",
        "weakened": "well-supported",
        "gap": 3,
        "kind": "fact",
        "confidence": "medium",
        "loadBearing": false,
        "chainInherited": false,
        "period": "period-scholarship"
      },
      {
        "id": "GC-17-049",
        "chapter": 17,
        "quote": "It has been estimated that ninety thousand persons lost their lives on that fatal day.",
        "asWritten": "improbable",
        "weakened": "well-supported",
        "gap": 3,
        "kind": "fact",
        "confidence": "high",
        "loadBearing": false,
        "chainInherited": false,
        "period": "period-scholarship"
      },
      {
        "id": "GC-17-044",
        "chapter": 17,
        "quote": "Among other extraordinary events related to have occurred at Lisbon during the catastrophe, was the subsidence of a new quay, built entirely of mar…",
        "asWritten": "improbable",
        "weakened": "probable",
        "gap": 2,
        "kind": "fact",
        "confidence": "medium",
        "loadBearing": false,
        "chainInherited": false,
        "period": "period-scholarship"
      }
    ]
  },
  {
    "dossier": "D16",
    "slug": "titus-and-the-temple",
    "chapters": [
      1
    ],
    "narrative_ru": "Досье разбирает сцену гибели Иерусалимского храма в 70 году: хотел ли Тит спасти святилище, как пишет очевидец Иосиф Флавий, или сам приказал его сжечь, как утверждает традиция Сульпиция Севера, восходящая, вероятно, к утраченной книге Тацита. Учёные спорят об этом с 1861 года: большинство после Бернайса не доверяет проимператорской версии Иосифа, однако её защищают и серьёзные специалисты, включая Раджак и Леони. Поэтому три из четырёх утверждений получили вердикт «действительно открыто»: наука сегодня не может решить, пытался ли Тит остановить пожар, хотя резня укрывшихся в храме и сам штурм сомнению не подлежат. Четвёртое утверждение, будто Тит с Елеонской горы приказал «не трогать ни одного камня» храма, в буквальном виде маловероятно: такого приказа нет даже у Иосифа, у которого Тит сам велел поджечь храмовые ворота. В ослабленной формулировке и это утверждение возвращается в разряд открытых, поскольку опирается на свидетельство очевидца. Картину изменила бы находка утраченной части «Историй» Тацита или новое независимое свидетельство о военном совете Тита.",
    "claims": [
      {
        "id": "GC-01-101",
        "chapter": 1,
        "quote": "Titus would willingly have put an end to the fearful scene, and thus have spared Jerusalem the full measure of her doom. He was filled with horror…",
        "asWritten": "improbable",
        "weakened": "genuinely-open",
        "gap": 1,
        "kind": "fact",
        "confidence": "medium",
        "loadBearing": false,
        "chainInherited": false,
        "period": null
      },
      {
        "id": "GC-01-104",
        "chapter": 1,
        "quote": "The blind obstinacy of the Jewish leaders, and the detestable crimes perpetrated within the besieged city, excited the horror and indignation of th…",
        "asWritten": "genuinely-open",
        "weakened": "genuinely-open",
        "gap": 0,
        "kind": "fact",
        "confidence": "high",
        "loadBearing": false,
        "chainInherited": false,
        "period": null
      },
      {
        "id": "GC-01-106",
        "chapter": 1,
        "quote": "Titus rushed to the place, followed by his generals and legionaries, and commanded the soldiers to quench the flames. His words were unheeded. In t…",
        "asWritten": "genuinely-open",
        "weakened": "genuinely-open",
        "gap": 0,
        "kind": "fact",
        "confidence": "medium",
        "loadBearing": false,
        "chainInherited": false,
        "period": null
      },
      {
        "id": "GC-01-108",
        "chapter": 1,
        "quote": "Titus found it impossible to check the rage of the soldiery; he entered with his officers, and surveyed the interior of the sacred edifice. The spl…",
        "asWritten": "genuinely-open",
        "weakened": "genuinely-open",
        "gap": 0,
        "kind": "fact",
        "confidence": "medium",
        "loadBearing": false,
        "chainInherited": false,
        "period": null
      }
    ]
  },
  {
    "dossier": "D17",
    "slug": "early-persecution-scale",
    "chapters": [
      2
    ],
    "narrative_ru": "Досье проверяло пять утверждений главы 2 о размахе и механике гонений на ранних христиан. Современная наука видит спорадические местные преследования с несколькими короткими общеимперскими кампаниями третьего и начала четвёртого века, поэтому образ непрерывной охоты «где бы они ни искали убежища» опровергается рескриптом Траяна, прямо запретившим разыскивать христиан, а объяснение гонений тем, что язычество «предвидело торжество евангелия», остаётся недокументированным. Утверждение о «великом множестве» мучеников, напротив, скорее устояло: серьёзные современные оценки дают от нескольких тысяч казнённых и выше, хотя ревизионистская линия Кандиды Мосс оспаривает традиционный размах. Катакомбы служили кладбищами и местами тайных собраний в периоды запретов, но «домом» для скрывающихся, вопреки романтической легенде девятнадцатого века, не были. В ослабленных формулировках, привязанных к реально задокументированным кампаниям гонений, все пять утверждений получают оценку от вероятного до хорошо подтверждённого; картину изменили бы новые документальные находки, например доимперский эдикт о повсеместном розыске христиан.",
    "claims": [
      {
        "id": "GC-02-008",
        "chapter": 2,
        "quote": "Great numbers sealed their testimony with their blood.",
        "asWritten": "probable",
        "weakened": "well-supported",
        "gap": 1,
        "kind": "fact",
        "confidence": "medium",
        "loadBearing": false,
        "chainInherited": false,
        "period": null
      },
      {
        "id": "GC-02-022",
        "chapter": 2,
        "quote": "In these underground retreats, the followers of Christ buried their dead; and here also, when suspected and proscribed, they found a home.",
        "asWritten": "improbable",
        "weakened": "probable",
        "gap": 2,
        "kind": "fact",
        "confidence": "high",
        "loadBearing": false,
        "chainInherited": false,
        "period": "period-scholarship"
      },
      {
        "id": "GC-02-004",
        "chapter": 2,
        "quote": "Paganism foresaw that should the gospel triumph, her temples and altars would be swept away; therefore she summoned her forces to destroy Christian…",
        "asWritten": "improbable",
        "weakened": "probable",
        "gap": 2,
        "kind": "fact",
        "confidence": "high",
        "loadBearing": false,
        "chainInherited": false,
        "period": null
      },
      {
        "id": "GC-02-018",
        "chapter": 2,
        "quote": "Wherever they sought refuge, the followers of Christ were hunted like beasts of prey.",
        "asWritten": "discredited",
        "weakened": "well-supported",
        "gap": 4,
        "kind": "fact",
        "confidence": "high",
        "loadBearing": false,
        "chainInherited": false,
        "period": "period-scholarship"
      },
      {
        "id": "GC-02-054",
        "chapter": 2,
        "quote": "The doctrine of religious freedom was termed heresy, and its upholders were hated and proscribed.",
        "asWritten": "improbable",
        "weakened": "well-supported",
        "gap": 3,
        "kind": "fact",
        "confidence": "medium",
        "loadBearing": false,
        "chainInherited": false,
        "period": null
      }
    ]
  },
  {
    "dossier": "D18",
    "slug": "martyr-tolls-apostate-power",
    "chapters": [
      3
    ],
    "narrative_ru": "Досье проверяло фразу третьей главы о «миллионах мучеников», взывающих об отмщении к отступнической власти. Архивные подсчёты казней за ересь дают другой порядок величины: трибуналы инквизиции в Испании, Португалии и Италии казнили в сумме порядка десяти или пятнадцати тысяч человек за все века работы, а все казни за ересь в Европе 1520–1565 годов Уильям Монтер оценивает примерно в три тысячи. Даже с добавлением Варфоломеевской ночи, погромов вальденсов и жертв Альбигойского похода честный итог остаётся в пределах сотен тысяч и до «миллионов» не дотягивает минимум на порядок. Формулировка как написано получила вердикт improbable, ослабленная версия о десятках тысяч казнённых при папской санкции хорошо подтверждена. Сама цифра восходит к протестантской мартирологии девятнадцатого века: Джон Даулинг в 1845 году писал о пятидесяти миллионах, на этом фоне слово «миллионы» звучало даже сдержанно. Картину изменило бы рецензируемое демографическое исследование, документирующее около двух миллионов погибших именно за веру, а не в религиозных войнах в целом.",
    "claims": [
      {
        "id": "GC-03-099",
        "chapter": 3,
        "quote": "The mangled forms of millions of martyrs cried to God for vengeance upon that apostate power.",
        "asWritten": "improbable",
        "weakened": "well-supported",
        "gap": 3,
        "kind": "fact",
        "confidence": "high",
        "loadBearing": false,
        "chainInherited": false,
        "period": "period-scholarship"
      }
    ]
  },
  {
    "dossier": "D19",
    "slug": "wesley-membership",
    "chapters": [
      14
    ],
    "narrative_ru": "Досье проверяет одну цифру из главы 14: к концу жизни Уэсли его «открытых приверженцев» насчитывалось более полумиллиона. Документированные списки методистских обществ на 1791 год дают около 120–150 тысяч членов в Британии и Америке, а академические оценки более широкого круга регулярных слушателей (Филд, стандартные биографии Рэка и Хайценрейтера) выводят на 350–450 тысяч. Полмиллиона достигается только при самом растянутом множителе и при подмене «открыто заявивших о себе» на неоформленных слушателей, поэтому формулировка книги получила вердикт «маловероятно». Ослабленная версия, где приверженцы вместе со слушателями исчисляются сотнями тысяч, признана вероятной; сама цифра при этом повторяет ходовое утверждение методистской литературы девятнадцатого века. Картину изменил бы рецензируемый подсчёт или современный событиям документ, фиксирующий не менее полумиллиона заявленных методистов на 1791 год.",
    "claims": [
      {
        "id": "GC-14-156",
        "chapter": 14,
        "quote": "At the close of his long life of more than fourscore years—above half a century spent in itinerant ministry—his avowed adherents numbered more than…",
        "asWritten": "improbable",
        "weakened": "probable",
        "gap": 2,
        "kind": "fact",
        "confidence": "medium",
        "loadBearing": false,
        "chainInherited": false,
        "period": "expositor-tradition"
      }
    ]
  },
  {
    "dossier": "D20",
    "slug": "st-bartholomew-extension",
    "chapters": [
      15
    ],
    "narrative_ru": "Досье проверяло утверждение «Великой борьбы», что Варфоломеевская резня «по особому приказу короля» распространилась на все провинции и города, где жили протестанты. Сохранившиеся письма Карла IX от 24 и 28 августа 1572 года предписывали губернаторам хранить мир и защищать протестантов, а резня вспыхнула примерно в двенадцати городах усилиями местных католических активистов, поверивших слухам о воле короля (Бенедикт, Холт, Жуанна). Крупнейшие гугенотские города, включая Ла-Рошель, Ним и Монтобан, остались нетронутыми, и ряд губернаторов прямо отказался исполнять мнимый приказ. Формулировка книги отклонена как написано, поскольку документам противоречат и «особый приказ короля», и охват «всех провинций»; ослабленная версия, что резня перекинулась на провинции и многие исполнители считали себя орудием королевской воли, прочно подтверждена. Уайт почти дословно следует Уайли, передававшему стандартное для девятнадцатого века прочтение; картину изменил бы подлинный королевский приказ об истреблении протестантов в провинциях, если бы такой нашёлся в архивах.",
    "claims": [
      {
        "id": "GC-15-058",
        "chapter": 15,
        "quote": "And it was not confined to the city itself, but by special order of the king, was extended to all the provinces and towns where Protestants were fo…",
        "asWritten": "discredited",
        "weakened": "well-supported",
        "gap": 4,
        "kind": "fact",
        "confidence": "high",
        "loadBearing": false,
        "chainInherited": false,
        "period": "period-scholarship"
      }
    ]
  },
  {
    "dossier": "D21",
    "slug": "massacre-of-innocents",
    "chapters": [
      42
    ],
    "narrative_ru": "Досье проверяло единственное утверждение: приказ Ирода Великого об избиении младенцев в Вифлееме как историческое событие. Рассказ сохранился только в Евангелии от Матфея; Иосиф Флавий, подробно описавший жестокости Ирода, о нём молчит, и большинство критических исследователей (Браун, Луц, Вермеш) считают эпизод легендарным или непроверяемым. Меньшинство квалифицированных учёных (Франс, Майер) защищает правдоподобие: убийство десятка младенцев в маленькой деревне соответствует документированному поведению Ирода в последние годы и могло не попасть в сохранившиеся источники. Обе стороны работают с одним и тем же скудным материалом, поэтому вердикт по формулировке книги: вопрос по-настоящему открыт. Ослабленная версия (событие такого масштаба правдоподобно, но недоказуемо) получает оценку вероятно. Картину изменила бы независимая нехристианская запись первого века или доказательство, что весь эпизод целиком выведен из иудейских преданий о Моисее.",
    "claims": [
      {
        "id": "GC-42-032",
        "chapter": 42,
        "quote": "Herod, who slew the innocent children of Bethlehem that he might destroy the King of Israel",
        "asWritten": "genuinely-open",
        "weakened": "probable",
        "gap": 1,
        "kind": "fact",
        "confidence": "medium",
        "loadBearing": false,
        "chainInherited": false,
        "period": null
      }
    ]
  },
  {
    "dossier": "D22",
    "slug": "hus-bohemia-narrative",
    "chapters": [
      6
    ],
    "narrative_ru": "Девять утверждений досье пересказывают богемский пролог главы о Гусе по викторианской книге Уайли, который сам опирался на мартиролог Коменского 1648 года. Ядро каждой сцены историки подтверждают: инквизиция четырнадцатого века действительно казнила богемских вальденсов, виклифитские идеи действительно пришли из Англии в Прагу, а контрастные изображения смиренного Христа и пышного папы действительно выставлялись в гуситской Праге, от стен Вифлеемской капеллы до таблиц Николая Дрезденского. Конкретные же сцены книги, включая коленопреклонённую мать у ворот Праги и двух английских художников с толпами у их рисунков, не имеют ни одного средневекового свидетельства и отсутствуют у современных биографов Гуса, от Спинки до Фаджа. Поэтому в формулировке как написано все девять утверждений получили оценку «маловероятно». В ослабленных версиях четыре поднялись до «твёрдо подтверждено», два до «вероятно», два остались открытыми, а одно смягчить нельзя. Найденная хроника пятнадцатого века об английских гостях или любой документ о семье Гуса изменили бы картину.",
    "claims": [
      {
        "id": "GC-06-009",
        "chapter": 6,
        "quote": "Driven to worship in the forests and the mountains, they were hunted by soldiers, and many were put to death. After a time it was decreed that all…",
        "asWritten": "improbable",
        "weakened": "well-supported",
        "gap": 3,
        "kind": "fact",
        "confidence": "medium",
        "loadBearing": false,
        "chainInherited": false,
        "period": "period-scholarship"
      },
      {
        "id": "GC-06-013",
        "chapter": 6,
        "quote": "His pious mother, regarding education and the fear of God as the most valuable of possessions, sought to secure this heritage for her son.",
        "asWritten": "improbable",
        "weakened": "genuinely-open",
        "gap": 1,
        "kind": "motive",
        "confidence": "medium",
        "loadBearing": false,
        "chainInherited": false,
        "period": "period-scholarship"
      },
      {
        "id": "GC-06-015",
        "chapter": 6,
        "quote": "He was accompanied on the journey to Prague by his mother; widowed and poor, she had no gift of worldly wealth to bestow upon her son, but as they…",
        "asWritten": "improbable",
        "weakened": "genuinely-open",
        "gap": 1,
        "kind": "fact",
        "confidence": "medium",
        "loadBearing": false,
        "chainInherited": false,
        "period": "period-scholarship"
      },
      {
        "id": "GC-06-027",
        "chapter": 6,
        "quote": "About this time there arrived in Prague two strangers from England, men of learning, who had received the light, and had come to spread it in this…",
        "asWritten": "improbable",
        "weakened": "well-supported",
        "gap": 3,
        "kind": "fact",
        "confidence": "medium",
        "loadBearing": false,
        "chainInherited": false,
        "period": "period-scholarship"
      },
      {
        "id": "GC-06-028",
        "chapter": 6,
        "quote": "Beginning with an open attack on the pope’s supremacy, they were soon silenced by the authorities; but being unwilling to relinquish their purpose,…",
        "asWritten": "improbable",
        "weakened": "well-supported",
        "gap": 3,
        "kind": "fact",
        "confidence": "medium",
        "loadBearing": false,
        "chainInherited": false,
        "period": "period-scholarship"
      },
      {
        "id": "GC-06-029",
        "chapter": 6,
        "quote": "In a place open to the public they drew two pictures. One represented the entrance of Christ into Jerusalem, “meek, and sitting upon an ass,”(127)…",
        "asWritten": "improbable",
        "weakened": "well-supported",
        "gap": 3,
        "kind": "fact",
        "confidence": "medium",
        "loadBearing": false,
        "chainInherited": false,
        "period": "period-scholarship"
      },
      {
        "id": "GC-06-030",
        "chapter": 6,
        "quote": "Here was a sermon which arrested the attention of all classes. Crowds came to gaze upon the drawings.",
        "asWritten": "improbable",
        "weakened": "probable",
        "gap": 2,
        "kind": "fact",
        "confidence": "medium",
        "loadBearing": false,
        "chainInherited": false,
        "period": "period-scholarship"
      },
      {
        "id": "GC-06-031",
        "chapter": 6,
        "quote": "There was great commotion in Prague, and the strangers after a time found it necessary, for their own safety, to depart.",
        "asWritten": "improbable",
        "weakened": "n/a",
        "gap": null,
        "kind": "fact",
        "confidence": "medium",
        "loadBearing": false,
        "chainInherited": false,
        "period": "period-scholarship"
      },
      {
        "id": "GC-06-032",
        "chapter": 6,
        "quote": "The pictures made a deep impression on the mind of Huss, and led him to a closer study of the Bible and of Wycliffe’s writings.",
        "asWritten": "improbable",
        "weakened": "probable",
        "gap": 2,
        "kind": "fact",
        "confidence": "medium",
        "loadBearing": false,
        "chainInherited": false,
        "period": "period-scholarship"
      }
    ]
  },
  {
    "dossier": "D23",
    "slug": "wycliffe-predecessors",
    "chapters": [
      5
    ],
    "narrative_ru": "Досье проверяет фразу из пятой главы: у Уиклифа не было предшественников, по чьим трудам он мог бы построить свою систему реформы. В буквальном прочтении это опровергнуто документально: учение о владычестве, стержень его программы, Уиклиф взял из трактата Фицральфа «De pauperie Salvatoris», а Гроссетеста и Брадвардина постоянно цитировал как своих учителей. Поэтому утверждение как написано получило оценку «маловероятно». Ослабленная версия судьбы иной: в Англии до Уиклифа не существовало ни организованного реформного движения, ни готовой программы реформы, и его синтез с Писанием на народном языке в центре наука признаёт первым в своём роде, так что эта версия оценена как «хорошо подтверждена». Картину изменило бы доказательство, что теорию владычества Уиклиф разработал независимо от Фицральфа, либо находка организованного английского реформного движения до него.",
    "claims": [
      {
        "id": "GC-05-107",
        "chapter": 5,
        "quote": "There were none who went before him from whose work he could shape his system of reform.",
        "asWritten": "improbable",
        "weakened": "well-supported",
        "gap": 3,
        "kind": "fact",
        "confidence": "medium",
        "loadBearing": false,
        "chainInherited": false,
        "period": null
      }
    ]
  }
] as const

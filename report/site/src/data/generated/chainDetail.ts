// СГЕНЕРИРОВАНО scripts/build-data.mjs — не редактировать руками.
// Источник: synthesis/aggregate.json + adjudication/*.ruling.json (2026-07-06).
export interface ClaimBrief { id: string; chapter: number; paragraph: number; quote: string; quoteRu: string | null; enKey: string | null; outcome: 'stands' | 'fallen' | 'open' | 'conditional' | 'outside'; labelKey: string; loadBearing: boolean; adjudicated: { asWritten: string; weakened: string | null; gap: number | null; kind: string | null; confidence: string | null } | null; chainInherited: boolean; period: string | null }
export interface ChainLinkDetail { link: number; stands: ClaimBrief[]; fallen: ClaimBrief[]; open: ClaimBrief[]; conditional: ClaimBrief[] }
export const chainDetail: readonly ChainLinkDetail[] = [
  {
    "link": 1,
    "stands": [
      {
        "id": "GC-02-050",
        "chapter": 2,
        "paragraph": 15,
        "quote": "Thus, as long as persecution continued, the church remained comparatively pure. But as it ceased, converts were added who were less sincere and devoted, and the way was opened for Satan to obtain a foothold.",
        "quoteRu": "Таким путем на протяжении всего времени преследования церковь сохраняла относительную чистоту. Но когда гонения прекратились, в церковь вошли недавно обращенные люди, которые не отличались искренностью и преданностью, и сатана через них получил возможность начать свое губительное дело.",
        "enKey": null,
        "outcome": "stands",
        "labelKey": "probable",
        "loadBearing": false,
        "adjudicated": {
          "asWritten": "probable",
          "weakened": "well-supported",
          "gap": 1,
          "kind": "frame",
          "confidence": "medium"
        },
        "chainInherited": false,
        "period": null
      },
      {
        "id": "GC-02-008",
        "chapter": 2,
        "paragraph": 2,
        "quote": "Great numbers sealed their testimony with their blood.",
        "quoteRu": "Многие из них засвидетельствовали веру Своей Кровью.",
        "enKey": null,
        "outcome": "stands",
        "labelKey": "probable",
        "loadBearing": false,
        "adjudicated": {
          "asWritten": "probable",
          "weakened": "well-supported",
          "gap": 1,
          "kind": "fact",
          "confidence": "medium"
        },
        "chainInherited": false,
        "period": null
      },
      {
        "id": "GC-02-038",
        "chapter": 2,
        "paragraph": 10,
        "quote": "Idolaters were led to receive a part of the Christian faith, while they rejected other essential truths.",
        "quoteRu": "Идолопоклонники приняли некоторые положения христианской веры и в то же время отвергли многие важные истины.",
        "enKey": null,
        "outcome": "stands",
        "labelKey": "probable",
        "loadBearing": false,
        "adjudicated": {
          "asWritten": "probable",
          "weakened": "well-supported",
          "gap": 1,
          "kind": "frame",
          "confidence": "medium"
        },
        "chainInherited": false,
        "period": null
      }
    ],
    "fallen": [
      {
        "id": "GC-01-079",
        "chapter": 1,
        "paragraph": 34,
        "quote": "Not one Christian perished in the destruction of Jerusalem.",
        "quoteRu": "Ни один христианин не погиб при разрушении Иерусалима.",
        "enKey": null,
        "outcome": "fallen",
        "labelKey": "improbable",
        "loadBearing": true,
        "adjudicated": {
          "asWritten": "improbable",
          "weakened": "genuinely-open",
          "gap": 1,
          "kind": "fact",
          "confidence": "medium"
        },
        "chainInherited": false,
        "period": "expositor-tradition"
      },
      {
        "id": "GC-02-053",
        "chapter": 2,
        "paragraph": 17,
        "quote": "The Bible was not accepted as the standard of faith.",
        "quoteRu": "Библия утратила свое значение как мерило веры.",
        "enKey": "was not accepted",
        "outcome": "fallen",
        "labelKey": "discredited",
        "loadBearing": false,
        "adjudicated": {
          "asWritten": "discredited",
          "weakened": "well-supported",
          "gap": 4,
          "kind": "fact",
          "confidence": "high"
        },
        "chainInherited": false,
        "period": null
      },
      {
        "id": "GC-03-032",
        "chapter": 3,
        "paragraph": 10,
        "quote": "In the first centuries the true Sabbath had been kept by all Christians.",
        "quoteRu": "В течение первых столетий истинная суббота соблюдалась всеми христианами.",
        "enKey": "all Christians",
        "outcome": "fallen",
        "labelKey": "discredited",
        "loadBearing": false,
        "adjudicated": {
          "asWritten": "discredited",
          "weakened": "well-supported",
          "gap": 4,
          "kind": "fact",
          "confidence": "high"
        },
        "chainInherited": false,
        "period": "expositor-tradition"
      },
      {
        "id": "GC-02-041",
        "chapter": 2,
        "paragraph": 12,
        "quote": "Most of the Christians at last consented to lower their standard, and a union was formed between Christianity and paganism.",
        "quoteRu": "Наконец большая часть христиан согласилась с выдвинутыми условиями, и, опустив свое знамя, пошла на союз с язычеством.",
        "enKey": "Most of the Christians",
        "outcome": "fallen",
        "labelKey": "improbable",
        "loadBearing": false,
        "adjudicated": {
          "asWritten": "improbable",
          "weakened": "well-supported",
          "gap": 3,
          "kind": "frame",
          "confidence": "medium"
        },
        "chainInherited": false,
        "period": "period-scholarship"
      },
      {
        "id": "GC-01-101",
        "chapter": 1,
        "paragraph": 39,
        "quote": "Titus would willingly have put an end to the fearful scene, and thus have spared Jerusalem the full measure of her doom. He was filled with horror as he saw the bodies of the dead lying in heaps in the valleys. Like one entranc…",
        "quoteRu": "Тит готов был положить конец этой страшной бойне и не допустить полного разрушения Иерусалима. Он пришел в ужас, когда увидел груды мертвых тел на равнинах и холмах. Как зачарованный смотрел он с вершины Елеонской горы на великолепный храм и приказал не трогать ни одного камня.",
        "enKey": null,
        "outcome": "fallen",
        "labelKey": "improbable",
        "loadBearing": false,
        "adjudicated": {
          "asWritten": "improbable",
          "weakened": "genuinely-open",
          "gap": 1,
          "kind": "fact",
          "confidence": "medium"
        },
        "chainInherited": false,
        "period": null
      },
      {
        "id": "GC-02-018",
        "chapter": 2,
        "paragraph": 4,
        "quote": "Wherever they sought refuge, the followers of Christ were hunted like beasts of prey.",
        "quoteRu": "Где бы ни укрывались последователи Христа, всюду их преследовали, как диких зверей на охоте.",
        "enKey": "Wherever",
        "outcome": "fallen",
        "labelKey": "discredited",
        "loadBearing": false,
        "adjudicated": {
          "asWritten": "discredited",
          "weakened": "well-supported",
          "gap": 4,
          "kind": "fact",
          "confidence": "high"
        },
        "chainInherited": false,
        "period": "period-scholarship"
      }
    ],
    "open": [
      {
        "id": "GC-01-084",
        "chapter": 1,
        "paragraph": 34,
        "quote": "Without delay they fled to a place of safety,—the city of Pella, in the land of Perea, beyond Jordan.",
        "quoteRu": "Не теряя ни одного мгновения, они бежали в безопасное место — в город Пелла, находящийся в Перее, за Иорданом.",
        "enKey": null,
        "outcome": "open",
        "labelKey": "open",
        "loadBearing": false,
        "adjudicated": {
          "asWritten": "genuinely-open",
          "weakened": "genuinely-open",
          "gap": 0,
          "kind": "fact",
          "confidence": "medium"
        },
        "chainInherited": false,
        "period": null
      }
    ],
    "conditional": []
  },
  {
    "link": 2,
    "stands": [],
    "fallen": [
      {
        "id": "GC-04-034",
        "chapter": 4,
        "paragraph": 9,
        "quote": "Theirs was not a faith newly received. Their religious belief was their inheritance from their fathers. They contended for the faith of the apostolic church,—“the faith which was once delivered unto the saints.”(99)",
        "quoteRu": "Но эти скромные крестьяне, ютившиеся в своих мрачных жилищах, отрезанные от мира и добывающие себе ежедневное пропитание тяжким трудом, пася овец и возделывая виноградники, не изобретали истину, которая так резко отличалась от ересей и догм отпавшей церкви. Они не изобретали новую веру, нет — их вера была наследием отцов. Они подвизались «за веру, однажды преданную святым» (Иуды 3), за веру апостольской Церкви.",
        "enKey": null,
        "outcome": "fallen",
        "labelKey": "anachronistic",
        "loadBearing": true,
        "adjudicated": null,
        "chainInherited": false,
        "period": null
      },
      {
        "id": "GC-04-001",
        "chapter": 4,
        "paragraph": 1,
        "quote": "In every age there were witnesses for God,—men who cherished faith in Christ as the only mediator between God and man, who held the Bible as the only rule of life, and who hallowed the true Sabbath.",
        "quoteRu": "В каждом столетии находились свидетели Божьи — люди, которые верили во Христа как единственного Посредника между Богом и человеком, которые смотрели на Библию как на единственное правило жизни и соблюдали истинную субботу.",
        "enKey": null,
        "outcome": "fallen",
        "labelKey": "anachronistic",
        "loadBearing": true,
        "adjudicated": null,
        "chainInherited": false,
        "period": null
      },
      {
        "id": "GC-04-046",
        "chapter": 4,
        "paragraph": 11,
        "quote": "Through ages of darkness and apostasy, there were Waldenses who denied the supremacy of Rome, who rejected image worship as idolatry, and who kept the true Sabbath.",
        "quoteRu": "На протяжении всех мрачных веков отступничества существовали вальденсы, которые отрицали верховную власть Рима, отвергали иконопочитание как идолослужение и продолжали соблюдать истинную субботу.",
        "enKey": null,
        "outcome": "fallen",
        "labelKey": "anachronistic",
        "loadBearing": true,
        "adjudicated": null,
        "chainInherited": false,
        "period": null
      },
      {
        "id": "GC-26-032",
        "chapter": 26,
        "paragraph": 8,
        "quote": "Though the “man of sin” succeeded in trampling under foot God’s holy day, yet even in the period of his supremacy there were, hidden in secret places, faithful souls who paid it honor.",
        "quoteRu": "Хотя «человеку греха» и удалось растоптать святой день Божий, тем не менее даже в период его владычества были люди, которые втайне почитали этот день.",
        "enKey": null,
        "outcome": "fallen",
        "labelKey": "anachronistic",
        "loadBearing": true,
        "adjudicated": null,
        "chainInherited": false,
        "period": null
      },
      {
        "id": "GC-04-113",
        "chapter": 4,
        "paragraph": 46,
        "quote": "Scattered over many lands, they planted the seeds of the Reformation that began in the time of Wycliffe, grew broad and deep in the days of Luther, and is to be carried forward to the close of time by those who also are willing…",
        "quoteRu": "Разбросанные по многим странам, они посеяли семена Реформации, которые дали всходы во времена Уиклифа и разрослись во дни Лютера. Она будет оберегаться до конца времен теми, кто согласен перенести все «за слово Божие и за свидетельство Иисуса Христа» (Откровение 1:9).",
        "enKey": null,
        "outcome": "fallen",
        "labelKey": "improbable",
        "loadBearing": false,
        "adjudicated": {
          "asWritten": "improbable",
          "weakened": "probable",
          "gap": 2,
          "kind": "fact",
          "confidence": "medium"
        },
        "chainInherited": false,
        "period": "period-scholarship"
      },
      {
        "id": "GC-35-086",
        "chapter": 35,
        "paragraph": 46,
        "quote": "A striking illustration of Rome’s policy toward those who disagree with her was given in the long and bloody persecution of the Waldenses, some of whom were observers of the Sabbath.",
        "quoteRu": "Поразительной иллюстрацией отношения Рима к инакомыслящим являются длительные и кровавые преследования вальденсов, часть которых соблюдала субботу.",
        "enKey": null,
        "outcome": "fallen",
        "labelKey": "improbable",
        "loadBearing": false,
        "adjudicated": {
          "asWritten": "improbable",
          "weakened": "genuinely-open",
          "gap": 1,
          "kind": "fact",
          "confidence": "medium"
        },
        "chainInherited": false,
        "period": null
      },
      {
        "id": "GC-04-082",
        "chapter": 4,
        "paragraph": 29,
        "quote": "The doctrine that good works can atone for the transgression of God’s law, they held to be based upon falsehood.",
        "quoteRu": "Учение о том, что добрые дела могут искупить грешника, нарушающего Закон Божий, они называли заблуждением.",
        "enKey": null,
        "outcome": "fallen",
        "labelKey": "improbable",
        "loadBearing": false,
        "adjudicated": {
          "asWritten": "improbable",
          "weakened": "well-supported",
          "gap": 3,
          "kind": "fact",
          "confidence": "medium"
        },
        "chainInherited": false,
        "period": "period-scholarship"
      },
      {
        "id": "GC-04-069",
        "chapter": 4,
        "paragraph": 22,
        "quote": "From their schools in the mountains some of the youth were sent to institutions of learning in the cities of France or Italy, where was a more extended field for study, thought, and observation than in their native Alps.",
        "quoteRu": "Некоторые юноши, окончившие школу в горах, посылались в учебные заведения Франции и Италии, где перед ними открывались более широкие возможности для размышлений и наблюдений, чем в родных Альпах.",
        "enKey": null,
        "outcome": "fallen",
        "labelKey": "improbable",
        "loadBearing": false,
        "adjudicated": {
          "asWritten": "improbable",
          "weakened": "probable",
          "gap": 2,
          "kind": "fact",
          "confidence": "medium"
        },
        "chainInherited": false,
        "period": "period-scholarship"
      },
      {
        "id": "GC-15-043",
        "chapter": 15,
        "paragraph": 18,
        "quote": "While the Waldenses laid down their lives upon the mountains of Piedmont “for the word of God, and for the testimony of Jesus Christ,” similar witness to the truth had been borne by their brethren, the Albigenses of France.",
        "quoteRu": "В то время как вальденсы отдавали свою жизнь в горах Пьемонта «за Слово Божье и свидетельство Иисуса Христа», их братья, французские альбигойцы, несли подобное свидетельство.",
        "enKey": null,
        "outcome": "fallen",
        "labelKey": "improbable",
        "loadBearing": false,
        "adjudicated": {
          "asWritten": "improbable",
          "weakened": "well-supported",
          "gap": 3,
          "kind": "fact",
          "confidence": "medium"
        },
        "chainInherited": false,
        "period": "period-scholarship"
      }
    ],
    "open": [],
    "conditional": []
  },
  {
    "link": 3,
    "stands": [
      {
        "id": "GC-05-075",
        "chapter": 5,
        "paragraph": 26,
        "quote": "At last the work was completed,—the first English translation of the Bible ever made.",
        "quoteRu": "Наконец работа завершена — Библия впервые переведена на английский язык.",
        "enKey": null,
        "outcome": "stands",
        "labelKey": "supported",
        "loadBearing": false,
        "adjudicated": null,
        "chainInherited": false,
        "period": null
      },
      {
        "id": "GC-12-027",
        "chapter": 12,
        "paragraph": 9,
        "quote": "The sister of Francis I., then the reigning monarch, accepted the reformed faith.",
        "quoteRu": "Сестра царствующего тогда Франциска I приняла реформаторскую веру.",
        "enKey": null,
        "outcome": "stands",
        "labelKey": "supported",
        "loadBearing": false,
        "adjudicated": null,
        "chainInherited": false,
        "period": null
      },
      {
        "id": "GC-14-032",
        "chapter": 14,
        "paragraph": 7,
        "quote": "The bishop of Durham at one time bought of a bookseller who was a friend of Tyndale, his whole stock of Bibles, for the purpose of destroying them, supposing that this would greatly hinder the work.",
        "quoteRu": "Епископ из Дархэма однажды скупил у книготорговца, который был другом Тиндаля, весь его запас Библий и намеревался уничтожить их, полагая, что этим причинит большой ущерб деятельности реформатора.",
        "enKey": null,
        "outcome": "stands",
        "labelKey": "supported",
        "loadBearing": false,
        "adjudicated": null,
        "chainInherited": false,
        "period": null
      }
    ],
    "fallen": [
      {
        "id": "GC-06-027",
        "chapter": 6,
        "paragraph": 7,
        "quote": "About this time there arrived in Prague two strangers from England, men of learning, who had received the light, and had come to spread it in this distant land.",
        "quoteRu": "Тогда же в Прагу приехали два чужестранца из Англии. Образованные люди, которых коснулся свет истины, они хотели распространить его и в этой отдаленной стране.",
        "enKey": null,
        "outcome": "fallen",
        "labelKey": "improbable",
        "loadBearing": false,
        "adjudicated": {
          "asWritten": "improbable",
          "weakened": "well-supported",
          "gap": 3,
          "kind": "fact",
          "confidence": "medium"
        },
        "chainInherited": false,
        "period": "period-scholarship"
      },
      {
        "id": "GC-11-095",
        "chapter": 11,
        "paragraph": 35,
        "quote": "The emperor himself declared that the Protestant articles were but the truth.",
        "quoteRu": "Сам император объявил, что протестантское исповедание содержит в себе сущую истину.",
        "enKey": null,
        "outcome": "fallen",
        "labelKey": "contradicted",
        "loadBearing": false,
        "adjudicated": null,
        "chainInherited": false,
        "period": null
      },
      {
        "id": "GC-05-107",
        "chapter": 5,
        "paragraph": 45,
        "quote": "There were none who went before him from whose work he could shape his system of reform.",
        "quoteRu": "Он первый пошел по этому пути, и у него не было предшественников, у которых он мог бы заимствовать принципы Реформации.",
        "enKey": "none who went before him",
        "outcome": "fallen",
        "labelKey": "improbable",
        "loadBearing": false,
        "adjudicated": {
          "asWritten": "improbable",
          "weakened": "well-supported",
          "gap": 3,
          "kind": "fact",
          "confidence": "medium"
        },
        "chainInherited": false,
        "period": null
      },
      {
        "id": "GC-07-036",
        "chapter": 7,
        "paragraph": 16,
        "quote": "Luther was one day devoutly climbing these steps, when suddenly a voice like thunder seemed to say to him, “The just shall live by faith.”(165) He sprung to his feet, and hastened from the place in shame and horror.",
        "quoteRu": "Однажды, когда Лютер благоговейно на коленях поднимался по ней, вдруг громоподобный голос произнес: «Праведный верою жив будет» (Римлянам 1:17). Он вскочил на ноги и с ужасом и стыдом поспешно удалился.",
        "enKey": null,
        "outcome": "fallen",
        "labelKey": "improbable",
        "loadBearing": false,
        "adjudicated": {
          "asWritten": "improbable",
          "weakened": "genuinely-open",
          "gap": 1,
          "kind": "fact",
          "confidence": "medium"
        },
        "chainInherited": false,
        "period": null
      },
      {
        "id": "GC-10-066",
        "chapter": 10,
        "paragraph": 27,
        "quote": "Although this charge was without the slightest foundation, it could not but cause the Reformer great distress.",
        "quoteRu": "Хотя для этого обвинения не имелось ни малейшего основания, оно приводило реформатора в отчаяние.",
        "enKey": "without the slightest foundation",
        "outcome": "fallen",
        "labelKey": "improbable",
        "loadBearing": false,
        "adjudicated": {
          "asWritten": "improbable",
          "weakened": "well-supported",
          "gap": 3,
          "kind": "fact",
          "confidence": "medium"
        },
        "chainInherited": false,
        "period": "period-scholarship"
      },
      {
        "id": "GC-14-156",
        "chapter": 14,
        "paragraph": 59,
        "quote": "At the close of his long life of more than fourscore years—above half a century spent in itinerant ministry—his avowed adherents numbered more than half a million souls.",
        "quoteRu": "В конце его долгой жизни — он прожил более 80 лет, из которых полвека провел в миссионерских путешествиях, — число его последователей возросло до полумиллиона.",
        "enKey": null,
        "outcome": "fallen",
        "labelKey": "improbable",
        "loadBearing": false,
        "adjudicated": {
          "asWritten": "improbable",
          "weakened": "probable",
          "gap": 2,
          "kind": "fact",
          "confidence": "medium"
        },
        "chainInherited": false,
        "period": "expositor-tradition"
      },
      {
        "id": "GC-15-058",
        "chapter": 15,
        "paragraph": 21,
        "quote": "And it was not confined to the city itself, but by special order of the king, was extended to all the provinces and towns where Protestants were found.",
        "quoteRu": "Кровопролитие не ограничилось стенами Парижа, особым указом короля избиение протестантов происходило во всех провинциях и городах.",
        "enKey": "all the provinces and towns where Protestants were found",
        "outcome": "fallen",
        "labelKey": "discredited",
        "loadBearing": false,
        "adjudicated": {
          "asWritten": "discredited",
          "weakened": "well-supported",
          "gap": 4,
          "kind": "fact",
          "confidence": "high"
        },
        "chainInherited": false,
        "period": "period-scholarship"
      },
      {
        "id": "GC-10-054",
        "chapter": 10,
        "paragraph": 24,
        "quote": "He was ambitious to obtain position and influence, and was unwilling to be second, even to Luther.",
        "quoteRu": "Он стремился занять видное положение в обществе, чтобы оказывать влияние на своих современников, не желая быть вторым — даже после Лютера.",
        "enKey": null,
        "outcome": "fallen",
        "labelKey": "improbable",
        "loadBearing": false,
        "adjudicated": {
          "asWritten": "improbable",
          "weakened": "well-supported",
          "gap": 3,
          "kind": "motive",
          "confidence": "medium"
        },
        "chainInherited": false,
        "period": "period-scholarship"
      }
    ],
    "open": [
      {
        "id": "GC-08-088",
        "chapter": 8,
        "paragraph": 47,
        "quote": "The Reformer answered: “Since your most serene majesty and your high mightinesses require from me a clear, simple, and precise answer, I will give you one, and it is this: I cannot submit my faith either to the pope or to the c…",
        "quoteRu": "Реформатор ответил: «Так как Ваше императорское величество и ваши княжеские высочества требуют от меня определенного, простого и прямого ответа, я дам его. Если я не буду убежден свидетельствами Писания и ясными доводами разума — ибо я не могу доверять папе или соборам, поскольку очевидно, что зачастую они ошибались и противоречили сами себе, — то не отрекусь, ибо христианину небезопасно поступать против совести. На том стою и не могу иначе. Да поможет мне Бог! Аминь».",
        "enKey": null,
        "outcome": "open",
        "labelKey": "open",
        "loadBearing": false,
        "adjudicated": {
          "asWritten": "genuinely-open",
          "weakened": "well-supported",
          "gap": 2,
          "kind": "fact",
          "confidence": "high"
        },
        "chainInherited": false,
        "period": null
      }
    ],
    "conditional": []
  },
  {
    "link": 4,
    "stands": [
      {
        "id": "GC-18-062",
        "chapter": 18,
        "paragraph": 24,
        "quote": "These three kings, in originating, re-affirming, and completing the decree, brought it to the perfection required by the prophecy to mark the beginning of the 2300 years.",
        "quoteRu": "Три царя составляли, уточняли и дополняли этот указ до тех пор, пока не довели его до совершенства, предусмотренного пророчеством, чтобы он мог ознаменовать начало 2300 дней.",
        "enKey": null,
        "outcome": "stands",
        "labelKey": "probable",
        "loadBearing": true,
        "adjudicated": {
          "asWritten": "probable",
          "weakened": "well-supported",
          "gap": 1,
          "kind": "fact",
          "confidence": "medium"
        },
        "chainInherited": false,
        "period": null
      },
      {
        "id": "GC-18-119",
        "chapter": 18,
        "paragraph": 46,
        "quote": "“Allowing the first period, 150 years, to have been exactly fulfilled before Deacozes ascended the throne by permission of the Turks, and that the 391 years, fifteen days, commenced at the close of the first period, it will end…",
        "quoteRu": "Согласно его подсчетам, это должно было произойти в августе 1840 года, и за несколько дней до исполнения пророчества он писал: «Если учесть, что конец первого периода в 150 лет точно совпадает с восшествием Деакоза на престол с разрешения турок и что 391 год и 15 дней начались в конце первого периода, то они должны окончиться 11 августа 1840 года, когда можно будет ожидать падения Оттоманской власти в Константинополе. Я убежден, что так оно и случится».",
        "enKey": null,
        "outcome": "stands",
        "labelKey": "wellSupported",
        "loadBearing": false,
        "adjudicated": {
          "asWritten": "well-supported",
          "weakened": "well-supported",
          "gap": 0,
          "kind": "fact",
          "confidence": "high"
        },
        "chainInherited": false,
        "period": null
      }
    ],
    "fallen": [
      {
        "id": "GC-18-078",
        "chapter": 18,
        "paragraph": 29,
        "quote": "the beginning of the seventy weeks is fixed beyond question at B.C. 457, and their expiration in A.D. 34.",
        "quoteRu": "Становилось очевидным, что исполнилась каждая подробность этого пророчества, и началом семидесяти седмин, без всякого сомнения, является 457 год до Р. Х., а концом этого периода — 34 год после Р. Х. Располагая этими данными, нетрудно определить и дату окончания 2300 дней.",
        "enKey": "fixed beyond question",
        "outcome": "fallen",
        "labelKey": "discredited",
        "loadBearing": true,
        "adjudicated": {
          "asWritten": "discredited",
          "weakened": "well-supported",
          "gap": 4,
          "kind": "frame",
          "confidence": "high"
        },
        "chainInherited": false,
        "period": null
      },
      {
        "id": "GC-26-069",
        "chapter": 26,
        "paragraph": 18,
        "quote": "The computation of the prophetic periods on which that message was based, placing the close of the 2300 days in the autumn of 1844, stands without impeachment.",
        "quoteRu": "Точность вычисления пророческих периодов, на которых основывалась эта весть и которые указывали, что 2300 дней закончатся осенью 1844 года, не вызывает никакого сомнения.",
        "enKey": "stands without impeachment",
        "outcome": "fallen",
        "labelKey": "discredited",
        "loadBearing": true,
        "adjudicated": {
          "asWritten": "discredited",
          "weakened": "well-supported",
          "gap": 4,
          "kind": "frame",
          "confidence": "high"
        },
        "chainInherited": false,
        "period": null
      },
      {
        "id": "GC-18-060",
        "chapter": 18,
        "paragraph": 24,
        "quote": "In the seventh chapter of Ezra the decree is found.(540) In its completest form it was issued by Artaxerxes, king of Persia, B.C. 457.",
        "quoteRu": "В 7-й главе Книги Ездры говорится об этом указе (см. Ездры 7:12—26). В окончательном виде этот указ был издан Артаксерксом, царем Персидским, в 457 году до Р. Х. Но в Книге Ездры (Ездры 6:14) говорится, что дом Господень будет построен «по воле Бога Израилева и по воле Кира и Дария и Артаксеркса, царей Персидских».",
        "enKey": null,
        "outcome": "fallen",
        "labelKey": "improbable",
        "loadBearing": true,
        "adjudicated": {
          "asWritten": "improbable",
          "weakened": "probable",
          "gap": 2,
          "kind": "fact",
          "confidence": "medium"
        },
        "chainInherited": false,
        "period": "period-scholarship"
      },
      {
        "id": "GC-18-071",
        "chapter": 18,
        "paragraph": 27,
        "quote": "In A.D. 31, three and a half years after His baptism, our Lord was crucified.",
        "quoteRu": "В 31 году, спустя три с половиной года после Своего крещения, Господь был распят.",
        "enKey": null,
        "outcome": "fallen",
        "labelKey": "improbable",
        "loadBearing": true,
        "adjudicated": {
          "asWritten": "improbable",
          "weakened": "well-supported",
          "gap": 3,
          "kind": "fact",
          "confidence": "high"
        },
        "chainInherited": false,
        "period": null
      },
      {
        "id": "GC-18-081",
        "chapter": 18,
        "paragraph": 29,
        "quote": "Consequently the 2300 days of Dan. 8:14 terminate in 1844.",
        "quoteRu": "Следовательно, 2300 дней, о которых говорится в Книге Даниила (8:14), оканчиваются в 1844 году.",
        "enKey": null,
        "outcome": "fallen",
        "labelKey": "improbable",
        "loadBearing": true,
        "adjudicated": {
          "asWritten": "improbable",
          "weakened": "well-supported",
          "gap": 3,
          "kind": "fact",
          "confidence": "medium"
        },
        "chainInherited": true,
        "period": null
      },
      {
        "id": "GC-22-039",
        "chapter": 22,
        "paragraph": 20,
        "quote": "That which led to this movement was the discovery that the decree of Artaxerxes for the restoration of Jerusalem, which formed the starting-point for the period of the 2300 days, went into effect in the autumn of the year B.C.…",
        "quoteRu": "Было обнаружено, что указ Артаксеркса о восстановлении Иерусалима, с которого ведется исчисление 2300-дневного периода, вошел в силу осенью 457 года до нашей эры, а не в начале того же года, как предполагали ранее.",
        "enKey": null,
        "outcome": "fallen",
        "labelKey": "improbable",
        "loadBearing": true,
        "adjudicated": {
          "asWritten": "improbable",
          "weakened": "well-supported",
          "gap": 3,
          "kind": "fact",
          "confidence": "medium"
        },
        "chainInherited": true,
        "period": null
      },
      {
        "id": "GC-20-016",
        "chapter": 20,
        "paragraph": 6,
        "quote": "In different lands there were isolated bodies of Christians who, solely by the study of the Scriptures, arrived at the belief that the Saviour’s advent was near.",
        "quoteRu": "В различных странах стали появляться разрозненные группы христиан, которые вследствие серьезного изучения Писаний приходили к заключению о близости пришествия Спасителя.",
        "enKey": null,
        "outcome": "fallen",
        "labelKey": "improbable",
        "loadBearing": true,
        "adjudicated": {
          "asWritten": "improbable",
          "weakened": "probable",
          "gap": 2,
          "kind": "fact",
          "confidence": "medium"
        },
        "chainInherited": false,
        "period": null
      }
    ],
    "open": [],
    "conditional": []
  },
  {
    "link": 5,
    "stands": [],
    "fallen": [
      {
        "id": "GC-23-009",
        "chapter": 23,
        "paragraph": 3,
        "quote": "Sixty-nine weeks, the first 483 of the 2300 years, were to reach to the Messiah, the Anointed One; and Christ’s baptism and anointing by the Holy Spirit, A.D. 27, exactly fulfilled the specification.",
        "quoteRu": "69 седмин, или первые 483 года из 2300 лет, предшествуют Христу Владыке, а Его крещение и помазание Святым Духом в 27 году н. э. полностью соответствует такому исчислению.",
        "enKey": null,
        "outcome": "fallen",
        "labelKey": "improbable",
        "loadBearing": true,
        "adjudicated": {
          "asWritten": "improbable",
          "weakened": "probable",
          "gap": 2,
          "kind": "fact",
          "confidence": "medium"
        },
        "chainInherited": true,
        "period": null
      },
      {
        "id": "GC-23-012",
        "chapter": 23,
        "paragraph": 3,
        "quote": "At the expiration of this period, the nation sealed its rejection of Christ by the persecution of His disciples, and the apostles turned to the Gentiles, A.D. 34.",
        "quoteRu": "По истечении этого периода иудейский народ окончательно отверг Христа, воздвигнув гонение на Его учеников; и в 34 году апостолы обратились к язычникам.",
        "enKey": null,
        "outcome": "fallen",
        "labelKey": "improbable",
        "loadBearing": true,
        "adjudicated": {
          "asWritten": "improbable",
          "weakened": "well-supported",
          "gap": 3,
          "kind": "fact",
          "confidence": "medium"
        },
        "chainInherited": true,
        "period": null
      },
      {
        "id": "GC-23-008",
        "chapter": 23,
        "paragraph": 3,
        "quote": "The 2300 days had been found to begin when the commandment of Artaxerxes for the restoration and building of Jerusalem, went into effect, in the autumn of B.C. 457.",
        "quoteRu": "Как известно, 2300 дней начались с того времени, как вступил в силу указ Артаксеркса о восстановлении и постройке Иерусалима, т. е. осенью 457 года до нашей эры.",
        "enKey": null,
        "outcome": "fallen",
        "labelKey": "improbable",
        "loadBearing": true,
        "adjudicated": {
          "asWritten": "improbable",
          "weakened": "well-supported",
          "gap": 3,
          "kind": "fact",
          "confidence": "medium"
        },
        "chainInherited": true,
        "period": null
      },
      {
        "id": "GC-23-010",
        "chapter": 23,
        "paragraph": 3,
        "quote": "Three and a half years after His baptism, Christ was crucified, in the spring of A.D. 31.",
        "quoteRu": "Спустя три с половиной года после крещения, весной 31 года, Христос был распят.",
        "enKey": null,
        "outcome": "fallen",
        "labelKey": "improbable",
        "loadBearing": true,
        "adjudicated": {
          "asWritten": "improbable",
          "weakened": "well-supported",
          "gap": 3,
          "kind": "fact",
          "confidence": "high"
        },
        "chainInherited": true,
        "period": null
      }
    ],
    "open": [],
    "conditional": [
      {
        "id": "GC-18-058",
        "chapter": 18,
        "paragraph": 23,
        "quote": "the seventy weeks must therefore be a part of the 2300 days, and the two periods must begin together.",
        "quoteRu": "Так как 2300 дней являлись единственным периодом времени, упоминающимся в 8-й главе, следовательно, 70 недель отрезаны от 2300 дней, и эти два отрезка времени должны были начаться одновременно.",
        "enKey": null,
        "outcome": "conditional",
        "labelKey": "conditional",
        "loadBearing": true,
        "adjudicated": {
          "asWritten": "out-of-scope",
          "weakened": "n/a",
          "gap": null,
          "kind": null,
          "confidence": "high"
        },
        "chainInherited": false,
        "period": null
      }
    ]
  },
  {
    "link": 6,
    "stands": [],
    "fallen": [
      {
        "id": "GC-35-057",
        "chapter": 35,
        "paragraph": 34,
        "quote": "the principal object contemplated is the enforcement of Sunday observance,—a custom which originated with Rome, and which she claims as the sign of her authority.",
        "quoteRu": "Этому движению придает еще большее значение главная его цель, а именно: введение обязательного соблюдения воскресного дня — обычая, который своим происхождением обязан Риму и который католическая церковь считает символом своей власти.",
        "enKey": null,
        "outcome": "fallen",
        "labelKey": "improbable",
        "loadBearing": true,
        "adjudicated": {
          "asWritten": "improbable",
          "weakened": "probable",
          "gap": 2,
          "kind": "fact",
          "confidence": "high"
        },
        "chainInherited": false,
        "period": null
      },
      {
        "id": "GC-25-051",
        "chapter": 25,
        "paragraph": 11,
        "quote": "It was to keep this truth ever before the minds of men, that God instituted the Sabbath in Eden;",
        "quoteRu": "Бог установил субботу в Едеме, чтобы таким путем всегда напоминать людям об этой истине, и до тех пор, пока мы будем поклоняться Господу как нашему Создателю, суббота будет оставаться знамением и памятником Его творческой деятельности.",
        "enKey": "ever",
        "outcome": "fallen",
        "labelKey": "improbable",
        "loadBearing": true,
        "adjudicated": {
          "asWritten": "improbable",
          "weakened": "well-supported",
          "gap": 3,
          "kind": "fact",
          "confidence": "medium"
        },
        "chainInherited": false,
        "period": "period-scholarship"
      },
      {
        "id": "GC-26-032",
        "chapter": 26,
        "paragraph": 8,
        "quote": "Though the “man of sin” succeeded in trampling under foot God’s holy day, yet even in the period of his supremacy there were, hidden in secret places, faithful souls who paid it honor.",
        "quoteRu": "Хотя «человеку греха» и удалось растоптать святой день Божий, тем не менее даже в период его владычества были люди, которые втайне почитали этот день.",
        "enKey": null,
        "outcome": "fallen",
        "labelKey": "anachronistic",
        "loadBearing": true,
        "adjudicated": null,
        "chainInherited": false,
        "period": null
      },
      {
        "id": "GC-03-032",
        "chapter": 3,
        "paragraph": 10,
        "quote": "In the first centuries the true Sabbath had been kept by all Christians.",
        "quoteRu": "В течение первых столетий истинная суббота соблюдалась всеми христианами.",
        "enKey": "all Christians",
        "outcome": "fallen",
        "labelKey": "discredited",
        "loadBearing": false,
        "adjudicated": {
          "asWritten": "discredited",
          "weakened": "well-supported",
          "gap": 4,
          "kind": "fact",
          "confidence": "high"
        },
        "chainInherited": false,
        "period": "expositor-tradition"
      },
      {
        "id": "GC-25-126",
        "chapter": 25,
        "paragraph": 35,
        "quote": "The papacy has attempted to change the law of God. The second commandment, forbidding image worship, has been dropped from the law, and the fourth commandment has been so changed as to authorize the observance of the first inst…",
        "quoteRu": "Папство попыталось изменить Закон Божий. Вторая заповедь, запрещающая поклонение изображениям, была изъята из Закона, а четвертая искажена для того, чтобы узаконить празднование первого дня недели вместо седьмого дня — субботы.",
        "enKey": null,
        "outcome": "fallen",
        "labelKey": "anachronistic",
        "loadBearing": false,
        "adjudicated": null,
        "chainInherited": false,
        "period": null
      },
      {
        "id": "GC-25-131",
        "chapter": 25,
        "paragraph": 36,
        "quote": "It was in behalf of the Sunday that popery first asserted its arrogant claims;(751) and its first resort to the power of the state was to compel the observance of Sunday as “the Lord’s day.”",
        "quoteRu": "Свои высокомерные претензии папство впервые выдвинуло, когда речь шла о воскресенье, обратившись в первый раз за помощью к государственной власти, чтобы заставить людей почитать этот день как «день Господень».",
        "enKey": null,
        "outcome": "fallen",
        "labelKey": "anachronistic",
        "loadBearing": false,
        "adjudicated": null,
        "chainInherited": false,
        "period": null
      },
      {
        "id": "GC-26-014",
        "chapter": 26,
        "paragraph": 3,
        "quote": "When the Sabbath was changed by the papal power, the seal was taken from the law.",
        "quoteRu": "Когда папская власть изменила субботу, печать с закона была снята.",
        "enKey": null,
        "outcome": "fallen",
        "labelKey": "improbable",
        "loadBearing": false,
        "adjudicated": {
          "asWritten": "improbable",
          "weakened": "probable",
          "gap": 2,
          "kind": "fact",
          "confidence": "medium"
        },
        "chainInherited": false,
        "period": null
      },
      {
        "id": "GC-26-025",
        "chapter": 26,
        "paragraph": 6,
        "quote": "The breach was made in the law of God when the Sabbath was changed by the Roman power.",
        "quoteRu": "Изменив субботу, римская власть пробила брешь в Законе Божьем.",
        "enKey": null,
        "outcome": "fallen",
        "labelKey": "improbable",
        "loadBearing": false,
        "adjudicated": {
          "asWritten": "improbable",
          "weakened": "probable",
          "gap": 2,
          "kind": "fact",
          "confidence": "medium"
        },
        "chainInherited": true,
        "period": null
      },
      {
        "id": "GC-35-103",
        "chapter": 35,
        "paragraph": 50,
        "quote": "With Protestant teachers there is the same claim of divine authority for Sunday-keeping, and the same lack of scriptural evidence, as with the papal leaders who fabricated miracles to supply the place of a command from God.",
        "quoteRu": "Протестантские учители утверждают, что соблюдение воскресного дня подтверждено Божественным авторитетом, но не могут привести библейских доказательств, как и паписты, которые выдумывали всевозможные чудеса, чтобы подменить заповедь Божью.",
        "enKey": "the same claim of divine authority",
        "outcome": "fallen",
        "labelKey": "improbable",
        "loadBearing": false,
        "adjudicated": {
          "asWritten": "improbable",
          "weakened": "well-supported",
          "gap": 3,
          "kind": "fact",
          "confidence": "medium"
        },
        "chainInherited": false,
        "period": null
      }
    ],
    "open": [
      {
        "id": "GC-03-050",
        "chapter": 3,
        "paragraph": 15,
        "quote": "The observance of Sunday as a Christian institution had its origin in that “mystery of lawlessness” which, even in Paul’s day, had begun its work.",
        "quoteRu": "Празднование воскресенья христианами исходит из «тайны беззакония» (2 Фессалоникийцам 2:7), которая начала проявляться еще во дни апостола Павла.",
        "enKey": null,
        "outcome": "open",
        "labelKey": "open",
        "loadBearing": false,
        "adjudicated": {
          "asWritten": "genuinely-open",
          "weakened": "well-supported",
          "gap": 2,
          "kind": "fact",
          "confidence": "medium"
        },
        "chainInherited": false,
        "period": null
      }
    ],
    "conditional": []
  },
  {
    "link": 7,
    "stands": [],
    "fallen": [
      {
        "id": "GC-36-044",
        "chapter": 36,
        "paragraph": 11,
        "quote": "Clinging to the papal error of natural immortality and man’s consciousness in death, they have rejected the only defense against the delusions of Spiritualism.",
        "quoteRu": "Приняв папское лжеучение о естественном бессмертии души и сознательном состоянии человека после смерти, они тем самым лишили себя единственной защиты против обольщений спиритизма.",
        "enKey": null,
        "outcome": "fallen",
        "labelKey": "improbable",
        "loadBearing": false,
        "adjudicated": {
          "asWritten": "improbable",
          "weakened": "probable",
          "gap": 2,
          "kind": "fact",
          "confidence": "medium"
        },
        "chainInherited": false,
        "period": null
      },
      {
        "id": "GC-37-029",
        "chapter": 37,
        "paragraph": 10,
        "quote": "On the ground that ecclesiastics alone are competent to explain God’s word, it is withheld from the common people.",
        "quoteRu": "На основании того, что лишь духовные лица достаточно сведущи, чтобы объяснить Слово Божье, оно утаивается от народа.",
        "enKey": "ecclesiastics alone are competent",
        "outcome": "fallen",
        "labelKey": "improbable",
        "loadBearing": false,
        "adjudicated": {
          "asWritten": "improbable",
          "weakened": "well-supported",
          "gap": 3,
          "kind": "fact",
          "confidence": "high"
        },
        "chainInherited": false,
        "period": null
      }
    ],
    "open": [
      {
        "id": "GC-42-032",
        "chapter": 42,
        "paragraph": 15,
        "quote": "Herod, who slew the innocent children of Bethlehem that he might destroy the King of Israel",
        "quoteRu": "Ирод, по приказу которого были убиты невинные младенцы Вифлеема, чтобы таким путем погубить Царя Израильского; подлая Иродиада, на совести которой лежит кровь Иоанна Крестителя; слабовольный, приспосабливающийся к обстоятельствам и времени Пилат; глумящиеся солдаты; священники, начальники и обезумевшая толпа, кричащая: «Кровь Его на нас и на детях наших», — все они видят чудовищность своей вины.",
        "enKey": null,
        "outcome": "open",
        "labelKey": "open",
        "loadBearing": false,
        "adjudicated": {
          "asWritten": "genuinely-open",
          "weakened": "probable",
          "gap": 1,
          "kind": "fact",
          "confidence": "medium"
        },
        "chainInherited": false,
        "period": null
      }
    ],
    "conditional": []
  }
] as const

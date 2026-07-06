// СГЕНЕРИРОВАНО scripts/build-data.mjs — не редактировать руками.
// Источник: synthesis/aggregate.json + adjudication/*.ruling.json (2026-07-06).
export interface PassageSegment { text: string; id?: string; outcome?: 'stands' | 'fallen' | 'open' | 'conditional' | 'outside' | 'none'; enKey?: string }
export interface ChainPassage { link: number; chapter: number; paras: { paragraph: number; segments: PassageSegment[]; ruSegments: PassageSegment[] | null }[] }
export const chainPassages: readonly ChainPassage[] = [
  {
    "link": 1,
    "chapter": 1,
    "paras": [
      {
        "paragraph": 34,
        "segments": [
          {
            "text": "Not one Christian perished in the destruction of Jerusalem.",
            "id": "GC-01-079",
            "outcome": "fallen"
          },
          {
            "text": " Christ had given His disciples warning, and all who believed His words watched for the promised sign. "
          },
          {
            "text": "“When ye shall see Jerusalem compassed with armies,” said Jesus, “then know that the desolation thereof is nigh. Then let them which are in Judea flee to the mountains; and let them which are in the midst of it depart out.”",
            "id": "GC-01-080",
            "outcome": "stands"
          },
          {
            "text": "(41) "
          },
          {
            "text": "After the Romans under Cestius had surrounded the city, they unexpectedly abandoned the siege when everything seemed favorable for an immediate attack.",
            "id": "GC-01-081",
            "outcome": "stands"
          },
          {
            "text": " The besieged, despairing of successful resistance, were on the point of surrender, when the Roman general withdrew his forces without the least apparent reason. But God’s merciful providence was directing events for the good of His own people. The promised sign had been given to the waiting Christians, and now an opportunity was afforded for all who would, to obey the Saviour’s warning. Events were so overruled that neither Jews nor Romans should hinder the flight of the Christians. "
          },
          {
            "text": "Upon the retreat of Cestius, the Jews, sallying from Jerusalem, pursued after his retiring army; and while both forces were thus fully engaged, the Christians had an opportunity to leave the city.",
            "id": "GC-01-082",
            "outcome": "open"
          },
          {
            "text": " At this time the country also had been cleared of enemies who might have endeavored to intercept them. "
          },
          {
            "text": "At the time of the siege, the Jews were assembled at Jerusalem to keep the Feast of Tabernacles, and thus the Christians throughout the land were able to make their escape unmolested.",
            "id": "GC-01-083",
            "outcome": "stands"
          },
          {
            "text": " "
          },
          {
            "text": "Without delay they fled to a place of safety,—the city of Pella, in the land of Perea, beyond Jordan.",
            "id": "GC-01-084",
            "outcome": "open"
          }
        ],
        "ruSegments": [
          {
            "text": "Ни один христианин не погиб при разрушении Иерусалима.",
            "id": "GC-01-079",
            "outcome": "fallen"
          },
          {
            "text": " Христос предупредил Своих учеников, и все, поверившие Его словам, следили за появлением обещанного знамения. "
          },
          {
            "text": "«Когда же увидите Иерусалим, окруженный войсками, — сказал Христос, — тогда знайте, что приблизилось запустение его: тогда находящиеся в Иудее да бегут в горы; и кто в городе, выходи из него» (Луки 21:20, 21).",
            "id": "GC-01-080",
            "outcome": "stands"
          },
          {
            "text": " "
          },
          {
            "text": "Когда римляне под командованием Цестия окружили город, неожиданно осада была снята, невзирая на то, что все, казалось, говорило в пользу незамедлительного штурма.",
            "id": "GC-01-081",
            "outcome": "stands"
          },
          {
            "text": " Жители осажденного города, потерявшие всякую надежду на спасение, уже были готовы сдаться, но римский полководец без всяких видимых причин приказал войскам отойти от столицы иудеев. Милостивое провидение Божье управляло всеми событиями во благо Своего народа. Христианам был дан обещанный знак, и теперь всякий, послушный словам Христа, имел возможность спастись. События приняли такой оборот, что ни иудеи, ни римляне не препятствовали бегству христиан. "
          },
          {
            "text": "В то время как иудеи, оставившие город, погнались за отступающими войсками Цестия, и обе армии были захвачены сражением, христиане получили возможность уйти из города.",
            "id": "GC-01-082",
            "outcome": "open"
          },
          {
            "text": " "
          },
          {
            "text": "Во время осады иудеи собрались в Иерусалиме на праздник кущей, и поэтому по всей стране некому было препятствовать бегству христиан.",
            "id": "GC-01-083",
            "outcome": "stands"
          },
          {
            "text": " "
          },
          {
            "text": "Не теряя ни одного мгновения, они бежали в безопасное место — в город Пелла, находящийся в Перее, за Иорданом.",
            "id": "GC-01-084",
            "outcome": "open"
          }
        ]
      }
    ]
  },
  {
    "link": 2,
    "chapter": 4,
    "paras": [
      {
        "paragraph": 8,
        "segments": [
          {
            "text": "But of those who resisted the encroachments of the papal power, the Waldenses stood foremost.",
            "id": "GC-04-028",
            "outcome": "outside"
          },
          {
            "text": " "
          },
          {
            "text": "In the very land where popery had fixed its seat, there its falsehood and corruption were most steadfastly resisted.",
            "id": "GC-04-029",
            "outcome": "stands"
          },
          {
            "text": " "
          },
          {
            "text": "For centuries the churches of Piedmont maintained their independence; but the time came at last when Rome insisted upon their submission.",
            "id": "GC-04-030",
            "outcome": "fallen"
          },
          {
            "text": " "
          },
          {
            "text": "After ineffectual struggles against her tyranny, the leaders of these churches reluctantly acknowledged the supremacy of the power to which the whole world seemed to pay homage.",
            "id": "GC-04-031",
            "outcome": "fallen"
          },
          {
            "text": " There were some, however, who refused to yield to the authority of pope or prelate. They were determined to maintain their allegiance to God, and to preserve the purity and simplicity of their faith. "
          },
          {
            "text": "A separation took place. Those who adhered to the ancient faith now withdrew; some, forsaking their native Alps, raised the banner of truth in foreign lands; others retreated to the secluded glens and rocky fastnesses of the mountains, and there preserved their freedom to worship God.",
            "id": "GC-04-032",
            "outcome": "fallen"
          }
        ],
        "ruSegments": [
          {
            "text": "Но среди тех, кто оказал папской власти самое решительное сопротивление, первое место занимают вальденсы.",
            "id": "GC-04-028",
            "outcome": "outside"
          },
          {
            "text": " "
          },
          {
            "text": "Как раз в той стране, где папство утвердило свой престол, оно встретило наиболее стойкое сопротивление.",
            "id": "GC-04-029",
            "outcome": "stands"
          },
          {
            "text": " "
          },
          {
            "text": "В течение целых столетий церкви в Пьемонте сохраняли свою независимость, сопротивляясь искажению веры и лжи, пока Рим не подчинил и их.",
            "id": "GC-04-030",
            "outcome": "fallen"
          },
          {
            "text": " "
          },
          {
            "text": "После безуспешной борьбы с диктатом Рима руководители этих церквей, хотя и вынужденно, признали верховную власть папы, который, казалось, подчинил себе уже весь мир.",
            "id": "GC-04-031",
            "outcome": "fallen"
          },
          {
            "text": " Однако были и такие, кто отказался подчиниться власти папы или прелатов. Они решили остаться верными Богу и сохранить чистоту и простоту своей веры. "
          },
          {
            "text": "Произошло разделение. Приверженцы древней веры рассеялись: одни, оставив родные Альпы, подняли знамя истины в других странах; другие ушли в отдаленные долины и ущелья гор и там продолжали служить Богу, согласно велению своей совести.",
            "id": "GC-04-032",
            "outcome": "fallen"
          }
        ]
      },
      {
        "paragraph": 9,
        "segments": [
          {
            "text": "The faith which for many centuries was held and taught by the Waldensian Christians, was in marked contrast to the false doctrines put forth from Rome.",
            "id": "GC-04-033",
            "outcome": "stands"
          },
          {
            "text": " Their religious belief was founded upon the written word of God, the true system of Christianity. But those humble peasants, in their obscure retreats, shut away from the world, and bound to daily toil among their flocks and their vineyards, had not by themselves arrived at the truth in opposition to the dogmas and heresies of the apostate church. "
          },
          {
            "text": "Theirs was not a faith newly received. Their religious belief was their inheritance from their fathers. They contended for the faith of the apostolic church,—“the faith which was once delivered unto the saints.”(99)",
            "id": "GC-04-034",
            "outcome": "fallen"
          },
          {
            "text": " "
          },
          {
            "text": "“The church in the wilderness,” and not the proud hierarchy enthroned in the world’s great capital, was the true church of Christ, the guardian of the treasures of truth which God has committed to His people to be given to the world.",
            "id": "GC-04-035",
            "outcome": "outside"
          }
        ],
        "ruSegments": [
          {
            "text": "Вероучение, которое в течение многих столетий сохранялось и распространялось вальденскими христианами, резко отличалось от ложных доктрин Рима.",
            "id": "GC-04-033",
            "outcome": "stands"
          },
          {
            "text": " Их религия основывалась на писаном Слове Божьем, истинной основе христианства. "
          },
          {
            "text": "Но эти скромные крестьяне, ютившиеся в своих мрачных жилищах, отрезанные от мира и добывающие себе ежедневное пропитание тяжким трудом, пася овец и возделывая виноградники, не изобретали истину, которая так резко отличалась от ересей и догм отпавшей церкви. Они не изобретали новую веру, нет — их вера была наследием отцов. Они подвизались «за веру, однажды преданную святым» (Иуды 3), за веру апостольской Церкви.",
            "id": "GC-04-034",
            "outcome": "fallen"
          },
          {
            "text": " "
          },
          {
            "text": "«Церковь пустыни», а не высокомерная иерархия, воцарившаяся в столице мира, была истинной Церковью Христа, хранительницей сокровищ истины, вверенных Богом Своему народу для того, чтобы он, в свою очередь, передал их миру.",
            "id": "GC-04-035",
            "outcome": "outside"
          }
        ]
      }
    ]
  },
  {
    "link": 3,
    "chapter": 7,
    "paras": [
      {
        "paragraph": 16,
        "segments": [
          {
            "text": "By a recent decretal, an indulgence had been promised by the pope to all who should ascend upon their knees “Pilate’s staircase,” said to have been descended by our Saviour on leaving the Roman judgment hall, and to have been miraculously conveyed from Jerusalem to Rome.",
            "id": "GC-07-035",
            "outcome": "stands"
          },
          {
            "text": " "
          },
          {
            "text": "Luther was one day devoutly climbing these steps, when suddenly a voice like thunder seemed to say to him, “The just shall live by faith.”(165) He sprung to his feet, and hastened from the place in shame and horror.",
            "id": "GC-07-036",
            "outcome": "fallen"
          },
          {
            "text": " That text never lost its power upon his soul. From that time he saw more clearly than ever before the fallacy of trusting to human works for salvation, and the necessity of constant faith in the merits of Christ. "
          },
          {
            "text": "His eyes had been opened, and were never again to be closed, to the delusions of the papacy. When he turned his face from Rome, he had turned away also in heart, and from that time the separation grew wider, until he severed all connection with the papal church.",
            "id": "GC-07-037",
            "outcome": "fallen"
          }
        ],
        "ruSegments": [
          {
            "text": "В своем постановлении папа обещал отпущение грехов всем тем, кто на коленях поднимется по так называемой «Пилатовой лестнице», по которой, согласно молве, сошел наш Спаситель, когда вышел из римского верховного судилища, и которая каким-то чудом была перенесена из Иерусалима в Рим.",
            "id": "GC-07-035",
            "outcome": "stands"
          },
          {
            "text": " "
          },
          {
            "text": "Однажды, когда Лютер благоговейно на коленях поднимался по ней, вдруг громоподобный голос произнес: «Праведный верою жив будет» (Римлянам 1:17). Он вскочил на ноги и с ужасом и стыдом поспешно удалился.",
            "id": "GC-07-036",
            "outcome": "fallen"
          },
          {
            "text": " И с тех пор эти слова библейского текста всегда звучали в его душе. Внезапно он увидел всю обманчивость человеческой надежды спастись при помощи собственных дел и понял необходимость постоянной веры в заслуги Христа. "
          },
          {
            "text": "Его глазам открылись заблуждения папства. Когда он отвернулся от Рима, то «отвернулся» от него всем сердцем, и с того времени началось его удаление от папской церкви, пока наконец он окончательно не порвал всякую связь с ней.",
            "id": "GC-07-037",
            "outcome": "fallen"
          }
        ]
      }
    ]
  },
  {
    "link": 4,
    "chapter": 18,
    "paras": [
      {
        "paragraph": 29,
        "segments": [
          {
            "text": "Thus far every specification of the prophecies is strikingly fulfilled, and "
          },
          {
            "text": "the beginning of the seventy weeks is fixed beyond question at B.C. 457, and their expiration in A.D. 34.",
            "id": "GC-18-078",
            "outcome": "fallen"
          },
          {
            "text": " From this data there is no difficulty in finding the termination of the 2300 days. "
          },
          {
            "text": "The seventy weeks—490 days—having been cut off from the 2300, there were 1810 days remaining.",
            "id": "GC-18-079",
            "outcome": "stands"
          },
          {
            "text": " After the end of 490 days, the 1810 days were still to be fulfilled. "
          },
          {
            "text": "From A.D. 34, 1810 years extend to 1844.",
            "id": "GC-18-080",
            "outcome": "stands"
          },
          {
            "text": " "
          },
          {
            "text": "Consequently the 2300 days of Dan. 8:14 terminate in 1844.",
            "id": "GC-18-081",
            "outcome": "fallen"
          },
          {
            "text": " At the expiration of this great prophetic period, upon the testimony of the angel of God, “the sanctuary shall be cleansed.” Thus the time of the cleansing of the sanctuary—which was almost universally believed to take place at the second advent—was definitely pointed out."
          }
        ],
        "ruSegments": [
          {
            "text": "Становилось очевидным, что исполнилась каждая подробность этого пророчества, и началом семидесяти седмин, без всякого сомнения, является 457 год до Р. Х., а концом этого периода — 34 год после Р. Х. Располагая этими данными, нетрудно определить и дату окончания 2300 дней.",
            "id": "GC-18-078",
            "outcome": "fallen",
            "enKey": "fixed beyond question"
          },
          {
            "text": " "
          },
          {
            "text": "Семьдесят седмин — 490 дней — отрезаны от 2300 дней; следовательно, оставалось еще 1810 дней, которые должны были пройти после периода 490 дней.",
            "id": "GC-18-079",
            "outcome": "stands"
          },
          {
            "text": " "
          },
          {
            "text": "Отсчитав 1810 лет от 34 года по Р. Х., мы получим 1844 год.",
            "id": "GC-18-080",
            "outcome": "stands"
          },
          {
            "text": " "
          },
          {
            "text": "Следовательно, 2300 дней, о которых говорится в Книге Даниила (8:14), оканчиваются в 1844 году.",
            "id": "GC-18-081",
            "outcome": "fallen"
          },
          {
            "text": " После завершения этого великого пророческого периода, согласно свидетельству ангела Божьего, должно было произойти «очищение святилища». Таким образом, было точно вычислено время очищения святилища, которое, как все считали, должно произойти при Втором пришествии Христа."
          }
        ]
      }
    ]
  },
  {
    "link": 5,
    "chapter": 23,
    "paras": [
      {
        "paragraph": 3,
        "segments": [
          {
            "text": "To accept this conclusion was to renounce the former reckoning of the prophetic periods. "
          },
          {
            "text": "The 2300 days had been found to begin when the commandment of Artaxerxes for the restoration and building of Jerusalem, went into effect, in the autumn of B.C. 457.",
            "id": "GC-23-008",
            "outcome": "fallen"
          },
          {
            "text": " Taking this as the starting-point, there was perfect harmony in the application of all the events foretold in the explanation of that period in Dan. 9:25-27. "
          },
          {
            "text": "Sixty-nine weeks, the first 483 of the 2300 years, were to reach to the Messiah, the Anointed One; and Christ’s baptism and anointing by the Holy Spirit, A.D. 27, exactly fulfilled the specification.",
            "id": "GC-23-009",
            "outcome": "fallen"
          },
          {
            "text": " In the midst of the seventieth week, Messiah was to be cut off. "
          },
          {
            "text": "Three and a half years after His baptism, Christ was crucified, in the spring of A.D. 31.",
            "id": "GC-23-010",
            "outcome": "fallen"
          },
          {
            "text": " "
          },
          {
            "text": "The seventy weeks, or 490 years, were to pertain especially to the Jews.",
            "id": "GC-23-011",
            "outcome": "outside"
          },
          {
            "text": " "
          },
          {
            "text": "At the expiration of this period, the nation sealed its rejection of Christ by the persecution of His disciples, and the apostles turned to the Gentiles, A.D. 34.",
            "id": "GC-23-012",
            "outcome": "fallen"
          },
          {
            "text": " The first 490 years of the 2300 having then ended, 1810 years would remain. "
          },
          {
            "text": "From A.D. 34, 1810 years extend to 1844.",
            "id": "GC-23-013",
            "outcome": "stands"
          },
          {
            "text": " "
          },
          {
            "text": "“Then,” said the angel, “shall the sanctuary be cleansed.”",
            "id": "GC-23-014",
            "outcome": "stands"
          },
          {
            "text": " All the preceding specifications of the prophecy had been unquestionably fulfilled at the time appointed."
          }
        ],
        "ruSegments": [
          {
            "text": "Принять такое заключение — значило отвергнуть прежние вычисления пророческих периодов. "
          },
          {
            "text": "Как известно, 2300 дней начались с того времени, как вступил в силу указ Артаксеркса о восстановлении и постройке Иерусалима, т. е. осенью 457 года до нашей эры.",
            "id": "GC-23-008",
            "outcome": "fallen"
          },
          {
            "text": " Если принять эту дату за точку отсчета, то все события, предсказанные в Книге пророка Даниила (9:25—27), гармонично вписываются в указанные сроки. "
          },
          {
            "text": "69 седмин, или первые 483 года из 2300 лет, предшествуют Христу Владыке, а Его крещение и помазание Святым Духом в 27 году н. э. полностью соответствует такому исчислению.",
            "id": "GC-23-009",
            "outcome": "fallen"
          },
          {
            "text": " В середине 70-й седмины Мессии предстояло умереть. "
          },
          {
            "text": "Спустя три с половиной года после крещения, весной 31 года, Христос был распят.",
            "id": "GC-23-010",
            "outcome": "fallen"
          },
          {
            "text": " "
          },
          {
            "text": "70 седмин, или 490 лет, отводились специально для иудеев.",
            "id": "GC-23-011",
            "outcome": "outside"
          },
          {
            "text": " "
          },
          {
            "text": "По истечении этого периода иудейский народ окончательно отверг Христа, воздвигнув гонение на Его учеников; и в 34 году апостолы обратились к язычникам.",
            "id": "GC-23-012",
            "outcome": "fallen"
          },
          {
            "text": " По окончании 490 лет от периода 2300 лет оставалось еще 1810 лет. "
          },
          {
            "text": "Если от 34 года отсчитать 1810 лет вперед, то мы получим 1844 год.",
            "id": "GC-23-013",
            "outcome": "stands"
          },
          {
            "text": " "
          },
          {
            "text": "«И тогда, — как сказал ангел, — святилище очистится».",
            "id": "GC-23-014",
            "outcome": "stands"
          },
          {
            "text": " Все предыдущие части пророчества исполнились в строго определенное время."
          }
        ]
      }
    ]
  },
  {
    "link": 6,
    "chapter": 26,
    "paras": [
      {
        "paragraph": 3,
        "segments": [
          {
            "text": "The Lord commands by the same prophet, “Bind up the testimony, seal the law among My disciples.”",
            "id": "GC-26-009",
            "outcome": "stands"
          },
          {
            "text": "(763) "
          },
          {
            "text": "The seal of God’s law is found in the fourth commandment.",
            "id": "GC-26-010",
            "outcome": "outside"
          },
          {
            "text": " "
          },
          {
            "text": "This only, of all the ten, brings to view both the name and the title of the Lawgiver.",
            "id": "GC-26-011",
            "outcome": "stands"
          },
          {
            "text": " "
          },
          {
            "text": "It declares Him to be the Creator of the heavens and the earth, and thus shows His claim to reverence and worship above all others.",
            "id": "GC-26-012",
            "outcome": "outside"
          },
          {
            "text": " "
          },
          {
            "text": "Aside from this precept, there is nothing in the decalogue to show by whose authority the law is given.",
            "id": "GC-26-013",
            "outcome": "outside"
          },
          {
            "text": " "
          },
          {
            "text": "When the Sabbath was changed by the papal power, the seal was taken from the law.",
            "id": "GC-26-014",
            "outcome": "fallen"
          },
          {
            "text": " "
          },
          {
            "text": "The disciples of Jesus are called upon to restore it, by exalting the Sabbath of the fourth commandment to its rightful position as the Creator’s memorial and the sign of His authority.",
            "id": "GC-26-015",
            "outcome": "outside"
          }
        ],
        "ruSegments": [
          {
            "text": "Господь повелевает устами того же пророка: «Завяжи свидетельство, и запечатай откровение при учениках Моих» (Исаии 8:16).",
            "id": "GC-26-009",
            "outcome": "stands"
          },
          {
            "text": " "
          },
          {
            "text": "Печать Закона Божьего — это четвертая заповедь.",
            "id": "GC-26-010",
            "outcome": "outside"
          },
          {
            "text": " "
          },
          {
            "text": "Только в ней, в отличие от остальных девяти заповедей, сообщается нам имя и титул Законодателя.",
            "id": "GC-26-011",
            "outcome": "stands"
          },
          {
            "text": " "
          },
          {
            "text": "Эта заповедь утверждает: Господь — Творец неба и земли, из чего вытекают требование почитать Господа и поклоняться Ему превыше всех других.",
            "id": "GC-26-012",
            "outcome": "outside"
          },
          {
            "text": " "
          },
          {
            "text": "Нигде более в Десятисловии не указывается, чьей властью дан Закон.",
            "id": "GC-26-013",
            "outcome": "outside"
          },
          {
            "text": " "
          },
          {
            "text": "Когда папская власть изменила субботу, печать с закона была снята.",
            "id": "GC-26-014",
            "outcome": "fallen"
          },
          {
            "text": " "
          },
          {
            "text": "Ученики Иисуса призваны к тому, чтобы восстановить законное положение четвертой заповеди, возвысив ее как памятный день Творца и знак Его власти.",
            "id": "GC-26-015",
            "outcome": "outside"
          }
        ]
      }
    ]
  },
  {
    "link": 7,
    "chapter": 36,
    "paras": [
      {
        "paragraph": 11,
        "segments": [
          {
            "text": "The iniquity and spiritual darkness that prevailed under the supremacy of Rome were the inevitable result of her suppression of the Scriptures;",
            "id": "GC-36-040",
            "outcome": "fallen"
          },
          {
            "text": " but where is to be found the cause of the wide-spread infidelity, the rejection of the law of God, and the consequent corruption, under the full blaze of gospel light in an age of religious freedom? Now that Satan can no longer keep the world under his control by withholding the Scriptures, "
          },
          {
            "text": "he resorts to other means to accomplish the same object. To destroy faith in the Bible serves his purpose as well as to destroy the Bible itself.",
            "id": "GC-36-041",
            "outcome": "outside"
          },
          {
            "text": " "
          },
          {
            "text": "By introducing the belief that God’s law is not binding, he as effectually leads men to transgress as if they were wholly ignorant of its precepts.",
            "id": "GC-36-042",
            "outcome": "outside"
          },
          {
            "text": " And now, as in former ages, he has worked through the church to further his designs. "
          },
          {
            "text": "The religious organizations of the day have refused to listen to unpopular truths plainly brought to view in the Scriptures, and in combating them they have adopted interpretations and taken positions which have sown broadcast the seeds of skepticism.",
            "id": "GC-36-043",
            "outcome": "outside"
          },
          {
            "text": " "
          },
          {
            "text": "Clinging to the papal error of natural immortality and man’s consciousness in death, they have rejected the only defense against the delusions of Spiritualism.",
            "id": "GC-36-044",
            "outcome": "fallen"
          },
          {
            "text": " "
          },
          {
            "text": "The doctrine of eternal torment has led many to disbelieve the Bible.",
            "id": "GC-36-045",
            "outcome": "stands"
          },
          {
            "text": " And "
          },
          {
            "text": "as the claims of the fourth commandment are urged upon the people, it is found that the observance of the seventh-day Sabbath is enjoined; and as the only way to free themselves from a duty which they are unwilling to perform, many popular teachers declare that the law of God is no longer binding. Thus they cast away the law and the Sabbath together.",
            "id": "GC-36-046",
            "outcome": "outside"
          },
          {
            "text": " "
          },
          {
            "text": "As the work of Sabbath reform extends, this rejection of the divine law to avoid the claims of the fourth commandment will become well-nigh universal.",
            "id": "GC-36-047",
            "outcome": "outside"
          },
          {
            "text": " "
          },
          {
            "text": "The teachings of religious leaders have opened the door to infidelity, to Spiritualism, and to contempt for God’s holy law; and upon these leaders rests a fearful responsibility for the iniquity that exists in the Christian world.",
            "id": "GC-36-048",
            "outcome": "outside"
          }
        ],
        "ruSegments": [
          {
            "text": "Нечестие и духовное невежество, процветавшие во время папского владычества, явились неизбежным результатом подавления Священного Писания, но где искать причину широко распространенного безбожия, отвержения Закона Божьего со всеми его гибельными последствиями в наше время — время полного евангельского света и религиозной свободы?",
            "id": "GC-36-040",
            "outcome": "fallen"
          },
          {
            "text": " "
          },
          {
            "text": "Теперь, когда сатана больше не властен лишать мир Священного Писания, он прибегает к другим средствам для достижения той же самой цели. Подрыв веры в Библию точно так же служит его интересам, как и уничтожение самой Библии.",
            "id": "GC-36-041",
            "outcome": "outside"
          },
          {
            "text": " "
          },
          {
            "text": "Распространяя и внедряя убеждение, что Закон Божий не обязателен, он столь успешно вводит людей в грех, как будто бы они и не слыхали о его предписаниях.",
            "id": "GC-36-042",
            "outcome": "outside"
          },
          {
            "text": " И теперь, как и в прежние века, он продолжает проводить в жизнь свои намерения, действуя через Церковь. "
          },
          {
            "text": "Современные религиозные организации отказываются слушать непопулярные истины, столь ясно изложенные в Священном Писании, и в борьбе с ними они придумывают всевозможные истолкования, в результате сеются семена скептицизма и неверия.",
            "id": "GC-36-043",
            "outcome": "outside"
          },
          {
            "text": " "
          },
          {
            "text": "Приняв папское лжеучение о естественном бессмертии души и сознательном состоянии человека после смерти, они тем самым лишили себя единственной защиты против обольщений спиритизма.",
            "id": "GC-36-044",
            "outcome": "fallen"
          },
          {
            "text": " "
          },
          {
            "text": "Учение о вечных муках привело к тому, что многие перестали верить Библии.",
            "id": "GC-36-045",
            "outcome": "stands"
          },
          {
            "text": " "
          },
          {
            "text": "Поскольку Писание раскрывает людям требования четвертой заповеди, и они начинают понимать необходимость ее соблюдения, то для того, чтобы освободить их от этой нежелательной для них заповеди, популярные учители заявляют, что Закон Божий вообще не нужен. Таким путем они одновременно отбрасывают и Закон, и субботу.",
            "id": "GC-36-046",
            "outcome": "outside"
          },
          {
            "text": " "
          },
          {
            "text": "По мере расширения движения за изменение субботы отвержение Закона будет практически всеобщим с целью избежать выполнения четвертой заповеди.",
            "id": "GC-36-047",
            "outcome": "outside"
          },
          {
            "text": " "
          },
          {
            "text": "Поучения религиозных наставников открыли дверь безбожию, спиритизму и презрительному отношению к святому Закону Божьему, и на этих людях лежит страшная ответственность за то беззаконие, которое существует в христианском мире.",
            "id": "GC-36-048",
            "outcome": "outside"
          }
        ]
      }
    ]
  }
] as const

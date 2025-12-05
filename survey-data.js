// Survey Questions Data Structure
const surveyData = {
    // Introduction Questions (All participants)
    intro: {
        title: "Általános Bemutatkozás",
        icon: "fa-user-circle",
        sector: "intro",
        questions: [
            {
                id: "INTRO.1",
				code: "INTRO.1",
                text: "Kérjük, mutatkozzon be és ismertesse jelenlegi pozícióját az innovációs ökoszisztémában.",
                type: "textarea",
                required: true
            },
            {
                id: "INTRO.2",
				code: "INTRO.2",
                text: "Hogyan definiálná az innovációt a saját területén?",
                type: "textarea",
                required: true
            },
            {
                id: "INTRO.3",
				code: "INTRO.3",
                text: "Milyen szerepet játszik szervezete/vállalata az innovációs ökoszisztémában?",
                type: "textarea",
                required: true
            },
            {
                id: "INTRO.4",
				code: "INTRO.4",
                text: "Mik a legfontosabb kihívások, amelyekkel jelenleg szembesül?",
                type: "textarea",
                required: true
            }
        ]
    },

    // University Sector Questions
    university: {
        ST: {
            title: "Egyetem - Tudástermelés és -transzfer",
            icon: "fa-university",
            sector: "university",
            questions: [
                {
                    id: "U.ST.KT.1",
                    code: "U.ST.KT.1",
                    text: "Milyen kapcsolatban áll egyetemekkel vagy kutatóintézetekkel, és hogyan használja fel az akadémiai kutatási eredményeket?",
                    type: "textarea",
                    required: true
                },
                {
                    id: "U.ST.KT.2",
                    code: "U.ST.KT.2",
                    text: "Hogyan zajlik kutatási eredményeinek gyakorlati hasznosítása és kommercionalizációja?",
                    type: "textarea",
                    required: true
                },
                {
                    id: "U.ST.KT.3",
                    code: "U.ST.KT.3",
                    text: "Milyen akadályokat tapasztalt az akadémiai tudás gyakorlati alkalmazása során?",
                    type: "textarea",
                    required: true
                },
                {
                    id: "U.ST.COLL.1",
                    code: "U.ST.COLL.1",
                    text: "Részt vett-e egyetemi inkubátor/akcelerátor programokban vagy spin-off fejlesztésben?",
                    type: "textarea",
                    required: true
                },
                {
                    id: "U.ST.COLL.2",
                    code: "U.ST.COLL.2",
                    text: "Dolgozott-e együtt egyetemi kutatócsoportokkal vagy ipari partnerekkel közös projekteken?",
                    type: "textarea",
                    required: true
                },
                {
                    id: "U.ST.COLL.3",
                    code: "U.ST.COLL.3",
                    text: "Hogyan egyensúlyozza az alapkutatás és az alkalmazott kutatás, illetve az akadémiai szabadság és az ipari igények között?",
                    type: "textarea",
                    required: false
                },
                {
                    id: "U.ST.COLL.4",
                    code: "U.ST.COLL.4",
                    text: "Hogyan értékeli az egyetem technológiatranszfer tevékenységét és az ipari együttműködések ösztönzését?",
                    type: "textarea",
                    required: true
                }
            ]
        },
        C: {
            title: "Egyetem - Tudástermelés és -transzfer",
            icon: "fa-university",
            sector: "university",
            questions: [
                {
                    id: "U.C.COLL.1",
                    code: "U.C.COLL.1",
                    text: "Hogyan működik együtt egyetemekkel K+F projektekben, és milyen előnyöket/hátrányokat tapasztalt?",
                    type: "textarea",
                    required: true
                },
                {
                    id: "U.C.KT.1",
                    code: "U.C.KT.1",
                    text: "Hogyan értékeli az egyetemek által nyújtott kutatási kapacitásokat?",
                    type: "textarea",
                    required: true
                },
                {
                    id: "U.C.FIN.1",
                    code: "U.C.FIN.1",
                    text: "Részt vesz-e egyetemi kutatási programok finanszírozásában vagy hallgatók/kutatók toborzásában?",
                    type: "textarea",
                    required: true
                }
            ]
        },
        TT: {
            title: "Egyetem - Tudástermelés és -transzfer",
            icon: "fa-university",
            sector: "university",
            questions: [
                {
                    id: "U.TT.KT.1",
                    code: "U.TT.KT.1",
                    text: "Hogyan működik a technológiatranszfer folyamat, és milyen kihívásokkal találkozik az akadémiai kutatások kommercionalizációja során?",
                    type: "textarea",
                    required: true
                },
                {
                    id: "U.TT.NET.1",
                    code: "U.TT.NET.1",
                    text: "Milyen stratégiákat alkalmaz az ipari partnerek megtalálásához és a kutatók vállalkozói készségeinek fejlesztéséhez?",
                    type: "textarea",
                    required: true
                },
                {
                    id: "U.TT.INN.1",
                    code: "U.TT.INN.1",
                    text: "Milyen szerepet játszik a startup/spinoff ökoszisztéma fejlesztésében?",
                    type: "textarea",
                    required: true
                }
            ]
        }
    },

    // Industry Sector Questions
    industry: {
        ST: {
            title: "Ipar - Innováció és piaci alkalmazás",
            icon: "fa-industry",
            sector: "industry",
            questions: [
                {
                    id: "I.ST.INN.1",
                    code: "I.ST.INN.1",
                    text: "Hogyan pozicionálja spinoff vállalkozását a piacon a nagy vállalatokkal szemben?",
                    type: "textarea",
                    required: true
                },
                {
                    id: "I.ST.COLL.1",
                    code: "I.ST.COLL.1",
                    text: "Milyen együttműködési lehetőségeket lát a nagyvállalatok és az ipar irányába?",
                    type: "textarea",
                    required: true
                },
                {
                    id: "I.ST.NET.1",
                    code: "I.ST.NET.1",
                    text: "Hogyan épít fel értékláncokat, beszállítói kapcsolatokat és stratégiai partnerségeket?",
                    type: "textarea",
                    required: true
                },
                {
                    id: "I.ST.INN.2",
                    code: "I.ST.INN.2",
                    text: "Hogyan biztosítja kutatásai/fejlesztései ipari relevenciáját?",
                    type: "textarea",
                    required: true
                },
                {
                    id: "I.ST.COLL.2",
                    code: "I.ST.COLL.2",
                    text: "Milyen visszajelzéseket kap az ipartól kutatási/fejlesztési irányokról, és részt vesz-e ipari konzorciumokban?",
                    type: "textarea",
                    required: true
                },
                {
                    id: "I.ST.NET.2",
                    code: "I.ST.NET.2",
                    text: "Milyen csatornákon keresztül osztja meg kutatási/fejlesztési eredményeit az iparral?",
                    type: "textarea",
                    required: false
                }
            ]
        },
        C: {
            title: "Ipar - Innováció és piaci alkalmazás",
            icon: "fa-industry",
            sector: "industry",
            questions: [
                {
                    id: "I.C.INN.1",
                    code: "I.C.INN.1",
                    text: "Hogyan integrálja a külső innovációkat (nyílt innováció) a vállalati stratégiába?",
                    type: "textarea",
                    required: true
                },
                {
                    id: "I.C.COLL.1",
                    code: "I.C.COLL.1",
                    text: "Hogyan működik együtt startupokkal/spinoff vállalatokkal, és milyen kritériumok alapján választ innovációs partnereket?",
                    type: "textarea",
                    required: true
                },
                {
                    id: "I.C.NET.1",
                    code: "I.C.NET.1",
                    text: "Hogyan járul hozzá az innovációs ökoszisztéma fejlesztéséhez (befektetések, támogatási programok)?",
                    type: "textarea",
                    required: true
                }
            ]
        },
        TT: {
            title: "Ipar - Innováció és piaci alkalmazás",
            icon: "fa-industry",
            sector: "industry",
            questions: [
                {
                    id: "I.TT.NET.1",
                    code: "I.TT.NET.1",
                    text: "Hogyan építi fel és tartja fenn az ipari kapcsolatokat?",
                    type: "textarea",
                    required: true
                },
                {
                    id: "I.TT.KT.1",
                    code: "I.TT.KT.1",
                    text: "Hogyan segíti az IP licencelési folyamatokat és közös kutatási projektek koordinálását?",
                    type: "textarea",
                    required: true
                }
            ]
        }
    },

    // Government Sector Questions
    government: {
        ST: {
            title: "Kormányzat - Szabályozás és támogatás",
            icon: "fa-landmark",
            sector: "government",
            questions: [
                {
                    id: "G.ST.FIN.1",
                    code: "G.ST.FIN.1",
                    text: "Milyen kormányzati támogatásokat vett igénybe a spinoff/kutatás fejlesztéséhez?",
                    type: "textarea",
                    required: true
                },
                {
                    id: "G.ST.FIN.2",
                    code: "G.ST.FIN.2",
                    text: "Hogyan értékeli a kormányzati kutatásfinanszírozási és startup-támogatási rendszereket?",
                    type: "textarea",
                    required: true
                },
                {
                    id: "G.ST.REG.1",
                    code: "G.ST.REG.1",
                    text: "Milyen bürokratikus akadályokkal találkozott, és hogyan befolyásolják a szabályozások a tevékenységét?",
                    type: "textarea",
                    required: true
                },
                {
                    id: "G.ST.POL.1",
                    code: "G.ST.POL.1",
                    text: "Milyen hatással vannak a közpolitikai prioritások a kutatási/fejlesztési irányokra?",
                    type: "textarea",
                    required: true
                },
                {
                    id: "G.ST.POL.2",
                    code: "G.ST.POL.2",
                    text: "Milyen változásokat szeretne látni a spinoff-barát és kutatás-támogató közpolitikákban?",
                    type: "textarea",
                    required: true
                },
                {
                    id: "G.ST.POL.3",
                    code: "G.ST.POL.3",
                    text: "Részt vesz-e közpolitikai konzultációkban, tudománypolitika formálásában vagy döntéshozatali folyamatokban?",
                    type: "textarea",
                    required: false
                }
            ]
        },
        C: {
            title: "Kormányzat - Szabályozás és támogatás",
            icon: "fa-landmark",
            sector: "government",
            questions: [
                {
                    id: "G.C.REG.1",
                    code: "G.C.REG.1",
                    text: "Hogyan befolyásolja a szabályozási környezet az innovációs tevékenységet?",
                    type: "textarea",
                    required: true
                },
                {
                    id: "G.C.FIN.1",
                    code: "G.C.FIN.1",
                    text: "Milyen kormányzati ösztönzőket használ ki innovációs projektekhez?",
                    type: "textarea",
                    required: true
                },
                {
                    id: "G.C.POL.1",
                    code: "G.C.POL.1",
                    text: "Hogyan vesz részt szakpolitikai folyamatokban és közbeszerzési innovációs projektekben (PPP)?",
                    type: "textarea",
                    required: true
                }
            ]
        },
        TT: {
            title: "Kormányzat - Szabályozás és támogatás",
            icon: "fa-landmark",
            sector: "government",
            questions: [
                {
                    id: "G.TT.POL.1",
                    code: "G.TT.POL.1",
                    text: "Hogyan befolyásolják a kormányzati politikák a technológiatranszfer tevékenységet?",
                    type: "textarea",
                    required: true
                },
                {
                    id: "G.TT.FIN.1",
                    code: "G.TT.FIN.1",
                    text: "Milyen támogatásokat kap a kormányzattól?",
                    type: "textarea",
                    required: true
                },
                {
                    id: "G.TT.REG.1",
                    code: "G.TT.REG.1",
                    text: "Hogyan értékeli az IP és szabadalmi rendszer működését?",
                    type: "textarea",
                    required: true
                }
            ]
        }
    },

    // Society Sector Questions
    society: {
        ST: {
            title: "Társadalom - Társadalmi igények és elfogadottság",
            icon: "fa-users",
            sector: "society",
            questions: [
                {
                    id: "S.ST.SI.1",
                    code: "S.ST.SI.1",
                    text: "Hogyan definiálja spinoff vállalkozása/kutatása társadalmi hatását, és milyen társadalmi problémákat kíván megoldani?",
                    type: "textarea",
                    required: true
                },
                {
                    id: "S.ST.SI.2",
                    code: "S.ST.SI.2",
                    text: "Hogyan méri a társadalmi értékteremtést, és hogyan biztosítja kutatásai társadalmi relevenciáját?",
                    type: "textarea",
                    required: true
                },
                {
                    id: "S.ST.SUST.1",
                    code: "S.ST.SUST.1",
                    text: "Milyen szerepet játszik a fennthatóság a stratégiájában?",
                    type: "textarea",
                    required: true
                },
                {
                    id: "S.ST.COMM.1",
                    code: "S.ST.COMM.1",
                    text: "Hogyan építi fel kapcsolatait a célközönséggel és a helyi közösségekkel?",
                    type: "textarea",
                    required: true
                },
                {
                    id: "S.ST.COMM.2",
                    code: "S.ST.COMM.2",
                    text: "Milyen módon vonja be a társadalmat kutatási/fejlesztési folyamataiba, és hogyan kommunikálja eredményeit a nagyközönség felé?",
                    type: "textarea",
                    required: true
                },
                {
                    id: "S.ST.COMM.3",
                    code: "S.ST.COMM.3",
                    text: "Részt vesz-e közösségi, civil kezdeményezésekben vagy citizen science projektekben?",
                    type: "textarea",
                    required: false
                },
                {
                    id: "S.ST.COMM.4",
                    code: "S.ST.COMM.4",
                    text: "Hogyan kezeli a társadalmi elvárásokat, visszajelzéseket és kritikákat?",
                    type: "textarea",
                    required: true
                }
            ]
        },
        C: {
            title: "Társadalom - Társadalmi igények és elfogadottság",
            icon: "fa-users",
            sector: "society",
            questions: [
                {
                    id: "S.C.SI.1",
                    code: "S.C.SI.1",
                    text: "Hogyan integrálja a CSR-t az innovációs tevékenységbe, és milyen társadalmi kihívásokra keres technológiai megoldásokat?",
                    type: "textarea",
                    required: true
                },
                {
                    id: "S.C.SI.2",
                    code: "S.C.SI.2",
                    text: "Hogyan méri az innovációk társadalmi hatását?",
                    type: "textarea",
                    required: true
                },
                {
                    id: "S.C.COMM.1",
                    code: "S.C.COMM.1",
                    text: "Hogyan vonja be a társadalmi szereplőket az innovációs folyamatokba, és hogyan gyűjt társadalmi visszajelzéseket?",
                    type: "textarea",
                    required: true
                },
                {
                    id: "S.C.SUST.1",
                    code: "S.C.SUST.1",
                    text: "Milyen szerepet játszik a fennthatóság az innovációs stratégiában?",
                    type: "textarea",
                    required: true
                }
            ]
        },
        TT: {
            title: "Társadalom - Társadalmi igények és elfogadottság",
            icon: "fa-users",
            sector: "society",
            questions: [
                {
                    id: "S.TT.SI.1",
                    code: "S.TT.SI.1",
                    text: "Hogyan értékeli a technológiatranszfer társadalmi hatását, és milyen kritériumok alapján priorizálja a társadalmilag hasznos innovációkat?",
                    type: "textarea",
                    required: true
                },
                {
                    id: "S.TT.COMM.1",
                    code: "S.TT.COMM.1",
                    text: "Hogyan kommunikálja a technológiatranszfer eredményeit a társadalom felé?",
                    type: "textarea",
                    required: true
                }
            ]
        }
    },

    // Quadruple Helix Integration Questions (All participants)
    qh: {
        title: "Quadruple Helix Integráció",
        icon: "fa-network-wired",
        sector: "qh",
        questions: [
            {
                id: "QH.ALL.COLL.1",
                code: "QH.ALL.COLL.1",
                text: "Hogyan látja a négy szektor (egyetem-ipar-kormányzat-társadalom) közötti együttműködést? Hol működik jól, és hol vannak hiányosságok?",
                type: "textarea",
                required: true
            },
            {
                id: "QH.ALL.NET.1",
                code: "QH.ALL.NET.1",
                text: "Hogyan lehetne javítani a szektorok közötti kommunikációt és együttműködést?",
                type: "textarea",
                required: true
            },
            {
                id: "QH.ALL.INN.1",
                code: "QH.ALL.INN.1",
                text: "Mit jelent Önnek az 'innovációs ökoszisztéma' fogalma, és hogyan járul hozzá annak fejlesztéséhez?",
                type: "textarea",
                required: true
            },
            {
                id: "QH.ALL.NET.2",
                code: "QH.ALL.NET.2",
                text: "Milyen szerepet játszik a bizalom és a kapcsolati tőke az ökoszisztémában?",
                type: "textarea",
                required: true
            },
            {
                id: "QH.ALL.INN.2",
                code: "QH.ALL.INN.2",
                text: "Mik a legfontosabb akadályok és lehetőségek az innovációs ökoszisztémában?",
                type: "textarea",
                required: true
            },
            {
                id: "QH.ALL.INN.3",
                code: "QH.ALL.INN.3",
                text: "Hogyan változtatná meg az innovációs ökoszisztéma működését? Milyen nemzetközi példákat tart követendőnek?",
                type: "textarea",
                required: false
            },
            {
                id: "QH.ALL.INN.4",
                code: "QH.ALL.INN.4",
                text: "Hogyan változtatta meg a pandémia és a digitalizáció az innovációs folyamatokat és együttműködési formákat?",
                type: "textarea",
                required: false
            }
        ]
    },

    // Closing Questions (All participants)
    closing: {
        title: "Záró Kérdések",
        icon: "fa-flag-checkered",
        sector: "closing",
        questions: [
            {
                id: "CLOSE.1",
                code: "CLOSE.1",
                text: "Hogyan látja szervezete/vállalata jövőjét az innovációs ökoszisztémában? Milyen stratégiai változásokat tervez a következő 3-5 évben?",
                type: "textarea",
                required: true
            },
            {
                id: "CLOSE.2",
                code: "CLOSE.2",
                text: "Mik a legfontosabb sikertényezők az innovációs ökoszisztémában?",
                type: "textarea",
                required: true
            },
            {
                id: "CLOSE.3",
                code: "CLOSE.3",
                text: "Milyen tanácsot adna más ökoszisztéma szereplőknek?",
                type: "textarea",
                required: false
            },
            {
                id: "CLOSE.4",
                code: "CLOSE.4",
                text: "Kiket vagy milyen szervezeteket ajánlana további interjúkhoz?",
                type: "textarea",
                required: false
            },
            {
                id: "CLOSE.5",
                code: "CLOSE.5",
                text: "Van-e valami fontos, amiről nem beszéltünk, de Ön fontosnak tartja?",
                type: "textarea",
                required: false
            }
        ]
    }
};

// Sector color mappings
const sectorColors = {
    intro: { bg: 'bg-gray-50', border: 'border-gray-400', text: 'text-gray-700' },
    university: { bg: 'bg-blue-50', border: 'border-blue-400', text: 'text-blue-700' },
    industry: { bg: 'bg-yellow-50', border: 'border-yellow-400', text: 'text-yellow-700' },
    government: { bg: 'bg-green-50', border: 'border-green-400', text: 'text-green-700' },
    society: { bg: 'bg-pink-50', border: 'border-pink-400', text: 'text-pink-700' },
    qh: { bg: 'bg-purple-50', border: 'border-purple-400', text: 'text-purple-700' },
    closing: { bg: 'bg-indigo-50', border: 'border-indigo-400', text: 'text-indigo-700' }
};
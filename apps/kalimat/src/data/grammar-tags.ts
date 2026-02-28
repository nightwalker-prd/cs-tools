export interface GrammarTag {
  color: string;
  verbose: string;
  friendly: string;
}

export const grammarTags: Record<string, GrammarTag> = {
  "MS|GEN|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – genitive masculine singular adjective",
    "friendly": ""
  },
  "M|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative masculine noun",
    "friendly": ""
  },
  "PRON|SUFF|3MS": {
    "color": "#8c7085",
    "verbose": "PRON – 3rd person masculine singular possessive pronoun",
    "friendly": ""
  },
  "P|PREF": {
    "color": "#ad2323",
    "verbose": "P – prefixed preposition",
    "friendly": ""
  },
  "M|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive masculine noun",
    "friendly": ""
  },
  "PN|GEN": {
    "color": "#257e9c",
    "verbose": "PN – genitive proper noun",
    "friendly": ""
  },
  "CONJ|PREF": {
    "color": "#1301b8",
    "verbose": "CONJ – prefixed conjunction",
    "friendly": ""
  },
  "MP|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive masculine plural noun",
    "friendly": ""
  },
  "ACT_PCPL|VF:1|M|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive masculine active participle",
    "friendly": ""
  },
  "PRON|2MS": {
    "color": "#5c7085",
    "verbose": "PRON – 2nd person masculine singular personal pronoun",
    "friendly": ""
  },
  "FUT|PREF": {
    "color": "#a8017b",
    "verbose": "FUT – prefixed future particle",
    "friendly": ""
  },
  "IMPF|VF:1|1P|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 1st person plural imperfect verb",
    "friendly": ""
  },
  "IMPF|VF:10|1P|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 1st person plural (form X) imperfect verb",
    "friendly": ""
  },
  "PRON|SUFF|3MP": {
    "color": "#5c7085",
    "verbose": "PRON – 3rd person masculine plural object pronoun",
    "friendly": ""
  },
  "IMPV|VF:1|2MS": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine singular imperative verb",
    "friendly": ""
  },
  "PERF|VF:4|1P": {
    "color": "#1b571a",
    "verbose": "V – 1st person plural (form IV) perfect verb",
    "friendly": ""
  },
  "PRON|SUFF|1P": {
    "color": "#1b559d",
    "verbose": "PRON – subject pronoun",
    "friendly": ""
  },
  "PRON|SUFF|2MS": {
    "color": "#5c7085",
    "verbose": "PRON – 2nd person masculine singular object pronoun",
    "friendly": ""
  },
  "M|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative masculine noun",
    "friendly": ""
  },
  "ACT_PCPL|VF:10|M|ACC|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – accusative masculine (form X) active participle",
    "friendly": ""
  },
  "REL|MP": {
    "color": "#817418",
    "verbose": "REL – masculine plural relative pronoun",
    "friendly": ""
  },
  "PERF|VF:4|2MS": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine singular (form IV) perfect verb",
    "friendly": ""
  },
  "P": {
    "color": "#ad2323",
    "verbose": "P – preposition",
    "friendly": ""
  },
  "IMPF|VF:1|3MP|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine plural imperfect verb",
    "friendly": ""
  },
  "PASS_PCPL|VF:1|M|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive masculine passive participle",
    "friendly": ""
  },
  "NEG": {
    "color": "#f4400b",
    "verbose": "NEG – negative particle",
    "friendly": ""
  },
  "ACT_PCPL|VF:1|MP|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive masculine plural active participle",
    "friendly": ""
  },
  "INL|": {
    "color": "#e37010",
    "verbose": "INL – Quranic initials",
    "friendly": ""
  },
  "DEM|MS": {
    "color": "#bf9f3e",
    "verbose": "DEM – masculine singular demonstrative pronoun",
    "friendly": ""
  },
  "F|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative feminine noun",
    "friendly": ""
  },
  "M|INDEF|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative masculine indefinite noun",
    "friendly": ""
  },
  "ACT_PCPL|VF:8|MP|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive masculine plural (form VIII) active participle",
    "friendly": ""
  },
  "IMPF|VF:4|3MP|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine plural (form IV) imperfect verb",
    "friendly": ""
  },
  "F|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative feminine noun",
    "friendly": ""
  },
  "REM|PREF": {
    "color": "#1301b8",
    "verbose": "REM – prefixed resumption particle",
    "friendly": ""
  },
  "IMPV|VF:2|2MS": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine singular (form II) imperative verb",
    "friendly": ""
  },
  "REL": {
    "color": "#817418",
    "verbose": "REL – relative pronoun",
    "friendly": ""
  },
  "PERF|VF:1|1P": {
    "color": "#1b571a",
    "verbose": "V – 1st person plural perfect verb",
    "friendly": ""
  },
  "PERF|VF:4|PASS|3MS": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine singular (form IV) passive perfect verb",
    "friendly": ""
  },
  "GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive noun",
    "friendly": ""
  },
  "FS|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive feminine singular noun",
    "friendly": ""
  },
  "PRON|3MP": {
    "color": "#5c7085",
    "verbose": "PRON – 3rd person masculine plural personal pronoun",
    "friendly": ""
  },
  "DEM|P": {
    "color": "#bf9f3e",
    "verbose": "DEM – plural demonstrative pronoun",
    "friendly": ""
  },
  "M|INDEF|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive masculine indefinite noun",
    "friendly": ""
  },
  "ACT_PCPL|VF:4|MP|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative masculine plural (form IV) active participle",
    "friendly": ""
  },
  "ACC": {
    "color": "#a8017b",
    "verbose": "ACC – accusative particle",
    "friendly": ""
  },
  "PERF|VF:1|3MP": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine plural perfect verb",
    "friendly": ""
  },
  "EQ|PREF": {
    "color": "#a8017b",
    "verbose": "EQ – prefixed equalization particle",
    "friendly": ""
  },
  "PERF|VF:10|2MS": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine singular (form X) perfect verb",
    "friendly": ""
  },
  "CONJ": {
    "color": "#1301b8",
    "verbose": "CONJ – coordinating conjunction",
    "friendly": ""
  },
  "IMPF|VF:4|2MS|MOOD:JUS": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine singular (form IV) imperfect verb, jussive mood",
    "friendly": ""
  },
  "PERF|VF:1|3MS": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine singular perfect verb",
    "friendly": ""
  },
  "PN|NOM": {
    "color": "#257e9c",
    "verbose": "PN – nominative proper noun",
    "friendly": ""
  },
  "FP|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive feminine plural noun",
    "friendly": ""
  },
  "F|INDEF|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative feminine indefinite noun",
    "friendly": ""
  },
  "MS|INDEF|NOM|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – nominative masculine singular indefinite adjective",
    "friendly": ""
  },
  "IMPF|VF:1|3MS|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine singular imperfect verb",
    "friendly": ""
  },
  "CIRC|PREF": {
    "color": "#1301b8",
    "verbose": "CIRC – prefixed circumstantial particle",
    "friendly": ""
  },
  "ACT_PCPL|VF:4|MP|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive masculine plural (form IV) active participle",
    "friendly": ""
  },
  "IMPF|VF:3|3MP|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine plural (form III) imperfect verb",
    "friendly": ""
  },
  "PN|ACC": {
    "color": "#257e9c",
    "verbose": "PN – accusative proper noun",
    "friendly": ""
  },
  "PERF|VF:4|3MP": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine plural (form IV) perfect verb",
    "friendly": ""
  },
  "RES": {
    "color": "#a8017b",
    "verbose": "CERT – particle of certainty",
    "friendly": ""
  },
  "FP|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative feminine plural noun",
    "friendly": ""
  },
  "M|INDEF|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative masculine indefinite noun",
    "friendly": ""
  },
  "T": {
    "color": "#e37010",
    "verbose": "T – time adverb",
    "friendly": ""
  },
  "PERF|VF:1|PASS|3MS": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine singular passive perfect verb",
    "friendly": ""
  },
  "PRO": {
    "color": "#f4400b",
    "verbose": "PRO – prohibition particle",
    "friendly": ""
  },
  "PRON|SUFF|2MP": {
    "color": "#8c7085",
    "verbose": "PRON – 2nd person masculine plural possessive pronoun",
    "friendly": ""
  },
  "F|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive feminine noun",
    "friendly": ""
  },
  "PREV": {
    "color": "#e37010",
    "verbose": "PREV – preventive particle",
    "friendly": ""
  },
  "PRON|1P": {
    "color": "#5c7085",
    "verbose": "PRON – 1st person plural personal pronoun",
    "friendly": ""
  },
  "ATT": {
    "color": "#a8017b",
    "verbose": "INC – inceptive particle",
    "friendly": ""
  },
  "INTG|PREF": {
    "color": "#fd5162",
    "verbose": "INTG – prefixed interrogative",
    "friendly": ""
  },
  "SUP|PREF": {
    "color": "#a8017b",
    "verbose": "SUP – prefixed supplemental particle",
    "friendly": ""
  },
  "AMD": {
    "color": "#a8017b",
    "verbose": "AMD – amendment particle",
    "friendly": ""
  },
  "IMPV|VF:4|2MP": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine plural (form IV) imperative verb",
    "friendly": ""
  },
  "SUB": {
    "color": "#817418",
    "verbose": "SUB – subordinating conjunction",
    "friendly": ""
  },
  "PERF|VF:4|3MS": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine singular (form IV) perfect verb",
    "friendly": ""
  },
  "MP|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative masculine plural noun",
    "friendly": ""
  },
  "PERF|VF:1|2MS": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine singular perfect verb",
    "friendly": ""
  },
  "IMPF|VF:4|1P|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 1st person plural (form IV) imperfect verb",
    "friendly": ""
  },
  "LOC|ACC": {
    "color": "#e37010",
    "verbose": "LOC – accusative location adverb",
    "friendly": ""
  },
  "IMPF|VF:10|3MS|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine singular (form X) imperfect verb",
    "friendly": ""
  },
  "VN|VF:1|M|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive masculine verbal noun",
    "friendly": ""
  },
  "PERF|VF:8|3MP": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine plural (form VIII) perfect verb",
    "friendly": ""
  },
  "PERF|VF:1|3FS": {
    "color": "#1b571a",
    "verbose": "V – 3rd person feminine singular perfect verb",
    "friendly": ""
  },
  "ACT_PCPL|VF:8|MP|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative masculine plural (form VIII) active participle",
    "friendly": ""
  },
  "REL|MS": {
    "color": "#817418",
    "verbose": "REL – masculine singular relative pronoun",
    "friendly": ""
  },
  "PERF|VF:10|3MS": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine singular (form X) perfect verb",
    "friendly": ""
  },
  "F|INDEF|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative feminine indefinite noun",
    "friendly": ""
  },
  "PERF|VF:4|3FS": {
    "color": "#1b571a",
    "verbose": "V – 3rd person feminine singular (form IV) perfect verb",
    "friendly": ""
  },
  "LOC|M|ACC": {
    "color": "#e37010",
    "verbose": "LOC – accusative masculine location adverb",
    "friendly": ""
  },
  "FP|INDEF|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive feminine plural indefinite noun",
    "friendly": ""
  },
  "P|INDEF|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative plural indefinite noun",
    "friendly": ""
  },
  "MP|INDEF|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative masculine plural indefinite noun",
    "friendly": ""
  },
  "ACT_PCPL|VF:10|MP|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative masculine plural (form X) active participle",
    "friendly": ""
  },
  "FP|INDEF|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative feminine plural indefinite noun",
    "friendly": ""
  },
  "MP|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative masculine plural noun",
    "friendly": ""
  },
  "IMPF|VF:4|2MP|MOOD:JUS": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine plural (form IV) imperfect verb, jussive mood",
    "friendly": ""
  },
  "PRON|SUFF|3FP": {
    "color": "#5c7085",
    "verbose": "PRON – 3rd person feminine plural object pronoun",
    "friendly": ""
  },
  "VN|VF:1|M|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative masculine verbal noun",
    "friendly": ""
  },
  "ACT_PCPL|VF:4|M|INDEF|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative masculine indefinite (form IV) active participle",
    "friendly": ""
  },
  "COND": {
    "color": "#e37010",
    "verbose": "COND – conditional particle",
    "friendly": ""
  },
  "EMPH|PREF": {
    "color": "#a8017b",
    "verbose": "EMPH – emphatic prefix",
    "friendly": ""
  },
  "IMPF|VF:1|PASS|3MS|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine singular passive imperfect verb",
    "friendly": ""
  },
  "EMPH|SUFF": {
    "color": "#a8017b",
    "verbose": "EMPH – emphatic suffix",
    "friendly": ""
  },
  "VOC|PREF": {
    "color": "#1d6914",
    "verbose": "VOC – prefixed vocative particle",
    "friendly": ""
  },
  "CAUS|PREF": {
    "color": "#a8017b",
    "verbose": "CAUS – prefixed particle of cause",
    "friendly": ""
  },
  "IMPV|VF:1|2MP": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine plural imperative verb",
    "friendly": ""
  },
  "IMPF|VF:8|2MP|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine plural (form VIII) imperfect verb",
    "friendly": ""
  },
  "PRON|2MP": {
    "color": "#5c7085",
    "verbose": "PRON – 2nd person masculine plural personal pronoun",
    "friendly": ""
  },
  "PRON|3MS": {
    "color": "#5c7085",
    "verbose": "PRON – 3rd person masculine singular personal pronoun",
    "friendly": ""
  },
  "IMPF|VF:1|2MP|MOOD:JUS": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine plural imperfect verb, jussive mood",
    "friendly": ""
  },
  "MP|INDEF|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative masculine plural indefinite noun",
    "friendly": ""
  },
  "IMPF|VF:1|2MP|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine plural imperfect verb",
    "friendly": ""
  },
  "PERF|VF:1|2MP": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine plural perfect verb",
    "friendly": ""
  },
  "PERF|VF:2|1P": {
    "color": "#1b571a",
    "verbose": "V – 1st person plural (form II) perfect verb",
    "friendly": ""
  },
  "RSLT|PREF": {
    "color": "#1301b8",
    "verbose": "RSLT – prefixed result particle",
    "friendly": ""
  },
  "F|INDEF|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive feminine indefinite noun",
    "friendly": ""
  },
  "ACT_PCPL|VF:1|MP|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative masculine plural active participle",
    "friendly": ""
  },
  "PRP|PREF": {
    "color": "#817418",
    "verbose": "PRP – prefixed particle of purpose",
    "friendly": ""
  },
  "IMPF|VF:1|2MP|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine plural imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "IMPV|VF:8|2MP": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine plural (form VIII) imperative verb",
    "friendly": ""
  },
  "REL|FS": {
    "color": "#817418",
    "verbose": "REL – feminine singular relative pronoun",
    "friendly": ""
  },
  "PRON|SUFF|3FS": {
    "color": "#8c7085",
    "verbose": "PRON – 3rd person feminine singular possessive pronoun",
    "friendly": ""
  },
  "PERF|VF:4|PASS|3FS": {
    "color": "#1b571a",
    "verbose": "V – 3rd person feminine singular (form IV) passive perfect verb",
    "friendly": ""
  },
  "ACT_PCPL|VF:1|FP|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative feminine plural active participle",
    "friendly": ""
  },
  "FP|INDEF|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative feminine plural indefinite noun",
    "friendly": ""
  },
  "IMPF|VF:1|3FS|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 3rd person feminine singular imperfect verb",
    "friendly": ""
  },
  "PERF|VF:1|PASS|3MP": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine plural passive perfect verb",
    "friendly": ""
  },
  "ATT|PREF": {
    "color": "#bf9f3e",
    "verbose": "DEM – masculine singular demonstrative pronoun",
    "friendly": ""
  },
  "PERF|VF:1|PASS|1P": {
    "color": "#1b571a",
    "verbose": "V – 1st person plural passive perfect verb",
    "friendly": ""
  },
  "ACT_PCPL|VF:6|M|INDEF|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative masculine indefinite (form VI) active participle",
    "friendly": ""
  },
  "PASS_PCPL|VF:2|FS|INDEF|NOM|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – nominative feminine singular indefinite (form II) passive participle",
    "friendly": ""
  },
  "ACT_PCPL|VF:1|MP|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative masculine plural active participle",
    "friendly": ""
  },
  "IMPF|VF:1|3MS|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine singular imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "SUP": {
    "color": "#a8017b",
    "verbose": "SUP – supplemental particle",
    "friendly": ""
  },
  "EXL": {
    "color": "#a8017b",
    "verbose": "EXL – explanation particle",
    "friendly": ""
  },
  "INTG": {
    "color": "#fd5162",
    "verbose": "INTG – interrogative noun",
    "friendly": ""
  },
  "IMPF|VF:4|3MS|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine singular (form IV) imperfect verb",
    "friendly": ""
  },
  "MS|INDEF|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative masculine singular indefinite noun",
    "friendly": ""
  },
  "IMPF|VF:1|PASS|3MS|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine singular passive imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "IMPF|VF:1|PASS|2MP|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine plural passive imperfect verb",
    "friendly": ""
  },
  "PERF|VF:8|3MS": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine singular (form VIII) perfect verb",
    "friendly": ""
  },
  "PERF|VF:2|3MS": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine singular (form II) perfect verb",
    "friendly": ""
  },
  "PERF|VF:1|3FP": {
    "color": "#1b571a",
    "verbose": "V – 3rd person feminine plural perfect verb",
    "friendly": ""
  },
  "MS|INDEF|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative masculine singular indefinite noun",
    "friendly": ""
  },
  "PRON|SUFF|1S": {
    "color": "#8c7085",
    "verbose": "PRON – 1st person singular possessive pronoun",
    "friendly": ""
  },
  "ACT_PCPL|VF:1|M|INDEF|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative masculine indefinite active participle",
    "friendly": ""
  },
  "IMPF|VF:1|2MS|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine singular imperfect verb",
    "friendly": ""
  },
  "IMPF|VF:2|1P|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 1st person plural (form II) imperfect verb",
    "friendly": ""
  },
  "IMPF|VF:1|1S|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 1st person singular imperfect verb",
    "friendly": ""
  },
  "PN|M|ACC": {
    "color": "#257e9c",
    "verbose": "PN – accusative masculine proper noun",
    "friendly": ""
  },
  "EXP": {
    "color": "#a8017b",
    "verbose": "EXP – exceptive particle",
    "friendly": ""
  },
  "PERF|VF:2|2MS": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine singular (form II) perfect verb",
    "friendly": ""
  },
  "MS|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative masculine singular noun",
    "friendly": ""
  },
  "MS|NOM|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – nominative masculine singular adjective",
    "friendly": ""
  },
  "PN|M|NOM": {
    "color": "#257e9c",
    "verbose": "PN – nominative masculine proper noun",
    "friendly": ""
  },
  "IMPV|VF:4|2MS": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine singular (form IV) imperative verb",
    "friendly": ""
  },
  "IMPF|VF:1|1S|MOOD:JUS": {
    "color": "#1b571a",
    "verbose": "V – 1st person singular imperfect verb, jussive mood",
    "friendly": ""
  },
  "IMPF|VF:4|2MP|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine plural (form IV) imperfect verb",
    "friendly": ""
  },
  "PN|M|GEN": {
    "color": "#257e9c",
    "verbose": "PN – genitive masculine proper noun",
    "friendly": ""
  },
  "PN|F|ACC": {
    "color": "#257e9c",
    "verbose": "PN – accusative feminine proper noun",
    "friendly": ""
  },
  "IMPV|VF:1|2D": {
    "color": "#1b571a",
    "verbose": "V – 2nd person dual imperative verb",
    "friendly": ""
  },
  "PRON|SUFF|2D": {
    "color": "#5c7085",
    "verbose": "PRON – subject pronoun",
    "friendly": ""
  },
  "IMPV|VF:1|2MD": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine dual imperative verb",
    "friendly": ""
  },
  "M|INDEF|ACC|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – accusative masculine indefinite adjective",
    "friendly": ""
  },
  "LOC": {
    "color": "#e37010",
    "verbose": "LOC – location adverb",
    "friendly": ""
  },
  "PERF|VF:1|2D": {
    "color": "#1b571a",
    "verbose": "V – 2nd person dual perfect verb",
    "friendly": ""
  },
  "IMPF|VF:1|2D|MOOD:JUS": {
    "color": "#1b571a",
    "verbose": "V – 2nd person dual imperfect verb, jussive mood",
    "friendly": ""
  },
  "DEM|FS": {
    "color": "#bf9f3e",
    "verbose": "DEM – feminine singular demonstrative pronoun",
    "friendly": ""
  },
  "IMPF|VF:1|2D|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 2nd person dual imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "PRON|SUFF|3D": {
    "color": "#8c7085",
    "verbose": "PRON – 3rd person dual possessive pronoun",
    "friendly": ""
  },
  "PERF|VF:1|3MD": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine dual perfect verb",
    "friendly": ""
  },
  "PRON|SUFF|3MD": {
    "color": "#5c7085",
    "verbose": "PRON – subject pronoun",
    "friendly": ""
  },
  "PERF|VF:4|3MD": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine dual (form IV) perfect verb",
    "friendly": ""
  },
  "PASS_PCPL|VF:10|M|INDEF|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative masculine indefinite (form X) passive participle",
    "friendly": ""
  },
  "PERF|VF:5|3MS": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine singular (form V) perfect verb",
    "friendly": ""
  },
  "ACT_PCPL|VF:1|MS|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative masculine singular active participle",
    "friendly": ""
  },
  "PERF|VF:2|3MP": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine plural (form II) perfect verb",
    "friendly": ""
  },
  "PERF|VF:4|1S": {
    "color": "#1b571a",
    "verbose": "V – 1st person singular (form IV) perfect verb",
    "friendly": ""
  },
  "IMPF|VF:4|1S|MOOD:JUS": {
    "color": "#1b571a",
    "verbose": "V – 1st person singular (form IV) imperfect verb, jussive mood",
    "friendly": ""
  },
  "PRON|1S": {
    "color": "#5c7085",
    "verbose": "PRON – 1st person singular personal pronoun",
    "friendly": ""
  },
  "ACT_PCPL|VF:2|M|INDEF|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative masculine indefinite (form II) active participle",
    "friendly": ""
  },
  "MS|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative masculine singular noun",
    "friendly": ""
  },
  "IMPF|VF:8|2MP|MOOD:JUS": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine plural (form VIII) imperfect verb, jussive mood",
    "friendly": ""
  },
  "MS|INDEF|ACC|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – accusative masculine singular indefinite adjective",
    "friendly": ""
  },
  "IMPV|VF:10|2MP": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine plural (form X) imperative verb",
    "friendly": ""
  },
  "FS|INDEF|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative feminine singular indefinite noun",
    "friendly": ""
  },
  "ACT_PCPL|VF:3|MP|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative masculine plural (form III) active participle",
    "friendly": ""
  },
  "PERF|VF:2|1S": {
    "color": "#1b571a",
    "verbose": "V – 1st person singular (form II) perfect verb",
    "friendly": ""
  },
  "FS|INDEF|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive feminine singular indefinite noun",
    "friendly": ""
  },
  "IMPF|VF:1|PASS|3MP|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine plural passive imperfect verb",
    "friendly": ""
  },
  "IMPF|VF:2|3MP|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine plural (form II) imperfect verb",
    "friendly": ""
  },
  "IMPF|VF:10|3MP|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine plural (form X) imperfect verb",
    "friendly": ""
  },
  "PERF|VF:3|1P": {
    "color": "#1b571a",
    "verbose": "V – 1st person plural (form III) perfect verb",
    "friendly": ""
  },
  "PERF|VF:8|2MP": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine plural (form VIII) perfect verb",
    "friendly": ""
  },
  "VN|VF:8|M|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive masculine (form VIII) verbal noun",
    "friendly": ""
  },
  "IMPF|VF:4|1P|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 1st person plural (form IV) imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "IMPF|VF:1|1P|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 1st person plural imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "FS|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative feminine singular noun",
    "friendly": ""
  },
  "ACT_PCPL|VF:1|MP|INDEF|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative masculine plural indefinite active participle",
    "friendly": ""
  },
  "IMPF|VF:1|1P|MOOD:JUS": {
    "color": "#1b571a",
    "verbose": "V – 1st person plural imperfect verb, jussive mood",
    "friendly": ""
  },
  "P|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative plural noun",
    "friendly": ""
  },
  "ACT_PCPL|VF:4|MP|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative masculine plural (form IV) active participle",
    "friendly": ""
  },
  "VN|VF:1|M|INDEF|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative masculine indefinite verbal noun",
    "friendly": ""
  },
  "PERF|VF:7|3FS": {
    "color": "#1b571a",
    "verbose": "V – 3rd person feminine singular (form VII) perfect verb",
    "friendly": ""
  },
  "FD|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative feminine dual noun",
    "friendly": ""
  },
  "CERT": {
    "color": "#a8017b",
    "verbose": "CERT – particle of certainty",
    "friendly": ""
  },
  "MP|INDEF|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive masculine plural indefinite noun",
    "friendly": ""
  },
  "MS|INDEF|GEN|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – genitive masculine singular indefinite adjective",
    "friendly": ""
  },
  "IMPF|VF:4|3MS|MOOD:JUS": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine singular (form IV) imperfect verb, jussive mood",
    "friendly": ""
  },
  "IMPF|VF:4|3FS|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 3rd person feminine singular (form IV) imperfect verb",
    "friendly": ""
  },
  "IMPF|VF:10|2MP|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine plural (form X) imperfect verb",
    "friendly": ""
  },
  "PERF|VF:1|PASS|3FS": {
    "color": "#1b571a",
    "verbose": "V – 3rd person feminine singular passive perfect verb",
    "friendly": ""
  },
  "IMPF|VF:8|3MP|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine plural (form VIII) imperfect verb",
    "friendly": ""
  },
  "PN|P|ACC": {
    "color": "#257e9c",
    "verbose": "PN – accusative plural proper noun",
    "friendly": ""
  },
  "PN|ACT_PCPL|VF:1|MP|ACC": {
    "color": "#257e9c",
    "verbose": "PN – accusative masculine plural active participle",
    "friendly": ""
  },
  "ACT_PCPL|VF:1|M|INDEF|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative masculine indefinite active participle",
    "friendly": ""
  },
  "PERF|VF:5|2MP": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine plural (form V) perfect verb",
    "friendly": ""
  },
  "ACT_PCPL|VF:1|MP|ACC|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – accusative masculine plural active participle",
    "friendly": ""
  },
  "FD|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive feminine dual noun",
    "friendly": ""
  },
  "IMPF|VF:8|2MS|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine singular (form VIII) imperfect verb",
    "friendly": ""
  },
  "IMPF|VF:1|1S|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 1st person singular imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "IMPF|VF:2|3MS|MOOD:JUS": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine singular (form II) imperfect verb, jussive mood",
    "friendly": ""
  },
  "PRON|3FS": {
    "color": "#5c7085",
    "verbose": "PRON – 3rd person feminine singular personal pronoun",
    "friendly": ""
  },
  "ACT_PCPL|VF:1|M|INDEF|NOM|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – nominative masculine indefinite active participle",
    "friendly": ""
  },
  "M|INDEF|NOM|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – nominative masculine indefinite adjective",
    "friendly": ""
  },
  "NOM|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – nominative adjective",
    "friendly": ""
  },
  "ACT_PCPL|VF:1|INDEF|NOM|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – nominative indefinite active participle",
    "friendly": ""
  },
  "PERF|VF:6|3MS": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine singular perfect verb",
    "friendly": ""
  },
  "ACT_PCPL|VF:8|MP|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative masculine plural (form VIII) active participle",
    "friendly": ""
  },
  "PASS_PCPL|VF:2|F|INDEF|NOM|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – nominative feminine indefinite (form II) passive participle",
    "friendly": ""
  },
  "T|ACC": {
    "color": "#e37010",
    "verbose": "T – accusative time adverb",
    "friendly": ""
  },
  "FS|INDEF|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative feminine singular indefinite noun",
    "friendly": ""
  },
  "PERF|VF:6|2MP": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine plural (form VI) perfect verb",
    "friendly": ""
  },
  "FP|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative feminine plural noun",
    "friendly": ""
  },
  "IMPF|VF:5|3MS|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine singular (form V) imperfect verb",
    "friendly": ""
  },
  "ACT_PCPL|VF:1|M|INDEF|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive masculine indefinite active participle",
    "friendly": ""
  },
  "IMPF|VF:4|3MP|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine plural (form IV) imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "IMPF|VF:2|2MP|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine plural (form II) imperfect verb",
    "friendly": ""
  },
  "IMPF|VF:4|PASS|3MP|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine plural (form IV) passive imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "IMPF|VF:3|3MP|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine plural (form III) imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "IMPF|VF:8|3MP|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine plural (form VIII) imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "IMPF|VF:1|3FS|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 3rd person feminine singular imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "PASS_PCPL|VF:1|FS|INDEF|ACC|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – accusative feminine singular indefinite passive participle",
    "friendly": ""
  },
  "IMPF|VF:4|3MS|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine singular (form IV) imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "ANS": {
    "color": "#a8017b",
    "verbose": "ANS – answer particle",
    "friendly": ""
  },
  "PN|F|GEN": {
    "color": "#257e9c",
    "verbose": "PN – genitive feminine proper noun",
    "friendly": ""
  },
  "MD|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive masculine dual noun",
    "friendly": ""
  },
  "VN|VF:4|M|INDEF|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative masculine indefinite (form IV) verbal noun",
    "friendly": ""
  },
  "MS|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive masculine singular noun",
    "friendly": ""
  },
  "P|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive plural noun",
    "friendly": ""
  },
  "PERF|VF:4|2MP": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine plural (form IV) perfect verb",
    "friendly": ""
  },
  "IMPF|VF:6|2MP|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine plural (form VI) imperfect verb",
    "friendly": ""
  },
  "IMPF|VF:3|2MP|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine plural (form III) imperfect verb",
    "friendly": ""
  },
  "PASS_PCPL|VF:2|M|INDEF|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative masculine indefinite (form II) passive participle",
    "friendly": ""
  },
  "VN|VF:4|M|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative masculine (form IV) verbal noun",
    "friendly": ""
  },
  "FS|GEN|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – genitive feminine singular adjective",
    "friendly": ""
  },
  "T|M|ACC": {
    "color": "#e37010",
    "verbose": "T – accusative masculine time adverb",
    "friendly": ""
  },
  "FS|ACC|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – accusative feminine singular adjective",
    "friendly": ""
  },
  "IMPF|VF:2|PASS|3MS|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine singular (form II) passive imperfect verb",
    "friendly": ""
  },
  "IMPV|PREF": {
    "color": "#a8017b",
    "verbose": "IMPV – prefixed imperative particle",
    "friendly": ""
  },
  "IMPF|VF:1|3FS|MOOD:JUS": {
    "color": "#1b571a",
    "verbose": "V – 3rd person feminine singular imperfect verb, jussive mood",
    "friendly": ""
  },
  "PERF|VF:10|2MP": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine plural (form X) perfect verb",
    "friendly": ""
  },
  "PERF|VF:2|2MP": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine plural (form II) perfect verb",
    "friendly": ""
  },
  "RET": {
    "color": "#a8017b",
    "verbose": "RET – retraction particle",
    "friendly": ""
  },
  "ACT_PCPL|VF:2|M|INDEF|NOM|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – nominative masculine indefinite (form II) active participle",
    "friendly": ""
  },
  "IMPF|VF:1|3MP|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine plural imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "IMPF|VF:2|3MS|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine singular (form II) imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "ACT_PCPL|VF:4|M|INDEF|NOM|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – nominative masculine indefinite (form IV) active participle",
    "friendly": ""
  },
  "PERF|VF:4|PASS|3MP": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine plural (form IV) passive perfect verb",
    "friendly": ""
  },
  "FS|NOM|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – nominative feminine singular adjective",
    "friendly": ""
  },
  "ACT_PCPL|VF:1|F|INDEF|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative feminine indefinite active participle",
    "friendly": ""
  },
  "IMPV|VF:5|2MP": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine plural (form V) imperative verb",
    "friendly": ""
  },
  "IMPF|VF:5|3MP|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine plural (form V) imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "PERF|VF:2|3FS": {
    "color": "#1b571a",
    "verbose": "V – 3rd person feminine singular (form II) perfect verb",
    "friendly": ""
  },
  "IMPF|VF:2|PASS|3MS|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine singular (form II) passive imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "FP|INDEF|ACC|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – accusative feminine plural indefinite adjective",
    "friendly": ""
  },
  "PERF|VF:3|3MP": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine plural (form III) perfect verb",
    "friendly": ""
  },
  "PN|MP|NOM": {
    "color": "#257e9c",
    "verbose": "PN – nominative masculine plural proper noun",
    "friendly": ""
  },
  "PN|MP|ACC": {
    "color": "#257e9c",
    "verbose": "PN – accusative masculine plural proper noun",
    "friendly": ""
  },
  "T|M|INDEF|ACC": {
    "color": "#e37010",
    "verbose": "T – accusative masculine indefinite time adverb",
    "friendly": ""
  },
  "IMPF|VF:2|3MD|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine dual (form II) imperfect verb",
    "friendly": ""
  },
  "IMPF|VF:1|3MD|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine dual imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "IMPF|VF:1|2MS|MOOD:JUS": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine singular imperfect verb, jussive mood",
    "friendly": ""
  },
  "IMPF|VF:5|3MP|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine plural (form V) imperfect verb",
    "friendly": ""
  },
  "VN|VF:1|F|INDEF|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative feminine indefinite verbal noun",
    "friendly": ""
  },
  "IMPV|VF:3|2MS": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine singular (form III) imperative verb",
    "friendly": ""
  },
  "MS|INDEF|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive masculine singular indefinite noun",
    "friendly": ""
  },
  "IMPF|VF:8|3MS|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine singular (form VIII) imperfect verb",
    "friendly": ""
  },
  "IMPF|VF:4|1P|MOOD:JUS": {
    "color": "#1b571a",
    "verbose": "V – 1st person plural (form IV) imperfect verb, jussive mood",
    "friendly": ""
  },
  "IMPF|VF:5|3MS|MOOD:JUS": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine singular (form V) imperfect verb, jussive mood",
    "friendly": ""
  },
  "VN|VF:4|M|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive masculine (form IV) verbal noun",
    "friendly": ""
  },
  "IMPF|VF:2|2MP|MOOD:JUS": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine plural (form II) imperfect verb, jussive mood",
    "friendly": ""
  },
  "PN|M|INDEF|ACC": {
    "color": "#257e9c",
    "verbose": "PN – accusative masculine indefinite proper noun",
    "friendly": ""
  },
  "PN|P|NOM": {
    "color": "#257e9c",
    "verbose": "PN – nominative plural proper noun",
    "friendly": ""
  },
  "EXH": {
    "color": "#a8017b",
    "verbose": "EXH – exhortation particle",
    "friendly": ""
  },
  "IMPF|VF:2|3MS|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine singular (form II) imperfect verb",
    "friendly": ""
  },
  "PERF|VF:6|3FS": {
    "color": "#1b571a",
    "verbose": "V – 3rd person feminine singular (form VI) perfect verb",
    "friendly": ""
  },
  "IMPF|VF:8|2MS|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine singular (form VIII) imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "PERF|VF:8|2MS": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine singular (form VIII) perfect verb",
    "friendly": ""
  },
  "IMPF|VF:1|3MS|MOOD:JUS": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine singular imperfect verb, jussive mood",
    "friendly": ""
  },
  "IMPF|VF:1|PASS|2MS|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine singular passive imperfect verb",
    "friendly": ""
  },
  "ACT_PCPL|VF:1|M|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative masculine active participle",
    "friendly": ""
  },
  "INT": {
    "color": "#817418",
    "verbose": "INT – particle of interpretation",
    "friendly": ""
  },
  "IMPV|VF:2|2MD": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine dual (form II) imperative verb",
    "friendly": ""
  },
  "MP|GEN|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – genitive masculine plural adjective",
    "friendly": ""
  },
  "ACT_PCPL|VF:1|M|INDEF|ACC|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – accusative masculine indefinite active participle",
    "friendly": ""
  },
  "IMPF|VF:2|1S|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 1st person singular (form II) imperfect verb",
    "friendly": ""
  },
  "IMPF|VF:8|1S|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 1st person singular (form VIII) imperfect verb",
    "friendly": ""
  },
  "IMPV|VF:5|2MS": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine singular (form V) imperative verb",
    "friendly": ""
  },
  "NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative noun",
    "friendly": ""
  },
  "ACT_PCPL|VF:4|MD|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative masculine dual (form IV) active participle",
    "friendly": ""
  },
  "ACT_PCPL|VF:4|F|INDEF|ACC|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – accusative feminine indefinite (form IV) active participle",
    "friendly": ""
  },
  "PERF|VF:8|1P": {
    "color": "#1b571a",
    "verbose": "V – 1st person plural (form VIII) perfect verb",
    "friendly": ""
  },
  "FS|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative feminine singular noun",
    "friendly": ""
  },
  "PERF|VF:5|3MP": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine plural (form V) perfect verb",
    "friendly": ""
  },
  "VN|VF:3|M|INDEF|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive masculine indefinite (form III) verbal noun",
    "friendly": ""
  },
  "ACT_PCPL|VF:10|M|INDEF|GEN|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – genitive masculine indefinite (form X) active participle",
    "friendly": ""
  },
  "INDEF|ACC|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – accusative indefinite adjective",
    "friendly": ""
  },
  "IMPF|VF:7|3MS|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine singular (form VII) imperfect verb",
    "friendly": ""
  },
  "VN|VF:4|M|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative masculine (form IV) verbal noun",
    "friendly": ""
  },
  "VN|VF:5|M|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative masculine (form V) verbal noun",
    "friendly": ""
  },
  "M|GEN|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – genitive masculine adjective",
    "friendly": ""
  },
  "IMPV|VF:2|2MP": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine plural (form II) imperative verb",
    "friendly": ""
  },
  "ACT_PCPL|VF:2|M|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative masculine (form II) active participle",
    "friendly": ""
  },
  "LOC|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive noun",
    "friendly": ""
  },
  "IMPF|VF:4|1S|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 1st person singular (form IV) imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "ACT_PCPL|VF:4|F|INDEF|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative feminine indefinite (form IV) active participle",
    "friendly": ""
  },
  "PRON|3D": {
    "color": "#5c7085",
    "verbose": "PRON – 3rd person dual personal pronoun",
    "friendly": ""
  },
  "IMPF|VF:4|PASS|3MP|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine plural (form IV) passive imperfect verb",
    "friendly": ""
  },
  "VN|VF:2|M|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive masculine (form II) verbal noun",
    "friendly": ""
  },
  "PASS_PCPL|VF:2|M|GEN|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – genitive masculine (form II) passive participle",
    "friendly": ""
  },
  "PERF|VF:8|PASS|3MP": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine plural (form VIII) passive perfect verb",
    "friendly": ""
  },
  "PERF|VF:5|3FS": {
    "color": "#1b571a",
    "verbose": "V – 3rd person feminine singular (form V) perfect verb",
    "friendly": ""
  },
  "IMPF|VF:5|1P|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 1st person plural (form V) imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "IMPF|VF:8|1P|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 1st person plural (form VIII) imperfect verb",
    "friendly": ""
  },
  "VN|VF:3|M|INDEF|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative masculine indefinite (form III) verbal noun",
    "friendly": ""
  },
  "IMPF|VF:5|3MS|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine singular (form V) imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "PERF|VF:8|PASS|3MS": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine singular (form VIII) passive perfect verb",
    "friendly": ""
  },
  "IMPF|VF:2|2MP|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine plural (form II) imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "VN|VF:8|M|INDEF|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative masculine indefinite (form VIII) verbal noun",
    "friendly": ""
  },
  "VN|VF:1|M|INDEF|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative masculine indefinite verbal noun",
    "friendly": ""
  },
  "VN|VF:4|M|INDEF|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive masculine indefinite (form IV) verbal noun",
    "friendly": ""
  },
  "VN|VF:2|M|INDEF|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative masculine indefinite (form II) verbal noun",
    "friendly": ""
  },
  "ACT_PCPL|VF:4|M|INDEF|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive masculine indefinite (form IV) active participle",
    "friendly": ""
  },
  "T|MP|INDEF|ACC": {
    "color": "#e37010",
    "verbose": "T – accusative masculine plural indefinite time adverb",
    "friendly": ""
  },
  "PASS_PCPL|VF:1|FP|INDEF|ACC|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – accusative feminine plural indefinite passive participle",
    "friendly": ""
  },
  "FP|GEN|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – genitive feminine plural adjective",
    "friendly": ""
  },
  "IMPF|VF:1|3MP|MOOD:JUS": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine plural imperfect verb, jussive mood",
    "friendly": ""
  },
  "IMPF|VF:4|1S|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 1st person singular (form IV) imperfect verb",
    "friendly": ""
  },
  "IMPF|VF:4|2MP|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine plural (form IV) imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "IMPF|VF:10|3MP|MOOD:JUS": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine plural (form X) imperfect verb, jussive mood",
    "friendly": ""
  },
  "IMPF|VF:4|3MP|MOOD:JUS": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine plural (form IV) imperfect verb, jussive mood",
    "friendly": ""
  },
  "T|F|ACC": {
    "color": "#e37010",
    "verbose": "T – accusative feminine time adverb",
    "friendly": ""
  },
  "PRON|3FP": {
    "color": "#5c7085",
    "verbose": "PRON – 3rd person feminine plural personal pronoun",
    "friendly": ""
  },
  "IMPV|VF:3|2MP": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine plural (form III) imperative verb",
    "friendly": ""
  },
  "IMPF|VF:3|2MP|MOOD:JUS": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine plural (form III) imperfect verb, jussive mood",
    "friendly": ""
  },
  "M|NOM|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – nominative masculine adjective",
    "friendly": ""
  },
  "PERF|VF:4|PASS|2MP": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine plural (form IV) passive perfect verb",
    "friendly": ""
  },
  "ACT_PCPL|VF:1|F|INDEF|NOM|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – nominative feminine indefinite active participle",
    "friendly": ""
  },
  "FP|INDEF|NOM|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – nominative feminine plural indefinite adjective",
    "friendly": ""
  },
  "IMPF|VF:8|2MP|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine plural (form VIII) imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "VN|VF:3|M|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive masculine (form III) verbal noun",
    "friendly": ""
  },
  "PASS_PCPL|VF:1|FP|INDEF|GEN|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – genitive feminine plural indefinite passive participle",
    "friendly": ""
  },
  "VN|VF:1|M|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative masculine verbal noun",
    "friendly": ""
  },
  "IMPV|VF:8|2MS": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine singular (form VIII) imperative verb",
    "friendly": ""
  },
  "VN|VF:1|FS|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive feminine singular verbal noun",
    "friendly": ""
  },
  "VN|VF:8|M|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative masculine (form VIII) verbal noun",
    "friendly": ""
  },
  "IMPF|VF:1|PASS|3FS|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 3rd person feminine singular passive imperfect verb",
    "friendly": ""
  },
  "INTG|ACC": {
    "color": "#fd5162",
    "verbose": "INTG – interrogative noun",
    "friendly": ""
  },
  "FS|INDEF|GEN|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – genitive feminine singular indefinite adjective",
    "friendly": ""
  },
  "PERF|VF:2|PASS|3MS": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine singular (form II) passive perfect verb",
    "friendly": ""
  },
  "F|INDEF|ACC|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – accusative feminine indefinite adjective",
    "friendly": ""
  },
  "ACT_PCPL|VF:2|MP|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative masculine plural (form II) active participle",
    "friendly": ""
  },
  "PERF|VF:10|3MP": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine plural (form X) perfect verb",
    "friendly": ""
  },
  "IMPF|VF:8|3MS|MOOD:JUS": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine singular (form VIII) imperfect verb, jussive mood",
    "friendly": ""
  },
  "IMPF|VF:5|2MP|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine plural (form V) imperfect verb",
    "friendly": ""
  },
  "VN|VF:4|M|INDEF|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative masculine indefinite (form IV) verbal noun",
    "friendly": ""
  },
  "ACT_PCPL|VF:4|M|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative masculine (form IV) active participle",
    "friendly": ""
  },
  "ACT_PCPL|VF:4|M|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive masculine (form IV) active participle",
    "friendly": ""
  },
  "ACT_PCPL|VF:4|FP|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative feminine plural (form IV) active participle",
    "friendly": ""
  },
  "IMPF|VF:4|3FP|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 3rd person feminine plural imperfect verb",
    "friendly": ""
  },
  "ACT_PCPL|VF:4|F|INDEF|NOM|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – nominative feminine indefinite (form IV) active participle",
    "friendly": ""
  },
  "ACT_PCPL|VF:4|F|INDEF|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive feminine indefinite (form IV) active participle",
    "friendly": ""
  },
  "IMPF|VF:1|3FP|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 3rd person feminine plural imperfect verb",
    "friendly": ""
  },
  "PERF|VF:5|3FP": {
    "color": "#1b571a",
    "verbose": "V – 3rd person feminine plural (form V) perfect verb",
    "friendly": ""
  },
  "ACT_PCPL|VF:5|MP|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative masculine plural (form V) active participle",
    "friendly": ""
  },
  "IMPF|VF:3|3MS|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine singular (form III) imperfect verb",
    "friendly": ""
  },
  "VN|VF:5|M|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative masculine (form V) verbal noun",
    "friendly": ""
  },
  "PASS_PCPL|VF:2|FP|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative feminine plural (form II) passive participle",
    "friendly": ""
  },
  "IMPF|VF:5|3FP|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 3rd person feminine plural (form V) imperfect verb",
    "friendly": ""
  },
  "PASS_PCPL|VF:1|M|INDEF|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive masculine indefinite passive participle",
    "friendly": ""
  },
  "IMPF|VF:4|3MD|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine dual (form IV) imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "PERF|VF:8|3FS": {
    "color": "#1b571a",
    "verbose": "V – 3rd person feminine singular (form VIII) perfect verb",
    "friendly": ""
  },
  "IMPF|VF:6|3MD|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine dual (form VI) imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "PERF|VF:6|3MP": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine plural (form VI) perfect verb",
    "friendly": ""
  },
  "ACT_PCPL|VF:1|FP|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative feminine plural active participle",
    "friendly": ""
  },
  "T|MD|ACC": {
    "color": "#e37010",
    "verbose": "T – accusative masculine dual time adverb",
    "friendly": ""
  },
  "ACT_PCPL|VF:1|MD|ACC|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – accusative masculine dual active participle",
    "friendly": ""
  },
  "IMPF|VF:2|PASS|3FS|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 3rd person feminine singular (form II) passive imperfect verb",
    "friendly": ""
  },
  "IMPF|VF:3|PASS|3FS|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 3rd person feminine singular (form III) passive imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "ACT_PCPL|VF:1|F|INDEF|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative feminine indefinite active participle",
    "friendly": ""
  },
  "PASS_PCPL|VF:1|M|INDEF|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative masculine indefinite passive participle",
    "friendly": ""
  },
  "ACT_PCPL|VF:1|MS|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive masculine singular active participle",
    "friendly": ""
  },
  "VN|VF:6|M|INDEF|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive masculine indefinite (form VI) verbal noun",
    "friendly": ""
  },
  "IMPF|VF:10|2MP|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine plural (form X) imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "IMPF|VF:5|PASS|3MP|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine plural (form V) passive imperfect verb",
    "friendly": ""
  },
  "PASS_PCPL|VF:1|M|INDEF|ACC|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – accusative masculine indefinite passive participle",
    "friendly": ""
  },
  "F|GEN|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – genitive feminine adjective",
    "friendly": ""
  },
  "PASS_PCPL|VF:2|FP|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive feminine plural (form II) passive participle",
    "friendly": ""
  },
  "IMPF|VF:3|3MS|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine singular (form III) imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "FS|INDEF|ACC|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – accusative feminine singular indefinite adjective",
    "friendly": ""
  },
  "IMPF|VF:3|1P|MOOD:JUS": {
    "color": "#1b571a",
    "verbose": "V – 1st person plural (form III) imperfect verb, jussive mood",
    "friendly": ""
  },
  "IMPF|VF:3|2MP|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine plural (form III) imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "IMPF|VF:3|1P|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 1st person plural (form III) imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "PERF|VF:4|PASS|1P": {
    "color": "#1b571a",
    "verbose": "V – 1st person plural (form IV) passive perfect verb",
    "friendly": ""
  },
  "IMPF|VF:4|PASS|3MS|MOOD:JUS": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine singular (form IV) passive imperfect verb, jussive mood",
    "friendly": ""
  },
  "ACT_PCPL|VF:8|MS|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative masculine singular (form VIII) active participle",
    "friendly": ""
  },
  "PERF|VF:3|3MS": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine singular (form III) perfect verb",
    "friendly": ""
  },
  "F|INDEF|GEN|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – genitive feminine indefinite adjective",
    "friendly": ""
  },
  "ACT_PCPL|VF:1|MP|GEN|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – genitive masculine plural active participle",
    "friendly": ""
  },
  "PASS_PCPL|VF:4|MP|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive masculine plural (form IV) passive participle",
    "friendly": ""
  },
  "VN|VF:7|M|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative masculine (form VII) verbal noun",
    "friendly": ""
  },
  "PERF|VF:1|1S": {
    "color": "#1b571a",
    "verbose": "V – 1st person singular perfect verb",
    "friendly": ""
  },
  "": {
    "color": "#fd5162",
    "verbose": "INTG – interrogative noun",
    "friendly": ""
  },
  "IMPF|VF:4|2MS|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine singular (form IV) imperfect verb",
    "friendly": ""
  },
  "P|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative plural noun",
    "friendly": ""
  },
  "PASS_PCPL|VF:1|M|INDEF|NOM|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – nominative masculine indefinite passive participle",
    "friendly": ""
  },
  "VN|VF:3|M|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative masculine (form III) verbal noun",
    "friendly": ""
  },
  "VN|VF:2|M|INDEF|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative masculine indefinite (form II) verbal noun",
    "friendly": ""
  },
  "MD|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative masculine dual noun",
    "friendly": ""
  },
  "MP|NOM|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – nominative masculine plural adjective",
    "friendly": ""
  },
  "IMPF|VF:5|2MP|MOOD:JUS": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine plural (form V) imperfect verb, jussive mood",
    "friendly": ""
  },
  "IMPF|VF:2|PASS|3MS|MOOD:JUS": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine singular (form II) passive imperfect verb, jussive mood",
    "friendly": ""
  },
  "IMPF|VF:1|PASS|2MP|MOOD:JUS": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine plural passive imperfect verb, jussive mood",
    "friendly": ""
  },
  "VN|VF:5|M|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive masculine (form V) verbal noun",
    "friendly": ""
  },
  "IMPF|VF:5|2MP|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine plural (form V) imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "IMPF|VF:1|PASS|3MP|MOOD:JUS": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine plural passive imperfect verb, jussive mood",
    "friendly": ""
  },
  "PASS_PCPL|VF:2|M|INDEF|GEN|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – genitive masculine indefinite (form II) passive participle",
    "friendly": ""
  },
  "IMPF|VF:1|3MD|MOOD:JUS": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine dual imperfect verb, jussive mood",
    "friendly": ""
  },
  "ACT_PCPL|VF:1|F|INDEF|ACC|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – accusative feminine indefinite active participle",
    "friendly": ""
  },
  "IMPF|VF:2|3FS|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 3rd person feminine singular (form II) imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "IMPF|VF:3|PASS|3MS|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine singular (form III) passive imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "PASS_PCPL|VF:1|F|INDEF|NOM|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – nominative feminine indefinite passive participle",
    "friendly": ""
  },
  "ACT_PCPL|VF:1|MS|INDEF|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative masculine singular indefinite active participle",
    "friendly": ""
  },
  "IMPF|VF:3|3MS|MOOD:JUS": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine singular (form III) imperfect verb, jussive mood",
    "friendly": ""
  },
  "IMPF|VF:3|2MS|MOOD:JUS": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine singular (form III) imperfect verb, jussive mood",
    "friendly": ""
  },
  "IMPF|VF:2|2MS|MOOD:JUS": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine singular (form II) imperfect verb, jussive mood",
    "friendly": ""
  },
  "VN|VF:8|M|INDEF|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive masculine indefinite (form VIII) verbal noun",
    "friendly": ""
  },
  "PASS_PCPL|VF:4|FP|INDEF|NOM|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – nominative feminine plural indefinite (form IV) passive participle",
    "friendly": ""
  },
  "ACT_PCPL|VF:6|MP|INDEF|NOM|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – nominative masculine plural indefinite (form VI) active participle",
    "friendly": ""
  },
  "IMPF|VF:4|3FS|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 3rd person feminine singular (form IV) imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "PERF|VF:1|PASS|3FD": {
    "color": "#1b571a",
    "verbose": "V – 3rd person feminine dual passive perfect verb",
    "friendly": ""
  },
  "PRON|SUFF|3FD": {
    "color": "#5c7085",
    "verbose": "PRON – subject pronoun",
    "friendly": ""
  },
  "IMPF|VF:3|3FS|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 3rd person feminine singular (form III) imperfect verb",
    "friendly": ""
  },
  "VN|VF:2|M|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative masculine (form II) verbal noun",
    "friendly": ""
  },
  "PERF|VF:8|3FD": {
    "color": "#1b571a",
    "verbose": "V – 3rd person feminine dual (form VIII) perfect verb",
    "friendly": ""
  },
  "PASS_PCPL|VF:2|F|GEN|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – genitive feminine (form II) passive participle",
    "friendly": ""
  },
  "ACT_PCPL|VF:10|MP|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative masculine plural (form X) active participle",
    "friendly": ""
  },
  "PN|VN|VF:4|M|NOM": {
    "color": "#257e9c",
    "verbose": "PN – nominative masculine (form IV) verbal noun",
    "friendly": ""
  },
  "T|FP|INDEF|ACC": {
    "color": "#e37010",
    "verbose": "T – accusative feminine plural indefinite time adverb",
    "friendly": ""
  },
  "PERF|VF:2|PASS|3FS": {
    "color": "#1b571a",
    "verbose": "V – 3rd person feminine singular (form II) passive perfect verb",
    "friendly": ""
  },
  "VOC|SUFF": {
    "color": "#1d6914",
    "verbose": "VOC – vocative suffix",
    "friendly": ""
  },
  "ACT_PCPL|VF:1|M|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative masculine active participle",
    "friendly": ""
  },
  "VN|VF:1|FS|INDEF|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative feminine singular indefinite verbal noun",
    "friendly": ""
  },
  "PASS_PCPL|VF:4|M|INDEF|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative masculine indefinite (form IV) passive participle",
    "friendly": ""
  },
  "PASS_PCPL|VF:2|M|INDEF|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative masculine indefinite (form II) passive participle",
    "friendly": ""
  },
  "PN|F|NOM": {
    "color": "#257e9c",
    "verbose": "PN – nominative feminine proper noun",
    "friendly": ""
  },
  "PRON|2FS": {
    "color": "#5c7085",
    "verbose": "PRON – 2nd person feminine singular personal pronoun",
    "friendly": ""
  },
  "PERF|VF:3|3FS": {
    "color": "#1b571a",
    "verbose": "V – 3rd person feminine singular (form III) perfect verb",
    "friendly": ""
  },
  "IMPF|VF:2|2MS|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine singular (form II) imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "IMPV|VF:1|2FS": {
    "color": "#1b571a",
    "verbose": "V – 2nd person feminine singular imperative verb",
    "friendly": ""
  },
  "PRON|SUFF|2FS": {
    "color": "#5c7085",
    "verbose": "PRON – subject pronoun",
    "friendly": ""
  },
  "INTG|NOM": {
    "color": "#fd5162",
    "verbose": "INTG – nominative interrogative noun",
    "friendly": ""
  },
  "PASS_PCPL|VF:2|MP|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive masculine plural (form II) passive participle",
    "friendly": ""
  },
  "ACT_PCPL|VF:10|M|INDEF|NOM|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – nominative masculine indefinite (form X) active participle",
    "friendly": ""
  },
  "ACT_PCPL|VF:5|M|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative masculine (form V) active participle",
    "friendly": ""
  },
  "IMPF|VF:8|1P|MOOD:JUS": {
    "color": "#1b571a",
    "verbose": "V – 1st person plural (form VIII) imperfect verb, jussive mood",
    "friendly": ""
  },
  "M|INDEF|GEN|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – genitive masculine indefinite adjective",
    "friendly": ""
  },
  "IMPF|VF:8|3MS|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine singular (form VIII) imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "PERF|VF:3|2MP": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine plural (form III) perfect verb",
    "friendly": ""
  },
  "PN|MS|INDEF|ACC": {
    "color": "#257e9c",
    "verbose": "PN – accusative masculine singular indefinite proper noun",
    "friendly": ""
  },
  "PN|INDEF|ACC": {
    "color": "#257e9c",
    "verbose": "PN – accusative indefinite proper noun",
    "friendly": ""
  },
  "ACT_PCPL|VF:4|MS|INDEF|ACC|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – accusative masculine singular indefinite (form IV) active participle",
    "friendly": ""
  },
  "T|MS|ACC": {
    "color": "#e37010",
    "verbose": "T – accusative masculine singular time adverb",
    "friendly": ""
  },
  "IMPF|VF:4|PASS|3MS|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine singular (form IV) passive imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "PN|VN|VF:4|M|GEN": {
    "color": "#257e9c",
    "verbose": "PN – genitive masculine (form IV) verbal noun",
    "friendly": ""
  },
  "IMPF|VF:1|PASS|3FS|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 3rd person feminine singular passive imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "IMPF|VF:2|PASS|3FS|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 3rd person feminine singular (form II) passive imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "PASS_PCPL|VF:3|M|INDEF|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative masculine indefinite (form III) passive participle",
    "friendly": ""
  },
  "PASS_PCPL|VF:4|M|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive masculine (form IV) passive participle",
    "friendly": ""
  },
  "IMPF|VF:9|3FS|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 3rd person feminine singular (form IX) imperfect verb",
    "friendly": ""
  },
  "PERF|VF:9|3FS": {
    "color": "#1b571a",
    "verbose": "V – 3rd person feminine singular (form IX) perfect verb",
    "friendly": ""
  },
  "IMPF|VF:3|3MP|MOOD:JUS": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine plural (form III) imperfect verb, jussive mood",
    "friendly": ""
  },
  "IMPF|VF:2|3MP|MOOD:JUS": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine plural (form II) imperfect verb, jussive mood",
    "friendly": ""
  },
  "T|MP|ACC": {
    "color": "#e37010",
    "verbose": "T – accusative masculine plural time adverb",
    "friendly": ""
  },
  "IMPF|VF:1|PASS|3MP|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine plural passive imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "IMPF|VF:2|2MS|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine singular (form II) imperfect verb",
    "friendly": ""
  },
  "P|INDEF|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive plural indefinite noun",
    "friendly": ""
  },
  "PASS_PCPL|VF:4|MP|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative masculine plural (form IV) passive participle",
    "friendly": ""
  },
  "IMPF|VF:7|3MP|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine plural (form VII) imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "ACT_PCPL|VF:2|MP|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive masculine plural (form II) active participle",
    "friendly": ""
  },
  "IMPF|VF:3|1P|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 1st person plural (form III) imperfect verb",
    "friendly": ""
  },
  "COM|PREF": {
    "color": "#1301b8",
    "verbose": "COM – prefixed comitative particle",
    "friendly": ""
  },
  "PERF|VF:7|2MP": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine plural (form VII) perfect verb",
    "friendly": ""
  },
  "IMPF|VF:7|3MS|MOOD:JUS": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine singular (form VII) imperfect verb, jussive mood",
    "friendly": ""
  },
  "PASS_PCPL|VF:2|M|INDEF|ACC|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – accusative masculine indefinite (form II) passive participle",
    "friendly": ""
  },
  "IMPF|VF:7|2MP|MOOD:JUS": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine plural (form VII) imperfect verb, jussive mood",
    "friendly": ""
  },
  "INC": {
    "color": "#a8017b",
    "verbose": "INC – inceptive particle",
    "friendly": ""
  },
  "INDEF|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative indefinite noun",
    "friendly": ""
  },
  "DEM": {
    "color": "#bf9f3e",
    "verbose": "DEM – demonstrative pronoun",
    "friendly": ""
  },
  "MD|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative masculine dual noun",
    "friendly": ""
  },
  "P|INDEF|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative plural indefinite noun",
    "friendly": ""
  },
  "PERF|VF:1|PASS|2MP": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine plural passive perfect verb",
    "friendly": ""
  },
  "PERF|VF:1|PASS|2MS": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine singular passive perfect verb",
    "friendly": ""
  },
  "PERF|VF:7|3MP": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine plural (form VII) perfect verb",
    "friendly": ""
  },
  "IMPV|VF:10|2MS": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine singular (form X) imperative verb",
    "friendly": ""
  },
  "ACT_PCPL|VF:4|M|INDEF|GEN|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – genitive masculine indefinite (form IV) active participle",
    "friendly": ""
  },
  "IMPF|VF:2|PASS|3MP|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine plural (form II) passive imperfect verb",
    "friendly": ""
  },
  "ACT_PCPL|VF:4|M|GEN|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – genitive masculine (form IV) active participle",
    "friendly": ""
  },
  "IMPF|VF:2|PASS|2MP|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine plural (form II) passive imperfect verb",
    "friendly": ""
  },
  "ACT_PCPL|VF:1|F|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative feminine active participle",
    "friendly": ""
  },
  "IMPF|VF:4|PASS|2MP|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine plural (form IV) passive imperfect verb",
    "friendly": ""
  },
  "VN|VF:1|INDEF|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative indefinite verbal noun",
    "friendly": ""
  },
  "ACT_PCPL|VF:3|M|INDEF|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative masculine indefinite (form III) active participle",
    "friendly": ""
  },
  "IMPF|VF:10|3MS|MOOD:JUS": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine singular (form X) imperfect verb, jussive mood",
    "friendly": ""
  },
  "VN|VF:3|INDEF|ACC|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – accusative indefinite (form III) verbal noun",
    "friendly": ""
  },
  "IMPF|VF:8|3MP|MOOD:JUS": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine plural (form VIII) imperfect verb, jussive mood",
    "friendly": ""
  },
  "IMPF|VF:4|PASS|3MS|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine singular (form IV) passive imperfect verb",
    "friendly": ""
  },
  "ACT_PCPL|VF:3|M|INDEF|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive masculine indefinite (form III) active participle",
    "friendly": ""
  },
  "REL|FP": {
    "color": "#817418",
    "verbose": "REL – feminine plural relative pronoun",
    "friendly": ""
  },
  "REL|MD": {
    "color": "#817418",
    "verbose": "REL – masculine dual relative pronoun",
    "friendly": ""
  },
  "IMPF|VF:1|3MD|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine dual imperfect verb",
    "friendly": ""
  },
  "ACT_PCPL|VF:1|MS|INDEF|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative masculine singular indefinite active participle",
    "friendly": ""
  },
  "ACT_PCPL|VF:2|F|INDEF|GEN|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – genitive feminine indefinite (form II) active participle",
    "friendly": ""
  },
  "VN|VF:10|M|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative masculine (form X) verbal noun",
    "friendly": ""
  },
  "ACT_PCPL|VF:4|M|INDEF|ACC|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – accusative masculine indefinite (form IV) active participle",
    "friendly": ""
  },
  "PERF|VF:4|3FP": {
    "color": "#1b571a",
    "verbose": "V – 3rd person feminine plural (form IV) perfect verb",
    "friendly": ""
  },
  "PASS_PCPL|VF:4|FP|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative feminine plural (form IV) passive participle",
    "friendly": ""
  },
  "ACT_PCPL|VF:3|MP|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive masculine plural (form III) active participle",
    "friendly": ""
  },
  "PASS_PCPL|VF:4|FP|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative feminine plural (form IV) passive participle",
    "friendly": ""
  },
  "ACT_PCPL|VF:4|FP|ACC|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – accusative feminine plural (form IV) active participle",
    "friendly": ""
  },
  "ACT_PCPL|VF:4|FP|GEN|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – genitive feminine plural (form IV) active participle",
    "friendly": ""
  },
  "PASS_PCPL|VF:4|FP|INDEF|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative feminine plural indefinite (form IV) passive participle",
    "friendly": ""
  },
  "ACT_PCPL|VF:8|FP|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative feminine plural (form VIII) active participle",
    "friendly": ""
  },
  "ACT_PCPL|VF:3|FP|INDEF|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive feminine plural indefinite (form III) active participle",
    "friendly": ""
  },
  "PERF|VF:4|PASS|3FP": {
    "color": "#1b571a",
    "verbose": "V – 3rd person feminine plural (form IV) passive perfect verb",
    "friendly": ""
  },
  "PASS_PCPL|VF:4|FP|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive feminine plural (form IV) passive participle",
    "friendly": ""
  },
  "FUT": {
    "color": "#a8017b",
    "verbose": "FUT – future particle",
    "friendly": ""
  },
  "IMPF|VF:2|1P|MOOD:JUS": {
    "color": "#1b571a",
    "verbose": "V – 1st person plural (form II) imperfect verb, jussive mood",
    "friendly": ""
  },
  "PERF|VF:8|3FP": {
    "color": "#1b571a",
    "verbose": "V – 3rd person feminine plural (form VIII) perfect verb",
    "friendly": ""
  },
  "ACT_PCPL|VF:1|FP|INDEF|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative feminine plural indefinite active participle",
    "friendly": ""
  },
  "IMPF|VF:4|3MD|MOOD:JUS": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine dual (form IV) imperfect verb, jussive mood",
    "friendly": ""
  },
  "PASS_PCPL|VF:4|M|INDEF|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive masculine indefinite (form IV) passive participle",
    "friendly": ""
  },
  "PASS_PCPL|VF:1|M|INDEF|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative masculine indefinite passive participle",
    "friendly": ""
  },
  "IMPF|VF:1|2MS|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine singular imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "IMPF|VF:6|3MP|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine plural (form VI) imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "ACT_PCPL|VF:3|MP|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative masculine plural (form III) active participle",
    "friendly": ""
  },
  "IMPF|VF:2|3MP|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine plural (form II) imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "ACT_PCPL|VF:10|M|INDEF|ACC|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – accusative masculine indefinite (form X) active participle",
    "friendly": ""
  },
  "IMPF|VF:1|PASS|3MS|MOOD:JUS": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine singular passive imperfect verb, jussive mood",
    "friendly": ""
  },
  "PASS_PCPL|VF:10|MP|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive masculine plural (form X) passive participle",
    "friendly": ""
  },
  "ACT_PCPL|VF:1|GEN|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – genitive active participle",
    "friendly": ""
  },
  "SUR": {
    "color": "#a8017b",
    "verbose": "SUR – surprise particle",
    "friendly": ""
  },
  "PASS_PCPL|VF:2|F|INDEF|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive feminine indefinite (form II) passive participle",
    "friendly": ""
  },
  "IMPF|VF:4|3FS|MOOD:JUS": {
    "color": "#1b571a",
    "verbose": "V – 3rd person feminine singular (form IV) imperfect verb, jussive mood",
    "friendly": ""
  },
  "P|SUFF": {
    "color": "#ad2323",
    "verbose": "P – preposition",
    "friendly": ""
  },
  "VN|VF:8|M|INDEF|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative masculine indefinite (form VIII) verbal noun",
    "friendly": ""
  },
  "IMPF|VF:2|PASS|2MS|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine singular (form II) passive imperfect verb",
    "friendly": ""
  },
  "VN|VF:2|F|INDEF|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive feminine indefinite (form II) verbal noun",
    "friendly": ""
  },
  "PERF|VF:2|PASS|2MP": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine plural (form II) passive perfect verb",
    "friendly": ""
  },
  "FD|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative feminine dual noun",
    "friendly": ""
  },
  "ACT_PCPL|VF:4|M|INDEF|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative masculine indefinite (form IV) active participle",
    "friendly": ""
  },
  "VN|VF:2|M|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative masculine (form II) verbal noun",
    "friendly": ""
  },
  "ACT_PCPL|VF:4|F|INDEF|GEN|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – genitive feminine indefinite (form IV) active participle",
    "friendly": ""
  },
  "ACT_PCPL|VF:6|MD|GEN|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – genitive masculine dual (form VI) active participle",
    "friendly": ""
  },
  "ACT_PCPL|VF:5|M|INDEF|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative masculine indefinite (form V) active participle",
    "friendly": ""
  },
  "FS|INDEF|NOM|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – nominative feminine singular indefinite adjective",
    "friendly": ""
  },
  "PASS_PCPL|VF:10|MP|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative masculine plural (form X) passive participle",
    "friendly": ""
  },
  "ACT_PCPL|VF:1|FP|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive feminine plural active participle",
    "friendly": ""
  },
  "PASS_PCPL|VF:2|F|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive feminine (form II) passive participle",
    "friendly": ""
  },
  "IMPF|VF:5|3MD|MOOD:JUS": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine dual (form V) imperfect verb, jussive mood",
    "friendly": ""
  },
  "MP|ACC|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – accusative masculine plural adjective",
    "friendly": ""
  },
  "IMPF|VF:10|PASS|3MS|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine singular (form X) passive imperfect verb",
    "friendly": ""
  },
  "IMPF|VF:10|1P|MOOD:JUS": {
    "color": "#1b571a",
    "verbose": "V – 1st person plural (form X) imperfect verb, jussive mood",
    "friendly": ""
  },
  "PASS_PCPL|VF:2|MP|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative masculine plural (form II) passive participle",
    "friendly": ""
  },
  "IMPF|VF:10|3MS|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine singular (form X) imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "PASS_PCPL|VF:2|MP|NOM|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – nominative masculine plural (form II) passive participle",
    "friendly": ""
  },
  "PERF|VF:1|3FD": {
    "color": "#1b571a",
    "verbose": "V – 3rd person feminine dual perfect verb",
    "friendly": ""
  },
  "M|ACC|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – accusative masculine adjective",
    "friendly": ""
  },
  "IMPV|VF:6|2MP": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine plural (form VI) imperative verb",
    "friendly": ""
  },
  "IMPF|VF:6|2MP|MOOD:JUS": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine plural (form VI) imperfect verb, jussive mood",
    "friendly": ""
  },
  "ACT_PCPL|VF:7|F|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative feminine (form VII) active participle",
    "friendly": ""
  },
  "PASS_PCPL|VF:1|F|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative feminine passive participle",
    "friendly": ""
  },
  "ACT_PCPL|VF:5|F|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative feminine (form V) active participle",
    "friendly": ""
  },
  "PN|VN|VF:4|M|ACC": {
    "color": "#257e9c",
    "verbose": "PN – accusative masculine (form IV) verbal noun",
    "friendly": ""
  },
  "ACT_PCPL|VF:6|M|INDEF|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive masculine indefinite (form VI) active participle",
    "friendly": ""
  },
  "ACT_PCPL|VF:4|FP|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive feminine plural (form IV) active participle",
    "friendly": ""
  },
  "PERF|VF:2|PASS|3MP": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine plural (form II) passive perfect verb",
    "friendly": ""
  },
  "ACT_PCPL|VF:1|F|INDEF|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive feminine indefinite active participle",
    "friendly": ""
  },
  "PASS_PCPL|VF:2|F|ACC|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – accusative feminine (form II) passive participle",
    "friendly": ""
  },
  "IMPF|VF:7|2MP|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine plural (form VII) imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "IMPV|VF:3|2MD": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine dual (form III) imperative verb",
    "friendly": ""
  },
  "PASS_PCPL|VF:2|F|INDEF|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative feminine indefinite (form II) passive participle",
    "friendly": ""
  },
  "PERF|VF:2|3MD": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine dual (form II) perfect verb",
    "friendly": ""
  },
  "PERF|VF:5|PASS|3MS": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine singular (form V) passive perfect verb",
    "friendly": ""
  },
  "IMPF|VF:5|PASS|3MS|MOOD:JUS": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine singular (form V) passive imperfect verb, jussive mood",
    "friendly": ""
  },
  "IMPF|VF:3|1S|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 1st person singular (form III) imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "IMPF|VF:2|PASS|3MP|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine plural (form II) passive imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "IMPF|VF:4|PASS|2MP|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine plural (form IV) passive imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "PERF|VF:10|PASS|3MP": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine plural (form X) passive perfect verb",
    "friendly": ""
  },
  "IMPF|VF:8|2MS|MOOD:JUS": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine singular (form VIII) imperfect verb, jussive mood",
    "friendly": ""
  },
  "MP|INDEF|GEN|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – genitive masculine plural indefinite adjective",
    "friendly": ""
  },
  "VN|VF:1|F|INDEF|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative feminine indefinite verbal noun",
    "friendly": ""
  },
  "PASS_PCPL|VF:1|F|INDEF|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative feminine indefinite passive participle",
    "friendly": ""
  },
  "PASS_PCPL|VF:1|FD|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative feminine dual passive participle",
    "friendly": ""
  },
  "ACT_PCPL|VF:8|F|INDEF|NOM|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – nominative feminine indefinite (form VIII) active participle",
    "friendly": ""
  },
  "PN|ACT_PCPL|VF:1|MP|NOM": {
    "color": "#257e9c",
    "verbose": "PN – nominative masculine plural active participle",
    "friendly": ""
  },
  "IMPF|VF:6|3MP|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine plural (form VI) imperfect verb",
    "friendly": ""
  },
  "ACT_PCPL|VF:4|M|NOM|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – nominative masculine (form IV) active participle",
    "friendly": ""
  },
  "IMPF|VF:1|PASS|3FS|MOOD:JUS": {
    "color": "#1b571a",
    "verbose": "V – 3rd person feminine singular passive imperfect verb, jussive mood",
    "friendly": ""
  },
  "INDEF|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive indefinite noun",
    "friendly": ""
  },
  "NV|IMPV": {
    "color": "#a8017b",
    "verbose": "IMPN – imperative verbal noun",
    "friendly": ""
  },
  "ACT_PCPL|VF:4|F|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative feminine (form IV) active participle",
    "friendly": ""
  },
  "IMPF|VF:4|3MD|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine dual (form IV) imperfect verb",
    "friendly": ""
  },
  "PERF|VF:10|3MD": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine dual (form X) perfect verb",
    "friendly": ""
  },
  "ACT_PCPL|VF:1|F|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive feminine active participle",
    "friendly": ""
  },
  "PERF|VF:5|2MS": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine singular (form V) perfect verb",
    "friendly": ""
  },
  "PASS_PCPL|VF:2|M|INDEF|NOM|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – nominative masculine indefinite (form II) passive participle",
    "friendly": ""
  },
  "PERF|VF:10|PASS|3MS": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine singular (form X) passive perfect verb",
    "friendly": ""
  },
  "PERF|VF:1|PASS|1S": {
    "color": "#1b571a",
    "verbose": "V – 1st person singular passive perfect verb",
    "friendly": ""
  },
  "IMPF|VF:1|PASS|1P|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 1st person plural passive imperfect verb",
    "friendly": ""
  },
  "IMPF|VF:2|1P|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 1st person plural (form II) imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "PASS_PCPL|VF:1|MP|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive masculine plural passive participle",
    "friendly": ""
  },
  "ACT_PCPL|VF:2|M|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative masculine (form II) active participle",
    "friendly": ""
  },
  "ADDR|SUFF|2MP": {
    "color": "#5c7085",
    "verbose": "PRON – 2nd person masculine plural object pronoun",
    "friendly": ""
  },
  "ACT_PCPL|VF:1|MP|NOM|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – nominative masculine plural active participle",
    "friendly": ""
  },
  "IMPF|VF:10|3FS|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 3rd person feminine singular (form X) imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "VN|VF:5|M|INDEF|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative masculine indefinite (form V) verbal noun",
    "friendly": ""
  },
  "IMPF|VF:4|PASS|3FS|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 3rd person feminine singular (form IV) passive imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "PERF|VF:10|3FS": {
    "color": "#1b571a",
    "verbose": "V – 3rd person feminine singular (form X) perfect verb",
    "friendly": ""
  },
  "IMPF|VF:3|PASS|2MP|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine plural (form III) passive imperfect verb",
    "friendly": ""
  },
  "PASS_PCPL|VF:3|M|INDEF|NOM|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – nominative masculine indefinite (form III) passive participle",
    "friendly": ""
  },
  "IMPF|VF:4|2MS|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine singular (form IV) imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "ACT_PCPL|VF:4|M|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative masculine (form IV) active participle",
    "friendly": ""
  },
  "ACT_PCPL|VF:6|M|INDEF|ACC|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – accusative masculine indefinite (form VI) active participle",
    "friendly": ""
  },
  "ACT_PCPL|VF:8|M|INDEF|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative masculine indefinite (form VIII) active participle",
    "friendly": ""
  },
  "ACT_PCPL|VF:1|MS|INDEF|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive masculine singular indefinite active participle",
    "friendly": ""
  },
  "ACT_PCPL|VF:2|M|NOM|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – nominative masculine (form II) active participle",
    "friendly": ""
  },
  "PERF|VF:8|PASS|2MP": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine plural (form VIII) passive perfect verb",
    "friendly": ""
  },
  "IMPF|VF:4|PASS|1P|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 1st person plural (form IV) passive imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "ACT_PCPL|VF:10|M|INDEF|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative masculine indefinite (form X) active participle",
    "friendly": ""
  },
  "PASS_PCPL|VF:1|FP|INDEF|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive feminine plural indefinite passive participle",
    "friendly": ""
  },
  "ACT_PCPL|VF:1|F|INDEF|GEN|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – genitive feminine indefinite active participle",
    "friendly": ""
  },
  "ACT_PCPL|VF:4|MP|GEN|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – genitive masculine plural (form IV) active participle",
    "friendly": ""
  },
  "ACT_PCPL|VF:1|F|NOM|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – nominative feminine active participle",
    "friendly": ""
  },
  "IMPF|VF:5|3FS|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 3rd person feminine singular (form V) imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "PN|ACT_PCPL|VF:4|MP|GEN": {
    "color": "#257e9c",
    "verbose": "PN – genitive masculine plural (form IV) active participle",
    "friendly": ""
  },
  "IMPF|VF:5|2MS|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine singular (form V) imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "PERF|VF:3|PASS|3MS": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine singular (form III) passive perfect verb",
    "friendly": ""
  },
  "PRON|2D": {
    "color": "#5c7085",
    "verbose": "PRON – 2nd person dual personal pronoun",
    "friendly": ""
  },
  "T|F|INDEF|ACC": {
    "color": "#e37010",
    "verbose": "T – accusative feminine indefinite time adverb",
    "friendly": ""
  },
  "PERF|VF:3|PASS|3MP": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine plural (form III) passive perfect verb",
    "friendly": ""
  },
  "ACT_PCPL|VF:2|M|INDEF|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative masculine indefinite (form II) active participle",
    "friendly": ""
  },
  "IMPF|VF:8|1P|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 1st person plural (form VIII) imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "PASS_PCPL|VF:2|FP|INDEF|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative feminine plural indefinite (form II) passive participle",
    "friendly": ""
  },
  "MP|INDEF|ACC|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – accusative masculine plural indefinite adjective",
    "friendly": ""
  },
  "PN|INDEF|GEN": {
    "color": "#257e9c",
    "verbose": "PN – genitive indefinite proper noun",
    "friendly": ""
  },
  "PASS_PCPL|VF:4|M|INDEF|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative masculine indefinite (form IV) passive participle",
    "friendly": ""
  },
  "ACT_PCPL|VF:4|MP|NOM|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – nominative masculine plural (form IV) active participle",
    "friendly": ""
  },
  "PERF|VF:4|PASS|1S": {
    "color": "#1b571a",
    "verbose": "V – 1st person singular (form IV) passive perfect verb",
    "friendly": ""
  },
  "PERF|VF:5|1P": {
    "color": "#1b571a",
    "verbose": "V – 1st person plural (form V) perfect verb",
    "friendly": ""
  },
  "ACT_PCPL|VF:7|MP|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative masculine plural (form VII) active participle",
    "friendly": ""
  },
  "IMPF|VF:5|3MP|MOOD:JUS": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine plural (form V) imperfect verb, jussive mood",
    "friendly": ""
  },
  "ACT_PCPL|VF:4|MP|ACC|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – accusative masculine plural (form IV) active participle",
    "friendly": ""
  },
  "IMPF|VF:10|PASS|3MP|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine plural (form X) passive imperfect verb",
    "friendly": ""
  },
  "PERF|VF:8|1S": {
    "color": "#1b571a",
    "verbose": "V – 1st person singular (form VIII) perfect verb",
    "friendly": ""
  },
  "MS|ACC|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – accusative masculine singular adjective",
    "friendly": ""
  },
  "ACT_PCPL|VF:1|F|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative feminine active participle",
    "friendly": ""
  },
  "PERF|VF:7|3MS": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine singular (form VII) perfect verb",
    "friendly": ""
  },
  "ACT_PCPL|VF:8|M|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative masculine (form VIII) active participle",
    "friendly": ""
  },
  "INTG|GEN": {
    "color": "#fd5162",
    "verbose": "INTG – genitive interrogative noun",
    "friendly": ""
  },
  "PERF|VF:10|1S": {
    "color": "#1b571a",
    "verbose": "V – 1st person singular (form X) perfect verb",
    "friendly": ""
  },
  "PASS_PCPL|VF:4|M|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative masculine (form IV) passive participle",
    "friendly": ""
  },
  "IMPF|VF:10|2MP|MOOD:JUS": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine plural (form X) imperfect verb, jussive mood",
    "friendly": ""
  },
  "PASS_PCPL|VF:10|MP|NOM|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – nominative masculine plural (form X) passive participle",
    "friendly": ""
  },
  "VN|VF:2|F|INDEF|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative feminine indefinite (form II) verbal noun",
    "friendly": ""
  },
  "LOC|MS|ACC": {
    "color": "#e37010",
    "verbose": "LOC – accusative masculine singular location adverb",
    "friendly": ""
  },
  "PERF|VF:3|2MS": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine singular (form III) perfect verb",
    "friendly": ""
  },
  "IMPF|VF:1|PASS|2MP|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine plural passive imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "MP|INDEF|NOM|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – nominative masculine plural indefinite adjective",
    "friendly": ""
  },
  "PERF|VF:10|1P": {
    "color": "#1b571a",
    "verbose": "V – 1st person plural (form X) perfect verb",
    "friendly": ""
  },
  "FD|NOM|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – nominative feminine dual adjective",
    "friendly": ""
  },
  "IMPF|VF:5|1P|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 1st person plural (form V) imperfect verb",
    "friendly": ""
  },
  "ACT_PCPL|VF:5|MP|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative masculine plural (form V) active participle",
    "friendly": ""
  },
  "IMPF|VF:5|PASS|3MS|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine singular (form V) passive imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "IMPF|VF:4|PASS|3MP|MOOD:JUS": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine plural (form IV) passive imperfect verb, jussive mood",
    "friendly": ""
  },
  "IMPF|VF:2|3FS|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 3rd person feminine singular (form II) imperfect verb",
    "friendly": ""
  },
  "PASS_PCPL|VF:8|M|INDEF|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative masculine indefinite (form VIII) passive participle",
    "friendly": ""
  },
  "ACT_PCPL|VF:3|FP|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive feminine plural (form III) active participle",
    "friendly": ""
  },
  "ACT_PCPL|VF:8|FP|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive feminine plural (form VIII) active participle",
    "friendly": ""
  },
  "IMPF|VF:10|2MS|MOOD:JUS": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine singular (form X) imperfect verb, jussive mood",
    "friendly": ""
  },
  "PASS_PCPL|VF:2|MP|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative masculine plural (form II) passive participle",
    "friendly": ""
  },
  "VN|VF:1|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive verbal noun",
    "friendly": ""
  },
  "IMPF|VF:2|3FS|MOOD:JUS": {
    "color": "#1b571a",
    "verbose": "V – 3rd person feminine singular (form II) imperfect verb, jussive mood",
    "friendly": ""
  },
  "ACT_PCPL|VF:2|MP|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative masculine plural (form II) active participle",
    "friendly": ""
  },
  "PN|FS|GEN": {
    "color": "#257e9c",
    "verbose": "PN – genitive feminine singular proper noun",
    "friendly": ""
  },
  "PASS_PCPL|VF:4|MP|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative masculine plural (form IV) passive participle",
    "friendly": ""
  },
  "IMPF|VF:10|3MP|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine plural (form X) imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "VN|VF:10|M|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative masculine (form X) verbal noun",
    "friendly": ""
  },
  "PERF|VF:5|1S": {
    "color": "#1b571a",
    "verbose": "V – 1st person singular (form V) perfect verb",
    "friendly": ""
  },
  "VN|VF:2|F|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative feminine (form II) verbal noun",
    "friendly": ""
  },
  "PN|M|INDEF|GEN": {
    "color": "#257e9c",
    "verbose": "PN – genitive masculine indefinite proper noun",
    "friendly": ""
  },
  "IMPF|VF:2|1S|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 1st person singular (form II) imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "ACT_PCPL|VF:10|M|INDEF|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive masculine indefinite (form X) active participle",
    "friendly": ""
  },
  "NV|IMPV|M|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative masculine noun",
    "friendly": ""
  },
  "IMPF|VF:8|PASS|3MS|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine singular (form VIII) passive imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "IMPV|VF:5|2MD": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine dual (form V) imperative verb",
    "friendly": ""
  },
  "IMPV|VF:10|2MD": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine dual (form X) imperative verb",
    "friendly": ""
  },
  "IMPF|VF:8|2D|MOOD:JUS": {
    "color": "#1b571a",
    "verbose": "V – 2nd person dual (form VIII) imperfect verb, jussive mood",
    "friendly": ""
  },
  "PASS_PCPL|VF:2|M|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative masculine (form II) passive participle",
    "friendly": ""
  },
  "PASS_PCPL|VF:2|M|INDEF|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive masculine indefinite (form II) passive participle",
    "friendly": ""
  },
  "PASS_PCPL|VF:10|M|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative masculine (form X) passive participle",
    "friendly": ""
  },
  "PASS_PCPL|VF:1|MP|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative masculine plural passive participle",
    "friendly": ""
  },
  "PASS_PCPL|VF:1|FS|INDEF|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive feminine singular indefinite passive participle",
    "friendly": ""
  },
  "PASS_PCPL|VF:8|FP|INDEF|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive feminine plural indefinite (form VIII) passive participle",
    "friendly": ""
  },
  "IMPF|VF:3|PASS|3MS|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine singular (form III) passive imperfect verb",
    "friendly": ""
  },
  "IMPF|VF:8|3MD|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine dual (form VIII) imperfect verb",
    "friendly": ""
  },
  "IMPF|VF:8|3FS|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 3rd person feminine singular (form VIII) imperfect verb",
    "friendly": ""
  },
  "IMPF|VF:8|3FS|MOOD:JUS": {
    "color": "#1b571a",
    "verbose": "V – 3rd person feminine singular (form VIII) imperfect verb, jussive mood",
    "friendly": ""
  },
  "IMPV|VF:4|2FS": {
    "color": "#1b571a",
    "verbose": "V – 2nd person feminine singular (form IV) imperative verb",
    "friendly": ""
  },
  "ACT_PCPL|VF:1|MS|INDEF|NOM|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – nominative masculine singular indefinite active participle",
    "friendly": ""
  },
  "PN|INDEF|NOM": {
    "color": "#257e9c",
    "verbose": "PN – nominative indefinite proper noun",
    "friendly": ""
  },
  "VN|VF:2|M|INDEF|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive masculine indefinite (form II) verbal noun",
    "friendly": ""
  },
  "IMPF|VF:1|2FS|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 2nd person feminine singular imperfect verb",
    "friendly": ""
  },
  "ACT_PCPL|VF:1|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative active participle",
    "friendly": ""
  },
  "PASS_PCPL|VF:2|F|INDEF|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative feminine indefinite (form II) passive participle",
    "friendly": ""
  },
  "VN|VF:3|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative (form III) verbal noun",
    "friendly": ""
  },
  "VN|VF:2|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative (form II) verbal noun",
    "friendly": ""
  },
  "PASS_PCPL|VF:1|M|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative masculine passive participle",
    "friendly": ""
  },
  "IMPF|VF:5|3FS|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 3rd person feminine singular (form V) imperfect verb",
    "friendly": ""
  },
  "ACT_PCPL|VF:1|INDEF|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative indefinite active participle",
    "friendly": ""
  },
  "PASS_PCPL|VF:10|M|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative masculine (form X) passive participle",
    "friendly": ""
  },
  "PASS_PCPL|VF:1|FS|INDEF|GEN|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – genitive feminine singular indefinite passive participle",
    "friendly": ""
  },
  "NV|IMPV|VF:1|2MS": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine singular imperative verb",
    "friendly": ""
  },
  "PASS_PCPL|VF:4|MP|GEN|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – genitive masculine plural (form IV) passive participle",
    "friendly": ""
  },
  "PERF|VF:8|3MD": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine dual (form VIII) perfect verb",
    "friendly": ""
  },
  "IMPV|VF:10|2FS": {
    "color": "#1b571a",
    "verbose": "V – 2nd person feminine singular (form X) imperative verb",
    "friendly": ""
  },
  "PERF|VF:1|2FS": {
    "color": "#1b571a",
    "verbose": "V – 2nd person feminine singular perfect verb",
    "friendly": ""
  },
  "PRON|SUFF|2FP": {
    "color": "#5c7085",
    "verbose": "PRON – 2nd person feminine plural object pronoun",
    "friendly": ""
  },
  "PERF|VF:2|3FP": {
    "color": "#1b571a",
    "verbose": "V – 3rd person feminine plural (form II) perfect verb",
    "friendly": ""
  },
  "PERF|VF:1|2FP": {
    "color": "#1b571a",
    "verbose": "V – 2nd person feminine plural perfect verb",
    "friendly": ""
  },
  "PERF|VF:3|1S": {
    "color": "#1b571a",
    "verbose": "V – 1st person singular (form III) perfect verb",
    "friendly": ""
  },
  "IMPF|VF:1|PASS|2MD|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine dual passive imperfect verb",
    "friendly": ""
  },
  "IMPF|VF:10|2D|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 2nd person dual (form X) imperfect verb",
    "friendly": ""
  },
  "FP|INDEF|GEN|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – genitive feminine plural indefinite adjective",
    "friendly": ""
  },
  "PERF|VF:3|2FP": {
    "color": "#1b571a",
    "verbose": "V – 2nd person feminine plural (form III) perfect verb",
    "friendly": ""
  },
  "IMPF|VF:10|1S|MOOD:JUS": {
    "color": "#1b571a",
    "verbose": "V – 1st person singular (form X) imperfect verb, jussive mood",
    "friendly": ""
  },
  "ACT_PCPL|VF:5|F|INDEF|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive feminine indefinite (form V) active participle",
    "friendly": ""
  },
  "PASS_PCPL|VF:4|FP|INDEF|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive feminine plural indefinite (form IV) passive participle",
    "friendly": ""
  },
  "IMPF|VF:10|1S|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 1st person singular (form X) imperfect verb",
    "friendly": ""
  },
  "IMPF|VF:5|2MS|MOOD:JUS": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine singular (form V) imperfect verb, jussive mood",
    "friendly": ""
  },
  "ACT_PCPL|VF:4|MS|INDEF|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative masculine singular indefinite (form IV) active participle",
    "friendly": ""
  },
  "ACT_PCPL|VF:1|FS|INDEF|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative feminine singular indefinite active participle",
    "friendly": ""
  },
  "ACT_PCPL|VF:6|M|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative masculine (form VI) active participle",
    "friendly": ""
  },
  "ACT_PCPL|VF:2|FP|INDEF|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative masculine plural indefinite (form II) active participle",
    "friendly": ""
  },
  "VN|VF:3|M|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative masculine (form III) verbal noun",
    "friendly": ""
  },
  "VN|VF:1|M|INDEF|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive masculine indefinite verbal noun",
    "friendly": ""
  },
  "PERF|VF:8|PASS|3FS": {
    "color": "#1b571a",
    "verbose": "V – 3rd person feminine singular (form VIII) passive perfect verb",
    "friendly": ""
  },
  "ACT_PCPL|VF:1|MD|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative masculine dual active participle",
    "friendly": ""
  },
  "PASS_PCPL|VF:2|M|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive masculine (form II) passive participle",
    "friendly": ""
  },
  "PASS_PCPL|VF:4|MP|ACC|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – accusative masculine plural (form IV) passive participle",
    "friendly": ""
  },
  "ACT_PCPL|VF:10|M|INDEF|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative masculine indefinite (form X) active participle",
    "friendly": ""
  },
  "ACT_PCPL|VF:6|MP|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative masculine plural (form VI) active participle",
    "friendly": ""
  },
  "ACT_PCPL|VF:5|MP|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive masculine plural (form V) active participle",
    "friendly": ""
  },
  "PASS_PCPL|VF:2|FP|INDEF|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative feminine plural indefinite (form II) passive participle",
    "friendly": ""
  },
  "VN|VF:5|M|INDEF|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive masculine indefinite (form V) verbal noun",
    "friendly": ""
  },
  "ACT_PCPL|VF:1|MP|INDEF|ACC|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – accusative masculine plural indefinite active participle",
    "friendly": ""
  },
  "ACT_PCPL|VF:9|M|INDEF|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative masculine indefinite (form IX) active participle",
    "friendly": ""
  },
  "IMPF|VF:6|3MS|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine singular (form VI) imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "IMPV|VF:8|2FS": {
    "color": "#1b571a",
    "verbose": "V – 2nd person feminine singular (form VIII) imperative verb",
    "friendly": ""
  },
  "ACT_PCPL|VF:8|M|INDEF|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative masculine indefinite (form VIII) active participle",
    "friendly": ""
  },
  "PASS_PCPL|VF:2|FP|INDEF|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive feminine plural indefinite (form II) passive participle",
    "friendly": ""
  },
  "VN|VF:4|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive (form IV) verbal noun",
    "friendly": ""
  },
  "ACT_PCPL|VF:8|M|INDEF|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive masculine indefinite (form VIII) active participle",
    "friendly": ""
  },
  "ACT_PCPL|VF:4|F|INDEF|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative feminine indefinite (form IV) active participle",
    "friendly": ""
  },
  "PERF|VF:3|PASS|2MP": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine plural (form III) passive perfect verb",
    "friendly": ""
  },
  "NV|IMPF": {
    "color": "#548dd4",
    "verbose": "N – genitive indefinite noun",
    "friendly": ""
  },
  "PN|MP|GEN": {
    "color": "#257e9c",
    "verbose": "PN – genitive masculine plural proper noun",
    "friendly": ""
  },
  "PASS_PCPL|VF:1|F|INDEF|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative feminine indefinite passive participle",
    "friendly": ""
  },
  "ACT_PCPL|VF:10|M|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive masculine (form X) active participle",
    "friendly": ""
  },
  "IMPF|VF:4|PASS|2MS|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine singular (form IV) passive imperfect verb",
    "friendly": ""
  },
  "PASS_PCPL|VF:1|F|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative feminine passive participle",
    "friendly": ""
  },
  "ADDR|SUFF|2MS": {
    "color": "#5c7085",
    "verbose": "PRON – 2nd person masculine singular object pronoun",
    "friendly": ""
  },
  "PASS_PCPL|VF:4|M|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative masculine (form IV) passive participle",
    "friendly": ""
  },
  "COND|INDEF|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative indefinite noun",
    "friendly": ""
  },
  "IMPF|VF:6|3FS|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 3rd person feminine singular (form VI) imperfect verb",
    "friendly": ""
  },
  "LOC|FS|ACC": {
    "color": "#e37010",
    "verbose": "LOC – accusative feminine singular location adverb",
    "friendly": ""
  },
  "PASS_PCPL|VF:7|M|INDEF|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative masculine indefinite (form VII) passive participle",
    "friendly": ""
  },
  "IMPF|VF:10|2MS|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine singular (form X) imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "ACT_PCPL|VF:8|M|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative masculine (form VIII) active participle",
    "friendly": ""
  },
  "PERF|VF:3|3MD": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine dual (form III) perfect verb",
    "friendly": ""
  },
  "PERF|VF:2|PASS|2MS": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine singular (form II) passive perfect verb",
    "friendly": ""
  },
  "PERF|VF:7|3MD": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine dual (form VII) perfect verb",
    "friendly": ""
  },
  "IMPF|VF:7|3MS|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine singular (form VII) imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "MD|NOM|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – nominative masculine dual adjective",
    "friendly": ""
  },
  "IMPF|VF:10|3MD|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine dual (form X) imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "IMPF|VF:10|2MS|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine singular (form X) imperfect verb",
    "friendly": ""
  },
  "IMPF|VF:1|2FS|MOOD:JUS": {
    "color": "#1b571a",
    "verbose": "V – 2nd person feminine singular imperfect verb, jussive mood",
    "friendly": ""
  },
  "IMPF|VF:3|3FS|MOOD:JUS": {
    "color": "#1b571a",
    "verbose": "V – 3rd person feminine singular (form III) imperfect verb, jussive mood",
    "friendly": ""
  },
  "IMPF|VF:1|PASS|1S|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 1st person singular passive imperfect verb",
    "friendly": ""
  },
  "IMPF|VF:4|PASS|1S|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 1st person singular (form IV) passive imperfect verb",
    "friendly": ""
  },
  "VN|VF:1|MP|INDEF|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative masculine plural indefinite verbal noun",
    "friendly": ""
  },
  "REL|ACC": {
    "color": "#fd5162",
    "verbose": "INTG – nominative interrogative noun",
    "friendly": ""
  },
  "AVR": {
    "color": "#a8017b",
    "verbose": "AVR – aversion particle",
    "friendly": ""
  },
  "IMPF|VF:7|3FS|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 3rd person feminine singular (form VII) imperfect verb",
    "friendly": ""
  },
  "P|ACC|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – accusative plural adjective",
    "friendly": ""
  },
  "IMPF|VF:5|1S|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 1st person singular (form V) imperfect verb",
    "friendly": ""
  },
  "F|ACC|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – accusative feminine adjective",
    "friendly": ""
  },
  "PERF|VF:4|PASS|2MS": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine singular (form IV) passive perfect verb",
    "friendly": ""
  },
  "IMPF|VF:1|PASS|2MS|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine singular passive imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "ACC|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – accusative adjective",
    "friendly": ""
  },
  "DEM|MD": {
    "color": "#bf9f3e",
    "verbose": "DEM – masculine dual demonstrative pronoun",
    "friendly": ""
  },
  "FP|NOM|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – nominative feminine plural adjective",
    "friendly": ""
  },
  "LOC|ACT_PCPL|VF:1|M|ACC": {
    "color": "#e37010",
    "verbose": "LOC – accusative masculine active participle",
    "friendly": ""
  },
  "PERF|VF:2|PASS|1P": {
    "color": "#1b571a",
    "verbose": "V – 1st person plural (form II) passive perfect verb",
    "friendly": ""
  },
  "IMPF|VF:4|PASS|2MS|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine singular (form IV) passive imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "ACT_PCPL|VF:5|M|INDEF|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative masculine indefinite (form V) active participle",
    "friendly": ""
  },
  "PASS_PCPL|VF:3|M|INDEF|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative masculine indefinite (form III) passive participle",
    "friendly": ""
  },
  "VN|VF:1|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative verbal noun",
    "friendly": ""
  },
  "IMPF|VF:2|3FP|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 3rd person feminine plural (form II) imperfect verb",
    "friendly": ""
  },
  "IMPF|VF:5|2MS|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine singular (form V) imperfect verb",
    "friendly": ""
  },
  "IMPF|VF:5|PASS|3MS|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine singular (form V) passive imperfect verb",
    "friendly": ""
  },
  "PN|PASS_PCPL|VF:1|MP|ACC": {
    "color": "#257e9c",
    "verbose": "PN – accusative masculine plural passive participle",
    "friendly": ""
  },
  "IMPF|VF:3|PASS|3MP|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine plural (form III) passive imperfect verb",
    "friendly": ""
  },
  "ACT_PCPL|VF:9|F|INDEF|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative feminine indefinite (form IX) active participle",
    "friendly": ""
  },
  "PN|ACT_PCPL|VF:4|MP|ACC": {
    "color": "#257e9c",
    "verbose": "PN – accusative masculine plural (form IV) active participle",
    "friendly": ""
  },
  "NV|PERF": {
    "color": "#548dd4",
    "verbose": "N – accusative noun",
    "friendly": ""
  },
  "VN|VF:8|M|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative masculine (form VIII) verbal noun",
    "friendly": ""
  },
  "ACT_PCPL|VF:4|FP|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative feminine plural (form IV) active participle",
    "friendly": ""
  },
  "ACT_PCPL|VF:1|FP|ACC|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – accusative feminine plural active participle",
    "friendly": ""
  },
  "PASS_PCPL|VF:1|F|INDEF|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive feminine indefinite passive participle",
    "friendly": ""
  },
  "IMPF|VF:1|3FP|MOOD:JUS": {
    "color": "#1b571a",
    "verbose": "V – 3rd person feminine plural imperfect verb, jussive mood",
    "friendly": ""
  },
  "IMPF|VF:4|3FP|MOOD:JUS": {
    "color": "#1b571a",
    "verbose": "V – 3rd person feminine plural (form IV) imperfect verb, jussive mood",
    "friendly": ""
  },
  "ACT_PCPL|VF:1|FP|INDEF|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive feminine plural indefinite active participle",
    "friendly": ""
  },
  "ACT_PCPL|VF:5|FP|INDEF|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive feminine plural indefinite (form V) active participle",
    "friendly": ""
  },
  "IMPF|VF:10|3FP|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 3rd person feminine plural (form X) imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "IMPF|VF:4|PASS|3FS|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 3rd person feminine singular (form IV) passive imperfect verb",
    "friendly": ""
  },
  "PASS_PCPL|VF:10|M|INDEF|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative masculine indefinite (form X) passive participle",
    "friendly": ""
  },
  "IMPF|VF:8|1S|MOOD:JUS": {
    "color": "#1b571a",
    "verbose": "V – 1st person singular (form VIII) imperfect verb, jussive mood",
    "friendly": ""
  },
  "IMPF|VF:3|PASS|3MS|MOOD:JUS": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine singular (form III) passive imperfect verb, jussive mood",
    "friendly": ""
  },
  "VN|VF:1|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative verbal noun",
    "friendly": ""
  },
  "PASS_PCPL|VF:8|MP|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative masculine plural (form VIII) passive participle",
    "friendly": ""
  },
  "IMPF|VF:6|2MS|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine singular (form VI) imperfect verb",
    "friendly": ""
  },
  "PASS_PCPL|VF:7|M|INDEF|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive masculine indefinite (form VII) passive participle",
    "friendly": ""
  },
  "IMPF|VF:7|3MP|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine plural (form VII) imperfect verb",
    "friendly": ""
  },
  "IMPF|VF:1|2D|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 2nd person dual imperfect verb",
    "friendly": ""
  },
  "VN|VF:10|M|INDEF|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive masculine indefinite (form X) verbal noun",
    "friendly": ""
  },
  "COND|ACC": {
    "color": "#e37010",
    "verbose": "COND – conditional noun",
    "friendly": ""
  },
  "PASS_PCPL|VF:8|M|INDEF|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive masculine indefinite (form VIII) passive participle",
    "friendly": ""
  },
  "IMPF|VF:5|PASS|1P|MOOD:JUS": {
    "color": "#1b571a",
    "verbose": "V – 1st person plural (form V) passive imperfect verb, jussive mood",
    "friendly": ""
  },
  "ACT_PCPL|VF:3|M|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative masculine (form III) active participle",
    "friendly": ""
  },
  "IMPF|VF:2|PASS|2MP|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine plural (form II) passive imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "ACT_PCPL|VF:3|M|INDEF|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative masculine indefinite (form III) active participle",
    "friendly": ""
  },
  "ACT_PCPL|VF:1|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive active participle",
    "friendly": ""
  },
  "P|NOM|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – nominative plural adjective",
    "friendly": ""
  },
  "ACT_PCPL|VF:9|MS|INDEF|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative masculine singular indefinite (form IX) active participle",
    "friendly": ""
  },
  "INDEF|GEN|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – genitive indefinite adjective",
    "friendly": ""
  },
  "INDEF|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative indefinite noun",
    "friendly": ""
  },
  "IMPF|VF:4|2FP|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 2nd person feminine plural (form IV) imperfect verb",
    "friendly": ""
  },
  "IMPV|VF:4|2FP": {
    "color": "#1b571a",
    "verbose": "V – 2nd person feminine plural (form IV) imperative verb",
    "friendly": ""
  },
  "IMPF|VF:2|1S|MOOD:JUS": {
    "color": "#1b571a",
    "verbose": "V – 1st person singular (form II) imperfect verb, jussive mood",
    "friendly": ""
  },
  "ACT_PCPL|VF:2|F|INDEF|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive feminine indefinite (form II) active participle",
    "friendly": ""
  },
  "PERF|VF:8|2FP": {
    "color": "#1b571a",
    "verbose": "V – 2nd person feminine plural (form VIII) perfect verb",
    "friendly": ""
  },
  "IMPF|VF:1|2FP|MOOD:JUS": {
    "color": "#1b571a",
    "verbose": "V – 2nd person feminine plural imperfect verb, jussive mood",
    "friendly": ""
  },
  "IMPV|VF:1|2FP": {
    "color": "#1b571a",
    "verbose": "V – 2nd person feminine plural imperative verb",
    "friendly": ""
  },
  "IMPF|VF:5|2FP|MOOD:JUS": {
    "color": "#1b571a",
    "verbose": "V – 2nd person feminine plural (form V) imperfect verb, jussive mood",
    "friendly": ""
  },
  "ACT_PCPL|VF:5|FP|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative feminine plural (form V) active participle",
    "friendly": ""
  },
  "PERF|VF:3|3FP": {
    "color": "#1b571a",
    "verbose": "V – 3rd person feminine plural (form III) perfect verb",
    "friendly": ""
  },
  "IMPF|VF:1|3FP|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 3rd person feminine plural imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "ACT_PCPL|VF:10|MP|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive masculine plural (form X) active participle",
    "friendly": ""
  },
  "IMPV|VF:8|2FP": {
    "color": "#1b571a",
    "verbose": "V – 2nd person feminine plural (form VIII) imperative verb",
    "friendly": ""
  },
  "IMPF|VF:1|PASS|3FP|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 3rd person feminine plural passive imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "IMPF|VF:4|PASS|3FP|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 3rd person feminine plural (form IV) passive imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "PASS_PCPL|VF:1|MP|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative masculine plural passive participle",
    "friendly": ""
  },
  "ACT_PCPL|VF:3|FP|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative feminine plural (form III) active participle",
    "friendly": ""
  },
  "IMPV|VF:2|2FS": {
    "color": "#1b571a",
    "verbose": "V – 2nd person feminine singular (form II) imperative verb",
    "friendly": ""
  },
  "ACT_PCPL|VF:1|FS|INDEF|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive feminine singular indefinite active participle",
    "friendly": ""
  },
  "T|P|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative plural noun",
    "friendly": ""
  },
  "VN|VF:6|M|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative masculine (form VI) verbal noun",
    "friendly": ""
  },
  "P|INDEF|NOM|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – nominative plural indefinite adjective",
    "friendly": ""
  },
  "PASS_PCPL|VF:4|F|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive feminine (form IV) passive participle",
    "friendly": ""
  },
  "PASS_PCPL|VF:4|F|INDEF|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative feminine indefinite (form IV) passive participle",
    "friendly": ""
  },
  "VN|VF:10|M|INDEF|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative masculine indefinite (form X) verbal noun",
    "friendly": ""
  },
  "PASS_PCPL|VF:10|M|INDEF|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive masculine indefinite (form X) passive participle",
    "friendly": ""
  },
  "PN|M|INDEF|NOM": {
    "color": "#257e9c",
    "verbose": "PN – nominative masculine indefinite proper noun",
    "friendly": ""
  },
  "PASS_PCPL|VF:2|MP|ACC|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – accusative masculine plural (form II) passive participle",
    "friendly": ""
  },
  "PASS_PCPL|VF:8|M|INDEF|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative masculine indefinite (form VIII) passive participle",
    "friendly": ""
  },
  "PASS_PCPL|VF:8|MP|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive masculine plural (form VIII) passive participle",
    "friendly": ""
  },
  "ACT_PCPL|VF:6|MP|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative masculine plural (form VI) active participle",
    "friendly": ""
  },
  "F|INDEF|NOM|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – nominative feminine indefinite adjective",
    "friendly": ""
  },
  "PASS_PCPL|VF:1|FP|INDEF|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative feminine plural indefinite passive participle",
    "friendly": ""
  },
  "ACT_PCPL|VF:1|MP|INDEF|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative masculine plural indefinite active participle",
    "friendly": ""
  },
  "VN|VF:6|M|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive masculine (form VI) verbal noun",
    "friendly": ""
  },
  "ACT_PCPL|VF:5|M|INDEF|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive masculine indefinite (form V) active participle",
    "friendly": ""
  },
  "INDEF|NOM|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – nominative indefinite adjective",
    "friendly": ""
  },
  "IMPF|VF:8|1S|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 1st person singular (form VIII) imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "ACT_PCPL|VF:1|FS|INDEF|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative feminine singular indefinite active participle",
    "friendly": ""
  },
  "ACT_PCPL|VF:1|FP|GEN|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – genitive feminine plural active participle",
    "friendly": ""
  },
  "1S|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive 1st person singular noun",
    "friendly": ""
  },
  "VN|VF:1|F|INDEF|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive feminine indefinite verbal noun",
    "friendly": ""
  },
  "IMPF|VF:6|1P|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 1st person plural (form VI) imperfect verb",
    "friendly": ""
  },
  "IMPF|VF:1|3FD|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 2nd person feminine dual imperfect verb",
    "friendly": ""
  },
  "IMPF|VF:4|PASS|1S|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 1st person singular (form IV) passive imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "IMPF|VF:10|3MD|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine dual (form X) imperfect verb",
    "friendly": ""
  },
  "ACT_PCPL|VF:10|M|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative masculine (form X) active participle",
    "friendly": ""
  },
  "PASS_PCPL|VF:5|M|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative masculine (form V) passive participle",
    "friendly": ""
  },
  "ACT_PCPL|VF:4|FP|INDEF|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative feminine plural indefinite (form IV) active participle",
    "friendly": ""
  },
  "IMPF|VF:6|2MP|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine plural (form VI) imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "ACT_PCPL|VF:5|MD|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative masculine dual (form V) active participle",
    "friendly": ""
  },
  "IMPV|VF:4|2MD": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine dual (form IV) imperative verb",
    "friendly": ""
  },
  "PERF|VF:8|2FS": {
    "color": "#1b571a",
    "verbose": "V – 2nd person feminine singular (form VIII) perfect verb",
    "friendly": ""
  },
  "ACT_PCPL|VF:1|MS|INDEF|GEN|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – genitive masculine singular indefinite active participle",
    "friendly": ""
  },
  "ACT_PCPL|VF:3|M|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive masculine (form III) active participle",
    "friendly": ""
  },
  "ACT_PCPL|VF:2|FP|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive feminine plural (form II) active participle",
    "friendly": ""
  },
  "ACT_PCPL|VF:1|MP|INDEF|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive masculine plural indefinite active participle",
    "friendly": ""
  },
  "PASS_PCPL|VF:8|M|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive masculine (form VIII) passive participle",
    "friendly": ""
  },
  "F|NOM|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – nominative feminine adjective",
    "friendly": ""
  },
  "VN|VF:2|F|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative feminine (form II) verbal noun",
    "friendly": ""
  },
  "ACT_PCPL|VF:8|F|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative feminine (form VIII) active participle",
    "friendly": ""
  },
  "ACT_PCPL|VF:8|M|INDEF|NOM|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – nominative masculine indefinite (form VIII) active participle",
    "friendly": ""
  },
  "ACT_PCPL|VF:7|M|INDEF|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive masculine indefinite (form VII) active participle",
    "friendly": ""
  },
  "ACT_PCPL|VF:8|M|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive masculine (form VIII) active participle",
    "friendly": ""
  },
  "IMPF|VF:2|2D|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 2nd person dual (form II) imperfect verb",
    "friendly": ""
  },
  "PASS_PCPL|VF:4|FP|NOM|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – nominative feminine plural (form IV) passive participle",
    "friendly": ""
  },
  "IMPF|VF:8|2D|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 2nd person dual (form VIII) imperfect verb",
    "friendly": ""
  },
  "ACT_PCPL|VF:11|FD|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative feminine dual (form XI) active participle",
    "friendly": ""
  },
  "PASS_PCPL|VF:1|F|INDEF|GEN|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – genitive feminine indefinite passive participle",
    "friendly": ""
  },
  "PASS_PCPL|VF:1|M|GEN|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – genitive masculine passive participle",
    "friendly": ""
  },
  "PASS_PCPL|VF:1|M|INDEF|GEN|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – genitive masculine indefinite passive participle",
    "friendly": ""
  },
  "VN|VF:6|M|INDEF|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative masculine indefinite (form VI) verbal noun",
    "friendly": ""
  },
  "VN|VF:3|M|INDEF|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative masculine indefinite (form III) verbal noun",
    "friendly": ""
  },
  "VN|VF:1|F|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive feminine verbal noun",
    "friendly": ""
  },
  "IMPF|VF:3|2MS|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine singular (form III) imperfect verb",
    "friendly": ""
  },
  "VN|VF:6|M|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative masculine (form VI) verbal noun",
    "friendly": ""
  },
  "ACT_PCPL|VF:3|MP|GEN|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – genitive masculine plural (form III) active participle",
    "friendly": ""
  },
  "PASS_PCPL|VF:2|F|INDEF|GEN|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – genitive feminine indefinite (form II) passive participle",
    "friendly": ""
  },
  "ACT_PCPL|VF:1|MD|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative masculine dual active participle",
    "friendly": ""
  },
  "ACT_PCPL|VF:5|M|NOM|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – nominative masculine (form V) active participle",
    "friendly": ""
  },
  "ACT_PCPL|VF:1|M|NOM|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – nominative masculine active participle",
    "friendly": ""
  },
  "ACT_PCPL|VF:4|FP|INDEF|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative feminine plural indefinite (form IV) active participle",
    "friendly": ""
  },
  "IMPF|VF:3|3FP|MOOD:IND": {
    "color": "#1b571a",
    "verbose": "V – 3rd person feminine plural (form III) imperfect verb",
    "friendly": ""
  },
  "IMPF|VF:5|1S|MOOD:SUBJ": {
    "color": "#1b571a",
    "verbose": "V – 1st person singular (form V) imperfect verb, subjunctive mood",
    "friendly": ""
  },
  "IMPF|VF:3|PASS|2MP|MOOD:JUS": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine plural (form III) passive imperfect verb, jussive mood",
    "friendly": ""
  },
  "VN|VF:1|FS|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative feminine singular verbal noun",
    "friendly": ""
  },
  "IMPF|VF:6|2FD|MOOD:JUS": {
    "color": "#1b571a",
    "verbose": "V – 2nd person feminine dual (form VI) imperfect verb, jussive mood",
    "friendly": ""
  },
  "ACT_PCPL|VF:4|FP|INDEF|ACC|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – accusative feminine plural indefinite (form IV) active participle",
    "friendly": ""
  },
  "ACT_PCPL|VF:1|FP|INDEF|ACC|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – accusative feminine plural indefinite active participle",
    "friendly": ""
  },
  "ACT_PCPL|VF:1|MD|GEN|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – genitive masculine dual active participle",
    "friendly": ""
  },
  "ACT_PCPL|VF:1|FP|INDEF|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative feminine plural indefinite active participle",
    "friendly": ""
  },
  "ACT_PCPL|VF:8|M|INDEF|GEN|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – genitive masculine indefinite (form VIII) active participle",
    "friendly": ""
  },
  "ACT_PCPL|VF:8|FP|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative feminine plural (form VIII) active participle",
    "friendly": ""
  },
  "ACT_PCPL|VF:1|F|GEN|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – genitive feminine active participle",
    "friendly": ""
  },
  "IMPF|VF:4|PASS|3FS|MOOD:JUS": {
    "color": "#1b571a",
    "verbose": "V – 3rd person feminine singular (form IV) passive imperfect verb, jussive mood",
    "friendly": ""
  },
  "VN|VF:2|F|INDEF|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative feminine indefinite (form II) verbal noun",
    "friendly": ""
  },
  "ACT_PCPL|VF:1|M|INDEF|GEN|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – genitive masculine indefinite active participle",
    "friendly": ""
  },
  "PN|ACT_PCPL|VF:4|MP|NOM": {
    "color": "#257e9c",
    "verbose": "PN – nominative masculine plural (form IV) active participle",
    "friendly": ""
  },
  "ACT_PCPL|VF:7|M|INDEF|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative masculine indefinite (form VII) active participle",
    "friendly": ""
  },
  "VN|VF:2|F|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive feminine (form II) verbal noun",
    "friendly": ""
  },
  "ACT_PCPL|VF:10|F|INDEF|NOM|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – nominative feminine indefinite (form X) active participle",
    "friendly": ""
  },
  "PASS_PCPL|VF:2|F|INDEF|ACC|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – accusative feminine indefinite (form II) passive participle",
    "friendly": ""
  },
  "IMPV|VF:7|2MP": {
    "color": "#1b571a",
    "verbose": "V – 2nd person masculine plural (form VII) imperative verb",
    "friendly": ""
  },
  "VN|VF:3|M|INDEF|ACC|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – accusative masculine indefinite (form III) verbal noun",
    "friendly": ""
  },
  "PASS_PCPL|VF:8|M|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative masculine (form VIII) passive participle",
    "friendly": ""
  },
  "PASS_PCPL|VF:2|FP|INDEF|GEN|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – genitive feminine plural indefinite (form II) passive participle",
    "friendly": ""
  },
  "ACT_PCPL|VF:10|F|INDEF|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative feminine indefinite (form X) active participle",
    "friendly": ""
  },
  "PASS_PCPL|VF:4|M|INDEF|GEN|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – genitive masculine indefinite (form IV) passive participle",
    "friendly": ""
  },
  "COND|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive noun",
    "friendly": ""
  },
  "IMPF|VF:6|3MS|MOOD:JUS": {
    "color": "#1b571a",
    "verbose": "V – 3rd person masculine singular (form VI) imperfect verb, jussive mood",
    "friendly": ""
  },
  "VN|VF:1|INDEF|NOM": {
    "color": "#548dd4",
    "verbose": "N – nominative indefinite verbal noun",
    "friendly": ""
  },
  "ACT_PCPL|VF:1|FS|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive feminine singular active participle",
    "friendly": ""
  },
  "ACT_PCPL|VF:2|M|INDEF|GEN": {
    "color": "#548dd4",
    "verbose": "N – genitive masculine indefinite (form II) active participle",
    "friendly": ""
  },
  "VN|VF:1|M|INDEF|ACC|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – accusative masculine indefinite verbal noun",
    "friendly": ""
  },
  "ACT_PCPL|VF:4|F|NOM|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – nominative feminine (form XII) active participle",
    "friendly": ""
  },
  "ACT_PCPL|VF:7|MP|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative masculine plural (form VII) active participle",
    "friendly": ""
  },
  "PASS_PCPL|VF:4|F|NOM|ADJ": {
    "color": "#8126c0",
    "verbose": "ADJ – nominative feminine (form IV) passive participle",
    "friendly": ""
  },
  "PN|P|GEN": {
    "color": "#257e9c",
    "verbose": "PN – genitive plural proper noun",
    "friendly": ""
  },
  "ACT_PCPL|VF:1|FS|ACC": {
    "color": "#548dd4",
    "verbose": "N – accusative feminine singular active participle",
    "friendly": ""
  },
  "DET|PREF": {
    "color": "#114e9b",
    "verbose": "DET - prefixed definite article",
    "friendly": ""
  },
  "DIST|SUFF": {
    "color": "#bf9f3e",
    "verbose": "DIST",
    "friendly": ""
  }
};

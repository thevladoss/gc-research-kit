// СГЕНЕРИРОВАНО scripts/build-data.mjs — не редактировать руками.
// Источник: synthesis/aggregate.json + adjudication/*.ruling.json (2026-07-06).
export interface ChainLinkStats { link: number; chapters: number[]; shown: number; totals: { claims: number; supported: number; fallen: number; open: number; conditional: number; unverifiable: number } }
export const chainStats: readonly ChainLinkStats[] = [
  {
    "link": 1,
    "chapters": [
      1,
      2,
      3
    ],
    "shown": 10,
    "totals": {
      "claims": 300,
      "supported": 213,
      "fallen": 24,
      "open": 6,
      "conditional": 0,
      "unverifiable": 57
    }
  },
  {
    "link": 2,
    "chapters": [
      4,
      13
    ],
    "shown": 9,
    "totals": {
      "claims": 190,
      "supported": 136,
      "fallen": 28,
      "open": 1,
      "conditional": 0,
      "unverifiable": 25
    }
  },
  {
    "link": 3,
    "chapters": [
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16
    ],
    "shown": 12,
    "totals": {
      "claims": 1509,
      "supported": 1261,
      "fallen": 51,
      "open": 1,
      "conditional": 0,
      "unverifiable": 196
    }
  },
  {
    "link": 4,
    "chapters": [
      17,
      18,
      19,
      20,
      21,
      22
    ],
    "shown": 9,
    "totals": {
      "claims": 624,
      "supported": 460,
      "fallen": 18,
      "open": 1,
      "conditional": 1,
      "unverifiable": 144
    }
  },
  {
    "link": 5,
    "chapters": [
      23,
      24,
      28
    ],
    "shown": 5,
    "totals": {
      "claims": 304,
      "supported": 173,
      "fallen": 5,
      "open": 0,
      "conditional": 0,
      "unverifiable": 126
    }
  },
  {
    "link": 6,
    "chapters": [
      25,
      26,
      33,
      35,
      36
    ],
    "shown": 10,
    "totals": {
      "claims": 576,
      "supported": 304,
      "fallen": 20,
      "open": 0,
      "conditional": 0,
      "unverifiable": 252
    }
  },
  {
    "link": 7,
    "chapters": [
      36,
      37,
      38,
      39,
      40,
      41,
      42
    ],
    "shown": 3,
    "totals": {
      "claims": 613,
      "supported": 298,
      "fallen": 5,
      "open": 1,
      "conditional": 0,
      "unverifiable": 309
    }
  }
] as const

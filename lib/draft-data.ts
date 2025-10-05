export type Position = "Top" | "Jungle" | "Mid" | "ADC" | "Suporte"

export interface Player {
  name: string
  position: Position
  photo: string
}

export interface Captain {
  name: string
  position: Position
  photo: string
}

const getPlayerPhoto = (name: string): string => {
  const realPhotos: Record<string, string> = {
    toucouille: "/players/toucouille.jpeg",
    xyno: "/players/xyno.jpeg",
    yang: "/players/yang.webp",
    yoda: "/players/yoda.webp",
    zekas: "/players/zekas.webp",
    zynts: "/players/zynts.webp",
    esa: "/players/esa.jpeg",
    envy:  "/players/envy.jpeg",
    absol: "/players/absol.webp",
    accez: "/players/accez.webp",
    anato: "/players/anato.webp",
    ayel: "/players/ayel.webp",
    bennie: "/players/beenie.jpeg",
    brtt: "/players/brtt.jpeg",
    brucer: "/players/brucer.webp",
    bulecha: "/players/bulecha.jpeg",
    cavalo: "/players/cavalo.jpeg",
    celo: "/players/celo.jpeg",
    dizin: "/players/dizin.jpg",
    drakehero: "/players/drakehero.webp",
    duduhhh: "/players/duduhhh.jpeg",
    grevthar: "/players/grevthar.jpeg",
    gru: "/players/gru.jpeg",
    guigs: "/players/guigs.jpeg",
    hidan: "/players/hidan.webp",
    jojo: "/players/jojo.jpeg",
    kami: "/players/kami.webp",
    kiari: "/players/kiari.webp",
    kina: "/players/kina.jpeg",
    kojima: "/players/kojima.jpeg",
    konseki: "/players/konseki.jpeg",
    leleko: "/players/leleko.jpeg",
    makes: "/players/makes.webp",
    micao: "/players/micao.webp",
    minerva: "/players/minerva.jpeg",
    momochi: "/players/momochi.jpeg",
    netuno: "/players/netuno.jpeg",
    pijack: "/players/pijack.jpeg",
    qats: "/players/qats.jpeg",
    randal: "/players/randal.jpeg",
    sarkis: "/players/sarkis.webp",
    samkz: "/players/samkz.png",
    sarolu: "/players/sarolu.webp",
    scamber: "/players/scamber.jpeg",
    shini: "/players/shini.webp",
    shoiti: "/players/shoiti.jpeg",
    stiner: "/players/stiner.webp",
    tay: "/players/tay.jpeg",
    telas: "/players/telas.jpeg",
    takeshi: "/players/takeshi.webp",
    juliera: "/players/juliera.jpeg",
    reaper: "/players/reaper.jpeg"
  };

  return realPhotos[name.toLowerCase()] || `/placeholder.svg?height=100&width=100&query=${name}`;
};


export const PLAYERS: Record<Position, Player[]> = {
  Top: [
    { name: "Ayel", position: "Top", photo: getPlayerPhoto("ayel") },
    { name: "Hidan", position: "Top", photo: getPlayerPhoto("hidan") },
    { name: "Kiari", position: "Top", photo: getPlayerPhoto("kiari") },
    { name: "Makes", position: "Top", photo: getPlayerPhoto("makes") },
    { name: "Pijack", position: "Top", photo: getPlayerPhoto("pijack") },
    { name: "Tay", position: "Top", photo: getPlayerPhoto("tay") },
    { name: "Xyno", position: "Top", photo: getPlayerPhoto("xyno") },
    { name: "Yang", position: "Top", photo: getPlayerPhoto("yang") },
    { name: "Zekas", position: "Top", photo: getPlayerPhoto("zekas") },
    { name: "Zynts", position: "Top", photo: getPlayerPhoto("zynts") },
  ],
  Jungle: [
    { name: "Accez", position: "Jungle", photo: getPlayerPhoto("accez") },
    { name: "Anato", position: "Jungle", photo: getPlayerPhoto("anato") },
    { name: "Dizin", position: "Jungle", photo: getPlayerPhoto("dizin") },
    { name: "Drakehero", position: "Jungle", photo: getPlayerPhoto("drakehero") },
    { name: "Randal", position: "Jungle", photo: getPlayerPhoto("randal") },
    { name: "Samkz", position: "Jungle", photo: getPlayerPhoto("samkz") },
    { name: "Sarolu", position: "Jungle", photo: getPlayerPhoto("sarolu") },
    { name: "Minerva", position: "Jungle", photo: getPlayerPhoto("minerva") },
    { name: "Shini", position: "Jungle", photo: getPlayerPhoto("shini") },
    { name: "Stiner", position: "Jungle", photo: getPlayerPhoto("stiner") },
  ],
  Mid: [
    { name: "Brucer", position: "Mid", photo: getPlayerPhoto("brucer") },
    { name: "Envy", position: "Mid", photo: getPlayerPhoto("envy") },
    { name: "Grevthar", position: "Mid", photo: getPlayerPhoto("grevthar") },
    { name: "Kami", position: "Mid", photo: getPlayerPhoto("kami") },
    { name: "Kina", position: "Mid", photo: getPlayerPhoto("kina") },
    { name: "Leleko", position: "Mid", photo: getPlayerPhoto("leleko") },
    { name: "Qats", position: "Mid", photo: getPlayerPhoto("qats") },
    { name: "Takeshi", position: "Mid", photo: getPlayerPhoto("takeshi") },
    { name: "Toucouille", position: "Mid", photo: getPlayerPhoto("toucouille") },
    { name: "Yoda", position: "Mid", photo: getPlayerPhoto("yoda") },
  ],
  ADC: [
    { name: "Absol", position: "ADC", photo: getPlayerPhoto("absol") },
    { name: "Bennie", position: "ADC", photo: getPlayerPhoto("bennie") },
    { name: "Brtt", position: "ADC", photo: getPlayerPhoto("brtt") },
    { name: "Celo", position: "ADC", photo: getPlayerPhoto("celo") },
    { name: "Duduhhh", position: "ADC", photo: getPlayerPhoto("duduhhh") },
    { name: "Gru", position: "ADC", photo: getPlayerPhoto("gru") },
    { name: "Juliera", position: "ADC", photo: getPlayerPhoto("juliera") },
    { name: "Kojima", position: "ADC", photo: getPlayerPhoto("kojima") },
    { name: "Micao", position: "ADC", photo: getPlayerPhoto("micao") },
    { name: "Netuno", position: "ADC", photo: getPlayerPhoto("netuno") },
  ],
  Suporte: [
    { name: "Bulecha", position: "Suporte", photo: getPlayerPhoto("bulecha") },
    { name: "Cavalo", position: "Suporte", photo: getPlayerPhoto("cavalo") },
    { name: "Guigs", position: "Suporte", photo: getPlayerPhoto("guigs") },
    { name: "Konseki", position: "Suporte", photo: getPlayerPhoto("konseki") },
    { name: "Momochi", position: "Suporte", photo: getPlayerPhoto("momochi") },
    { name: "Reaper", position: "Suporte", photo: getPlayerPhoto("reaper") },
    { name: "Scamber", position: "Suporte", photo: getPlayerPhoto("scamber") },
    { name: "Shoiti", position: "Suporte", photo: getPlayerPhoto("shoiti") },
    { name: "Telas", position: "Suporte", photo: getPlayerPhoto("telas") },
    { name: "Esa", position: "Suporte", photo: getPlayerPhoto("esa") },
  ],
}

export const CAPTAINS: Captain[] = [
  { name: "Brucer", position: "Mid", photo: getPlayerPhoto("brucer") },
  { name: "Absol", position: "ADC", photo: getPlayerPhoto("absol") },
  { name: "Brtt", position: "ADC", photo: getPlayerPhoto("brtt") },
  { name: "Takeshi", position: "Mid", photo: getPlayerPhoto("takeshi") },
  { name: "Yoda", position: "Mid", photo: getPlayerPhoto("yoda") },
  { name: "Kami", position: "Mid", photo: getPlayerPhoto("kami") },
  { name: "Tay", position: "Top", photo: getPlayerPhoto("tay") },
  { name: "Minerva", position: "Jungle", photo: getPlayerPhoto("minerva") },
  { name: "Esa", position: "Suporte", photo: getPlayerPhoto("esa") },
  { name: "Shini", position: "Jungle", photo: getPlayerPhoto("shini") },
]

export const POSITION_COLORS: Record<Position, string> = {
  Top: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Jungle: "bg-green-500/20 text-green-400 border-green-500/30",
  Mid: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  ADC: "bg-red-500/20 text-red-400 border-red-500/30",
  Suporte: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
}

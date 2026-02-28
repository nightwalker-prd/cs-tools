export interface Reciter {
  id: string;
  name: string;
  folder: string;
}

export const RECITERS: Reciter[] = [
  { id: 'mishary', name: 'Mishary Alafasy', folder: 'Alafasy_128kbps' },
  { id: 'husary', name: 'Mahmoud Al-Husary', folder: 'Husary_128kbps' },
  { id: 'minshawi', name: 'Mohamed Minshawi (Murattal)', folder: 'Minshawy_Murattal_128kbps' },
  { id: 'abdulbasit-murattal', name: 'Abdul Basit (Murattal)', folder: 'Abdul_Basit_Murattal_192kbps' },
  { id: 'abdulbasit-mujawwad', name: 'Abdul Basit (Mujawwad)', folder: 'Abdul_Basit_Mujawwad_128kbps' },
  { id: 'sudais', name: 'Abdul Rahman Al-Sudais', folder: 'Abdurrahmaan_As-Sudais_192kbps' },
  { id: 'shuraym', name: 'Saood Ash-Shuraym', folder: 'Saood_ash-Shuraym_128kbps' },
  { id: 'shatiri', name: 'Abu Bakr Ash-Shatiri', folder: 'Abu_Bakr_Ash-Shaatree_128kbps' },
  { id: 'muaiqly', name: 'Maher Al-Muaiqly', folder: 'MaherAlMuaiqly128kbps' },
  { id: 'rifai', name: 'Hani Ar-Rifai', folder: 'Hani_Rifai_192kbps' },
  { id: 'husary-muallim', name: 'Al-Husary (Muallim)', folder: 'Husary_Muallim_128kbps' },
  { id: 'dossari', name: 'Yasser Ad-Dossari', folder: 'Yasser_Ad-Dussary_128kbps' },
];

const RECITER_MAP = new Map(RECITERS.map(r => [r.id, r]));

export function getAudioUrl(reciterId: string, surah: number, ayah: number): string {
  const reciter = RECITER_MAP.get(reciterId) ?? RECITERS[0];
  const s = String(surah).padStart(3, '0');
  const a = String(ayah).padStart(3, '0');
  return `https://everyayah.com/data/${reciter.folder}/${s}${a}.mp3`;
}

export function getReciterName(reciterId: string): string {
  return RECITER_MAP.get(reciterId)?.name ?? RECITERS[0].name;
}

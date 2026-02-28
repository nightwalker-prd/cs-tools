// Quran audio reciters - everyayah.com CDN

export interface Reciter {
  id: string
  name: string
  folder: string
  style?: string
}

export const FEATURED_RECITERS: Reciter[] = [
  { id: 'mishary', name: 'Mishary Alafasy', folder: 'Alafasy_128kbps' },
  { id: 'husary', name: 'Mahmoud Al-Husary', folder: 'Husary_128kbps' },
  { id: 'sudais', name: 'Abdurrahman As-Sudais', folder: 'Abdurrahmaan_As-Sudais_192kbps' },
  { id: 'basit_murattal', name: 'Abdul Basit', folder: 'Abdul_Basit_Murattal_192kbps', style: 'Murattal' },
  { id: 'minshawi', name: 'Mohamed Minshawi', folder: 'Minshawy_Murattal_128kbps', style: 'Murattal' },
  { id: 'maher', name: 'Maher Al-Muaiqly', folder: 'MaherAlMuaiqly128kbps' },
]

export const ALL_RECITERS: Reciter[] = [
  ...FEATURED_RECITERS,
  { id: 'abdulsamad', name: 'Abdul Samad', folder: 'AbdulSamad_64kbps_QuranExplorer.Com' },
  { id: 'ajamy', name: 'Ahmed Al-Ajamy', folder: 'ahmed_ibn_ali_al_ajamy_128kbps' },
  { id: 'ali_hajjaj', name: 'Ali Hajjaj Alsouasi', folder: 'Ali_Hajjaj_AlSuesy_128kbps' },
  { id: 'ghamdi', name: 'Saad Al-Ghamdi', folder: 'Ghamadi_40kbps' },
  { id: 'hudhaify', name: 'Ali Al-Hudhaify', folder: 'Hudhaify_128kbps' },
  { id: 'ibrahim_akhdar', name: 'Ibrahim Al-Akhdar', folder: 'Ibrahim_Akhdar_32kbps' },
  { id: 'rifai', name: 'Hani Ar-Rifai', folder: 'Hani_Rifai_192kbps' },
  { id: 'menshawi_mujawwad', name: 'Minshawi', folder: 'Minshawy_Mujawwad_192kbps', style: 'Mujawwad' },
  { id: 'parhizgar', name: 'Shahriar Parhizgar', folder: 'Parhizgar_48kbps' },
  { id: 'shatri', name: 'Abu Bakr Shatri', folder: 'Abu_Bakr_Ash-Shaatree_128kbps' },
  { id: 'shuraym', name: 'Saud Ash-Shuraym', folder: 'Saood_ash-Shuraym_128kbps' },
  { id: 'tablaway', name: 'Mohammad Tablaway', folder: 'Mohammad_al_Tablaway_128kbps' },
]

export function getReciterById(id: string): Reciter | undefined {
  return ALL_RECITERS.find(r => r.id === id)
}

export function getAudioUrl(reciterFolder: string, surah: number, ayah: number): string {
  const s = String(surah).padStart(3, '0')
  const a = String(ayah).padStart(3, '0')
  return `https://everyayah.com/data/${reciterFolder}/${s}${a}.mp3`
}

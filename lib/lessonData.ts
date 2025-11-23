export interface LessonContent {
  id: number;
  moduleId: string;
  title: string;
  description: string;
  duration: string;
  xp: number;
  sections: {
    id: string;
    type: "text" | "image" | "interactive" | "video" | "quiz";
    title?: string;
    content?: string;
    imageUrl?: string;
    imageCaption?: string;
    interactiveContent?: any;
  }[];
  vocabulary?: {
    word: string;
    meaning: string;
  }[];
  keyTakeaways: string[];
}

export const aksaraLessons: Record<number, LessonContent> = {
  1: {
    id: 1,
    moduleId: "aksara",
    title: "Pengenalan Aksara Jawa",
    description: "Dasar-dasar aksara Jawa dan sejarahnya",
    duration: "10 menit",
    xp: 50,
    sections: [
      {
        id: "intro",
        type: "text",
        title: "Apa itu Aksara Jawa?",
        content:
          "Aksara Jawa adalah sistem tulisan tradisional yang digunakan untuk menulis bahasa Jawa. Aksara ini memiliki sejarah panjang dan merupakan bagian penting dari warisan budaya Indonesia.",
      },
      {
        id: "history",
        type: "text",
        title: "Sejarah Singkat",
        content:
          "Aksara Jawa berkembang dari aksara Kawi yang diperkenalkan ke Jawa pada abad ke-8 Masehi. Aksara ini terus berkembang dan digunakan hingga hari ini, terutama dalam penulisan naskah-naskah klasik dan seni kaligrafi.",
      },
      {
        id: "image1",
        type: "image",
        imageUrl: "/images/learn/aksara-jawa-chart.jpg",
        imageCaption: "Tabel lengkap Aksara Jawa (Hanacaraka)",
      },
      {
        id: "structure",
        type: "text",
        title: "Struktur Aksara Jawa",
        content:
          "Aksara Jawa terdiri dari 20 karakter dasar yang disebut 'Aksara Nglegena'. Setiap karakter mewakili suku kata konsonan + vokal 'a'. Sistem ini dilengkapi dengan 'Sandhangan' untuk mengubah bunyi vokal, dan 'Pasangan' untuk konsonan tanpa vokal.",
      },
      {
        id: "fun-fact",
        type: "text",
        title: "Fakta Menarik",
        content:
          "Kalimat 'Hanacaraka Datasawala Padhajayanya Magabathanga' adalah kalimat yang mengandung semua huruf dasar aksara Jawa. Kalimat ini memiliki makna filosofis yang mendalam tentang kehidupan!",
      },
    ],
    vocabulary: [
      {
        word: "Aksara Nglegena",
        meaning: "20 karakter dasar aksara Jawa",
      },
      {
        word: "Sandhangan",
        meaning: "Tanda diakritik untuk mengubah bunyi vokal",
      },
      {
        word: "Pasangan",
        meaning: "Bentuk khusus untuk konsonan tanpa vokal",
      },
      {
        word: "Hanacaraka",
        meaning: "Nama lain untuk aksara Jawa, dari huruf pertama",
      },
    ],
    keyTakeaways: [
      "Aksara Jawa adalah sistem tulisan tradisional untuk bahasa Jawa",
      "Terdiri dari 20 karakter dasar (Aksara Nglegena)",
      "Berkembang dari aksara Kawi sejak abad ke-8 M",
      "Masih digunakan hingga kini dalam seni kaligrafi dan naskah klasik",
      "Hanacaraka adalah kalimat yang mengandung semua huruf dasar",
    ],
  },
  2: {
    id: 2,
    moduleId: "aksara",
    title: "Huruf Vokal Aksara Jawa",
    description: "Belajar menulis dan membaca vokal",
    duration: "15 menit",
    xp: 75,
    sections: [
      {
        id: "intro",
        type: "text",
        title: "Sistem Vokal dalam Aksara Jawa",
        content:
          "Dalam aksara Jawa, vokal direpresentasikan dengan dua cara: Aksara Swara (vokal mandiri) untuk vokal di awal kata, dan Sandhangan (tanda diakritik) untuk vokal di tengah atau akhir kata.",
      },
      {
        id: "aksara-swara",
        type: "text",
        title: "Aksara Swara (Vokal Mandiri)",
        content:
          "Aksara Swara digunakan ketika vokal muncul di awal kata atau berdiri sendiri. Ada 5 vokal dasar: A, I, U, E, O. Masing-masing memiliki bentuk unik dalam aksara Jawa.",
      },
      {
        id: "sandhangan",
        type: "text",
        title: "Sandhangan (Tanda Vokal)",
        content:
          "Sandhangan adalah tanda kecil yang ditambahkan pada aksara dasar untuk mengubah bunyi vokalnya. Misalnya, karakter 'ka' dapat diubah menjadi 'ki', 'ku', 'ke', atau 'ko' dengan menambahkan sandhangan yang sesuai.",
      },
      {
        id: "practice",
        type: "text",
        title: "Latihan Membaca",
        content:
          "Mari berlatih! Kata 'Budi' dalam aksara Jawa ditulis dengan menggabungkan aksara 'ba' + sandhangan 'u', kemudian 'da' + sandhangan 'i'. Perhatikan bagaimana sandhangan mengubah bunyi vokal dasar.",
      },
    ],
    vocabulary: [
      {
        word: "Aksara Swara",
        meaning: "Vokal mandiri yang digunakan di awal kata",
      },
      {
        word: "Sandhangan",
        meaning: "Tanda diakritik untuk mengubah bunyi vokal",
      },
      {
        word: "Wulu",
        meaning: "Sandhangan untuk bunyi 'i'",
      },
      {
        word: "Suku",
        meaning: "Sandhangan untuk bunyi 'u'",
      },
      {
        word: "Taling",
        meaning: "Sandhangan untuk bunyi 'e'",
      },
      {
        word: "Pepet",
        meaning: "Sandhangan untuk bunyi 'ê' (e pepet)",
      },
    ],
    keyTakeaways: [
      "Ada 5 vokal dasar dalam aksara Jawa: A, I, U, E, O",
      "Aksara Swara digunakan untuk vokal di awal kata",
      "Sandhangan adalah tanda untuk mengubah bunyi vokal",
      "Setiap vokal memiliki bentuk sandhangan yang unik",
      "Kombinasi aksara + sandhangan membentuk suku kata",
    ],
  },
  3: {
    id: 3,
    moduleId: "aksara",
    title: "Huruf Konsonan Aksara Jawa",
    description: "Mengenal konsonan dalam aksara Jawa",
    duration: "20 menit",
    xp: 100,
    sections: [
      {
        id: "intro",
        type: "text",
        title: "20 Aksara Nglegena",
        content:
          "Aksara Nglegena adalah 20 konsonan dasar dalam aksara Jawa. Setiap konsonan memiliki vokal 'a' bawaan. Urutan aksara ini dimulai dengan 'ha, na, ca, ra, ka' dan dikenal dengan sebutan 'Hanacaraka'.",
      },
      {
        id: "groups",
        type: "text",
        title: "Pengelompokan Konsonan",
        content:
          "Aksara Jawa dikelompokkan berdasarkan tempat artikulasi (cara pengucapan):\n\n• Dental (gigi): ta, tha, da, dha, na\n• Labial (bibir): pa, pha, ba, bha, ma\n• Palatal (langit-langit): ca, cha, ja, jha, nya\n• Velar (tenggorokan): ka, kha, ga, gha, nga\n• Lainnya: ha, ra, la, wa, sa",
      },
      {
        id: "writing",
        type: "text",
        title: "Cara Menulis Konsonan",
        content:
          "Setiap konsonan ditulis dengan urutan goresan tertentu. Penting untuk mengikuti urutan yang benar agar bentuk aksara proporsional dan mudah dibaca. Mari pelajari goresan dasar untuk beberapa aksara yang sering digunakan.",
      },
      {
        id: "examples",
        type: "text",
        title: "Contoh Penggunaan",
        content:
          "Mari lihat contoh kata sederhana:\n\n• 'Bapa' (Ayah) = ba + pa\n• 'Mama' (Ibu) = ma + ma\n• 'Saka' (Dari) = sa + ka\n• 'Naga' (Naga) = na + ga\n\nPerhatikan bagaimana setiap konsonan mempertahankan bunyi vokal 'a' bawaannya.",
      },
    ],
    vocabulary: [
      {
        word: "Aksara Nglegena",
        meaning: "20 konsonan dasar aksara Jawa",
      },
      {
        word: "Hanacaraka",
        meaning: "Nama urutan aksara Jawa (dari huruf pertama)",
      },
      {
        word: "Dental",
        meaning: "Konsonan yang diucapkan dengan gigi",
      },
      {
        word: "Labial",
        meaning: "Konsonan yang diucapkan dengan bibir",
      },
      {
        word: "Palatal",
        meaning: "Konsonan yang diucapkan dengan langit-langit",
      },
      {
        word: "Velar",
        meaning: "Konsonan yang diucapkan dengan tenggorokan",
      },
    ],
    keyTakeaways: [
      "Ada 20 konsonan dasar (Aksara Nglegena) dalam aksara Jawa",
      "Setiap konsonan memiliki vokal 'a' bawaan",
      "Konsonan dikelompokkan berdasarkan cara pengucapan",
      "Urutan penulisan goresan sangat penting",
      "Kombinasi dengan sandhangan membentuk suku kata lain",
    ],
  },
  4: {
    id: 4,
    moduleId: "aksara",
    title: "Pasangan dan Sandhangan",
    description: "Aturan penulisan pasangan huruf",
    duration: "25 menit",
    xp: 125,
    sections: [
      {
        id: "intro",
        type: "text",
        title: "Apa itu Pasangan?",
        content:
          "Pasangan adalah bentuk khusus dari aksara yang digunakan untuk menuliskan konsonan tanpa vokal (konsonan mati). Setiap aksara nglegena memiliki bentuk pasangan yang unik.",
      },
      {
        id: "function",
        type: "text",
        title: "Fungsi Pasangan",
        content:
          "Dalam bahasa Indonesia atau Jawa, sering ada konsonan yang tidak diikuti vokal, seperti pada kata 'mangga' (konsonan 'ng' pertama). Dalam aksara Jawa, konsonan mati ini ditulis dengan pasangan.",
      },
      {
        id: "position",
        type: "text",
        title: "Posisi Penulisan",
        content:
          "Pasangan biasanya ditulis di bawah aksara sebelumnya. Misalnya, kata 'mangga' ditulis dengan: ma + pasangan-nga + ga. Pasangan 'nga' ditulis di bawah aksara 'ma'.",
      },
      {
        id: "sandhangan-advanced",
        type: "text",
        title: "Sandhangan Lanjutan",
        content:
          "Selain sandhangan vokal, ada juga sandhangan khusus:\n\n• Wignyan (ḥ): untuk bunyi 'h' di akhir\n• Cecak (ṅ): untuk bunyi 'ng' di akhir\n• Layar (r): untuk bunyi 'r' di akhir\n• Pangkon: untuk mematikan aksara (tidak ada vokal)",
      },
      {
        id: "examples",
        type: "text",
        title: "Contoh Kompleks",
        content:
          "Mari lihat kata yang lebih kompleks:\n\n• 'Anak' = a + na + pangkon + ka\n• 'Mulang' = ma + sandhangan-u + la + cecak\n• 'Bapak' = ba + pa + pangkon + ka\n\nPerhatikan kombinasi aksara, sandhangan, dan pasangan!",
      },
    ],
    vocabulary: [
      {
        word: "Pasangan",
        meaning: "Bentuk khusus aksara untuk konsonan mati",
      },
      {
        word: "Pangkon",
        meaning: "Sandhangan untuk mematikan aksara (menghilangkan vokal)",
      },
      {
        word: "Wignyan",
        meaning: "Sandhangan untuk bunyi 'h' di akhir kata",
      },
      {
        word: "Cecak",
        meaning: "Sandhangan untuk bunyi 'ng' di akhir kata",
      },
      {
        word: "Layar",
        meaning: "Sandhangan untuk bunyi 'r' di akhir kata",
      },
    ],
    keyTakeaways: [
      "Pasangan adalah bentuk khusus untuk konsonan mati",
      "Pasangan biasanya ditulis di bawah aksara sebelumnya",
      "Pangkon digunakan untuk mematikan vokal aksara",
      "Ada sandhangan khusus untuk bunyi akhir (wignyan, cecak, layar)",
      "Kombinasi aksara, sandhangan, dan pasangan membentuk kata lengkap",
    ],
  },
  5: {
    id: 5,
    moduleId: "aksara",
    title: "Latihan Menulis Kata Sederhana",
    description: "Praktik menulis kata-kata dasar",
    duration: "15 menit",
    xp: 100,
    sections: [
      {
        id: "intro",
        type: "text",
        title: "Saatnya Berlatih!",
        content:
          "Setelah mempelajari vokal, konsonan, dan pasangan, sekarang saatnya berlatih menulis kata-kata sederhana dalam aksara Jawa. Mulai dengan kata-kata sehari-hari yang sering digunakan.",
      },
      {
        id: "basic-words",
        type: "text",
        title: "Kata-kata Dasar",
        content:
          "Mari mulai dengan kata-kata sederhana 2-3 suku kata:\n\n• Bapa (Ayah)\n• Ibu (Ibu)\n• Anak (Anak)\n• Saka (Dari)\n• Teka (Datang)\n• Lunga (Pergi)\n• Mangan (Makan)\n• Turu (Tidur)\n\nCobalah menulis setiap kata dengan menggabungkan aksara yang sudah dipelajari!",
      },
      {
        id: "practice-tips",
        type: "text",
        title: "Tips Menulis",
        content:
          "Beberapa tips untuk menulis aksara Jawa dengan baik:\n\n1. Mulai dengan goresan yang benar\n2. Jaga proporsi dan ukuran aksara\n3. Berikan jarak yang cukup antar aksara\n4. Latihan secara konsisten setiap hari\n5. Gunakan kertas bergaris untuk pemula",
      },
      {
        id: "exercise",
        type: "text",
        title: "Latihan Mandiri",
        content:
          "Tugas: Cobalah menulis nama kamu sendiri dalam aksara Jawa! Pisahkan nama menjadi suku kata, lalu tulis setiap suku kata menggunakan aksara dan sandhangan yang sesuai. Jangan lupa berlatih berulang kali!",
      },
    ],
    vocabulary: [
      {
        word: "Bapa",
        meaning: "Ayah (dalam bahasa Jawa)",
      },
      {
        word: "Ibu",
        meaning: "Ibu (dalam bahasa Jawa)",
      },
      {
        word: "Mangan",
        meaning: "Makan",
      },
      {
        word: "Turu",
        meaning: "Tidur",
      },
    ],
    keyTakeaways: [
      "Latihan konsisten adalah kunci menguasai aksara Jawa",
      "Mulai dengan kata-kata sederhana 2-3 suku kata",
      "Perhatikan urutan goresan dan proporsi aksara",
      "Menulis nama sendiri adalah latihan yang baik",
      "Gunakan kertas bergaris untuk menjaga keseragaman",
    ],
  },
};

// Symphony Lessons
export const symphonyLessons: Record<number, LessonContent> = {
  1: {
    id: 1,
    moduleId: "symphony",
    title: "Pengenalan Gamelan",
    description: "Mengenal gamelan dan perannya dalam budaya Jawa",
    duration: "12 menit",
    xp: 75,
    sections: [
      {
        id: "intro",
        type: "text",
        title: "Apa itu Gamelan?",
        content:
          "Gamelan adalah ansambel musik tradisional Indonesia yang terdiri dari berbagai instrumen seperti gong, kendang, saron, dan bonang. Musik gamelan memiliki harmoni unik yang mencerminkan keindahan budaya Nusantara.",
      },
      {
        id: "instruments",
        type: "text",
        title: "Instrumen Gamelan",
        content:
          "Gamelan terdiri dari berbagai instrumen:\n\n• Gong: Instrumen besar yang memberikan nada rendah\n• Kendang: Drum yang mengatur tempo\n• Saron: Metalofon dengan bilah perunggu\n• Bonang: Deretan gong kecil yang dimainkan dengan pemukul\n• Gender: Metalofon dengan resonator bambu",
      },
    ],
    vocabulary: [
      { word: "Gamelan", meaning: "Ansambel musik tradisional Jawa" },
      { word: "Gong", meaning: "Instrumen perkusi besar dari perunggu" },
      { word: "Kendang", meaning: "Drum pengatur tempo dalam gamelan" },
    ],
    keyTakeaways: [
      "Gamelan adalah ansambel musik tradisional Indonesia",
      "Terdiri dari berbagai instrumen perkusi dan metalofon",
      "Memiliki peran penting dalam upacara dan pertunjukan",
    ],
  },
};

// Map Lessons
export const mapLessons: Record<number, LessonContent> = {
  1: {
    id: 1,
    moduleId: "map",
    title: "Museum Nasional Indonesia",
    description: "Mengenal Museum Gajah, museum tertua di Indonesia",
    duration: "10 menit",
    xp: 60,
    sections: [
      {
        id: "intro",
        type: "text",
        title: "Sejarah Museum Nasional",
        content:
          "Museum Nasional Indonesia, atau dikenal sebagai Museum Gajah, didirikan pada tahun 1778. Museum ini menyimpan lebih dari 190.000 koleksi artefak bersejarah dari seluruh Nusantara.",
      },
      {
        id: "collections",
        type: "text",
        title: "Koleksi Utama",
        content:
          "Museum ini memiliki koleksi yang sangat beragam:\n\n• Prasasti kuno dari berbagai kerajaan\n• Arca dan patung Hindu-Buddha\n• Keramik dari berbagai dinasti\n• Tekstil dan batik tradisional\n• Etnografi dari seluruh Indonesia",
      },
    ],
    vocabulary: [
      { word: "Museum", meaning: "Tempat penyimpanan benda bersejarah" },
      { word: "Artefak", meaning: "Benda peninggalan sejarah" },
      { word: "Prasasti", meaning: "Tulisan kuno pada batu atau logam" },
    ],
    keyTakeaways: [
      "Museum Nasional adalah museum tertua di Indonesia",
      "Menyimpan 190.000+ koleksi dari seluruh Nusantara",
      "Memiliki koleksi prasasti, arca, dan etnografi yang lengkap",
    ],
  },
};

// Pola Lessons
export const polaLessons: Record<number, LessonContent> = {
  1: {
    id: 1,
    moduleId: "pola",
    title: "Filosofi Batik Parang",
    description: "Memahami makna dan sejarah motif Parang",
    duration: "15 menit",
    xp: 80,
    sections: [
      {
        id: "intro",
        type: "text",
        title: "Motif Parang",
        content:
          "Batik Parang adalah salah satu motif batik klasik yang berasal dari Keraton Yogyakarta dan Solo. Motif ini memiliki makna filosofis yang dalam tentang kekuatan dan keteguhan.",
      },
      {
        id: "meaning",
        type: "text",
        title: "Makna Filosofis",
        content:
          "Motif Parang melambangkan:\n\n• Kekuatan dan keteguhan hati\n• Perjuangan tanpa henti seperti ombak laut\n• Keberanian menghadapi tantangan\n• Kesucian dan keluhuran budi\n\nDahulu, motif Parang hanya boleh dikenakan oleh keluarga keraton.",
      },
    ],
    vocabulary: [
      { word: "Parang", meaning: "Motif batik berbentuk diagonal seperti ombak" },
      { word: "Motif", meaning: "Pola atau corak pada kain" },
      { word: "Keraton", meaning: "Istana raja" },
    ],
    keyTakeaways: [
      "Parang adalah motif batik klasik dari keraton",
      "Melambangkan kekuatan dan keteguhan",
      "Dahulu eksklusif untuk keluarga keraton",
    ],
  },
};

// Loka Lessons
export const lokaLessons: Record<number, LessonContent> = {
  1: {
    id: 1,
    moduleId: "loka",
    title: "Rendang: Masakan Terbaik Dunia",
    description: "Sejarah dan filosofi di balik rendang",
    duration: "12 menit",
    xp: 70,
    sections: [
      {
        id: "intro",
        type: "text",
        title: "Asal Usul Rendang",
        content:
          "Rendang adalah masakan tradisional Minangkabau yang telah diakui sebagai salah satu makanan terlezat di dunia oleh CNN. Proses pembuatan rendang membutuhkan kesabaran dan ketelatenan.",
      },
      {
        id: "philosophy",
        type: "text",
        title: "Filosofi Rendang",
        content:
          "Rendang melambangkan filosofi masyarakat Minangkabau:\n\n• Daging: Niniak Mamak (pemimpin adat)\n• Santan: Cadiak Pandai (cendekiawan)\n• Cabai: Alim Ulama (pemuka agama)\n• Rempah: Seluruh masyarakat\n\nSemua bahan harus menyatu untuk menciptakan harmoni yang sempurna.",
      },
    ],
    vocabulary: [
      { word: "Rendang", meaning: "Masakan daging dengan santan dan rempah" },
      { word: "Minangkabau", meaning: "Suku di Sumatera Barat" },
      { word: "Niniak Mamak", meaning: "Pemimpin adat Minangkabau" },
    ],
    keyTakeaways: [
      "Rendang berasal dari Minangkabau",
      "Memiliki filosofi tentang keharmonisan masyarakat",
      "Diakui sebagai makanan terlezat di dunia",
    ],
  },
};

// Function to get lesson by module and lesson ID
export function getLessonContent(
  moduleId: string,
  lessonId: number
): LessonContent | null {
  switch (moduleId) {
    case "aksara":
      return aksaraLessons[lessonId] || null;
    case "symphony":
      return symphonyLessons[lessonId] || null;
    case "map":
      return mapLessons[lessonId] || null;
    case "pola":
      return polaLessons[lessonId] || null;
    case "loka":
      return lokaLessons[lessonId] || null;
    default:
      return null;
  }
}

// Function to get all lessons for a module
export function getModuleLessons(moduleId: string): LessonContent[] {
  switch (moduleId) {
    case "aksara":
      return Object.values(aksaraLessons);
    case "symphony":
      return Object.values(symphonyLessons);
    case "map":
      return Object.values(mapLessons);
    case "pola":
      return Object.values(polaLessons);
    case "loka":
      return Object.values(lokaLessons);
    default:
      return [];
  }
}

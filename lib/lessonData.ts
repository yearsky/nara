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

// Function to get lesson by module and lesson ID
export function getLessonContent(
  moduleId: string,
  lessonId: number
): LessonContent | null {
  if (moduleId === "aksara") {
    return aksaraLessons[lessonId] || null;
  }
  // Add other modules here as needed
  return null;
}

// Function to get all lessons for a module
export function getModuleLessons(moduleId: string): LessonContent[] {
  if (moduleId === "aksara") {
    return Object.values(aksaraLessons);
  }
  // Add other modules here
  return [];
}

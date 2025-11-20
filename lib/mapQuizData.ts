// Quiz data untuk Nara Map (Museum & Heritage)

export type QuestionType = "multiple_choice" | "true_false";

export interface MapQuizQuestion {
  id: number;
  type: QuestionType;
  question: string;
  options?: string[];
  correctAnswer: number;
  explanation: string;
  hint: string;
  difficulty: "easy" | "medium" | "hard";
}

export interface MapQuiz {
  id: number;
  title: string;
  category: "museum" | "heritage" | "general";
  questions: MapQuizQuestion[];
  passingScore: number;
}

export const mapQuizzes: MapQuiz[] = [
  {
    id: 1,
    title: "Museum Nasional Indonesia",
    category: "museum",
    passingScore: 70,
    questions: [
      {
        id: 1,
        type: "multiple_choice",
        question: "Di kota mana Museum Nasional Indonesia berada?",
        options: ["Bandung", "Jakarta", "Yogyakarta", "Surabaya"],
        correctAnswer: 1,
        explanation:
          "Museum Nasional Indonesia atau Museum Gajah terletak di Jakarta Pusat, tepatnya di Jalan Medan Merdeka Barat.",
        hint: "Museum ini sering disebut Museum Gajah dan ada di ibu kota.",
        difficulty: "easy",
      },
      {
        id: 2,
        type: "true_false",
        question:
          "Museum Nasional Indonesia memiliki koleksi lebih dari 140.000 benda bersejarah.",
        options: ["Benar", "Salah"],
        correctAnswer: 0,
        explanation:
          "Benar! Museum Nasional memiliki koleksi lebih dari 140.000 benda yang mencakup arkeologi, sejarah, etnografi, dan geografi.",
        hint: "Museum ini adalah museum terbesar di Indonesia.",
        difficulty: "medium",
      },
      {
        id: 3,
        type: "multiple_choice",
        question: "Mengapa Museum Nasional disebut Museum Gajah?",
        options: [
          "Koleksi gajah purba yang banyak",
          "Ada patung gajah perunggu di halaman depan",
          "Bangunannya berbentuk gajah",
          "Pendirinya pecinta gajah",
        ],
        correctAnswer: 1,
        explanation:
          "Museum ini dijuluki Museum Gajah karena ada patung gajah perunggu pemberian Raja Thailand pada tahun 1871 di halaman depannya.",
        hint: "Lihat patung di halaman depan museum.",
        difficulty: "easy",
      },
      {
        id: 4,
        type: "multiple_choice",
        question: "Kapan Museum Nasional Indonesia pertama kali dibuka?",
        options: ["1778", "1868", "1945", "1950"],
        correctAnswer: 1,
        explanation:
          "Museum Nasional pertama kali dibuka untuk umum pada tanggal 17 September 1868.",
        hint: "Museum ini didirikan pada abad ke-19, sebelum kemerdekaan RI.",
        difficulty: "hard",
      },
      {
        id: 5,
        type: "true_false",
        question:
          "Arca Prajnaparamita yang terkenal adalah salah satu koleksi Museum Nasional.",
        options: ["Benar", "Salah"],
        correctAnswer: 0,
        explanation:
          "Benar! Arca Prajnaparamita dari abad ke-13 adalah salah satu koleksi paling terkenal di museum ini.",
        hint: "Arca ini sangat terkenal dan sering menjadi ikon museum.",
        difficulty: "medium",
      },
    ],
  },
  {
    id: 2,
    title: "Candi Borobudur",
    category: "heritage",
    passingScore: 70,
    questions: [
      {
        id: 1,
        type: "multiple_choice",
        question: "Di provinsi mana Candi Borobudur berada?",
        options: [
          "Jawa Timur",
          "Jawa Tengah",
          "DI Yogyakarta",
          "Banten",
        ],
        correctAnswer: 1,
        explanation:
          "Candi Borobudur terletak di Magelang, Jawa Tengah, sekitar 40 km dari Yogyakarta.",
        hint: "Candi ini dekat dengan Yogyakarta tetapi secara administratif bukan di DIY.",
        difficulty: "easy",
      },
      {
        id: 2,
        type: "true_false",
        question: "Candi Borobudur adalah candi Buddha terbesar di dunia.",
        options: ["Benar", "Salah"],
        correctAnswer: 0,
        explanation:
          "Benar! Borobudur adalah monumen Buddha terbesar di dunia dan merupakan Situs Warisan Dunia UNESCO.",
        hint: "Candi ini sangat terkenal di seluruh dunia.",
        difficulty: "easy",
      },
      {
        id: 3,
        type: "multiple_choice",
        question: "Berapa jumlah stupa di puncak Candi Borobudur?",
        options: ["1 stupa besar", "3 stupa", "72 stupa", "108 stupa"],
        correctAnswer: 2,
        explanation:
          "Di puncak Borobudur terdapat 72 stupa berlubang yang mengelilingi 1 stupa induk besar di tengah.",
        hint: "Ada banyak stupa berlubang yang mengelilingi stupa utama.",
        difficulty: "medium",
      },
      {
        id: 4,
        type: "multiple_choice",
        question: "Pada dinasti mana Candi Borobudur dibangun?",
        options: [
          "Dinasti Sanjaya",
          "Dinasti Syailendra",
          "Dinasti Majapahit",
          "Dinasti Singasari",
        ],
        correctAnswer: 1,
        explanation:
          "Candi Borobudur dibangun oleh Dinasti Syailendra sekitar abad ke-8 hingga ke-9 Masehi.",
        hint: "Dinasti ini terkenal sebagai pembuat candi-candi Buddha megah.",
        difficulty: "hard",
      },
      {
        id: 5,
        type: "true_false",
        question:
          "Relief di dinding Candi Borobudur menceritakan kehidupan Buddha Gautama.",
        options: ["Benar", "Salah"],
        correctAnswer: 0,
        explanation:
          "Benar! Relief di Borobudur menceritakan perjalanan hidup Buddha dan ajaran-ajaran Buddhisme.",
        hint: "Relief adalah cara menceritakan kisah di masa lampau.",
        difficulty: "easy",
      },
    ],
  },
  {
    id: 3,
    title: "Museum & Heritage Umum",
    category: "general",
    passingScore: 70,
    questions: [
      {
        id: 1,
        type: "multiple_choice",
        question: "Candi Prambanan didedikasikan untuk dewa Hindu yang mana?",
        options: ["Wisnu", "Trimurti (Brahma, Wisnu, Siwa)", "Siwa", "Ganesha"],
        correctAnswer: 1,
        explanation:
          "Candi Prambanan memiliki 3 candi utama yang didedikasikan untuk Trimurti: Brahma, Wisnu, dan Siwa.",
        hint: "Ada tiga candi utama di kompleks Prambanan.",
        difficulty: "medium",
      },
      {
        id: 2,
        type: "true_false",
        question:
          "Taman Mini Indonesia Indah (TMII) memiliki anjungan dari semua provinsi di Indonesia.",
        options: ["Benar", "Salah"],
        correctAnswer: 0,
        explanation:
          "Benar! TMII memiliki 33 anjungan yang mewakili rumah adat dan budaya dari seluruh provinsi di Indonesia.",
        hint: "TMII adalah miniatur Indonesia dengan anjungan dari setiap provinsi.",
        difficulty: "easy",
      },
      {
        id: 3,
        type: "multiple_choice",
        question: "Apa nama museum kereta api yang terkenal di Indonesia?",
        options: [
          "Museum Transportasi",
          "Museum Kereta Api Ambarawa",
          "Museum Lokomotif",
          "Museum KAI",
        ],
        correctAnswer: 1,
        explanation:
          "Museum Kereta Api Ambarawa di Jawa Tengah adalah museum kereta api tertua dan terkenal di Indonesia.",
        hint: "Museum ini ada di kota Ambarawa, Jawa Tengah.",
        difficulty: "medium",
      },
      {
        id: 4,
        type: "true_false",
        question: "Keraton Yogyakarta masih dihuni oleh Sultan Yogyakarta hingga sekarang.",
        options: ["Benar", "Salah"],
        correctAnswer: 0,
        explanation:
          "Benar! Keraton Yogyakarta masih menjadi tempat tinggal Sultan Hamengku Buwono dan keluarga kerajaan.",
        hint: "Yogyakarta masih memiliki Sultan yang aktif.",
        difficulty: "easy",
      },
      {
        id: 5,
        type: "multiple_choice",
        question: "Situs Manusia Purba Sangiran terletak di provinsi mana?",
        options: [
          "Jawa Timur",
          "Jawa Barat",
          "Jawa Tengah",
          "DI Yogyakarta",
        ],
        correctAnswer: 2,
        explanation:
          "Situs Sangiran terletak di Jawa Tengah dan merupakan Situs Warisan Dunia UNESCO untuk penemuan fosil manusia purba.",
        hint: "Situs ini dekat dengan Kota Solo.",
        difficulty: "medium",
      },
      {
        id: 6,
        type: "true_false",
        question: "Benteng Rotterdam adalah peninggalan Belanda yang ada di Makassar.",
        options: ["Benar", "Salah"],
        correctAnswer: 0,
        explanation:
          "Benar! Benteng Rotterdam atau Fort Rotterdam adalah benteng peninggalan VOC Belanda di Makassar, Sulawesi Selatan.",
        hint: "Nama benteng ini diambil dari nama kota di Belanda.",
        difficulty: "easy",
      },
      {
        id: 7,
        type: "multiple_choice",
        question: "Rumah Gadang adalah rumah adat dari daerah mana?",
        options: [
          "Sumatera Utara",
          "Sumatera Barat",
          "Sumatera Selatan",
          "Aceh",
        ],
        correctAnswer: 1,
        explanation:
          "Rumah Gadang adalah rumah adat Minangkabau dari Sumatera Barat dengan atap berbentuk tanduk kerbau.",
        hint: "Rumah ini ciri khas Minangkabau.",
        difficulty: "easy",
      },
      {
        id: 8,
        type: "multiple_choice",
        question: "Apa yang dimaksud dengan 'Cagar Budaya'?",
        options: [
          "Bangunan modern yang indah",
          "Warisan budaya yang dilindungi negara",
          "Museum swasta",
          "Tempat wisata berbayar",
        ],
        correctAnswer: 1,
        explanation:
          "Cagar Budaya adalah warisan budaya bersifat kebendaan berupa benda, bangunan, struktur, situs, dan kawasan yang perlu dilestarikan karena nilai penting bagi sejarah, ilmu pengetahuan, dan kebudayaan.",
        hint: "Istilah ini berkaitan dengan pelestarian warisan budaya.",
        difficulty: "medium",
      },
    ],
  },
];

// Helper functions
export function getMapQuizById(id: number): MapQuiz | undefined {
  return mapQuizzes.find((quiz) => quiz.id === id);
}

export function getMapQuizzesByCategory(
  category: "museum" | "heritage" | "general" | "all"
): MapQuiz[] {
  if (category === "all") return mapQuizzes;
  return mapQuizzes.filter((quiz) => quiz.category === category);
}

export function calculateScore(
  totalQuestions: number,
  correctAnswers: number
): number {
  return Math.round((correctAnswers / totalQuestions) * 100);
}

export function getGradeFromScore(score: number): {
  grade: string;
  message: string;
  stars: number;
} {
  if (score >= 90) {
    return {
      grade: "A",
      message: "Luar biasa! Kamu paham betul tentang heritage Indonesia! 🌟",
      stars: 3,
    };
  } else if (score >= 80) {
    return {
      grade: "B",
      message: "Bagus sekali! Pengetahuan museum & heritage-mu solid! ⭐",
      stars: 3,
    };
  } else if (score >= 70) {
    return {
      grade: "C",
      message: "Cukup baik! Terus belajar tentang warisan budaya ya! 👍",
      stars: 2,
    };
  } else if (score >= 60) {
    return {
      grade: "D",
      message: "Lumayan! Coba eksplorasi lebih banyak museum ya! 📖",
      stars: 1,
    };
  } else {
    return {
      grade: "E",
      message: "Jangan menyerah! Kunjungi museum dan baca lagi! 💪",
      stars: 1,
    };
  }
}

// Game data for Nara Map
export interface MapGameData {
  museums: {
    name: string;
    region: string;
    city: string;
    description: string;
  }[];
  heritageSites: {
    name: string;
    region: string;
    type: string;
    description: string;
  }[];
}

export const mapGameData: MapGameData = {
  museums: [
    {
      name: "Museum Nasional",
      region: "DKI Jakarta",
      city: "Jakarta",
      description: "Museum terbesar di Indonesia dengan 140.000+ koleksi",
    },
    {
      name: "Museum Fatahillah",
      region: "DKI Jakarta",
      city: "Jakarta",
      description: "Museum sejarah Jakarta di Kota Tua",
    },
    {
      name: "Museum Benteng Vredeburg",
      region: "DI Yogyakarta",
      city: "Yogyakarta",
      description: "Museum sejarah perjuangan Indonesia",
    },
    {
      name: "Museum Angkut",
      region: "Jawa Timur",
      city: "Malang",
      description: "Museum transportasi terbesar di Asia Tenggara",
    },
    {
      name: "Museum Tsunami Aceh",
      region: "Aceh",
      city: "Banda Aceh",
      description: "Museum peringatan tsunami Aceh 2004",
    },
  ],
  heritageSites: [
    {
      name: "Candi Borobudur",
      region: "Jawa Tengah",
      type: "Candi Buddha",
      description: "Candi Buddha terbesar di dunia",
    },
    {
      name: "Candi Prambanan",
      region: "DI Yogyakarta",
      type: "Candi Hindu",
      description: "Kompleks candi Hindu terbesar di Indonesia",
    },
    {
      name: "Benteng Fort Rotterdam",
      region: "Sulawesi Selatan",
      type: "Benteng",
      description: "Benteng peninggalan VOC di Makassar",
    },
    {
      name: "Tana Toraja",
      region: "Sulawesi Selatan",
      type: "Kawasan Budaya",
      description: "Kawasan dengan tradisi pemakaman unik",
    },
    {
      name: "Keraton Yogyakarta",
      region: "DI Yogyakarta",
      type: "Istana",
      description: "Istana Sultan Yogyakarta yang masih aktif",
    },
  ],
};

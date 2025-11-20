// Quiz data untuk Nara Symphony (Musik Tradisional)

export type QuestionType = "multiple_choice" | "true_false";

export interface SymphonyQuizQuestion {
  id: number;
  type: QuestionType;
  question: string;
  options?: string[];
  correctAnswer: number;
  explanation: string;
  hint: string;
  difficulty: "easy" | "medium" | "hard";
}

export interface SymphonyQuiz {
  id: number;
  title: string;
  category: "gamelan" | "alat-musik" | "general";
  questions: SymphonyQuizQuestion[];
  passingScore: number;
}

export const symphonyQuizzes: SymphonyQuiz[] = [
  {
    id: 1,
    title: "Gamelan Nusantara",
    category: "gamelan",
    passingScore: 70,
    questions: [
      {
        id: 1,
        type: "multiple_choice",
        question: "Gamelan adalah musik tradisional yang berasal dari daerah mana?",
        options: ["Bali saja", "Jawa saja", "Jawa, Bali, dan Sunda", "Seluruh Indonesia"],
        correctAnswer: 2,
        explanation:
          "Gamelan berasal dari Jawa, Bali, dan Sunda. Setiap daerah memiliki karakteristik gamelan yang khas dan berbeda satu sama lain.",
        hint: "Tiga daerah utama di Indonesia memiliki gamelan.",
        difficulty: "easy",
      },
      {
        id: 2,
        type: "true_false",
        question: "Gamelan sebagian besar terdiri dari alat musik perkusi (dipukul).",
        options: ["Benar", "Salah"],
        correctAnswer: 0,
        explanation:
          "Benar! Gamelan adalah ansambel musik tradisional yang sebagian besar terdiri dari alat musik perkusi seperti bonang, saron, dan gong.",
        hint: "Kebanyakan alat gamelan dimainkan dengan dipukul.",
        difficulty: "easy",
      },
      {
        id: 3,
        type: "multiple_choice",
        question: "Apa fungsi bonang dalam gamelan?",
        options: [
          "Memberi nada dasar",
          "Memberi irama dan melodi penuntun",
          "Memberi ritme",
          "Menutup lagu",
        ],
        correctAnswer: 1,
        explanation:
          "Bonang adalah alat musik pukul yang terbuat dari kuningan, berfungsi memberi irama dan melodi penuntun dalam permainan gamelan.",
        hint: "Bonang berbentuk seperti pot-pot kecil yang disusun.",
        difficulty: "medium",
      },
      {
        id: 4,
        type: "multiple_choice",
        question: "Alat musik apa yang biasanya menutup atau mengakhiri frase musik gamelan?",
        options: ["Bonang", "Saron", "Gong", "Kendang"],
        correctAnswer: 2,
        explanation:
          "Gong adalah alat musik besar yang biasanya digunakan untuk menutup atau mengakhiri frase musik dalam permainan gamelan.",
        hint: "Alat musik besar yang bunyinya paling dalam.",
        difficulty: "easy",
      },
      {
        id: 5,
        type: "true_false",
        question: "Gamelan Jawa dan Gamelan Bali memiliki karakteristik yang sama persis.",
        options: ["Benar", "Salah"],
        correctAnswer: 1,
        explanation:
          "Salah! Gamelan Jawa dan Gamelan Bali memiliki karakteristik yang berbeda. Gamelan Bali cenderung lebih dinamis dan cepat, sedangkan Gamelan Jawa lebih halus dan mengalir.",
        hint: "Setiap daerah punya ciri khas sendiri.",
        difficulty: "medium",
      },
    ],
  },
  {
    id: 2,
    title: "Alat Musik Tradisional Nusantara",
    category: "alat-musik",
    passingScore: 70,
    questions: [
      {
        id: 1,
        type: "multiple_choice",
        question: "Angklung berasal dari daerah mana?",
        options: ["Jawa Timur", "Jawa Tengah", "Jawa Barat (Sunda)", "Bali"],
        correctAnswer: 2,
        explanation:
          "Angklung adalah alat musik tradisional dari bambu yang berasal dari tanah Sunda, Jawa Barat, dimainkan dengan cara digoyangkan.",
        hint: "Alat musik bambu ini dari tanah Pasundan.",
        difficulty: "easy",
      },
      {
        id: 2,
        type: "true_false",
        question: "Angklung telah diakui UNESCO sebagai warisan budaya Indonesia.",
        options: ["Benar", "Salah"],
        correctAnswer: 0,
        explanation:
          "Benar! Angklung telah diakui oleh UNESCO sebagai warisan budaya tak benda Indonesia dan sudah mendunia, pernah ditampilkan di Perancis dan Amerika Serikat.",
        hint: "Angklung sangat terkenal di dunia internasional.",
        difficulty: "easy",
      },
      {
        id: 3,
        type: "multiple_choice",
        question: "Sasando adalah alat musik petik yang berasal dari daerah mana?",
        options: ["Bali", "NTT (Nusa Tenggara Timur)", "Maluku", "Papua"],
        correctAnswer: 1,
        explanation:
          "Sasando adalah alat musik petik khas Rote, Nusa Tenggara Timur, yang terbuat dari daun lontar dan memiliki suara yang khas dan merdu.",
        hint: "Pulau Rote ada di Nusa Tenggara Timur.",
        difficulty: "medium",
      },
      {
        id: 4,
        type: "multiple_choice",
        question: "Kolintang adalah alat musik perkusi kayu dari daerah mana?",
        options: ["Sulawesi Selatan", "Sulawesi Utara (Minahasa)", "Sulawesi Tengah", "Gorontalo"],
        correctAnswer: 1,
        explanation:
          "Kolintang adalah instrumen perkusi kayu khas Minahasa, Sulawesi Utara, yang dimainkan dengan cara dipukul menggunakan stik.",
        hint: "Minahasa adalah suku di Sulawesi Utara.",
        difficulty: "medium",
      },
      {
        id: 5,
        type: "true_false",
        question: "Saluang adalah suling bambu khas Minangkabau, Sumatera Barat.",
        options: ["Benar", "Salah"],
        correctAnswer: 0,
        explanation:
          "Benar! Saluang adalah suling bambu tradisional khas Minangkabau, Sumatera Barat, yang sering dimainkan dalam pertunjukan musik tradisional Minang.",
        hint: "Suling ini khas dari tanah Minang.",
        difficulty: "easy",
      },
    ],
  },
  {
    id: 3,
    title: "Musik Tradisional Umum",
    category: "general",
    passingScore: 70,
    questions: [
      {
        id: 1,
        type: "multiple_choice",
        question: "Musik tradisional Indonesia yang paling terkenal di dunia internasional adalah?",
        options: ["Keroncong", "Gamelan", "Dangdut", "Campursari"],
        correctAnswer: 1,
        explanation:
          "Gamelan adalah musik tradisional Indonesia yang paling terkenal di dunia internasional, bahkan dipelajari di banyak universitas luar negeri.",
        hint: "Musik ansambel yang menggunakan banyak alat perkusi.",
        difficulty: "easy",
      },
      {
        id: 2,
        type: "true_false",
        question: "Setiap alat musik tradisional Indonesia memiliki cara memainkan yang unik.",
        options: ["Benar", "Salah"],
        correctAnswer: 0,
        explanation:
          "Benar! Setiap alat musik tradisional memiliki teknik memainkan yang unik, seperti angklung digoyangkan, sasando dipetik, kolintang dipukul, dan gamelan dimainkan dengan berbagai teknik.",
        hint: "Teknik bermain setiap alat musik berbeda-beda.",
        difficulty: "easy",
      },
      {
        id: 3,
        type: "multiple_choice",
        question: "Tifa adalah alat musik perkusi khas dari daerah mana?",
        options: ["Sumatera", "Jawa", "Maluku & Papua", "Kalimantan"],
        correctAnswer: 2,
        explanation:
          "Tifa adalah alat musik perkusi tradisional berbentuk gendang yang berasal dari Maluku dan Papua, dimainkan dalam berbagai upacara adat.",
        hint: "Daerah Indonesia bagian timur.",
        difficulty: "medium",
      },
      {
        id: 4,
        type: "true_false",
        question: "Musik tradisional Indonesia hanya menggunakan alat musik perkusi.",
        options: ["Benar", "Salah"],
        correctAnswer: 1,
        explanation:
          "Salah! Musik tradisional Indonesia menggunakan berbagai jenis alat musik: perkusi (gamelan, kendang), petik (sasando, kecapi), tiup (saluang, seruling), dan gesek (rebab).",
        hint: "Ada banyak jenis alat musik tradisional Indonesia.",
        difficulty: "easy",
      },
      {
        id: 5,
        type: "multiple_choice",
        question: "Apa yang dimaksud dengan musik ansambel?",
        options: [
          "Musik solo",
          "Musik yang dimainkan oleh banyak alat musik bersama-sama",
          "Musik modern",
          "Musik vokal",
        ],
        correctAnswer: 1,
        explanation:
          "Musik ansambel adalah musik yang dimainkan oleh beberapa atau banyak alat musik secara bersama-sama, seperti gamelan yang terdiri dari puluhan alat musik.",
        hint: "Gamelan adalah contoh musik ansambel.",
        difficulty: "easy",
      },
    ],
  },
];

// Helper functions
export function getSymphonyQuizById(id: number): SymphonyQuiz | undefined {
  return symphonyQuizzes.find((quiz) => quiz.id === id);
}

export function getSymphonyQuizzesByCategory(
  category: "gamelan" | "alat-musik" | "general" | "all"
): SymphonyQuiz[] {
  if (category === "all") return symphonyQuizzes;
  return symphonyQuizzes.filter((quiz) => quiz.category === category);
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
      message: "Luar biasa! Kamu ahli musik tradisional! 🌟",
      stars: 3,
    };
  } else if (score >= 80) {
    return {
      grade: "B",
      message: "Bagus sekali! Pengetahuan musikmu solid! ⭐",
      stars: 3,
    };
  } else if (score >= 70) {
    return {
      grade: "C",
      message: "Cukup baik! Terus dengarkan musik nusantara! 👍",
      stars: 2,
    };
  } else if (score >= 60) {
    return {
      grade: "D",
      message: "Lumayan! Eksplorasi lebih banyak alat musik! 📖",
      stars: 1,
    };
  } else {
    return {
      grade: "E",
      message: "Jangan menyerah! Nikmati keindahan musik nusantara! 💪",
      stars: 1,
    };
  }
}

// Game data for Nara Symphony
export interface SymphonyGameData {
  instruments: {
    name: string;
    origin: string;
    category: string;
    playedBy: string;
  }[];
}

export const symphonyGameData: SymphonyGameData = {
  instruments: [
    {
      name: "Gamelan",
      origin: "Jawa, Bali, Sunda",
      category: "Ansambel",
      playedBy: "Dipukul dengan pemukul khusus",
    },
    {
      name: "Angklung",
      origin: "Jawa Barat",
      category: "Idiofon",
      playedBy: "Digoyangkan",
    },
    {
      name: "Sasando",
      origin: "NTT",
      category: "Kordofon",
      playedBy: "Dipetik",
    },
    {
      name: "Kolintang",
      origin: "Sulawesi Utara",
      category: "Idiofon",
      playedBy: "Dipukul dengan stik",
    },
    {
      name: "Saluang",
      origin: "Sumatera Barat",
      category: "Aerofon",
      playedBy: "Ditiup",
    },
  ],
};

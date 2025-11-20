// Quiz data untuk Nara Pola (Batik & Motif Tradisional)

export type QuestionType = "multiple_choice" | "true_false";

export interface PolaQuizQuestion {
  id: number;
  type: QuestionType;
  question: string;
  options?: string[];
  correctAnswer: number;
  explanation: string;
  hint: string;
  difficulty: "easy" | "medium" | "hard";
}

export interface PolaQuiz {
  id: number;
  title: string;
  category: "batik" | "tenun" | "songket" | "general";
  questions: PolaQuizQuestion[];
  passingScore: number;
}

export const polaQuizzes: PolaQuiz[] = [
  {
    id: 1,
    title: "Motif Batik Klasik Jawa",
    category: "batik",
    passingScore: 70,
    questions: [
      {
        id: 1,
        type: "multiple_choice",
        question: "Motif Parang adalah salah satu motif batik tertua yang berasal dari kerajaan mana?",
        options: ["Kerajaan Majapahit", "Kerajaan Mataram", "Kerajaan Sriwijaya", "Kerajaan Singasari"],
        correctAnswer: 1,
        explanation:
          "Motif Parang adalah salah satu motif batik tertua di Indonesia yang berasal dari Kerajaan Mataram, menggambarkan ombak laut yang menghantam tebing sebagai lambang kekuatan dan keteguhan.",
        hint: "Kerajaan ini ada di Jawa Tengah pada masa lampau.",
        difficulty: "medium",
      },
      {
        id: 2,
        type: "true_false",
        question: "Motif Kawung berbentuk seperti buah kawung (aren) yang disusun secara geometris.",
        options: ["Benar", "Salah"],
        correctAnswer: 0,
        explanation:
          "Benar! Motif Kawung dikenal dengan bentuknya yang menyerupai buah kawung atau aren yang disusun secara geometris, melambangkan kesucian dan keabadian.",
        hint: "Kawung adalah nama buah aren dalam bahasa Jawa.",
        difficulty: "easy",
      },
      {
        id: 3,
        type: "multiple_choice",
        question: "Apa makna filosofis dari motif batik Truntum?",
        options: [
          "Kekuatan dan keberanian",
          "Keharmonisan dan keindahan",
          "Kekayaan dan kemakmuran",
          "Kebijaksanaan dan kesucian",
        ],
        correctAnswer: 1,
        explanation:
          "Motif Truntum melambangkan keharmonisan, keindahan, dan kesederhanaan dalam kehidupan, sering digunakan dalam upacara pernikahan.",
        hint: "Motif ini sering dipakai pada acara pernikahan.",
        difficulty: "medium",
      },
      {
        id: 4,
        type: "multiple_choice",
        question: "Motif batik 'Sekar Jagad' berasal dari kata apa?",
        options: [
          "Bunga dunia",
          "Peta dunia",
          "Taman dunia",
          "Keindahan dunia",
        ],
        correctAnswer: 1,
        explanation:
          "Sekar Jagad berasal dari kata 'kaart' (peta dalam bahasa Belanda) dan 'jagad' (dunia dalam bahasa Jawa), melambangkan keindahan dan keberagaman dunia.",
        hint: "Motif ini seperti peta yang penuh warna.",
        difficulty: "hard",
      },
      {
        id: 5,
        type: "true_false",
        question: "Motif batik dipengaruhi oleh letak geografis daerahnya.",
        options: ["Benar", "Salah"],
        correctAnswer: 0,
        explanation:
          "Benar! Motif batik dipengaruhi oleh letak geografis - daerah pesisir menghasilkan motif yang berhubungan dengan laut, sedangkan pegunungan terinspirasi alam sekitarnya.",
        hint: "Lingkungan alam sangat mempengaruhi kreativitas pembuat batik.",
        difficulty: "easy",
      },
    ],
  },
  {
    id: 2,
    title: "Motif Batik Nusantara",
    category: "batik",
    passingScore: 70,
    questions: [
      {
        id: 1,
        type: "multiple_choice",
        question: "Motif Mega Mendung adalah batik khas dari daerah mana?",
        options: ["Yogyakarta", "Solo", "Jawa Barat (Cirebon)", "Pekalongan"],
        correctAnswer: 2,
        explanation:
          "Batik Mega Mendung adalah motif batik khas Cirebon, Jawa Barat, yang menggambarkan awan dengan gradasi warna cerah.",
        hint: "Kota ini di pesisir utara Jawa Barat.",
        difficulty: "easy",
      },
      {
        id: 2,
        type: "multiple_choice",
        question: "Apa makna filosofis dari motif Grompol khas Yogyakarta?",
        options: [
          "Kebersamaan dan persatuan",
          "Kebijaksanaan",
          "Kesucian",
          "Kekuatan",
        ],
        correctAnswer: 0,
        explanation:
          "Motif Grompol berarti 'berkumpul' atau 'bersatu', melambangkan harapan berkumpulnya segala kebaikan seperti rezeki, kebahagiaan, keturunan, dan kerukunan.",
        hint: "Grompol artinya berkumpul dalam bahasa Jawa.",
        difficulty: "medium",
      },
      {
        id: 3,
        type: "true_false",
        question: "Motif Ulamsari Mas dari Bali menggambarkan udang dan ikan sebagai simbol kekayaan laut.",
        options: ["Benar", "Salah"],
        correctAnswer: 0,
        explanation:
          "Benar! Motif Ulamsari Mas dari Bali menggambarkan udang dan ikan yang menjadi simbol kekayaan alam bawah laut Bali dan kesejahteraan masyarakatnya.",
        hint: "Bali dikelilingi laut yang kaya akan ikan.",
        difficulty: "easy",
      },
      {
        id: 4,
        type: "multiple_choice",
        question: "Hampir semua aksara batik di Indonesia merupakan turunan dari aksara apa?",
        options: ["Aksara Brahmi", "Aksara Arab", "Aksara China", "Aksara Romawi"],
        correctAnswer: 0,
        explanation:
          "Hampir semua aksara daerah dan motif batik di Indonesia dipengaruhi oleh Aksara Pallawa yang berasal dari India Selatan, yang merupakan turunan Aksara Brahmi.",
        hint: "Aksara ini berasal dari India Selatan.",
        difficulty: "hard",
      },
      {
        id: 5,
        type: "true_false",
        question: "Motif Sido Asih memiliki arti 'jadi kasih sayang'.",
        options: ["Benar", "Salah"],
        correctAnswer: 0,
        explanation:
          "Benar! Sido berarti 'jadi' dan Asih berarti 'kasih sayang' dalam bahasa Jawa, melambangkan harapan kebaikan dan kasih sayang.",
        hint: "Motif ini sering dipakai pada acara penting.",
        difficulty: "easy",
      },
    ],
  },
  {
    id: 3,
    title: "Tenun & Kain Tradisional",
    category: "tenun",
    passingScore: 70,
    questions: [
      {
        id: 1,
        type: "multiple_choice",
        question: "Tenun Ikat Sumba berasal dari provinsi mana?",
        options: ["Bali", "NTT (Nusa Tenggara Timur)", "NTB", "Maluku"],
        correctAnswer: 1,
        explanation:
          "Tenun Ikat Sumba adalah kain tenun tradisional dari Sumba, Nusa Tenggara Timur, dengan motif geometris yang sarat makna filosofis.",
        hint: "Pulau Sumba ada di Nusa Tenggara Timur.",
        difficulty: "easy",
      },
      {
        id: 2,
        type: "true_false",
        question: "Songket Palembang adalah kain mewah yang ditenun dengan benang emas atau perak.",
        options: ["Benar", "Salah"],
        correctAnswer: 0,
        explanation:
          "Benar! Songket Palembang adalah kain tradisional mewah dari Sumatera Selatan yang ditenun dengan benang emas atau perak.",
        hint: "Songket sering dipakai untuk acara-acara penting.",
        difficulty: "easy",
      },
      {
        id: 3,
        type: "multiple_choice",
        question: "Ulos Batak memiliki filosofi apa?",
        options: ["Kehangatan dan kasih sayang", "Kekayaan", "Kekuatan", "Keberanian"],
        correctAnswer: 0,
        explanation:
          "Ulos Batak adalah kain adat Batak dari Sumatera Utara yang memiliki filosofi kehangatan dan kasih sayang, sering digunakan dalam upacara adat.",
        hint: "Ulos sering diberikan sebagai simbol kasih sayang.",
        difficulty: "medium",
      },
      {
        id: 4,
        type: "multiple_choice",
        question: "Apa perbedaan utama antara batik dan tenun?",
        options: [
          "Batik dilukis, tenun dirajut",
          "Batik menggunakan lilin, tenun menggunakan benang",
          "Tidak ada perbedaan",
          "Batik dari Jawa, tenun dari luar Jawa",
        ],
        correctAnswer: 1,
        explanation:
          "Perbedaan utama adalah batik dibuat dengan teknik pewarnaan menggunakan lilin (canting), sedangkan tenun dibuat dengan cara menenun benang.",
        hint: "Teknik pembuatannya sangat berbeda.",
        difficulty: "medium",
      },
      {
        id: 5,
        type: "true_false",
        question: "Setiap motif batik dan tenun tradisional memiliki makna filosofis yang dalam.",
        options: ["Benar", "Salah"],
        correctAnswer: 0,
        explanation:
          "Benar! Setiap motif batik dan tenun tradisional Indonesia tidak hanya indah secara visual, tetapi juga sarat dengan makna filosofis yang mencerminkan nilai budaya, spiritual, dan sosial masyarakatnya.",
        hint: "Motif tradisional selalu punya cerita dan makna.",
        difficulty: "easy",
      },
    ],
  },
];

// Helper functions
export function getPolaQuizById(id: number): PolaQuiz | undefined {
  return polaQuizzes.find((quiz) => quiz.id === id);
}

export function getPolaQuizzesByCategory(
  category: "batik" | "tenun" | "songket" | "general" | "all"
): PolaQuiz[] {
  if (category === "all") return polaQuizzes;
  return polaQuizzes.filter((quiz) => quiz.category === category);
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
      message: "Sempurna! Kamu ahli motif tradisional! 🌟",
      stars: 3,
    };
  } else if (score >= 80) {
    return {
      grade: "B",
      message: "Bagus sekali! Pengetahuan batikmu solid! ⭐",
      stars: 3,
    };
  } else if (score >= 70) {
    return {
      grade: "C",
      message: "Cukup baik! Terus pelajari motif nusantara! 👍",
      stars: 2,
    };
  } else if (score >= 60) {
    return {
      grade: "D",
      message: "Lumayan! Eksplorasi lebih banyak motif ya! 📖",
      stars: 1,
    };
  } else {
    return {
      grade: "E",
      message: "Jangan menyerah! Pelajari keindahan batik nusantara! 💪",
      stars: 1,
    };
  }
}

// Game data for Nara Pola
export interface PolaGameData {
  patterns: {
    name: string;
    origin: string;
    category: string;
    meaning: string;
  }[];
}

export const polaGameData: PolaGameData = {
  patterns: [
    {
      name: "Batik Parang",
      origin: "Jawa Tengah",
      category: "Batik",
      meaning: "Kekuatan dan keteguhan seperti ombak menghantam tebing",
    },
    {
      name: "Batik Kawung",
      origin: "Jawa Tengah",
      category: "Batik",
      meaning: "Kesucian dan keabadian",
    },
    {
      name: "Batik Mega Mendung",
      origin: "Jawa Barat",
      category: "Batik",
      meaning: "Kesejukan dan kedamaian seperti awan",
    },
    {
      name: "Tenun Ikat Sumba",
      origin: "NTT",
      category: "Tenun",
      meaning: "Filosofi hidup dan kepercayaan masyarakat Sumba",
    },
    {
      name: "Ulos Batak",
      origin: "Sumatera Utara",
      category: "Tenun",
      meaning: "Kehangatan dan kasih sayang",
    },
  ],
};

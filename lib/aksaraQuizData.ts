// Quiz data untuk Nara Aksara (Aksara Nusantara)

export type QuestionType = "multiple_choice" | "true_false";

export interface AksaraQuizQuestion {
  id: number;
  type: QuestionType;
  question: string;
  options?: string[];
  correctAnswer: number;
  explanation: string;
  hint: string;
  difficulty: "easy" | "medium" | "hard";
}

export interface AksaraQuiz {
  id: number;
  title: string;
  category: "jawa" | "bali" | "sunda" | "batak" | "general";
  questions: AksaraQuizQuestion[];
  passingScore: number;
}

export const aksaraQuizzes: AksaraQuiz[] = [
  {
    id: 1,
    title: "Aksara Jawa (Hanacaraka)",
    category: "jawa",
    passingScore: 70,
    questions: [
      {
        id: 1,
        type: "multiple_choice",
        question: "Aksara Jawa juga dikenal dengan nama apa?",
        options: ["Pallawa", "Hanacaraka", "Kawi", "Brahmi"],
        correctAnswer: 1,
        explanation:
          "Aksara Jawa dikenal dengan nama Hanacaraka, diambil dari lima huruf awal dalam urutan aksara Jawa: ha-na-ca-ra-ka.",
        hint: "Nama ini diambil dari 5 huruf awal aksara Jawa.",
        difficulty: "easy",
      },
      {
        id: 2,
        type: "true_false",
        question: "Aksara Jawa mulai digunakan sekitar abad ke-9 hingga ke-10 Masehi.",
        options: ["Benar", "Salah"],
        correctAnswer: 0,
        explanation:
          "Benar! Aksara Jawa mulai digunakan sekitar abad ke-9 hingga ke-10 Masehi dan berkembang dari aksara Kawi.",
        hint: "Aksara Jawa sudah sangat tua, lebih dari 1000 tahun.",
        difficulty: "easy",
      },
      {
        id: 3,
        type: "multiple_choice",
        question: "Aksara Jawa merupakan turunan dari aksara apa?",
        options: ["Aksara Arab", "Aksara Kawi", "Aksara Latin", "Aksara China"],
        correctAnswer: 1,
        explanation:
          "Aksara Jawa berkembang dari aksara Kawi, yang merupakan turunan dari aksara Pallawa dari India Selatan.",
        hint: "Aksara ini juga digunakan pada zaman kerajaan kuno.",
        difficulty: "medium",
      },
      {
        id: 4,
        type: "true_false",
        question: "Aksara Jawa hanya digunakan untuk menulis bahasa Jawa.",
        options: ["Benar", "Salah"],
        correctAnswer: 1,
        explanation:
          "Salah! Meskipun terutama digunakan untuk bahasa Jawa, aksara Jawa juga bisa digunakan untuk menulis bahasa Indonesia dan bahasa lainnya.",
        hint: "Aksara adalah sistem tulisan yang bisa digunakan untuk berbagai bahasa.",
        difficulty: "medium",
      },
      {
        id: 5,
        type: "multiple_choice",
        question: "Apa yang dimaksud dengan 'sandhangan' dalam aksara Jawa?",
        options: [
          "Huruf vokal",
          "Huruf konsonan",
          "Tanda diakritik untuk mengubah bunyi",
          "Tanda baca",
        ],
        correctAnswer: 2,
        explanation:
          "Sandhangan adalah tanda diakritik dalam aksara Jawa yang digunakan untuk mengubah atau menambah bunyi vokal pada aksara dasar.",
        hint: "Tanda tambahan yang mengubah bunyi huruf.",
        difficulty: "hard",
      },
    ],
  },
  {
    id: 2,
    title: "Aksara Nusantara Umum",
    category: "general",
    passingScore: 70,
    questions: [
      {
        id: 1,
        type: "multiple_choice",
        question: "Berapa jumlah aksara nusantara yang saat ini diakui di Indonesia?",
        options: ["5 aksara", "8 aksara", "12 aksara", "15 aksara"],
        correctAnswer: 1,
        explanation:
          "Saat ini terdapat 8 aksara nusantara yang diakui: aksara Jawa, Bali, Sunda Kuno, Bugis (Lontara), Rejang, Lampung, Batak, dan Kerinci (Rencong/Incung).",
        hint: "Delapan aksara dari berbagai daerah di Indonesia.",
        difficulty: "medium",
      },
      {
        id: 2,
        type: "true_false",
        question: "Hampir semua aksara daerah di Indonesia merupakan turunan Aksara Pallawa dari India Selatan.",
        options: ["Benar", "Salah"],
        correctAnswer: 0,
        explanation:
          "Benar! Hampir semua aksara daerah di Indonesia merupakan turunan Aksara Pallawa yang berasal dari India Selatan, dan Aksara Pallawa sendiri adalah turunan dari Aksara Brahmi.",
        hint: "Pengaruh budaya India sangat kuat dalam sistem tulisan nusantara.",
        difficulty: "medium",
      },
      {
        id: 3,
        type: "multiple_choice",
        question: "Bukti tertua aksara nusantara ditemukan di daerah mana?",
        options: ["Jawa Tengah", "Bali", "Kalimantan Timur (Kutai)", "Sumatera"],
        correctAnswer: 2,
        explanation:
          "Bukti tertua aksara nusantara adalah tujuh yupa (prasasti) dari Kerajaan Kutai di Kalimantan Timur, dibuat sekitar abad ke-4 Masehi menggunakan aksara Pallawa dan bahasa Sanskerta.",
        hint: "Kerajaan Kutai adalah kerajaan tertua di Indonesia.",
        difficulty: "hard",
      },
      {
        id: 4,
        type: "true_false",
        question: "Aksara Bali mirip dengan aksara Jawa tetapi memiliki beberapa perbedaan.",
        options: ["Benar", "Salah"],
        correctAnswer: 0,
        explanation:
          "Benar! Aksara Bali mirip dengan aksara Jawa karena berasal dari akar yang sama, tetapi memiliki beberapa perbedaan dalam penggunaan dan bentuk huruf.",
        hint: "Kedua aksara berasal dari keluarga aksara yang sama.",
        difficulty: "easy",
      },
      {
        id: 5,
        type: "multiple_choice",
        question: "Aksara Sunda diperkirakan mulai digunakan pada abad ke berapa?",
        options: ["Abad ke-10", "Abad ke-12", "Abad ke-14", "Abad ke-16"],
        correctAnswer: 2,
        explanation:
          "Aksara Sunda diperkirakan mulai digunakan pada abad ke-14 Masehi, terutama pada masa Kerajaan Sunda dan Kerajaan Pajajaran.",
        hint: "Masa keemasan Kerajaan Pajajaran.",
        difficulty: "hard",
      },
    ],
  },
  {
    id: 3,
    title: "Aksara Bali, Sunda, dan Batak",
    category: "general",
    passingScore: 70,
    questions: [
      {
        id: 1,
        type: "multiple_choice",
        question: "Aksara Bali digunakan untuk menulis apa di lontar?",
        options: [
          "Resep masakan",
          "Ajaran agama Hindu dan panduan kehidupan",
          "Catatan perdagangan",
          "Dongeng anak",
        ],
        correctAnswer: 1,
        explanation:
          "Aksara Bali digunakan dalam penulisan lontar yang berisi ajaran agama Hindu, mantra, dan panduan kehidupan sehari-hari masyarakat Bali.",
        hint: "Lontar adalah media tulis tradisional dari daun.",
        difficulty: "easy",
      },
      {
        id: 2,
        type: "true_false",
        question: "Aksara Batak berasal dari Sumatera Utara dan mulai muncul sekitar abad ke-14 Masehi.",
        options: ["Benar", "Salah"],
        correctAnswer: 0,
        explanation:
          "Benar! Aksara Batak berasal dari Sumatera Utara dan mulai muncul sekitar abad ke-14 Masehi, awalnya digunakan untuk menulis bahasa Batak.",
        hint: "Suku Batak punya aksara sendiri yang kuno.",
        difficulty: "easy",
      },
      {
        id: 3,
        type: "multiple_choice",
        question: "Apa nama lain dari aksara Bugis?",
        options: ["Hanacaraka", "Lontara", "Kaganga", "Pallawa"],
        correctAnswer: 1,
        explanation:
          "Aksara Bugis juga dikenal dengan nama Lontara, berasal dari Sulawesi Selatan dan digunakan untuk menulis bahasa Bugis dan Makassar.",
        hint: "Nama ini juga merupakan nama media tulisnya.",
        difficulty: "medium",
      },
      {
        id: 4,
        type: "true_false",
        question: "Beberapa aksara nusantara telah berhasil terstandarisasi di Unicode.",
        options: ["Benar", "Salah"],
        correctAnswer: 0,
        explanation:
          "Benar! Beberapa aksara nusantara telah terstandarisasi di Unicode, seperti Aksara Bugis (2005), Bali (2006), Batak (2008), Sunda (2008), Jawa (2009), dan Kawi (2022).",
        hint: "Ini memungkinkan aksara nusantara digunakan di komputer dan smartphone.",
        difficulty: "medium",
      },
      {
        id: 5,
        type: "multiple_choice",
        question: "Aksara Sunda digunakan untuk menulis apa pada masa lampau?",
        options: [
          "Hanya surat pribadi",
          "Hukum, puisi, sejarah, dan ajaran moral",
          "Catatan keuangan",
          "Menu makanan",
        ],
        correctAnswer: 1,
        explanation:
          "Aksara Sunda dipakai untuk menulis bahasa Sunda Kuno dalam berbagai naskah dan prasasti yang berisi hukum, puisi, sejarah, dan ajaran moral.",
        hint: "Aksara digunakan untuk hal-hal penting dalam masyarakat.",
        difficulty: "medium",
      },
    ],
  },
];

// Helper functions
export function getAksaraQuizById(id: number): AksaraQuiz | undefined {
  return aksaraQuizzes.find((quiz) => quiz.id === id);
}

export function getAksaraQuizzesByCategory(
  category: "jawa" | "bali" | "sunda" | "batak" | "general" | "all"
): AksaraQuiz[] {
  if (category === "all") return aksaraQuizzes;
  return aksaraQuizzes.filter((quiz) => quiz.category === category);
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
      message: "Sempurna! Kamu ahli aksara nusantara! 🌟",
      stars: 3,
    };
  } else if (score >= 80) {
    return {
      grade: "B",
      message: "Bagus sekali! Pengetahuan aksaramu solid! ⭐",
      stars: 3,
    };
  } else if (score >= 70) {
    return {
      grade: "C",
      message: "Cukup baik! Terus pelajari aksara nusantara! 👍",
      stars: 2,
    };
  } else if (score >= 60) {
    return {
      grade: "D",
      message: "Lumayan! Baca lebih banyak tentang aksara! 📖",
      stars: 1,
    };
  } else {
    return {
      grade: "E",
      message: "Jangan menyerah! Aksara nusantara itu indah! 💪",
      stars: 1,
    };
  }
}

// Game data for Nara Aksara
export interface AksaraGameData {
  scripts: {
    name: string;
    origin: string;
    period: string;
    usage: string;
  }[];
}

export const aksaraGameData: AksaraGameData = {
  scripts: [
    {
      name: "Aksara Jawa (Hanacaraka)",
      origin: "Jawa",
      period: "Abad ke-9 hingga sekarang",
      usage: "Menulis bahasa Jawa dan Indonesia",
    },
    {
      name: "Aksara Bali",
      origin: "Bali",
      period: "Abad ke-11 hingga sekarang",
      usage: "Menulis lontar, ajaran Hindu, dan bahasa Bali",
    },
    {
      name: "Aksara Sunda",
      origin: "Jawa Barat",
      period: "Abad ke-14 hingga sekarang",
      usage: "Menulis bahasa Sunda Kuno dan prasasti",
    },
    {
      name: "Aksara Batak",
      origin: "Sumatera Utara",
      period: "Abad ke-14 hingga sekarang",
      usage: "Menulis bahasa Batak dan pustaha (kitab)",
    },
    {
      name: "Aksara Bugis (Lontara)",
      origin: "Sulawesi Selatan",
      period: "Abad ke-13 hingga sekarang",
      usage: "Menulis bahasa Bugis dan Makassar",
    },
  ],
};

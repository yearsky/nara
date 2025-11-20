// Quiz data untuk Nara Loka (Kuliner & Resep)

export type QuestionType = "multiple_choice" | "true_false";

export interface LokaQuizQuestion {
  id: number;
  type: QuestionType;
  question: string;
  options?: string[];
  correctAnswer: number;
  explanation: string;
  hint: string;
  difficulty: "easy" | "medium" | "hard";
}

export interface LokaQuiz {
  id: number;
  title: string;
  category: "makanan-utama" | "kudapan" | "minuman" | "general";
  questions: LokaQuizQuestion[];
  passingScore: number;
}

export const lokaQuizzes: LokaQuiz[] = [
  {
    id: 1,
    title: "Kuliner Nusantara - Sumatera",
    category: "makanan-utama",
    passingScore: 70,
    questions: [
      {
        id: 1,
        type: "multiple_choice",
        question: "Rendang berasal dari daerah mana?",
        options: ["Sumatera Utara", "Sumatera Barat", "Sumatera Selatan", "Aceh"],
        correctAnswer: 1,
        explanation:
          "Rendang adalah masakan khas Minangkabau, Sumatera Barat. Pada tahun 2011, CNN International mengumumkan rendang sebagai makanan terenak nomor 1 di dunia.",
        hint: "Masakan ini berasal dari tanah Minangkabau.",
        difficulty: "easy",
      },
      {
        id: 2,
        type: "true_false",
        question: "Mie Aceh memiliki rasa pedas dan kaya rempah.",
        options: ["Benar", "Salah"],
        correctAnswer: 0,
        explanation:
          "Benar! Mie Aceh adalah makanan tradisional dari Aceh dengan cita rasa gurih, pedas, dan kaya rempah, biasanya disajikan dengan daging sapi, kambing, atau seafood.",
        hint: "Masakan Aceh terkenal dengan rempahnya yang kuat.",
        difficulty: "easy",
      },
      {
        id: 3,
        type: "multiple_choice",
        question: "Bika Ambon sebenarnya berasal dari provinsi mana?",
        options: ["Maluku", "Sumatera Utara", "Papua", "Sulawesi Utara"],
        correctAnswer: 1,
        explanation:
          "Meskipun namanya Bika 'Ambon', kue ini sebenarnya berasal dari Medan, Sumatera Utara. Bika Ambon memiliki tekstur bersarang seperti sarang lebah dan rasa manis yang khas.",
        hint: "Kue ini terkenal dari kota Medan.",
        difficulty: "medium",
      },
      {
        id: 4,
        type: "true_false",
        question: "Pempek adalah makanan khas Palembang yang terbuat dari ikan dan sagu.",
        options: ["Benar", "Salah"],
        correctAnswer: 0,
        explanation:
          "Benar! Pempek adalah makanan khas Palembang, Sumatera Selatan, yang terbuat dari ikan giling (biasanya ikan tenggiri) dicampur tepung sagu.",
        hint: "Makanan ini sering dinikmati dengan kuah cuko yang asam pedas.",
        difficulty: "easy",
      },
      {
        id: 5,
        type: "multiple_choice",
        question: "Apa ciri khas utama masakan Sumatera?",
        options: [
          "Manis dan gurih",
          "Pedas dan kaya rempah",
          "Asam dan segar",
          "Asin dan tawar",
        ],
        correctAnswer: 1,
        explanation:
          "Masakan Sumatera terkenal dengan cita rasa pedas dan kaya rempah, dipengaruhi oleh jalur perdagangan dengan India dan Timur Tengah.",
        hint: "Rendang dan gulai adalah contohnya.",
        difficulty: "easy",
      },
    ],
  },
  {
    id: 2,
    title: "Kuliner Nusantara - Jawa",
    category: "makanan-utama",
    passingScore: 70,
    questions: [
      {
        id: 1,
        type: "multiple_choice",
        question: "Gudeg adalah makanan khas dari daerah mana?",
        options: ["Solo", "Yogyakarta", "Semarang", "Bandung"],
        correctAnswer: 1,
        explanation:
          "Gudeg adalah makanan khas Yogyakarta yang terbuat dari nangka muda dimasak dengan santan dan gula jawa hingga berwarna cokelat dan rasanya manis.",
        hint: "Kota ini dijuluki 'Kota Gudeg'.",
        difficulty: "easy",
      },
      {
        id: 2,
        type: "true_false",
        question: "Masakan Jawa umumnya memiliki rasa manis dan gurih.",
        options: ["Benar", "Salah"],
        correctAnswer: 0,
        explanation:
          "Benar! Masakan Jawa memiliki karakteristik rasa yang cenderung manis dan gurih, menggunakan bahan seperti gula jawa, santan, dan bumbu yang tidak terlalu tajam.",
        hint: "Berbeda dengan masakan Sumatera yang pedas.",
        difficulty: "easy",
      },
      {
        id: 3,
        type: "multiple_choice",
        question: "Soto Betawi berasal dari daerah mana?",
        options: ["Bandung", "Jakarta", "Bogor", "Tangerang"],
        correctAnswer: 1,
        explanation:
          "Soto Betawi adalah makanan khas Jakarta (Betawi) yang menggunakan santan, jeroan, dan daging sapi dengan rasa yang gurih dan kaya.",
        hint: "Betawi adalah nama suku asli ibu kota Indonesia.",
        difficulty: "easy",
      },
      {
        id: 4,
        type: "multiple_choice",
        question: "Apa bahan utama Rawon?",
        options: ["Kunyit", "Kluwek", "Lengkuas", "Jahe"],
        correctAnswer: 1,
        explanation:
          "Rawon adalah sup daging khas Jawa Timur yang berwarna hitam karena menggunakan kluwek (buah kepayang) sebagai bahan utamanya.",
        hint: "Buah ini yang membuat rawon berwarna hitam pekat.",
        difficulty: "medium",
      },
      {
        id: 5,
        type: "true_false",
        question: "Nasi Liwet adalah makanan khas Solo yang dimasak dengan santan.",
        options: ["Benar", "Salah"],
        correctAnswer: 0,
        explanation:
          "Benar! Nasi Liwet adalah nasi yang dimasak dengan santan dan rempah, biasanya disajikan dengan lauk seperti ayam, telur, dan sambal.",
        hint: "Cara memasaknya mirip dengan nasi uduk.",
        difficulty: "easy",
      },
    ],
  },
  {
    id: 3,
    title: "Kuliner Nusantara - Indonesia Timur",
    category: "general",
    passingScore: 70,
    questions: [
      {
        id: 1,
        type: "multiple_choice",
        question: "Papeda adalah makanan pokok dari daerah mana?",
        options: ["Bali", "Maluku & Papua", "Sulawesi", "NTT"],
        correctAnswer: 1,
        explanation:
          "Papeda adalah bubur sagu yang menjadi makanan pokok masyarakat Maluku dan Papua, biasanya dimakan dengan kuah ikan kuning.",
        hint: "Daerah ini kaya dengan pohon sagu.",
        difficulty: "easy",
      },
      {
        id: 2,
        type: "true_false",
        question: "Masakan Indonesia Timur sering menggunakan ikan dan hasil laut.",
        options: ["Benar", "Salah"],
        correctAnswer: 0,
        explanation:
          "Benar! Karena wilayah Indonesia Timur dikelilingi laut, makanan tradisionalnya sering menggunakan ikan, seafood, dan sagu sebagai bahan utama.",
        hint: "Wilayah kepulauan sangat dekat dengan laut.",
        difficulty: "easy",
      },
      {
        id: 3,
        type: "multiple_choice",
        question: "Coto Makassar adalah masakan khas dari provinsi mana?",
        options: ["Sulawesi Utara", "Sulawesi Selatan", "Sulawesi Tengah", "Gorontalo"],
        correctAnswer: 1,
        explanation:
          "Coto Makassar adalah sup daging sapi khas Makassar, Sulawesi Selatan, yang disajikan dengan kuah kacang tanah yang gurih dan kaya rempah.",
        hint: "Kota ini adalah ibu kota Sulawesi Selatan.",
        difficulty: "easy",
      },
      {
        id: 4,
        type: "multiple_choice",
        question: "Ayam Betutu adalah makanan khas dari daerah mana?",
        options: ["Jawa", "Bali", "Lombok", "Sulawesi"],
        correctAnswer: 1,
        explanation:
          "Ayam Betutu adalah masakan khas Bali berupa ayam yang dibumbui dengan bumbu khas Bali dan dipanggang atau dikukus dalam waktu lama hingga bumbu meresap.",
        hint: "Pulau Dewata terkenal dengan masakan ini.",
        difficulty: "easy",
      },
      {
        id: 5,
        type: "true_false",
        question: "Kuliner Indonesia Timur mirip dengan masakan Polinesia dan Melanesia.",
        options: ["Benar", "Salah"],
        correctAnswer: 0,
        explanation:
          "Benar! Kuliner Indonesia Timur memiliki kemiripan dengan masakan Polinesia dan Melanesia karena kedekatan geografis dan budaya.",
        hint: "Papua dan Maluku dekat dengan kawasan Pasifik.",
        difficulty: "medium",
      },
    ],
  },
];

// Helper functions
export function getLokaQuizById(id: number): LokaQuiz | undefined {
  return lokaQuizzes.find((quiz) => quiz.id === id);
}

export function getLokaQuizzesByCategory(
  category: "makanan-utama" | "kudapan" | "minuman" | "general" | "all"
): LokaQuiz[] {
  if (category === "all") return lokaQuizzes;
  return lokaQuizzes.filter((quiz) => quiz.category === category);
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
      message: "Luar biasa! Kamu ahli kuliner nusantara! 🌟",
      stars: 3,
    };
  } else if (score >= 80) {
    return {
      grade: "B",
      message: "Bagus sekali! Pengetahuan kulinermu solid! ⭐",
      stars: 3,
    };
  } else if (score >= 70) {
    return {
      grade: "C",
      message: "Cukup baik! Terus eksplorasi kuliner nusantara! 👍",
      stars: 2,
    };
  } else if (score >= 60) {
    return {
      grade: "D",
      message: "Lumayan! Coba masakan khas daerah lebih banyak! 📖",
      stars: 1,
    };
  } else {
    return {
      grade: "E",
      message: "Jangan menyerah! Cicipi lebih banyak kuliner nusantara! 💪",
      stars: 1,
    };
  }
}

// Game data for Nara Loka
export interface LokaGameData {
  dishes: {
    name: string;
    region: string;
    category: string;
    description: string;
  }[];
}

export const lokaGameData: LokaGameData = {
  dishes: [
    {
      name: "Rendang",
      region: "Sumatera Barat",
      category: "Makanan Utama",
      description: "Daging sapi dengan bumbu rempah kaya, masakan terenak dunia versi CNN",
    },
    {
      name: "Gudeg",
      region: "Yogyakarta",
      category: "Makanan Utama",
      description: "Nangka muda dimasak santan dan gula jawa, rasa manis khas",
    },
    {
      name: "Pempek",
      region: "Sumatera Selatan",
      category: "Kudapan",
      description: "Olahan ikan dan sagu, disajikan dengan cuko asam pedas",
    },
    {
      name: "Papeda",
      region: "Maluku & Papua",
      category: "Makanan Utama",
      description: "Bubur sagu khas Indonesia Timur, dimakan dengan ikan kuah kuning",
    },
    {
      name: "Ayam Betutu",
      region: "Bali",
      category: "Makanan Utama",
      description: "Ayam dibumbui rempah Bali, dipanggang atau dikukus lama",
    },
  ],
};

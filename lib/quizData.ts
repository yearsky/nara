// Quiz data structure untuk setiap cerita

export type QuestionType = "multiple_choice" | "true_false";

export interface QuizQuestion {
  id: number;
  type: QuestionType;
  question: string;
  options?: string[]; // untuk multiple choice
  correctAnswer: number; // index of correct answer atau 0/1 untuk true/false
  explanation: string;
  hint: string;
  difficulty: "easy" | "medium" | "hard";
}

export interface StoryQuiz {
  storyId: number;
  storyTitle: string;
  questions: QuizQuestion[];
  passingScore: number; // percentage
}

export const quizzes: StoryQuiz[] = [
  {
    storyId: 1,
    storyTitle: "Malin Kundang",
    passingScore: 70,
    questions: [
      {
        id: 1,
        type: "multiple_choice",
        question: "Di mana Malin Kundang tinggal bersama ibunya?",
        options: [
          "Di kota besar",
          "Di desa pesisir Sumatera Barat",
          "Di istana raja",
          "Di tengah hutan",
        ],
        correctAnswer: 1,
        explanation:
          "Malin Kundang tinggal di desa pesisir Sumatera Barat bersama ibunya yang janda.",
        hint: "Ingat, cerita ini berlatar di daerah dekat laut di Sumatera Barat.",
        difficulty: "easy",
      },
      {
        id: 2,
        type: "true_false",
        question: "Malin Kundang merantau karena ingin mengubah nasib dan membuat ibunya hidup lebih baik.",
        options: ["Benar", "Salah"],
        correctAnswer: 0,
        explanation:
          "Benar! Malin merantau dengan tujuan baik untuk mengubah nasib dan membahagiakan ibunya.",
        hint: "Pikirkan tentang niat awal Malin saat meninggalkan kampung halaman.",
        difficulty: "easy",
      },
      {
        id: 3,
        type: "multiple_choice",
        question: "Apa yang membuat Malin Kundang menjadi kaya raya?",
        options: [
          "Menemukan harta karun",
          "Menjadi pedagang sukses",
          "Menikah dengan putri raja",
          "Memenangkan lomba",
        ],
        correctAnswer: 1,
        explanation:
          "Malin Kundang menjadi kaya karena berhasil sebagai pedagang dan memiliki kapal besar.",
        hint: "Lihat kembali bagian cerita tentang kesuksesan Malin di perantauan.",
        difficulty: "medium",
      },
      {
        id: 4,
        type: "multiple_choice",
        question: "Mengapa Malin Kundang tidak mengakui ibunya?",
        options: [
          "Karena ia lupa wajah ibunya",
          "Karena ia malu dengan penampilan ibunya yang miskin",
          "Karena ibunya bukan ibu kandungnya",
          "Karena ia tidak melihat ibunya",
        ],
        correctAnswer: 1,
        explanation:
          "Malin malu dengan penampilan ibunya yang miskin dan compang-camping di depan istrinya yang cantik dan kaya.",
        hint: "Ingat perasaan Malin saat istrinya melihat wanita tua tersebut.",
        difficulty: "medium",
      },
      {
        id: 5,
        type: "true_false",
        question: "Ibu Malin Kundang langsung mengutuk anaknya saat pertama kali bertemu.",
        options: ["Benar", "Salah"],
        correctAnswer: 1,
        explanation:
          "Salah. Sang ibu tidak langsung mengutuk Malin. Ia mengutuk Malin setelah Malin membentaknya dan mengingkari bahwa dia adalah anaknya.",
        hint: "Pikirkan urutan kejadian saat pertemuan mereka di pelabuhan.",
        difficulty: "medium",
      },
      {
        id: 6,
        type: "multiple_choice",
        question: "Apa yang terjadi setelah ibu Malin mengutuknya?",
        options: [
          "Malin meminta maaf kepada ibunya",
          "Kapal Malin tenggelam",
          "Badai datang dan Malin berubah menjadi batu",
          "Tidak terjadi apa-apa",
        ],
        correctAnswer: 2,
        explanation:
          "Setelah dikutuk, badai besar datang menghantam kapal Malin, dan tubuhnya berubah menjadi batu.",
        hint: "Ingat hukuman yang diterima Malin karena perbuatannya.",
        difficulty: "easy",
      },
      {
        id: 7,
        type: "multiple_choice",
        question: "Apa nilai moral utama dari cerita Malin Kundang?",
        options: [
          "Jangan pernah pergi merantau",
          "Uang adalah segalanya",
          "Selalu hormati dan sayangi orang tua",
          "Jangan menikah dengan orang kaya",
        ],
        correctAnswer: 2,
        explanation:
          "Nilai moral utama adalah pentingnya menghormati dan menyayangi orang tua, tidak peduli seberapa sukses kita.",
        hint: "Pikirkan pelajaran apa yang bisa kita ambil dari kesalahan Malin.",
        difficulty: "easy",
      },
      {
        id: 8,
        type: "true_false",
        question: "Kesombongan dan lupa diri adalah penyebab kehancuran Malin Kundang.",
        options: ["Benar", "Salah"],
        correctAnswer: 0,
        explanation:
          "Benar! Kesuksesan membuat Malin sombong dan lupa pada asal-usulnya, yang akhirnya membawa petaka.",
        hint: "Lihat perubahan sikap Malin setelah menjadi kaya.",
        difficulty: "medium",
      },
    ],
  },
  {
    storyId: 2,
    storyTitle: "Roro Jonggrang",
    passingScore: 70,
    questions: [
      {
        id: 1,
        type: "multiple_choice",
        question: "Siapa yang menyerang Kerajaan Prambanan?",
        options: [
          "Raja dari Bali",
          "Bandung Bondowoso",
          "Raksasa dari hutan",
          "Tentara dari negeri seberang",
        ],
        correctAnswer: 1,
        explanation:
          "Bandung Bondowoso, pangeran sakti, yang menyerang dan menaklukkan Kerajaan Prambanan.",
        hint: "Ingat nama pangeran sakti dalam cerita ini.",
        difficulty: "easy",
      },
      {
        id: 2,
        type: "true_false",
        question: "Roro Jonggrang dengan sukarela menerima lamaran Bandung Bondowoso.",
        options: ["Benar", "Salah"],
        correctAnswer: 1,
        explanation:
          "Salah. Roro Jonggrang membenci Bandung karena telah membunuh ayahnya, dan tidak ingin menikah dengannya.",
        hint: "Pikirkan perasaan Roro terhadap orang yang membunuh ayahnya.",
        difficulty: "easy",
      },
      {
        id: 3,
        type: "multiple_choice",
        question: "Berapa jumlah candi yang harus dibangun Bandung Bondowoso?",
        options: ["500 candi", "1000 candi", "100 candi", "777 candi"],
        correctAnswer: 1,
        explanation:
          "Roro Jonggrang meminta Bandung membangun 1000 candi dalam satu malam sebagai syarat pernikahan.",
        hint: "Angka yang sangat besar dan mustahil.",
        difficulty: "easy",
      },
      {
        id: 4,
        type: "multiple_choice",
        question: "Siapa yang membantu Bandung Bondowoso membangun candi?",
        options: [
          "Para tentara manusia",
          "Jin dan makhluk halus",
          "Rakyat kerajaan",
          "Tukang bangunan dari negeri lain",
        ],
        correctAnswer: 1,
        explanation:
          "Bandung menggunakan kesaktiannya untuk memanggil jin dan makhluk halus membangun candi.",
        hint: "Bandung adalah pangeran sakti dengan kekuatan supranatural.",
        difficulty: "medium",
      },
      {
        id: 5,
        type: "true_false",
        question: "Roro Jonggrang berhasil menghentikan pembangunan candi dengan cara yang jujur.",
        options: ["Benar", "Salah"],
        correctAnswer: 1,
        explanation:
          "Salah. Roro menggunakan tipu muslihat dengan membuat suasana seperti pagi hari agar jin kabur.",
        hint: "Pikirkan apakah tindakan Roro bisa disebut jujur atau tidak.",
        difficulty: "medium",
      },
      {
        id: 6,
        type: "multiple_choice",
        question: "Apa yang dilakukan Roro Jonggrang untuk menghentikan pembangunan candi?",
        options: [
          "Membakar candi yang sudah dibangun",
          "Memerintahkan dayang menumbuk lesung dan membakar jerami",
          "Memohon kepada dewa",
          "Menyerang para jin",
        ],
        correctAnswer: 1,
        explanation:
          "Roro memerintahkan dayang menumbuk lesung dan membakar jerami agar ayam berkokok, sehingga jin mengira sudah pagi.",
        hint: "Ingat tindakan yang membuat jin berpikir matahari sudah terbit.",
        difficulty: "medium",
      },
      {
        id: 7,
        type: "multiple_choice",
        question: "Berapa candi yang berhasil dibangun sebelum jin kabur?",
        options: ["1000 candi", "999 candi", "998 candi", "500 candi"],
        correctAnswer: 1,
        explanation:
          "Hanya 999 candi yang berhasil dibangun, tinggal satu lagi untuk mencapai 1000.",
        hint: "Hampir berhasil, tapi masih kurang satu!",
        difficulty: "easy",
      },
      {
        id: 8,
        type: "true_false",
        question: "Arca Roro Jonggrang menjadi candi ke-1000 di kompleks Candi Prambanan.",
        options: ["Benar", "Salah"],
        correctAnswer: 0,
        explanation:
          "Benar! Bandung mengutuk Roro menjadi arca batu untuk melengkapi candi ke-1000.",
        hint: "Ingat akhir cerita dan kutukan Bandung.",
        difficulty: "easy",
      },
    ],
  },
  {
    storyId: 3,
    storyTitle: "Timun Mas",
    passingScore: 70,
    questions: [
      {
        id: 1,
        type: "true_false",
        question: "Mbok Srini mendapatkan Timun Mas dari seorang penyihir baik.",
        options: ["Benar", "Salah"],
        correctAnswer: 1,
        explanation:
          "Salah. Mbok Srini mendapat Timun Mas dari Buto Ijo, seorang raksasa yang menakutkan.",
        hint: "Ingat siapa yang memberikan benih timun emas kepada Mbok Srini.",
        difficulty: "easy",
      },
      {
        id: 2,
        type: "multiple_choice",
        question: "Apa syarat yang diberikan Buto Ijo kepada Mbok Srini?",
        options: [
          "Memberikan emas setiap bulan",
          "Merawat kebun Buto Ijo",
          "Menyerahkan anak saat berusia 17 tahun",
          "Membangun rumah untuk Buto Ijo",
        ],
        correctAnswer: 2,
        explanation:
          "Buto Ijo meminta Mbok Srini menyerahkan anak yang lahir saat berusia 17 tahun.",
        hint: "Ingat perjanjian awal antara Mbok Srini dan Buto Ijo.",
        difficulty: "easy",
      },
      {
        id: 3,
        type: "multiple_choice",
        question: "Dari mana Timun Mas lahir?",
        options: [
          "Dari telur emas",
          "Dari bunga teratai",
          "Dari buah timun emas",
          "Dari batu ajaib",
        ],
        correctAnswer: 2,
        explanation:
          "Timun Mas lahir dari dalam buah timun emas yang diberikan oleh Buto Ijo.",
        hint: "Lihat namanya - Timun Mas berarti...",
        difficulty: "easy",
      },
      {
        id: 4,
        type: "multiple_choice",
        question: "Berapa bungkusan benda ajaib yang diberikan Mbok Srini kepada Timun Mas?",
        options: ["Dua bungkusan", "Tiga bungkusan", "Empat bungkusan", "Lima bungkusan"],
        correctAnswer: 2,
        explanation:
          "Mbok Srini memberikan empat bungkusan: biji mentimun, jarum, garam, dan terasi.",
        hint: "Hitung jumlah benda yang digunakan Timun Mas untuk meloloskan diri.",
        difficulty: "medium",
      },
      {
        id: 5,
        type: "true_false",
        question: "Biji mentimun yang dilempar Timun Mas berubah menjadi hutan bambu.",
        options: ["Benar", "Salah"],
        correctAnswer: 1,
        explanation:
          "Salah. Biji mentimun berubah menjadi hutan mentimun yang lebat, bukan hutan bambu. Jarum yang berubah menjadi hutan bambu.",
        hint: "Setiap benda berubah menjadi sesuatu yang sesuai dengan jenisnya.",
        difficulty: "medium",
      },
      {
        id: 6,
        type: "multiple_choice",
        question: "Apa yang terjadi setelah Timun Mas melempar garam?",
        options: [
          "Terbentuk gunung es",
          "Terbentuk lautan luas",
          "Terbentuk padang pasir",
          "Terbentuk sungai besar",
        ],
        correctAnswer: 1,
        explanation:
          "Garam yang dilempar Timun Mas berubah menjadi lautan luas yang harus dilalui Buto Ijo.",
        hint: "Garam berasal dari laut, jadi...",
        difficulty: "easy",
      },
      {
        id: 7,
        type: "multiple_choice",
        question: "Benda terakhir apa yang berhasil mengalahkan Buto Ijo?",
        options: [
          "Biji mentimun",
          "Jarum",
          "Garam",
          "Terasi",
        ],
        correctAnswer: 3,
        explanation:
          "Terasi yang dilempar berubah menjadi lautan lumpur mendidih yang menenggelamkan Buto Ijo.",
        hint: "Benda terakhir yang dilempar Timun Mas adalah...",
        difficulty: "easy",
      },
      {
        id: 8,
        type: "true_false",
        question: "Cerita Timun Mas mengajarkan bahwa kecerdikan bisa mengalahkan kekuatan fisik.",
        options: ["Benar", "Salah"],
        correctAnswer: 0,
        explanation:
          "Benar! Timun Mas yang kecil dan lemah bisa mengalahkan Buto Ijo yang besar dan kuat dengan kecerdikan menggunakan benda-benda ajaib.",
        hint: "Pikirkan bagaimana Timun Mas bisa lolos dari raksasa yang jauh lebih kuat.",
        difficulty: "easy",
      },
    ],
  },
];

// Helper functions
export function getQuizByStoryId(storyId: number): StoryQuiz | undefined {
  return quizzes.find((quiz) => quiz.storyId === storyId);
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
      message: "Sempurna! Kamu sangat memahami cerita ini! 🌟",
      stars: 3,
    };
  } else if (score >= 80) {
    return {
      grade: "B",
      message: "Bagus sekali! Kamu sudah paham cerita dengan baik! ⭐",
      stars: 3,
    };
  } else if (score >= 70) {
    return {
      grade: "C",
      message: "Cukup baik! Terus belajar ya! 👍",
      stars: 2,
    };
  } else if (score >= 60) {
    return {
      grade: "D",
      message: "Lumayan! Coba baca ceritanya sekali lagi ya! 📖",
      stars: 1,
    };
  } else {
    return {
      grade: "E",
      message: "Jangan menyerah! Coba ulangi dan baca lebih teliti! 💪",
      stars: 1,
    };
  }
}

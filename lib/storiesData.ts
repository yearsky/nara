// Data structure untuk cerita-cerita Nara Verse

export interface StoryScene {
  id: number;
  title: string;
  content: string;
  image: string;
  vocabulary?: {
    word: string;
    meaning: string;
  }[];
}

export interface StoryCharacter {
  name: string;
  description: string;
  image: string;
}

export interface StoryData {
  id: number;
  title: string;
  region: string;
  category: string;
  readTime: string;
  thumbnail: string;
  views: number;
  likes: number;
  isNew: boolean;
  synopsis: string;
  moralValue: string;
  characters: StoryCharacter[];
  scenes: StoryScene[];
  vocabulary: {
    word: string;
    meaning: string;
  }[];
}

export const stories: StoryData[] = [
  {
    id: 1,
    title: "Malin Kundang",
    region: "Sumatera Barat",
    category: "Legenda",
    readTime: "8 menit",
    thumbnail: "https://picsum.photos/seed/malin/400/300",
    views: 1240,
    likes: 89,
    isNew: true,
    synopsis:
      "Kisah seorang anak durhaka yang mengingkari ibunya setelah menjadi kaya raya. Cerita ini mengajarkan pentingnya berbakti kepada orang tua.",
    moralValue:
      "Selalu hormati dan sayangi orang tua. Jangan pernah malu dengan asal-usul kita, karena kesombongan akan membawa petaka.",
    characters: [
      {
        name: "Malin Kundang",
        description: "Seorang pemuda miskin yang merantau dan menjadi kaya",
        image: "https://picsum.photos/seed/malin-char/200/200",
      },
      {
        name: "Ibu Malin",
        description: "Ibu yang sangat menyayangi dan menanti anaknya",
        image: "https://picsum.photos/seed/ibu-malin/200/200",
      },
      {
        name: "Istri Malin",
        description: "Wanita cantik dan kaya yang menjadi istri Malin",
        image: "https://picsum.photos/seed/istri-malin/200/200",
      },
    ],
    scenes: [
      {
        id: 1,
        title: "Kehidupan Miskin",
        content:
          "Di sebuah desa pesisir Sumatera Barat, hiduplah seorang janda miskin bersama anaknya yang bernama Malin Kundang. Mereka hidup sangat sederhana di sebuah gubuk kecil. Setiap hari, sang ibu bekerja keras mencari ikan untuk dijual agar bisa membiayai kehidupan mereka.",
        image: "https://picsum.photos/seed/scene1-malin/600/400",
        vocabulary: [
          { word: "pesisir", meaning: "daerah tepi laut" },
          { word: "janda", meaning: "wanita yang ditinggal mati suaminya" },
        ],
      },
      {
        id: 2,
        title: "Malin Merantau",
        content:
          "Suatu hari, Malin Kundang memutuskan untuk merantau. Ia ingin mengubah nasib dan membuat ibunya hidup lebih baik. Dengan air mata, sang ibu melepas kepergian Malin. \"Hati-hati di perjalanan, Nak. Jaga diri baik-baik,\" pesan ibunya sambil memeluk Malin erat.",
        image: "https://picsum.photos/seed/scene2-malin/600/400",
        vocabulary: [
          { word: "merantau", meaning: "pergi ke daerah lain untuk mencari pekerjaan" },
          { word: "nasib", meaning: "keadaan hidup seseorang" },
        ],
      },
      {
        id: 3,
        title: "Malin Menjadi Kaya",
        content:
          "Bertahun-tahun berlalu, Malin Kundang berhasil menjadi pedagang kaya. Ia memiliki kapal besar dan menikah dengan seorang wanita cantik dari keluarga kaya. Namun, kesuksesan membuatnya lupa pada asal-usulnya dan ibunya yang menunggu di kampung.",
        image: "https://picsum.photos/seed/scene3-malin/600/400",
        vocabulary: [
          { word: "pedagang", meaning: "orang yang berdagang/berjualan" },
          { word: "asal-usul", meaning: "tempat atau keluarga asal seseorang" },
        ],
      },
      {
        id: 4,
        title: "Pertemuan dengan Ibu",
        content:
          "Kapal Malin berlabuh di kampung halamannya. Sang ibu yang mendengar kabar itu segera berlari ke pelabuhan. Dengan penuh harap, ia memanggil anaknya, \"Malin! Anakku! Ibu sangat merindukanmu!\" Namun Malin malah berpura-pura tidak mengenalinya.",
        image: "https://picsum.photos/seed/scene4-malin/600/400",
        vocabulary: [
          { word: "berlabuh", meaning: "kapal berhenti di pelabuhan" },
          { word: "pelabuhan", meaning: "tempat kapal bersandar" },
        ],
      },
      {
        id: 5,
        title: "Pengingkaran",
        content:
          "\"Pergi! Aku tidak mengenal wanita tua ini!\" bentak Malin Kundang. Istri Malin yang cantik merasa malu melihat wanita tua berpakaian compang-camping itu. Hati sang ibu hancur berkeping-keping mendengar kata-kata anaknya sendiri.",
        image: "https://picsum.photos/seed/scene5-malin/600/400",
        vocabulary: [
          { word: "bentak", meaning: "berteriak dengan kasar" },
          { word: "compang-camping", meaning: "sobek-sobek dan tidak rapi" },
        ],
      },
      {
        id: 6,
        title: "Kutukan Ibu",
        content:
          "Dengan air mata mengalir, sang ibu mengangkat tangan ke langit, \"Jika engkau benar-benar anakku Malin Kundang, jadilah engkau batu!\" Tak lama kemudian, langit mendung, badai datang menghantam kapal Malin. Tubuh Malin perlahan berubah menjadi batu.",
        image: "https://picsum.photos/seed/scene6-malin/600/400",
        vocabulary: [
          { word: "kutukan", meaning: "doa buruk atau celaka" },
          { word: "badai", meaning: "angin kencang dan hujan lebat" },
        ],
      },
    ],
    vocabulary: [
      { word: "pesisir", meaning: "daerah tepi laut" },
      { word: "merantau", meaning: "pergi ke daerah lain untuk mencari pekerjaan" },
      { word: "pedagang", meaning: "orang yang berdagang/berjualan" },
      { word: "berlabuh", meaning: "kapal berhenti di pelabuhan" },
      { word: "kutukan", meaning: "doa buruk atau celaka" },
      { word: "durhaka", meaning: "tidak patuh dan tidak menghormati orang tua" },
    ],
  },
  {
    id: 2,
    title: "Roro Jonggrang",
    region: "Jawa Tengah",
    category: "Legenda",
    readTime: "12 menit",
    thumbnail: "https://picsum.photos/seed/roro/400/300",
    views: 2180,
    likes: 156,
    isNew: false,
    synopsis:
      "Kisah putri cantik yang terpaksa menikah dengan pangeran yang membunuh ayahnya. Ia memberikan syarat yang mustahil: membangun 1000 candi dalam semalam.",
    moralValue:
      "Kejujuran dan keikhlasan lebih penting daripada tipu muslihat. Setiap perbuatan akan ada balasannya.",
    characters: [
      {
        name: "Roro Jonggrang",
        description: "Putri cantik jelita dari Kerajaan Prambanan",
        image: "https://picsum.photos/seed/roro-char/200/200",
      },
      {
        name: "Bandung Bondowoso",
        description: "Pangeran sakti dari kerajaan tetangga",
        image: "https://picsum.photos/seed/bandung-char/200/200",
      },
    ],
    scenes: [
      {
        id: 1,
        title: "Perang Kerajaan",
        content:
          "Bandung Bondowoso, seorang pangeran sakti, menyerang Kerajaan Prambanan. Dalam peperangan yang sengit, Raja Prambanan tewas. Bandung Bondowoso memenangkan pertempuran dan menguasai kerajaan.",
        image: "https://picsum.photos/seed/scene1-roro/600/400",
      },
      {
        id: 2,
        title: "Jatuh Cinta",
        content:
          "Saat menginjak istana, Bandung Bondowoso terpesona melihat Roro Jonggrang, putri raja yang baru saja ia kalahkan. Kecantikannya sangat luar biasa. Bandung ingin menikahi Roro Jonggrang.",
        image: "https://picsum.photos/seed/scene2-roro/600/400",
      },
      {
        id: 3,
        title: "Syarat Mustahil",
        content:
          "Roro Jonggrang membenci Bandung karena telah membunuh ayahnya. Namun ia tidak bisa menolak secara langsung. \"Baiklah, aku akan menikahimu jika kau bisa membangun 1000 candi dalam satu malam,\" kata Roro dengan yakin bahwa itu mustahil.",
        image: "https://picsum.photos/seed/scene3-roro/600/400",
      },
      {
        id: 4,
        title: "Bantuan Jin dan Makhluk Halus",
        content:
          "Bandung Bondowoso menerima tantangan itu. Dengan kesaktiannya, ia memanggil seluruh jin dan makhluk halus untuk membantunya. Mereka bekerja dengan sangat cepat. Dalam sekejap, ratusan candi mulai berdiri!",
        image: "https://picsum.photos/seed/scene4-roro/600/400",
      },
      {
        id: 5,
        title: "Tipu Muslihat Roro",
        content:
          "Melihat pembangunan hampir selesai, Roro Jonggrang panik. Ia memerintahkan para dayang untuk menumbuk lesung dan membakar jerami. Ayam-ayam berkokok mengira sudah pagi. Para jin kabur karena takut terkena sinar matahari.",
        image: "https://picsum.photos/seed/scene5-roro/600/400",
      },
      {
        id: 6,
        title: "Kutukan Menjadi Arca",
        content:
          "Bandung Bondowoso marah besar mengetahui tipu muslihat Roro. Candi yang terbangun baru 999. \"Kau telah menipuku! Jadilah kau candi yang ke-1000!\" Roro Jonggrang berubah menjadi arca batu yang cantik, melengkapi Candi Prambanan.",
        image: "https://picsum.photos/seed/scene6-roro/600/400",
      },
    ],
    vocabulary: [
      { word: "sakti", meaning: "memiliki kekuatan magis atau supernatural" },
      { word: "terpesona", meaning: "sangat kagum dan terpikat" },
      { word: "dayang", meaning: "pelayan wanita di istana" },
      { word: "lesung", meaning: "alat untuk menumbuk padi" },
      { word: "arca", meaning: "patung dari batu" },
    ],
  },
  {
    id: 3,
    title: "Timun Mas",
    region: "Jawa Tengah",
    category: "Dongeng",
    readTime: "6 menit",
    thumbnail: "https://picsum.photos/seed/timun/400/300",
    views: 980,
    likes: 72,
    isNew: true,
    synopsis:
      "Kisah seorang gadis bernama Timun Mas yang harus melawan raksasa jahat. Dengan kecerdikan dan bantuan benda-benda ajaib, ia berhasil lolos dari kejaran raksasa.",
    moralValue:
      "Kecerdasan dan keberanian dapat mengalahkan kekuatan fisik. Jangan pernah menyerah dalam menghadapi kesulitan.",
    characters: [
      {
        name: "Timun Mas",
        description: "Gadis cantik yang lahir dari buah timun emas",
        image: "https://picsum.photos/seed/timun-char/200/200",
      },
      {
        name: "Mbok Srini",
        description: "Janda tua yang sangat menginginkan anak",
        image: "https://picsum.photos/seed/mbok-char/200/200",
      },
      {
        name: "Buto Ijo",
        description: "Raksasa hijau yang menakutkan dan kejam",
        image: "https://picsum.photos/seed/buto-char/200/200",
      },
    ],
    scenes: [
      {
        id: 1,
        title: "Permohonan Mbok Srini",
        content:
          "Mbok Srini, seorang janda tua, sangat menginginkan seorang anak. Suatu hari, ia bertemu dengan Buto Ijo, raksasa hijau yang menakutkan. Buto Ijo berjanji memberikan anak dengan syarat: saat berusia 17 tahun, anak itu harus diserahkan kepadanya.",
        image: "https://picsum.photos/seed/scene1-timun/600/400",
      },
      {
        id: 2,
        title: "Lahirnya Timun Mas",
        content:
          "Buto Ijo memberikan benih timun emas kepada Mbok Srini. Setelah ditanam, tumbuh buah timun emas yang besar. Ketika buah itu dibelah, keluarlah seorang bayi perempuan yang cantik. Mbok Srini sangat bahagia dan menamainya Timun Mas.",
        image: "https://picsum.photos/seed/scene2-timun/600/400",
      },
      {
        id: 3,
        title: "Timun Mas Tumbuh Dewasa",
        content:
          "Timun Mas tumbuh menjadi gadis yang cantik dan cerdas. Mbok Srini sangat menyayanginya. Namun, semakin dekat usia Timun Mas 17 tahun, Mbok Srini semakin cemas mengingat janjinya kepada Buto Ijo.",
        image: "https://picsum.photos/seed/scene3-timun/600/400",
      },
      {
        id: 4,
        title: "Buto Ijo Datang Menagih",
        content:
          "Tepat saat Timun Mas berusia 17 tahun, Buto Ijo datang menagih janji. Mbok Srini menangis dan tidak rela kehilangan Timun Mas. Ia memberikan empat bungkusan ajaib kepada Timun Mas: biji mentimun, jarum, garam, dan terasi.",
        image: "https://picsum.photos/seed/scene4-timun/600/400",
      },
      {
        id: 5,
        title: "Pelarian Timun Mas",
        content:
          "Timun Mas lari sekuat tenaga. Buto Ijo mengejarnya dengan marah. Timun Mas melempar biji mentimun, dan seketika tumbuh hutan mentimun lebat. Namun Buto Ijo berhasil melewatinya. Timun Mas lalu melempar jarum yang berubah menjadi hutan bambu runcing.",
        image: "https://picsum.photos/seed/scene5-timun/600/400",
      },
      {
        id: 6,
        title: "Buto Ijo Tewas",
        content:
          "Buto Ijo masih terus mengejar. Timun Mas melempar garam yang berubah menjadi lautan luas. Buto Ijo berenang melewatinya. Akhirnya, Timun Mas melempar terasi. Terbentuklah lautan lumpur mendidih yang menenggelamkan Buto Ijo. Timun Mas selamat dan kembali ke pelukan Mbok Srini.",
        image: "https://picsum.photos/seed/scene6-timun/600/400",
      },
    ],
    vocabulary: [
      { word: "benih", meaning: "biji tanaman untuk ditanam" },
      { word: "cemas", meaning: "perasaan khawatir dan gelisah" },
      { word: "terasi", meaning: "bumbu masakan dari udang yang difermentasi" },
      { word: "lebat", meaning: "sangat tebal dan rapat" },
      { word: "lumpur", meaning: "tanah yang bercampur air" },
    ],
  },
];

// Helper function untuk get story by id
export function getStoryById(id: number): StoryData | undefined {
  return stories.find((story) => story.id === id);
}

// Helper function untuk get all story summaries (untuk listing page)
export function getAllStorySummaries() {
  return stories.map((story) => ({
    id: story.id,
    title: story.title,
    region: story.region,
    category: story.category,
    readTime: story.readTime,
    thumbnail: story.thumbnail,
    views: story.views,
    likes: story.likes,
    isNew: story.isNew,
  }));
}

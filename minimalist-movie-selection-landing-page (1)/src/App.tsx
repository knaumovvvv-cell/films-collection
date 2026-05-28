import { useState, useEffect } from "react";

interface Movie {
  id: number;
  title: string;
  originalTitle: string;
  year: number;
  director: string;
  mood: string;
  moodColor: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
}

const movies: Movie[] = [
  {
    id: 1,
    title: "Джокер",
    originalTitle: "Joker",
    year: 2019,
    director: "Тодд Филлипс",
    mood: "Тяжёлый",
    moodColor: "bg-red-900/10 text-red-900/70 border-red-900/15",
    description:
      "Город давит на тебя шумом, равнодушием и бетоном. Артур Флек не злодей — он просто человек, которого никто не захотел услышать. Филлипс снял не комиксовый фильм, а портрет социальной боли, от которой сводит скулы. Здесь нет катарсиса — только нарастающий гул тишины внутри человека, которого мир решил не замечать.",
    imageUrl:
      "https://images.pexels.com/photos/19793223/pexels-photo-19793223.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    imageAlt:
      "Одинокий силуэт на тёмной городской улице — атмосфера изоляции и надрыва",
  },
  {
    id: 2,
    title: "Бивень",
    originalTitle: "Tusk",
    year: 2014,
    director: "Кевин Смит",
    mood: "Странный",
    moodColor: "bg-violet-900/10 text-violet-900/70 border-violet-900/15",
    description:
      "Кевин Смит забрался в территорию, где ему никто не ждал — и вышло жутко. Это не хоррор в привычном смысле, а медленное сползание в безумие, от которого хочется отвернуться, но не получается. Сюрреализм здесь — не приём, а диагноз. Фильм оставляет ощущение липкого, неотвязного кошмара, в который ты попал вместе с героем.",
    imageUrl:
      "https://images.pexels.com/photos/26612521/pexels-photo-26612521.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    imageAlt:
      "Силуэт в тёмном туманном лесу — ощущение сюрреалистичного ужаса",
  },
  {
    id: 3,
    title: "Никто",
    originalTitle: "Nobody",
    year: 2021,
    director: "Илья Найшуллер",
    mood: "Холодный",
    moodColor: "bg-sky-900/10 text-sky-900/70 border-sky-900/15",
    description:
      "Тишина пригорода, серость быта, мужчина, которого все считают мебелью. А потом — щелчок. Найшуллер мастерски строит контраст между удушающей рутиной и взрывной яростью. Это кино про тех, кого недооценили — и про ту самую секунду, когда «никто» решает перестать молчать.",
    imageUrl:
      "https://images.pexels.com/photos/12748702/pexels-photo-12748702.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    imageAlt:
      "Тихая ночная пригородная улица — спокойствие, которое вот-вот взорвётся",
  },
  {
    id: 4,
    title: "Семь психопатов",
    originalTitle: "Seven Psychopaths",
    year: 2012,
    director: "Мартин МакДона",
    mood: "Абсурдный",
    moodColor: "bg-amber-900/10 text-amber-900/70 border-amber-900/15",
    description:
      "МакДона пишет диалоги как хирург — точно, больно и с чёрным юмором, от которого нервно смеёшься. Это фильм, где безумие персонажей — зеркало нашей собственной абсурдности. Здесь насилие граничит с поэзией, а самые тронутые герои говорят самые честные вещи. После просмотра остаётся привкус горькой, красивой иронии.",
    imageUrl:
      "https://images.pexels.com/photos/5389619/pexels-photo-5389619.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    imageAlt:
      "Пустая сцена в драматическом свете — театральность безумия",
  },
  {
    id: 5,
    title: "Старикам тут не место",
    originalTitle: "No Country for Old Men",
    year: 2007,
    director: "Джоэл и Итан Коэны",
    mood: "Бескомпромиссный",
    moodColor: "bg-stone-700/10 text-stone-700/80 border-stone-700/15",
    description:
      "Братья Коэн сняли фильм, в котором тишина страшнее любого крика. Антон Чигур — не персонаж, а сила природы, неумолимая и лишённая эмоций. Пустыня Техаса здесь — не декорация, а действующее лицо: равнодушное, бесконечное, высасывающее надежду. Это кино, после которого молчишь — потому что сказать нечего.",
    imageUrl:
      "https://images.pexels.com/photos/16962784/pexels-photo-16962784.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    imageAlt:
      "Пустая дорога уходит в горизонт пустыни — бескомпромиссная пустота",
  },
];

function MoodTag({ mood, colorClass }: { mood: string; colorClass: string }) {
  return (
    <span
      className={`inline-block rounded-full border px-3 py-1 text-xs font-medium tracking-wider uppercase ${colorClass}`}
    >
      {mood}
    </span>
  );
}

function MovieCard({ movie, index }: { movie: Movie; index: number }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 150 * index);
    return () => clearTimeout(timer);
  }, [index]);

  const isEven = index % 2 === 0;

  return (
    <article
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div
        className={`flex flex-col ${
          isEven ? "lg:flex-row" : "lg:flex-row-reverse"
        } gap-8 lg:gap-16 items-center`}
      >
        {/* Poster */}
        <div className="w-full lg:w-5/12 flex-shrink-0">
          <div className="relative aspect-[2/3] max-w-[360px] mx-auto overflow-hidden rounded-2xl shadow-xl bg-warm-200/50">
            {!imageLoaded && (
              <div className="absolute inset-0 animate-pulse bg-gradient-to-b from-warm-200/60 to-warm-300/40" />
            )}
            <img
              src={movie.imageUrl}
              alt={movie.imageAlt}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
              }`}
            />
            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Content */}
        <div className="w-full lg:w-7/12 space-y-5">
          <div className="space-y-3">
            <MoodTag mood={movie.mood} colorClass={movie.moodColor} />
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold leading-tight text-warm-900 tracking-tight">
              {movie.title}
            </h2>
            <p className="text-sm text-warm-500 tracking-wide">
              <span className="italic font-serif text-warm-600">
                {movie.originalTitle}
              </span>
              <span className="mx-2 text-warm-300">·</span>
              {movie.year}
              <span className="mx-2 text-warm-300">·</span>
              {movie.director}
            </p>
          </div>

          <p className="text-base sm:text-lg leading-relaxed sm:leading-loose text-warm-700 max-w-xl">
            {movie.description}
          </p>
        </div>
      </div>
    </article>
  );
}

function Divider() {
  return (
    <div className="flex items-center justify-center py-8 lg:py-12">
      <div className="h-px w-16 bg-warm-300/60" />
      <div className="mx-4 h-1.5 w-1.5 rounded-full bg-warm-400/40" />
      <div className="h-px w-16 bg-warm-300/60" />
    </div>
  );
}

export default function App() {
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHeaderVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-warm-50 selection:bg-warm-300 selection:text-warm-900">
      {/* Header */}
      <header
        className={`pt-16 sm:pt-24 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 px-6 transition-all duration-1000 ease-out ${
          headerVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6"
        }`}
      >
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* Small label */}
          <p className="text-xs tracking-[0.3em] uppercase text-warm-400 font-medium">
            Подборка · Кино · Настроение
          </p>

          {/* Main title */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.15] text-warm-900 tracking-tight">
            5&nbsp;фильмов, которые пробирают до&nbsp;костей
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl leading-relaxed text-warm-500 font-light max-w-lg mx-auto">
            Если вам понравился «Догман»
          </p>
        </div>
      </header>

      {/* Intro */}
      <section
        className={`px-6 pb-16 sm:pb-24 transition-all duration-1000 delay-300 ease-out ${
          headerVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6"
        }`}
      >
        <div className="max-w-xl mx-auto">
          <p className="text-base sm:text-lg leading-relaxed sm:leading-loose text-warm-600 text-center">
            Эти фильмы объединяет одно — они не&nbsp;отпускают. Здесь нет
            простых героев и&nbsp;лёгких ответов. Только психологическая
            глубина, социальный надрыв и&nbsp;тот&nbsp;самый привкус
            неуютной правды, который остаётся после титров. Каждый из&nbsp;них —
            по-своему больной, по-своему красивый.
          </p>
        </div>
      </section>

      {/* Separator */}
      <Divider />

      {/* Movie List */}
      <main className="px-6 sm:px-8">
        <div className="max-w-5xl mx-auto space-y-0">
          {movies.map((movie, index) => (
            <div key={movie.id}>
              <div className="py-12 sm:py-16 lg:py-20">
                <MovieCard movie={movie} index={index} />
              </div>
              {index < movies.length - 1 && <Divider />}
            </div>
          ))}
        </div>
      </main>

      {/* Bottom credits */}
      <footer className="pt-16 sm:pt-24 pb-12 sm:pb-16">
        <div className="text-center">
          <p className="text-xs text-warm-300 tracking-wider">
            Сделано с&nbsp;любовью к&nbsp;кино
          </p>
        </div>
      </footer>
    </div>
  );
}

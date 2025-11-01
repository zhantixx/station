import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans 
      bg-gradient-to-br from-sky-300 via-cyan-400 to-yellow-300 
      dark:from-gray-900 dark:via-sky-800 dark:to-yellow-600
      bg-[length:150%_150%] bg-cover bg-center">
      
      <main className="flex min-h-screen w-full max-w-5xl flex-col items-center justify-between 
        py-32 px-16 bg-white/60 dark:bg-black/60 sm:items-start rounded-2xl shadow-2xl backdrop-blur-md">
        
        <Image
          src="/kazakhstan_team.png"
          alt="Kazakhstan team"
          width={100}
          height={20}
          priority
        />

        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the page.tsx file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-700 dark:text-zinc-300">
            Zhanat{" "}
            <a
              href="https://vercel.com/templates?framework=next.js"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            ></a>{" "}
            Balnur{" "}
            <a
              href="https://nextjs.org/learn"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            ></a>{" "}
            Akzhol
          </p>
        </div>

        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full 
              bg-black text-white dark:bg-white dark:text-black 
              transition-colors hover:bg-gray-800 dark:hover:bg-gray-200 
              md:w-[158px]"
            href="https://vercel.com/new"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Отправить
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid 
              border-black/[.2] dark:border-white/[.2] 
              px-5 transition-colors hover:border-transparent hover:bg-black/[.05] 
              dark:hover:bg-white/[.1] md:w-[158px]"
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Документация
          </a>
        </div>
      </main>
    </div>
  );
}

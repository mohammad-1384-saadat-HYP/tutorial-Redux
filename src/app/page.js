import Counter from "@/features/counter/Counter";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black">
      <div className="w-full max-w-lg flex flex-col items-center">
        <Counter />
      </div>
    </main>
  );
}

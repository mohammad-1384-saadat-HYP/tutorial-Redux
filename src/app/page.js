import Counter from "@/features/counter/Counter";
import TodoList from "@/features/todos/TodoList";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white selection:bg-indigo-500 selection:text-white relative overflow-x-hidden">
      {/* افکت‌های پس‌زمینه نورانی مدرن */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-violet-600/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* هدر بالای صفحه */}
        <header dir="rtl" className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-300 mb-4 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            معماری Feature-Based با Redux Toolkit و Next.js
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400 mb-3">
            داشبورد مدیریت وضعیت ریداکس
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto">
            ترکیب دو ویژگی مستقل (Counter و Todo List) در یک استور سراسری با قابلیت
            ذخیره‌سازی پایدار
          </p>
        </header>

        {/* چیدمان دسکتاپ (کنار هم) و موبایل (اسکرول ستونی با فضای کافی) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ستون شمارنده (Counter) */}
          <section className="lg:col-span-5 w-full flex flex-col items-center min-h-[70vh] lg:min-h-0 justify-center lg:justify-start lg:sticky lg:top-8">
            <Counter />

            {/* نشانگر هوشمند اسکرول مخصوص موبایل */}
            <div className="lg:hidden w-full flex flex-col items-center mt-8 pt-6 border-t border-white/10 text-center">
              <span className="text-xs text-zinc-400 mb-3 font-medium">
                بخش بعدی: لیست کارهای روزمره (Todos)
              </span>
              <a
                href="#todos-section"
                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 hover:text-white text-xs font-semibold backdrop-blur-md shadow-lg shadow-indigo-500/10 active:scale-95 transition-all animate-bounce"
              >
                <span>مشاهده بخش تسک‌ها</span>
                <svg
                  className="w-4 h-4 text-indigo-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </a>
            </div>
          </section>

          {/* ستون لیست کارها (TodoList) */}
          <section id="todos-section" className="lg:col-span-7 w-full scroll-mt-6 pt-4 lg:pt-0">
            <TodoList />
          </section>
        </div>

        {/* فوتر مینیمال */}
        <footer className="mt-16 pt-8 border-t border-white/10 text-center text-xs text-zinc-500">
          پروژه آموزش و پیاده‌سازی معماری تمیز ریداکس در Next.js
        </footer>
      </div>
    </main>
  );
}

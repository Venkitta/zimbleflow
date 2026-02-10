import { Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ZimbleFlowLanding() {
  return (
    <div className="bg-white text-slate-900 min-h-screen relative overflow-hidden flex flex-col items-center justify-center bg-grid-pattern">

      {/* Decorative Green Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-200/20 rounded-full blur-3xl filter opacity-50"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-green-200/20 rounded-full blur-3xl filter opacity-50"></div>
      </div>

      {/* Main Content Container */}
      <main className="relative z-10 w-full max-w-5xl mx-auto px-6 py-20 flex flex-col items-center text-center">
        {/* Top Badges / Social Proof */}
        <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6 mb-10 text-sm md:text-base font-medium text-slate-600">
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm border border-slate-100">
            <div className="bg-emerald-100 text-emerald-600 rounded-full p-0.5">
              <Check className="w-3 h-3 stroke-[3]" />
            </div>
            <span>For Developers, Designers, & Product Teams</span>
          </div>
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm border border-slate-100">
            <div className="bg-emerald-100 text-emerald-600 rounded-full p-0.5">
              <Check className="w-3 h-3 stroke-[3]" />
            </div>
            <span>Drag-and-Drop UI Builder</span>
          </div>
        </div>

        {/* 3D Product Name */}
        <div className="mb-6 perspective-[1000px]">
          <h1 className="animate-float perspective-1000 preserve-3d font-space-grotesk text-6xl md:text-8xl font-bold tracking-tighter text-slate-900 cursor-default select-none">
            ZimbleFlow
          </h1>
        </div>

        {/* Main Headline */}
        <h2 className="font-space-grotesk text-4xl md:text-6xl font-semibold tracking-tight leading-[1.1] mb-8 text-slate-900 max-w-4xl">
          Visually build <span className="text-emerald-600">reactive UIs</span> without writing code manually.
        </h2>

        {/* CTA Button with Border Gradient */}
        <Link href="/editor" className="group relative inline-block mt-10">
          {/* Gradient Border Layer */}
          <div className="absolute -inset-[2px] rounded-full bg-gradient-to-r from-emerald-400 via-green-300 to-emerald-500 opacity-70 blur-[1px] group-hover:opacity-100 transition duration-500 group-hover:blur-[2px]"></div>

          {/* Button Content */}
          <button className="cursor-pointer relative rounded-full bg-white text-slate-900 px-10 py-5 text-lg font-semibold tracking-tight hover:bg-slate-50 transition-colors flex items-center gap-3">
            <span>Start Building</span>
            <ArrowRight className="w-5 h-5 text-emerald-600" />
          </button>
        </Link>

      </main>
    </div>
  );
}
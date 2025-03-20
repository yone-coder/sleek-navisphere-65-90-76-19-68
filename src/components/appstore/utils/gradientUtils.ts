
/**
 * Returns a Tailwind gradient class based on a color
 */
export const getGradient = (color: string) => {
  switch(color) {
    case 'bg-purple-600':
      return 'from-purple-500 via-purple-400 to-indigo-500';
    case 'bg-green-600':
      return 'from-green-400 via-emerald-500 to-teal-400';
    case 'bg-slate-800':
      return 'from-slate-700 via-slate-800 to-gray-900';
    case 'bg-zinc-800':
      return 'from-zinc-700 via-zinc-800 to-neutral-900';
    case 'bg-emerald-500':
      return 'from-emerald-400 via-green-500 to-teal-500';
    case 'bg-indigo-500':
      return 'from-indigo-400 via-blue-500 to-violet-500';
    case 'bg-purple-500':
      return 'from-purple-400 via-fuchsia-500 to-pink-500';
    case 'bg-pink-500':
      return 'from-pink-400 via-rose-500 to-red-400';
    case 'bg-orange-500':
      return 'from-orange-400 via-amber-500 to-yellow-400';
    case 'bg-yellow-500':
      return 'from-yellow-300 via-amber-400 to-orange-400';
    case 'bg-blue-500':
      return 'from-blue-400 via-cyan-500 to-sky-500';
    case 'bg-cyan-500':
      return 'from-cyan-400 via-teal-500 to-blue-400';
    case 'bg-sky-500':
      return 'from-sky-400 via-blue-500 to-indigo-400';
    case 'bg-amber-500':
      return 'from-amber-400 via-yellow-500 to-orange-400';
    case 'bg-rose-500':
      return 'from-rose-400 via-pink-500 to-red-500';
    case 'bg-violet-500':
      return 'from-violet-400 via-purple-500 to-indigo-500';
    case 'bg-gray-600':
      return 'from-gray-500 via-slate-600 to-neutral-700';
    case 'bg-red-500':
      return 'from-red-400 via-rose-500 to-pink-500';
    case 'bg-teal-500':
      return 'from-teal-400 via-cyan-500 to-emerald-400';
    default:
      return 'from-blue-400 via-cyan-500 to-sky-500';
  }
};

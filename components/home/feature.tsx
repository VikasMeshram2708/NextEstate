export function Feature({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="w-4 h-4 text-slate-400" aria-hidden />
      <span className="text-xs truncate">{label}</span>
    </div>
  );
}

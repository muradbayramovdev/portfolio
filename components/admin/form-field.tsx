import { cn } from "@/lib/utils";

export function FormField({
  label,
  description,
  children,
  className
}: {
  label: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={cn("grid gap-2", className)}>
      <span className="text-sm font-semibold text-stone-900">{label}</span>
      {description ? <span className="text-xs text-stone-500">{description}</span> : null}
      {children}
    </label>
  );
}

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cnInput(props.className)} />;
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cnInput(props.className)} />;
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={cnInput(props.className)} />;
}

function cnInput(className?: string) {
  return cn(
    "min-h-12 rounded-2xl border border-stone-900/10 bg-white/80 px-4 py-3 text-sm text-stone-950 outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-500/10",
    className
  );
}

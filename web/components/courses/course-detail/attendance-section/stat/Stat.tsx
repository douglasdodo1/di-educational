export const Stat = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="border-border bg-card flex flex-col gap-1 rounded-2xl border p-4">
      <span className="font-heading text-2xl font-semibold">{value}</span>
      <span className="text-muted-foreground text-xs">{label}</span>
    </div>
  )
}

export default function ComboboxSkeleton() {
  return (
    <div className="animate-pulse w-full">
      <div className="h-10 w-full bg-muted rounded-md" />
      <span className="sr-only">Combobox options loading..</span>
    </div>
  );
}

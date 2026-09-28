import { Spinner } from "./Spinner";

interface PageLoaderProps {
  message?: string;
}

export function PageLoader({ message }: PageLoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-5">
      <div className="relative">
        <Spinner size="lg" variant="gold" />
        <Spinner
          size="sm"
          variant="gold"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40"
          style={{ animationDirection: "reverse", animationDuration: "0.7s" }}
        />
      </div>
      {message && (
        <p className="text-sm text-muted-foreground font-serif italic">{message}</p>
      )}
    </div>
  );
}

import { Loader2 } from "lucide-react";
import { cn } from "../../lib/utils";
export default function Spinner() {
  return (
    <Loader2
      className={cn("h-50 w-20 animate-spin text-primary text-center")}
    />
  );
}

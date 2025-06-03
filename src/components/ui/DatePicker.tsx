import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils"; // si tienes esta utilidad
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

export function DatePicker({ value, onChange }: {
  value: string;
  onChange: (newDate: string) => void;
}) {
  const [open, setOpen] = useState(false);
const parsedDate = new Date(value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("w-full border-date justify-start text-left font-normal", !value && "text-muted-foreground borde-date")}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(parsedDate, "dd-MM-yyyy") : "Selecciona una fecha"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={parsedDate}
          onSelect={(selected) => {
            if (selected) {
            onChange(format(selected, "yyyy-MM-dd")); 
              setOpen(false);
            }
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

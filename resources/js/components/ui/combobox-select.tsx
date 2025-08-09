import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover"
import { Button } from "./button"
import { Check, ChevronsUpDown } from "lucide-react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./command"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface ComboboxSelectProps {
    options: { label: string, value: any }[],
    value: any,
    onChange: (value: any) => void,
    emptyMessage: string
    placeholder: string
}

export const ComboboxSelect = ({ options, value, onChange, emptyMessage, placeholder }: ComboboxSelectProps) => {
    const [open, setOpen] = useState(false)
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between"
                >
                {value
                    ? options.find((option) => option.value === value)?.label
                    : placeholder}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0 z-1">
                <Command>
                    <CommandInput placeholder={placeholder} className="h-9" />
                    <CommandList>
                        <CommandEmpty>{emptyMessage}</CommandEmpty>
                        <CommandGroup>
                            {options.map((option) => (
                                <CommandItem
                                key={option.value}
                                value={option.value}
                                onSelect={(currentValue) => {
                                    onChange(option.value)
                                    setOpen(false)
                                }}
                                >
                                    {option.label}
                                    <Check
                                    className={cn(
                                        "ml-auto",
                                        value === option.value ? "opacity-100" : "opacity-0"
                                    )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
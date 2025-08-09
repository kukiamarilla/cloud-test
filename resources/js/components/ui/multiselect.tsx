import { cn } from "@/lib/utils"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./command"
import { Check } from "lucide-react"

interface MultiSelectProps {
    options: { label: string, value: any }[],
    value: any[],
    onChange: (value: any) => void,
    emptyMessage: string
    placeholder: string
}

export const MultiSelect = ({ options, value, onChange, emptyMessage, placeholder }: MultiSelectProps) => {
    const addValue = (currentValue: any) => {
        onChange([...value, currentValue])
    }
    const removeValue = (currentValue: any) => {
        onChange(value.filter((v: any) => v !== currentValue))
    }
    const isSelected = (currentValue: any) => {
        return value.includes(currentValue)
    }

    return (
        <div>
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
                                if(isSelected(option.value)) removeValue(option.value)
                                else addValue(option.value)
                            }}
                            >
                                {option.label}
                                <Check
                                className={cn(
                                    "ml-auto",
                                    isSelected(option.value) ? "opacity-100" : "opacity-0"
                                )}
                                />
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </Command>
        </div>
    )
}
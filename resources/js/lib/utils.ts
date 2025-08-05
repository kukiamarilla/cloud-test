import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string) {
  return new Date(setTimezone(date, -3)).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
  });
}

export function setTimezone(date: string, timezone: number){
  let timezoneString: string;
  if(timezone > 0){
    timezoneString = `+${timezone.toString().padStart(2, '0')}:00`;
  } else if(timezone < 0){
    timezoneString = `-${Math.abs(timezone).toString().padStart(2, '0')}:00`;
  }else{
    timezoneString = `Z`;
  }
  const dateWithTimezone = `${date.substring(0,10)}T00:00:00${timezoneString}`;
  return dateWithTimezone;
}
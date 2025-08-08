import { fajrIcon, dhuhrIcon, asrIcon, maghribIcon, ishaIcon, jummahIcon } from '../assets/images/prayer-images'

export const prayerTimes = [
  { 
    name: 'Fajr', 
    ajax: { time: '5:30 AM', iqamah: '5:45 AM' },
    scarborough: { time: '5:25 AM', iqamah: '5:40 AM' },
    icon: fajrIcon
  },
  { 
    name: 'Dhuhr', 
    ajax: { time: '12:45 PM', iqamah: '1:00 PM' },
    scarborough: { time: '12:50 PM', iqamah: '1:05 PM' },
    icon: dhuhrIcon
  },
  { 
    name: 'Asr', 
    ajax: { time: '4:15 PM', iqamah: '4:30 PM' },
    scarborough: { time: '4:20 PM', iqamah: '4:35 PM' },
    icon: asrIcon
  },
  { 
    name: 'Maghrib', 
    ajax: { time: '6:30 PM', iqamah: '6:40 PM' },
    scarborough: { time: '6:35 PM', iqamah: '6:45 PM' },
    icon: maghribIcon
  },
  { 
    name: 'Isha', 
    ajax: { time: '8:00 PM', iqamah: '8:15 PM' },
    scarborough: { time: '8:05 PM', iqamah: '8:20 PM' },
    icon: ishaIcon
  },
  { 
    name: 'Jummah 1', 
    ajax: { time: '12:30 PM' },
    scarborough: { time: '12:35 PM' },
    icon: jummahIcon, 
    isJummah: true 
  },
  { 
    name: 'Jummah 2', 
    ajax: { time: '1:45 PM' },
    scarborough: { time: '1:50 PM' },
    icon: null, 
    isJummah: true 
  }
] 
import { Geolocation } from '@capacitor/geolocation';
import { calculateFromCoordinates } from './prayerService';
export async function getCurrentLocation(force=false){try{const perm=await Geolocation.checkPermissions();if(perm.location!=='granted') await Geolocation.requestPermissions();const pos=await Geolocation.getCurrentPosition({enableHighAccuracy:false,timeout:10000,maximumAge:3600000});return await calculateFromCoordinates(pos.coords.latitude,pos.coords.longitude)}catch(error){if(!force)return null;throw error}}

import { LocalNotifications } from '@capacitor/local-notifications';
import { Geolocation } from '@capacitor/geolocation';
export async function requestNoorPermissions(){try{await Geolocation.requestPermissions()}catch{}try{await LocalNotifications.requestPermissions()}catch{} }

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface UserMovedPayload {
  id: string; 
  coords: Coordinates;
}

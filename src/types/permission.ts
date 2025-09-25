export type Permission =
  | 'camera'
  | 'photo_library'
  | 'location'
  | 'notification'
  | 'microphone'
  | 'contacts'
  | 'calendar'
  | 'reminders'
  | 'motion'
  | 'media_library'
  | 'bluetooth'
  | 'network_state';

export interface PermissionStatus {
  granted: boolean;
  canAskAgain: boolean;
  status: 'granted' | 'denied' | 'unavailable' | 'blocked';
}

export interface PermissionRequest {
  permission: Permission;
  title: string;
  message: string;
  buttonPositive?: string;
  buttonNegative?: string;
}

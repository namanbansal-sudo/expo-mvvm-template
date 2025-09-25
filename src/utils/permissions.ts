import { Permission, PermissionStatus, PermissionRequest } from '../types/permission';

export class PermissionManager {
  private static instance: PermissionManager;

  private constructor() {}

  static getInstance(): PermissionManager {
    if (!PermissionManager.instance) {
      PermissionManager.instance = new PermissionManager();
    }
    return PermissionManager.instance;
  }

  async checkPermission(permission: Permission): Promise<PermissionStatus> {
    // In a real implementation, you would use expo-permissions or specific permission APIs
    // For now, we'll return a mock response
    return {
      granted: true,
      canAskAgain: true,
      status: 'granted',
    };
  }

  async requestPermission(permission: Permission, requestConfig?: Partial<PermissionRequest>): Promise<PermissionStatus> {
    // In a real implementation, you would show a permission dialog and handle the response
    // For now, we'll return a mock response
    return {
      granted: true,
      canAskAgain: true,
      status: 'granted',
    };
  }

  async checkMultiplePermissions(permissions: Permission[]): Promise<Record<Permission, PermissionStatus>> {
    const results: Record<Permission, PermissionStatus> = {} as Record<Permission, PermissionStatus>;

    for (const permission of permissions) {
      results[permission] = await this.checkPermission(permission);
    }

    return results;
  }

  async requestMultiplePermissions(
    permissions: Permission[],
    requestConfigs?: Partial<Record<Permission, PermissionRequest>>
  ): Promise<Record<Permission, PermissionStatus>> {
    const results: Record<Permission, PermissionStatus> = {} as Record<Permission, PermissionStatus>;

    for (const permission of permissions) {
      const config = requestConfigs?.[permission];
      results[permission] = await this.requestPermission(permission, config);
    }

    return results;
  }

  getPermissionRequestConfig(permission: Permission): PermissionRequest {
    const configs: Record<Permission, PermissionRequest> = {
      camera: {
        permission: 'camera',
        title: 'Camera Permission',
        message: 'This app needs access to your camera to take photos and videos.',
        buttonPositive: 'Allow',
        buttonNegative: 'Deny',
      },
      photo_library: {
        permission: 'photo_library',
        title: 'Photo Library Permission',
        message: 'This app needs access to your photo library to select images.',
        buttonPositive: 'Allow',
        buttonNegative: 'Deny',
      },
      location: {
        permission: 'location',
        title: 'Location Permission',
        message: 'This app needs access to your location to provide location-based services.',
        buttonPositive: 'Allow',
        buttonNegative: 'Deny',
      },
      notification: {
        permission: 'notification',
        title: 'Notification Permission',
        message: 'This app needs permission to send you notifications.',
        buttonPositive: 'Allow',
        buttonNegative: 'Deny',
      },
      microphone: {
        permission: 'microphone',
        title: 'Microphone Permission',
        message: 'This app needs access to your microphone to record audio.',
        buttonPositive: 'Allow',
        buttonNegative: 'Deny',
      },
      contacts: {
        permission: 'contacts',
        title: 'Contacts Permission',
        message: 'This app needs access to your contacts to provide social features.',
        buttonPositive: 'Allow',
        buttonNegative: 'Deny',
      },
      calendar: {
        permission: 'calendar',
        title: 'Calendar Permission',
        message: 'This app needs access to your calendar to schedule events.',
        buttonPositive: 'Allow',
        buttonNegative: 'Deny',
      },
      reminders: {
        permission: 'reminders',
        title: 'Reminders Permission',
        message: 'This app needs access to your reminders to set notifications.',
        buttonPositive: 'Allow',
        buttonNegative: 'Deny',
      },
      motion: {
        permission: 'motion',
        title: 'Motion Permission',
        message: 'This app needs access to motion sensors for fitness tracking.',
        buttonPositive: 'Allow',
        buttonNegative: 'Deny',
      },
      media_library: {
        permission: 'media_library',
        title: 'Media Library Permission',
        message: 'This app needs access to your media library to play music and videos.',
        buttonPositive: 'Allow',
        buttonNegative: 'Deny',
      },
      bluetooth: {
        permission: 'bluetooth',
        title: 'Bluetooth Permission',
        message: 'This app needs access to Bluetooth to connect to devices.',
        buttonPositive: 'Allow',
        buttonNegative: 'Deny',
      },
      network_state: {
        permission: 'network_state',
        title: 'Network State Permission',
        message: 'This app needs access to network state to check connectivity.',
        buttonPositive: 'Allow',
        buttonNegative: 'Deny',
      },
    };

    return configs[permission] || {
      permission,
      title: `${permission} Permission`,
      message: `This app needs access to ${permission}.`,
      buttonPositive: 'Allow',
      buttonNegative: 'Deny',
    };
  }
}

export const permissionManager = PermissionManager.getInstance();

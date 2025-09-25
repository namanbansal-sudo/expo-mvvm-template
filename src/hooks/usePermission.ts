import { useState, useEffect, useCallback } from 'react';
import { Permission, PermissionStatus } from '../types/permission';
import { permissionManager } from '../utils/permissions';

export const usePermission = (permission: Permission) => {
  const [status, setStatus] = useState<PermissionStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const checkPermission = useCallback(async () => {
    setIsLoading(true);
    try {
      const permissionStatus = await permissionManager.checkPermission(permission);
      setStatus(permissionStatus);
    } catch (error) {
      console.error('Error checking permission:', error);
    } finally {
      setIsLoading(false);
    }
  }, [permission]);

  const requestPermission = useCallback(async () => {
    setIsLoading(true);
    try {
      const requestConfig = permissionManager.getPermissionRequestConfig(permission);
      const permissionStatus = await permissionManager.requestPermission(permission, requestConfig);
      setStatus(permissionStatus);
      return permissionStatus;
    } catch (error) {
      console.error('Error requesting permission:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [permission]);

  useEffect(() => {
    checkPermission();
  }, [checkPermission]);

  return {
    status,
    isLoading,
    isGranted: status?.granted || false,
    canAskAgain: status?.canAskAgain || false,
    checkPermission,
    requestPermission,
  };
};

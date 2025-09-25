import React from 'react';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SettingsView } from './view';

export const SettingsContainer: React.FC = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.replace('/(tabs)');
  };

  const handleThemeToggle = () => {
    Alert.alert('Info', 'Theme toggle not implemented yet');
  };

  const handleNotificationsToggle = () => {
    Alert.alert('Info', 'Notifications toggle not implemented yet');
  };

  const handlePrivacySettings = () => {
    Alert.alert('Info', 'Privacy settings not implemented yet');
  };

  const handleDataExport = () => {
    Alert.alert('Info', 'Data export not implemented yet');
  };

  const handleClearCache = () => {
    Alert.alert(
      'Clear Cache',
      'Are you sure you want to clear all cached data?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Success', 'Cache cleared successfully');
          },
        },
      ]
    );
  };

  return (
    <SettingsView
      onGoBack={handleGoBack}
      onThemeToggle={handleThemeToggle}
      onNotificationsToggle={handleNotificationsToggle}
      onPrivacySettings={handlePrivacySettings}
      onDataExport={handleDataExport}
      onClearCache={handleClearCache}
    />
  );
};

import React from 'react';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { HomeView } from './view';
import { useAuth } from '@/hooks/useAuth';

export const HomeContainer: React.FC = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogoutPress = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await logout();
            router.replace('/login');
          },
        },
      ]
    );
  };

  const handleProfilePress = () => {
    router.push('/profile');
  };

  const handleSettingsPress = () => {
    Alert.alert('Info', 'Settings screen not implemented yet');
  };

  const handleRefresh = () => {
    Alert.alert('Info', 'Refreshing data...');
  };

  return (
    <HomeView
      user={user}
      onLogoutPress={handleLogoutPress}
      onProfilePress={handleProfilePress}
      onSettingsPress={handleSettingsPress}
      onRefresh={handleRefresh}
    />
  );
};

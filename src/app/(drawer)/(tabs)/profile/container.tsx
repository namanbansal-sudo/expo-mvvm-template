import React from 'react';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { ProfileView } from './view';

export const ProfileContainer: React.FC = () => {
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

  const handleEditProfile = () => {
    Alert.alert('Info', 'Edit profile not implemented yet');
  };

  const handleChangePassword = () => {
    Alert.alert('Info', 'Change password not implemented yet');
  };

  const handleGoBack = () => {
    router.replace('/home');
  };

  const handleNotificationsPress = () => {
    Alert.alert('Info', 'Notifications not implemented yet');
  };

  const handlePrivacyPress = () => {
    Alert.alert('Info', 'Privacy settings not implemented yet');
  };

  const handleHelpPress = () => {
    Alert.alert('Info', 'Help & Support not implemented yet');
  };

  return (
    <ProfileView
      user={user}
      onLogoutPress={handleLogoutPress}
      onEditProfile={handleEditProfile}
      onChangePassword={handleChangePassword}
      onGoBack={handleGoBack}
      onNotificationsPress={handleNotificationsPress}
      onPrivacyPress={handlePrivacyPress}
      onHelpPress={handleHelpPress}
    />
  );
};

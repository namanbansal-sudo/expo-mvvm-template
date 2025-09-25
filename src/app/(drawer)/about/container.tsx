import React from 'react';
import { useRouter } from 'expo-router';
import { AboutView } from './view';

export const AboutContainer: React.FC = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.replace('/(tabs)');
  };

  const handleRateApp = () => {
    // In a real app, this would open the app store
    alert('Rate app functionality not implemented');
  };

  const handleShareApp = () => {
    // In a real app, this would open the share dialog
    alert('Share app functionality not implemented');
  };

  const handleContactSupport = () => {
    // In a real app, this would open email or support chat
    alert('Contact support functionality not implemented');
  };

  const handleViewLicenses = () => {
    alert('Licenses functionality not implemented');
  };

  return (
    <AboutView
      onGoBack={handleGoBack}
      onRateApp={handleRateApp}
      onShareApp={handleShareApp}
      onContactSupport={handleContactSupport}
      onViewLicenses={handleViewLicenses}
    />
  );
};

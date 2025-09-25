import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';

interface AboutViewProps {
  onGoBack: () => void;
  onRateApp: () => void;
  onShareApp: () => void;
  onContactSupport: () => void;
  onViewLicenses: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  onGoBack,
  onRateApp,
  onShareApp,
  onContactSupport,
  onViewLicenses,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onGoBack}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>About</Text>
          <View style={styles.placeholder} />
        </View>

        {/* App Info */}
        <View style={styles.appInfoSection}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>📱</Text>
          </View>
          <Text style={styles.appName}>Expo MVVM App</Text>
          <Text style={styles.version}>Version 1.0.0</Text>
          <Text style={styles.description}>
            A modern React Native app built with Expo and MVVM architecture pattern.
          </Text>
        </View>

        {/* Actions */}
        <View style={styles.actionsSection}>
          <TouchableOpacity style={styles.actionButton} onPress={onRateApp}>
            <Text style={styles.actionIcon}>⭐</Text>
            <Text style={styles.actionText}>Rate App</Text>
            <Text style={styles.actionArrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={onShareApp}>
            <Text style={styles.actionIcon}>📤</Text>
            <Text style={styles.actionText}>Share App</Text>
            <Text style={styles.actionArrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={onContactSupport}>
            <Text style={styles.actionIcon}>💬</Text>
            <Text style={styles.actionText}>Contact Support</Text>
            <Text style={styles.actionArrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={onViewLicenses}>
            <Text style={styles.actionIcon}>📋</Text>
            <Text style={styles.actionText}>Licenses</Text>
            <Text style={styles.actionArrow}>→</Text>
          </TouchableOpacity>
        </View>

        {/* Features */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Features</Text>
          <View style={styles.featuresList}>
            <Text style={styles.featureItem}>• Modern MVVM Architecture</Text>
            <Text style={styles.featureItem}>• TypeScript Support</Text>
            <Text style={styles.featureItem}>• Tab & Drawer Navigation</Text>
            <Text style={styles.featureItem}>• API Integration Ready</Text>
            <Text style={styles.featureItem}>• Responsive Design</Text>
            <Text style={styles.featureItem}>• Dark Mode Support</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Made with ❤️ using Expo & React Native</Text>
          <Text style={styles.copyright}>© 2024 Expo MVVM Template</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

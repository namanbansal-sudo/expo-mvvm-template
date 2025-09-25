import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';

interface SettingsViewProps {
  onGoBack: () => void;
  onThemeToggle: () => void;
  onNotificationsToggle: () => void;
  onPrivacySettings: () => void;
  onDataExport: () => void;
  onClearCache: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  onGoBack,
  onThemeToggle,
  onNotificationsToggle,
  onPrivacySettings,
  onDataExport,
  onClearCache,
}) => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onGoBack}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Settings</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Appearance Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appearance</Text>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingIcon}>🌙</Text>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Dark Mode</Text>
                <Text style={styles.settingDescription}>Toggle dark theme</Text>
              </View>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={(value) => {
                setIsDarkMode(value);
                onThemeToggle();
              }}
              trackColor={{ false: '#767577', true: '#007AFF' }}
              thumbColor={isDarkMode ? '#ffffff' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Notification Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingIcon}>🔔</Text>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Push Notifications</Text>
                <Text style={styles.settingDescription}>Receive push notifications</Text>
              </View>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={(value) => {
                setNotificationsEnabled(value);
                onNotificationsToggle();
              }}
              trackColor={{ false: '#767577', true: '#007AFF' }}
              thumbColor={notificationsEnabled ? '#ffffff' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Privacy Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy & Security</Text>

          <TouchableOpacity style={styles.settingItem} onPress={onPrivacySettings}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingIcon}>🔒</Text>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Privacy Settings</Text>
                <Text style={styles.settingDescription}>Manage your privacy preferences</Text>
              </View>
            </View>
            <Text style={styles.settingArrow}>→</Text>
          </TouchableOpacity>
        </View>

        {/* Data Management */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Management</Text>

          <TouchableOpacity style={styles.settingItem} onPress={onDataExport}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingIcon}>📊</Text>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Export Data</Text>
                <Text style={styles.settingDescription}>Download your data</Text>
              </View>
            </View>
            <Text style={styles.settingArrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} onPress={onClearCache}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingIcon}>🗑️</Text>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Clear Cache</Text>
                <Text style={styles.settingDescription}>Free up storage space</Text>
              </View>
            </View>
            <Text style={styles.settingArrow}>→</Text>
          </TouchableOpacity>
        </View>

        {/* App Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingIcon}>ℹ️</Text>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Version</Text>
                <Text style={styles.settingDescription}>1.0.0</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

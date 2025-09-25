# Expo MVVM Template

A modern, production-ready **MVVM (Model-View-ViewModel) architecture template** for Expo React Native applications with file-based routing, TypeScript support, and comprehensive navigation setup.

## ✨ Features

- 🏗️ **MVVM Architecture** - Clean separation of concerns with View, Container (ViewModel), and Model layers
- 📁 **File-Based Routing** - Modern Expo Router setup with nested navigation (Drawer → Tabs → Screens)
- 🎯 **TypeScript Support** - Full type safety throughout the application with proper path mappings
- 🔐 **Authentication System** - Complete auth flow with AsyncStorage persistence and mock authentication
- 🎨 **Theme System** - Light/dark mode support with persistent preferences
- 🧭 **Navigation Setup** - Stack, Tabs, and Drawer navigation with React Navigation v7
- 🏪 **State Management** - Zustand for global state management
- 🔧 **Development Tools** - Comprehensive logging, error handling, and utility functions
- 🌐 **API Client** - Ready-to-use API client with error handling and interceptors
- 🔒 **Permission Management** - Easy-to-use permission hooks for mobile features
- 📱 **Reusable Components** - Pre-built UI components (Button, TextInput, Card, etc.)

## 📋 Requirements

- **Node.js** >= 14.0.0
- **Expo CLI** >= 49.0.0
- **React** >= 18.0.0
- **React Native** >= 0.72.0

## 🚀 Quick Start

### Option 1: Using npx (Recommended)

````bash
# Create a new Expo project with MVVM template
npx expo-mvvm-template MyAppName

# Navigate to project
cd MyAppName

# Install dependencies
npm install

# Start development
npm start
✨ Features
🏗️ MVVM Architecture - Clean separation of concerns

📁 File-Based Routing - Expo Router with TypeScript

🎯 TypeScript Support - Full type safety

🔐 Authentication System - Complete auth flow with context

🎨 Theme System - Light/dark mode support

📱 Navigation - Stack, Tabs, and Drawer navigation

🏪 State Management - Zustand for global state

🛠️ Utility Functions - Storage, API, debugging utilities

🔒 Permission Management - Easy mobile permission handling

📁 Generated Structure
text
MyAppName/
├── app/                    # File-based routes (MVVM pattern)
│   ├── (drawer)/          # Drawer navigation group
│   │   ├── (tabs)/        # Tab navigation group
│   │   │   ├── home/      # Home screen
│   │   │   └── profile/   # Profile screen
│   │   └── settings/      # Settings screen
│   ├── login/             # Login screen
│   └── _layout.tsx        # Root layout
├── components/            # Reusable UI components
├── context/               # React Context providers
├── hooks/                 # Custom React hooks
├── store/                 # Zustand state management
├── types/                 # TypeScript definitions
├── utils/                 # Utility functions
└── assets/                # Static assets
🏗️ MVVM Architecture
Each screen follows the MVVM pattern:

view.tsx - Pure UI components and styling

container.tsx - Business logic and state management

styles.tsx - Component-specific styles

index.tsx - Screen entry point

Example: Login Screen
typescript
// app/login/view.tsx - UI only
export const LoginView: React.FC<LoginViewProps> = ({
  email, setEmail, password, setPassword, handleLogin, isLoading
}) => {
  return (
    <View style={styles.container}>
      <TextInput value={email} onChangeText={setEmail} />
      <Button onPress={handleLogin} title="Login" />
    </View>
  );
};

// app/login/container.tsx - Business logic
export const LoginContainer: React.FC = () => {
  const [email, setEmail] = useState('');
  const { login } = useAuth();

  const handleLogin = async () => {
    await login(email, password);
  };

  return <LoginView {...{ email, setEmail, handleLogin }} />;
};
🛠️ Included Technologies
Dependencies
expo-router - File-based routing

@react-navigation/* - Navigation components

zustand - State management

@react-native-async-storage/async-storage - Persistent storage

axios - HTTP client

react-native-svg - SVG icon support

Dev Dependencies
typescript - Type safety

@types/react - React TypeScript definitions

@types/react-native - React Native TypeScript definitions

🎯 Usage
Creating New Screens
Create folder in app/ (e.g., app/products/)

Add MVVM files: view.tsx, container.tsx, styles.tsx, index.tsx

Route automatically available at /products

Using Authentication
typescript
import { useAuth } from '../hooks/useAuth';

const { user, login, logout } = useAuth();
Using Themes
typescript
import { useTheme } from '../hooks/useTheme';

const { theme, toggleTheme } = useTheme();
API Calls
typescript
import { apiClient } from '../utils/api';

const response = await apiClient.get('/users');
🔧 Customization
Adding New Dependencies
bash
npm install your-package
Modifying Themes
Edit utils/theme.ts to change colors, spacing, or typography.

Adding API Endpoints
Extend utils/api.ts with your backend endpoints.

📱 Running the App
bash
# Start development
npm start

# Platform-specific
npm run android    # Android emulator
npm run ios        # iOS simulator
npm run web        # Web browser
🐛 Troubleshooting
Common Issues
Navigation errors: Ensure all React Navigation packages are same version

TypeScript errors: Check if types are properly installed

Build failures: Clear cache with npx expo start --clear

Dependencies Conflict
If you encounter version conflicts:

bash
npm install --legacy-peer-deps
🤝 Contributing
We welcome contributions! Please see our Contributing Guide for details.

📄 License
MIT License - see LICENSE file for details.

🆘 Support
📧 Email: [Your Email]

🐛 Issues: GitHub Issues

💬 Discussions: GitHub Discussions

🙏 Acknowledgments
Expo team for the amazing framework

React Navigation team for robust navigation solutions

React Native community for continuous improvements

Built with ❤️ for the Expo community

⭐ If this template helps you, please give it a star on GitHub!

text

## Key Changes to README.md:

1. **Simplified Quick Start** - More direct instructions
2. **Better Feature Highlights** - Clearer value proposition
3. **Fixed Structure Example** - Matches your actual template structure
4. **Added Code Examples** - Practical usage examples
5. **Better Troubleshooting** - Clear solutions to common issues
6. **Professional Formatting** - Better visual hierarchy

## Additional Files You Should Create:

### 1. Create `.npmignore`
Development files
.git/
.github/
.vscode/
test-/
backup-/
node_modules/

Documentation
*.md
!README.md

Logs
.log
npm-debug.log

OS files
.DS_Store
Thumbs.db

IDE files
.idea/
*.swp
*.swo

text

### 2. Create `LICENSE` file (MIT License)
```text
MIT License

Copyright (c) 2024 Developer_NMN

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
````

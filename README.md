# Expo MVVM Template

A comprehensive Expo React Native template with MVVM architecture that generates a complete, production-ready mobile application with modern best practices.

## 🚀 Features

- **MVVM Architecture** - Clean separation of concerns with View, Container (ViewModel), and Model layers
- **File-based Routing** - Modern Expo Router setup with nested navigation
- **TypeScript Support** - Full type safety throughout the application
- **Authentication System** - Persistent login with AsyncStorage and mock authentication
- **Theme System** - Light and dark mode support with persistent preferences
- **Permission Management** - Easy-to-use permission hooks for mobile features
- **Reusable Components** - Pre-built Button, TextInput, and Card components
- **Development Tools** - Comprehensive logging, performance monitoring, and error handling
- **API Client** - Ready-to-use API client with error handling
- **Storage Utilities** - AsyncStorage wrapper for persistent data management

## 📦 Installation

### Option 1: Using npx (Recommended)

```bash
npx expo-mvvm-template MyAppName
```

### Option 2: Using npm

```bash
npm install -g expo-mvvm-template
expo-mvvm-template MyAppName
```

### Option 3: Using yarn

```bash
yarn global add expo-mvvm-template
expo-mvvm-template MyAppName
```

## 🔄 How It Works

The template generator follows a smart approach to avoid duplication:

1. **Creates Basic Expo Project**: Uses `npx create-expo-app` to generate a standard Expo project with TypeScript
2. **Replaces with MVVM Structure**: Overwrites the default folders with our comprehensive MVVM template
3. **Clean Integration**: The generated project has the exact structure you need without any duplication

### Generated Project Structure

```
MyAppName/
├── app/                    # File-based routing screens (MVVM structure)
│   ├── _layout.tsx        # Root layout with providers
│   ├── index/             # Home screen (MVVM)
│   │   ├── index.tsx      # Entry point
│   │   ├── view.tsx       # UI components
│   │   ├── container.tsx  # Business logic
│   │   └── styles.tsx     # Styles
│   ├── login/             # Login screen (MVVM)
│   └── dashboard/         # Dashboard screen (MVVM)
├── assets/                # Static assets (replaced with template)
├── components/            # Reusable UI components (replaced with template)
│   ├── Button.tsx
│   ├── TextInput.tsx
│   └── Card.tsx
├── context/               # React Context providers (replaced with template)
│   ├── AuthContext.tsx
│   └── ThemeContext.tsx
├── hooks/                 # Custom React hooks (replaced with template)
│   ├── useAuth.ts
│   ├── useTheme.ts
│   └── usePermission.ts
├── store/                 # State management (replaced with template)
│   └── AuthStore.ts
├── types/                 # TypeScript type definitions (replaced with template)
│   ├── auth.ts
│   ├── theme.ts
│   └── permission.ts
├── utils/                 # Utility functions (replaced with template)
│   ├── storage.ts
│   ├── theme.ts
│   ├── debug.ts
│   ├── permissions.ts
│   └── api.ts
├── App.tsx               # Main app component
├── package.json          # Project dependencies
└── README.md             # Project documentation
```

```
src/
├── app/                    # File-based routing screens
│   ├── _layout.tsx        # Root layout with providers
│   ├── index/             # Home screen (MVVM)
│   │   ├── index.tsx      # Entry point
│   │   ├── view.tsx       # UI components
│   │   ├── container.tsx  # Business logic
│   │   └── styles.tsx     # Styles
│   ├── login/             # Login screen (MVVM)
│   └── dashboard/         # Dashboard screen (MVVM)
├── components/            # Reusable UI components
│   ├── Button.tsx
│   ├── TextInput.tsx
│   └── Card.tsx
├── context/               # React Context providers
│   ├── AuthContext.tsx
│   └── ThemeContext.tsx
├── hooks/                 # Custom React hooks
│   ├── useAuth.ts
│   ├── useTheme.ts
│   └── usePermission.ts
├── store/                 # State management
│   └── AuthStore.ts
├── types/                 # TypeScript type definitions
│   ├── auth.ts
│   ├── theme.ts
│   └── permission.ts
├── utils/                 # Utility functions
│   ├── storage.ts
│   ├── theme.ts
│   ├── debug.ts
│   ├── permissions.ts
│   └── api.ts
└── assets/                # Static assets
```

## 🏗️ Architecture

This template follows the **MVVM (Model-View-ViewModel)** architectural pattern:

### View Layer
- Contains only UI components and styling
- Receives props from Container
- Handles user interactions and passes them to Container

### Container Layer (ViewModel)
- Contains business logic and state management
- Acts as the bridge between View and Model
- Handles data transformation and API calls

### Model Layer
- Contains data models and business logic
- Includes stores, services, and utilities

## 🔧 Key Components

### Authentication System
- **AuthStore**: Singleton class managing authentication state
- **AuthContext**: React context for authentication state
- **useAuth**: Custom hook for easy authentication access

### Theme System
- **ThemeContext**: React context for theme management
- **useTheme**: Custom hook for theme access
- **Light/Dark Themes**: Pre-configured theme objects

### Permission Management
- **usePermission**: Custom hook for permission checking and requesting
- **PermissionManager**: Utility class for permission operations

### Development Tools
- **Logger**: Comprehensive logging system
- **PerformanceMonitor**: Performance tracking utilities
- **ErrorHandler**: Error capturing and reporting

## 🎨 Customization

### Adding New Screens
1. Create a new folder in `app/`
2. Create the MVVM files: `index.tsx`, `view.tsx`, `container.tsx`, `styles.tsx`
3. Add the route to the Stack in `_layout.tsx`

### Adding New Components
1. Create the component in `components/`
2. Use the theme system for consistent styling
3. Add proper TypeScript types

### Extending the API
1. Add new endpoints to `utils/api.ts`
2. Update the API client configuration
3. Add response types and error handling

## 📱 Running the App

After generating your project:

```bash
cd MyAppName
npm install
npm start
```

This will start the Expo development server. You can then:
- Press `w` to open in web browser
- Press `i` to open iOS simulator (macOS only)
- Press `a` to open Android emulator
- Scan QR code with Expo Go app on your phone

## 🔒 Authentication

The template includes a mock authentication system. To implement real authentication:

1. Update the `AuthStore.login()` method to call your API
2. Modify the login credentials validation
3. Add proper error handling for authentication failures
4. Implement token refresh logic if needed

## 🎭 Theming

The template supports both light and dark themes. To customize themes:

1. Modify the theme objects in `utils/theme.ts`
2. Update colors, spacing, and typography values
3. Add new theme variants if needed

## 📋 Permissions

The template includes a permission management system. Common permissions supported:

- Camera
- Photo Library
- Location
- Notifications
- Microphone
- Contacts
- Calendar
- Motion sensors

## 🛠️ Development

### Debugging
Use the included debugging utilities:
```typescript
import { devUtils } from './utils/debug';

// Log messages
devUtils.logger.info('App started');

// Performance monitoring
devUtils.performanceMonitor.startMark('api-call');
devUtils.performanceMonitor.endMark('api-call');

// Error handling
devUtils.errorHandler.captureError(error, 'Login failed');
```

### Storage
Persistent storage utilities:
```typescript
import { Storage } from './utils/storage';

// Store data
await Storage.setItem('user', userData);

// Retrieve data
const user = await Storage.getItem('user');

// Remove data
await Storage.removeItem('user');
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the generated project's README.md
2. Review the example implementations in the generated screens
3. Check the TypeScript types and interfaces
4. Refer to the Expo documentation for platform-specific features

## 🔄 Updates

To update the template:

```bash
npm update expo-mvvm-template
```

Or regenerate your project with the latest version:

```bash
npx expo-mvvm-template MyAppName --force
```

---

**Happy coding!** 🎉

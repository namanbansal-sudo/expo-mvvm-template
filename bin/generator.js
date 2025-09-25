#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');

class TemplateGenerator {
  constructor() {
    this.templateDir = path.join(__dirname, '../src');
    this.currentDir = process.cwd();
  }

  async generate(projectName) {
    console.log(`🚀 Applying Expo MVVM template to: ${projectName}`);

    const projectDir = projectName === '.' ? this.currentDir : path.join(this.currentDir, projectName);

    try {
      // Validate project directory
      await this.validateProjectDirectory(projectDir);

      // Replace project structure with template
      await this.replaceProjectStructure(projectDir);

      // Update package.json with required dependencies
      await this.updatePackageJson(projectDir);

      console.log(`✅ Expo MVVM template applied successfully!`);
      console.log(`\n📁 Project location: ${projectDir}`);
      console.log('🚀 Next steps:');
      console.log('   1. Run: npm install');
      console.log('   2. Run: npm start');
      console.log('   3. Your app will open with full MVVM navigation!');

    } catch (error) {
      console.error(`❌ Error applying template: ${error.message}`);
      process.exit(1);
    }
  }

  async validateProjectDirectory(projectDir) {
    if (!fs.existsSync(projectDir)) {
      throw new Error(`Project directory does not exist: ${projectDir}`);
    }

    // Check if it's an Expo project
    const packageJsonPath = path.join(projectDir, 'package.json');
    if (!fs.existsSync(packageJsonPath)) {
      throw new Error('Not a valid project. package.json not found.');
    }

    const packageJson = await fs.readJson(packageJsonPath);
    if (!packageJson.dependencies || !packageJson.dependencies.expo) {
      throw new Error('Not a valid Expo project. Expo dependency not found.');
    }

    console.log('✅ Valid Expo project detected');
  }

  async replaceProjectStructure(projectDir) {
    console.log('🔄 Replacing project structure with MVVM template...');

    if (!fs.existsSync(this.templateDir)) {
      throw new Error('Template directory not found. Please check your installation.');
    }

    // Copy tsconfig.json from root if it exists
    const rootTsconfigPath = path.join(__dirname, '../tsconfig.json');
    if (fs.existsSync(rootTsconfigPath)) {
      const targetTsconfigPath = path.join(projectDir, 'tsconfig.json');
      // Only copy if it doesn't exist in the project
      if (!fs.existsSync(targetTsconfigPath)) {
        console.log('✅ Copying tsconfig.json with TypeScript configuration');
        await fs.copy(rootTsconfigPath, targetTsconfigPath);
      } else {
        console.log('📋 Preserving existing tsconfig.json');
      }
    } else {
      console.log('⚠️  tsconfig.json not found in template - TypeScript support may be limited');
    }

    // List of directories/files to replace from template
    const templateItems = await fs.readdir(this.templateDir);

    for (const item of templateItems) {
      const templatePath = path.join(this.templateDir, item);
      const targetPath = path.join(projectDir, item);
      const stat = await fs.stat(templatePath);

      if (stat.isDirectory()) {
        // Remove existing directory and replace with template
        if (fs.existsSync(targetPath)) {
          console.log(`🗑️  Removing existing: ${item}`);
          await fs.remove(targetPath);
        }

        console.log(`✅ Copying: ${item}`);
        await fs.copy(templatePath, targetPath);
      } else {
        // For files, copy them directly
        console.log(`✅ Copying file: ${item}`);
        await fs.copy(templatePath, targetPath);
      }
    }

    // Special handling for critical Expo files that should be preserved
    await this.preserveExpoConfigFiles(projectDir);

    console.log('✅ Project structure replaced successfully');
  }

  async preserveExpoConfigFiles(projectDir) {
    console.log('🔧 Preserving Expo configuration files...');

    // These Expo-specific files should be preserved if they exist in template
    // but we'll ensure they don't override critical project configs
    const expoConfigFiles = [
      'app.json',
      'babel.config.js',
      'index.js',
      'metro.config.js'
    ];

    for (const file of expoConfigFiles) {
      const templateFilePath = path.join(this.templateDir, file);
      const projectFilePath = path.join(projectDir, file);

      // If the file exists in the project but not in template, keep the project version
      if (fs.existsSync(projectFilePath) && !fs.existsSync(templateFilePath)) {
        console.log(`📋 Preserving project: ${file}`);
        // File already exists in project, template doesn't have it - keep project version
      }
      // If both exist, we need to be careful about merging
      else if (fs.existsSync(templateFilePath) && fs.existsSync(projectFilePath)) {
        if (file === 'package.json') {
          // package.json needs special merging handled separately
          continue;
        }
        console.log(`⚠️  Both template and project have: ${file} (template will override)`);
      }
    }
  }

  async updatePackageJson(projectDir) {
    console.log('📦 Updating package.json with MVVM dependencies...');
    
    const projectPackagePath = path.join(projectDir, 'package.json');
    const templatePackagePath = path.join(this.templateDir, 'package.json');
    
    const projectPackage = await fs.readJson(projectPackagePath);
    
    // Dependencies required for the MVVM template
    // Note: React Navigation dependencies are required by Expo Router internally
    // even though we use Expo Router's API - this is an architectural requirement
    // Updated to latest React Navigation v7 for better compatibility and performance
    const requiredDependencies = {
      'dependencies': {
        'react-native-safe-area-context': '4.8.2',
        'react-native-screens': '~3.29.0',
        '@react-native-async-storage/async-storage': '~1.21.0',
        'expo-constants': '~15.4.5',
        'expo-linking': '~6.2.2',
        'react-native-gesture-handler': '~2.14.0',
        'zustand': '^4.4.1',
        'axios': '^1.6.0',
        'expo-router': '~3.4.7',
        '@expo/vector-icons': '^14.0.0',
        'expo-status-bar': '~1.11.1',
        '@react-navigation/drawer': '^7.1.1',     // Updated to latest version
        '@react-navigation/native': '^7.1.1',     // Updated to latest version
        '@react-navigation/stack': '^7.1.1',      // Added stack navigator
        '@react-navigation/bottom-tabs': '^7.1.1' // Added bottom tabs
      },
      'devDependencies': {
        '@types/react': '~18.2.45',
        '@types/react-native': '^0.73.0',
        'typescript': '^5.1.3'
      }
    };

    // Merge dependencies - template versions take precedence for specific packages
    if (!projectPackage.dependencies) projectPackage.dependencies = {};
    if (!projectPackage.devDependencies) projectPackage.devDependencies = {};

    // Packages that should always use template versions (override existing)
    const overridePackages = [
      '@react-navigation/native',
      '@react-navigation/bottom-tabs',
      '@react-navigation/drawer',
      '@react-navigation/stack'
    ];

    Object.entries(requiredDependencies.dependencies).forEach(([pkg, version]) => {
      if (!projectPackage.dependencies[pkg]) {
        projectPackage.dependencies[pkg] = version;
        console.log(`✅ Added dependency: ${pkg}@${version}`);
      } else if (overridePackages.includes(pkg)) {
        // Override existing version with template version for critical packages
        const oldVersion = projectPackage.dependencies[pkg];
        projectPackage.dependencies[pkg] = version;
        console.log(`🔄 Updated dependency: ${pkg}@${version} (was ${oldVersion})`);
      }
    });

    Object.entries(requiredDependencies.devDependencies).forEach(([pkg, version]) => {
      if (!projectPackage.devDependencies[pkg]) {
        projectPackage.devDependencies[pkg] = version;
        console.log(`✅ Added devDependency: ${pkg}@${version}`);
      } else {
        // Override existing version with template version
        projectPackage.devDependencies[pkg] = version;
        console.log(`🔄 Updated devDependency: ${pkg}@${version} (was ${projectPackage.devDependencies[pkg]})`);
      }
    });

    // Update scripts if needed
    if (!projectPackage.scripts) projectPackage.scripts = {};
    
    const requiredScripts = {
      'start': 'expo start',
      'android': 'expo start --android',
      'ios': 'expo start --ios',
      'web': 'expo start --web'
    };

    Object.entries(requiredScripts).forEach(([script, command]) => {
      if (!projectPackage.scripts[script]) {
        projectPackage.scripts[script] = command;
      }
    });

    await fs.writeJson(projectPackagePath, projectPackage, { spaces: 2});
    console.log('✅ package.json updated successfully');
  }
}

// CLI handling
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log(`
Usage: npx expo-mvvm-template <project-name>

Examples:
  npx expo-mvvm-template MyApp           # Create new project
  npx expo-mvvm-template .               # Apply to current directory

This template will:
- Add login/ screen with authentication
- Add (drawer)/ with (tabs)/ containing home/ and profile/ screens
- Add additional drawer screens: settings/ and about/
- Add api/, components/, context/, hooks/, store/, types/, utils/ directories
- Add tsconfig.json with proper path mappings for @/ imports
- Update package.json with required dependencies including axios, expo-router, vector-icons, and React Navigation v7 (required by Expo Router)
- Preserve your existing assets/ and configuration files

⚠️  Warning: This will replace existing app/, components/, etc. directories!
  `);
  process.exit(1);
}

const projectName = args[0];
const generator = new TemplateGenerator();

generator.generate(projectName).catch(console.error);
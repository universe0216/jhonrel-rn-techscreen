

<div align="center">
  <img src="assets/images/logo.svg" alt="TaskManager Logo" width="200" height="auto">
</div>

# TaskManager

A modern, cross-platform task management application built with React Native and Expo. This app demonstrates local state management, component composition, and modern React Native development practices.

## Features

- **Task Management**: Create, edit, delete, and toggle completion status of tasks
- **Smart Search**: Search tasks by title, description, or label with real-time filtering
- **Debounced Search**: Optimized search performance with 300ms debouncing to reduce API calls and improve responsiveness
- **Advanced Sorting**: Sort tasks by creation date, deadline, priority, or title (ascending/descending)
- **Status Filtering**: Filter tasks by completion status (All, Todo, Completed)
- **Priority System**: Tasks support low, medium, and high priority levels
- **Deadline Tracking**: Set and view task deadlines with date picker
- **Responsive Design**: Optimized for both iOS and Android platforms
- **Local State Management**: Uses React's useState hook for efficient state management

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development) or Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/frontsunriver/chapterone-taskmanager.git
   cd chapterone-taskmanager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

## Execution Commands

### Development Server Options

**Basic start (interactive mode):**
```bash
npm start
```

**Start with specific platform:**
```bash
# iOS Simulator
npm run ios

# Android Emulator
npm run android

# Web Browser
npm run web
```


### Build Commands

**Build for development:**
```bash
# iOS
npx expo run:ios

# Android
npx expo run:android
```

**Build for production:**
```bash
# Create production build
npx expo build:android
npx expo build:ios

# Or using EAS Build (recommended)
npx eas build --platform android
npx eas build --platform ios
```

### Platform-Specific Commands

**iOS Development:**
```bash
# Install iOS dependencies
cd ios && pod install && cd ..

# Run on iOS Simulator
npx expo run:ios

# Run on specific iOS device
npx expo run:ios --device
```

**Android Development:**
```bash
# Run on Android Emulator
npx expo run:android

# Run on specific Android device
npx expo run:android --device

# Build APK
npx expo build:android --type apk
```

**Web Development:**
```bash
# Start web development server
npx expo start --web

# Build for web
npx expo export --platform web
```

## How to Use

### Creating Tasks
1. Tap the **+** button (floating action button) in the bottom-right corner
2. Fill in the task details:
   - **Title** (required): Brief description of the task
   - **Description** (required): Detailed information about the task
   - **Priority**: Choose from Low, Medium, or High
   - **Label**: Optional category or tag for the task
   - **Deadline**: Set a due date using the date picker
   - **Completed**: Mark as completed if already done
3. Tap **Add Task** to save

### Managing Tasks
- **Edit**: Tap on any task to open the edit form
- **Complete**: Use the "Complete" button to toggle completion status
- **Delete**: Use the "Delete" button to remove tasks (with confirmation)
- **Search**: Use the search bar to find tasks by title, description, or label (with optimized debounced search)
- **Sort**: Use the sort button to organize tasks by different criteria
- **Filter**: Use the status filter to show only specific types of tasks

### Search Performance
The search functionality includes intelligent debouncing that waits 300ms after you stop typing before filtering results. This provides:
- **Smooth Performance**: Reduces lag during typing
- **Battery Efficiency**: Minimizes unnecessary processing
- **Better User Experience**: Prevents flickering results while typing



## Third-Party Libraries

This project uses the following third-party libraries:

### UI Components
- **@expo/vector-icons (^15.0.2)**: Icon library with 10,000+ icons
- **expo-image (~3.0.9)**: Optimized image component for logo image
- **react-native-svg (^15.14.0)**: SVG support for React Native for rendering svg image

### Date/Time
- **@react-native-community/datetimepicker (^8.4.5)**: Cross-platform date and time picker. It's used for selectiong due date.

### Development Tools
- **TypeScript (~5.9.2)**: Type-safe JavaScript development
- **ESLint (^9.25.0)**: Code linting and formatting

## Project Structure

```
TaskManager/
├── app/                    # App screens and navigation
│   ├── (tabs)/            # Tab-based navigation
│   │   └── index.tsx      # Home screen (main task interface)
│   └── _layout.tsx        # Root layout
├── components/            # Reusable UI components
│   ├── task/             # Task-specific components
│   │   ├── AddTask.tsx   # Floating action button
│   │   ├── SearchBar.tsx # Search functionality
│   │   ├── SortButton.tsx # Task sorting
│   │   ├── StatusFilter.tsx # Status filtering
│   │   ├── TaskForm.tsx  # Add/Edit task form
│   │   ├── TaskItem.tsx  # Individual task display
│   │   └── TaskList.tsx  # Task list container
│   ├── ui/               # Generic UI components
│   │   ├── icon-symbol.tsx # Icon component
│   │   └── icon-symbol.ios.tsx # iOS-specific icon component
│   ├── haptic-tab.tsx    # Haptic feedback tab component
│   ├── themed-text.tsx   # Themed text component
│   └── themed-view.tsx   # Themed view component
├── data/                 # Static data
│   └── initialTasks.json # Sample tasks
├── hooks/                # Custom React hooks
│   └── useDebounce.ts    # Debounced search hook
├── types/                # TypeScript type definitions
│   └── task.ts           # Task interface
└── utils/                # Utility functions
    └── taskUtils.ts      # Task filtering and sorting logic
```

## Development Notes

- **State Management**: Uses React's built-in `useState` hook for local state management
- **Component Architecture**: Follows React Native best practices with proper component composition
- **TypeScript**: Fully typed for better development experience and code reliability
- **Responsive Design**: Optimized for different screen sizes and orientations
- **Performance**: Efficient rendering with proper key props and optimized list rendering
- **Debouncing**: Custom `useDebounce` hook implements 300ms delay for search input to optimize performance and reduce unnecessary re-renders

## Troubleshooting

### Common Issues

1. **Metro bundler issues**: Clear cache with `npx expo start --clear`
2. **iOS Simulator not opening**: Ensure Xcode is installed and simulator is available
3. **Android emulator issues**: Check that Android Studio and emulator are properly configured
4. **Dependencies issues**: Delete `node_modules` and run `npm install` again

### Getting Help

- Check the [Expo documentation](https://docs.expo.dev/)
- Visit the [Expo Discord community](https://chat.expo.dev)
- Review the [React Native documentation](https://reactnative.dev/)

## License

This project is created for test purposes to demonstrate React Native development with Expo.

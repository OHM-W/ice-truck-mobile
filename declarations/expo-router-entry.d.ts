declare module 'expo-router/entry' {
  import { ComponentType } from 'react';
  // The entry export from 'expo-router/entry' is a React component.
  // Declare it as a ComponentType<any> to satisfy TypeScript imports in the app.
  const Entry: ComponentType<any>;
  export default Entry;
}

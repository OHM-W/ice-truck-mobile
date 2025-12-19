// declarations.d.ts (เพิ่มไว้ที่ท้ายไฟล์)
declare module "*.svg" {
  import React from "react";
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}
declare module "expo-router/entry" {
  const entry: any;
  export default entry;
}
declare module 'src/*';
 
 // Allow `gap` style on React Native ViewStyle (used in layout helpers)
 declare module 'react-native' {
   interface ViewStyle {
     gap?: number | string;
   }
 }


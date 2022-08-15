import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as R from "ramda";
import { getTurnNotificationsSetting } from "./settingsActions";

export enum ColorScheme {
  Light = "light",
  Dark = "dark",
  System = "system",
}

export type ThemeNames = "light" | "dark" | "oled";

interface SettingsState {
  turnNotificationsMuted: boolean;
  colorScheme: ColorScheme;
  preferredDarkTheme: ThemeNames;
}

// Define the initial state using that type
const initialState: SettingsState = {
  turnNotificationsMuted: getTurnNotificationsSetting(),
  colorScheme: ColorScheme.System,
  preferredDarkTheme: "dark",
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setTurnNotificationsMute: (state, action: PayloadAction<boolean>) => {
      state.turnNotificationsMuted = action.payload;
    },
    setColorScheme: (state, action: PayloadAction<ColorScheme>) => {
      state.colorScheme = action.payload;
    },
    setPreferredDarkTheme: (state, action: PayloadAction<ThemeNames>) => {
      state.preferredDarkTheme = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setTurnNotificationsMute,
  setColorScheme,
  setPreferredDarkTheme,
} = settingsSlice.actions;

export default settingsSlice.reducer;

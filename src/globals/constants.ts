import { QueryClient } from "react-query";
import { css } from "styled-components";

export const ONE_HOUR = 60 * 60 * 1000;
export const ONE_DAY = 24 * ONE_HOUR;

export type CustomTheme = typeof theme;
export type ThemeColor = keyof typeof theme.colors;

export const theme = {
  colors: {
    ecru: "#FAFAF0",
    mustard: "#fbe03c",
    blue: "#2E7CF6",
    ecruAccent: "#E1DCCD",
    white: "#FFFFFF",
    inputs: "#e1dfd5",
    brown: "#281914",
    black: "#000000",
    red: "#FB4F29",
    coolGray: "#A0AFB4",
    lightGray: "#938C89",
    darkTeal: "#1E2D2D",
    olive: "#232805",
    oliveAccent: "#413C1E",
    gray: "#C8C7BE",
    lightBlack: "#1D1D1D",
    darkGray: "#373737",
  },
};

export enum ButtonIconSize {
  vSmall = 14,
  small = 16,
  intermediate = 20,
  medium = 24,
  big = 32,
  large = 48,
}

export const queryClient = new QueryClient();

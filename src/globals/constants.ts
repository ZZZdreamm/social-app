import { QueryClient } from "react-query";
import { io } from "socket.io-client";
import { socketURL } from "./apiPaths";

export const ONE_HOUR = 60 * 60 * 1000;
export const ONE_DAY = 24 * ONE_HOUR;

export type CustomTheme = typeof theme;
export type ThemeColor = keyof typeof theme.colors;

export const theme = {
  colors: {
    ecru: "#FAFAF0",
    // mustard: "#fbe03c",
    // blue: "#2E7CF6",
    // ecruAccent: "#E1DCCD",
    inputs: "#e1dfd5",
    // brown: "#281914",
    black: "#000000",
    white: "#ffffff",
    red: "#FB4F29",
    // coolGray: "#A0AFB4",
    // lightGray: "#938C89",
    // darkTeal: "#1E2D2D",
    // olive: "#232805",
    // oliveAccent: "#413C1E",
    // gray: "#C8C7BE",
    // lightBlack: "#1D1D1D",
    // darkGray: "#373737",
    navColor: "#ffffff",
    reverseToNavColor: "#000000",
    backColor: "#f0f2f5",
    reverseToBackColor: "#2f2f2f",
    textGrey: "#7e7f81",
    lightGrey: "#d6d9dfdc",
    container2Color: "#eeeeee",
    containerColor: "#3b55d9",
    testColor1: "#febebe",
    testColor2: "#bbb",
    textColor1: "#2f2f2f",
    textColor2: "#ffffff",
    testColor3: "#89cff0",
    blueColor: "#0084ff",
    shadow1: "rgba(0, 0, 0, 0.1)",
    shadow2: "rgba(0, 0, 0, 0.2)",
    shadow3: "rgba(0, 0, 0, 0.3)",
    typicalShadow: "rgba(0, 0, 0, 0.5)",
    shadowInset: "rgba(255, 255, 255, 0.5)",
    hoverColor: "#e4e6e9",
    borderColor: "#DDD",
    lightBlue: "rgba(0, 132, 255, 1)",
    iconsBackColor: "placeholder",
    scrollColor: "#2f2f2f",
  },
  shadows: {
    light: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    dark: "0px 4px 4px rgba(0, 0, 0, 0.5)",
  },
};

export const darkTheme = {
  colors: {
    black: "#000000",
    white: "#ffffff",
    ecru: "#FAFAF0",
    inputs: "#e1dfd5",
    red: "#FB4F29",
    navColor: "#000000",
    reverseToNavColor: "#ffffff",
    backColor: "#2f2f2f",
    reverseToBackColor: "#f0f2f5",
    textGrey: "#7e7f81",
    lightGrey: "#d6d9dfdc",
    container2Color: "#eeeeee",
    containerColor: "#3b55d9",
    testColor1: "#febebe",
    testColor2: "#bbb",
    textColor1: "#f2f2f2",
    textColor2: "#ffffff",
    testColor3: "rgba(0, 132, 255, 1)",
    blueColor: "#0084ff",
    shadow1: "rgba(255, 255, 255, 0.1)",
    shadow2: "rgba(255, 255, 255, 0.2)",
    shadow3: "rgba(255, 255, 255, 0.3)",
    typicalShadow: "rgba(255, 255, 255, 0.5)",
    shadowInset: "rgba(255, 255, 255, 0.5)",
    hoverColor: "rgb(71, 72, 72)",
    borderColor: "#444",
    lightBlue: "rgba(0, 132, 255, 1)",
    iconsBackColor: "#f0f0f0",
    scrollColor: "#e4e6e9",
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
export const socket = io(socketURL);

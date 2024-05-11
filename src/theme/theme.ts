import { createTheme } from "@mui/material/styles";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

declare module "@mui/material/styles" {
  interface BasePaletteOptions {
    primary: { main: string };
    secondary: { main: string };
    error: { main: string };
    success: { main: string };
    text: {
      primary: string;
      secondary: string;
      disabled: string;
    };
    background: {
      paper: string;
      default: string;
    };
    neutral: {
      main: string;
      dark: string;
      light: string;
    };
  }

  interface Theme {
    palette: BasePaletteOptions;
  }

  interface PaletteOptions extends BasePaletteOptions {}
  interface ThemeOptions {
    palette?: PaletteOptions;
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: "#D9FF7E",
    },
    secondary: {
      main: "#1A1A1A",
    },
    error: {
      main: "#DC143C",
    },
    success: {
      main: "#8ABD12",
    },
    text: {
      primary: "#1A1A1A",
      secondary: "#343C55",
      disabled: "#80879C",
    },
    background: {
      paper: "#FFFFFF",
      default: "#F4F8FF",
    },
    neutral: {
      main: "#80879C",
      dark: "#343C55",
      light: "#D9E2FF",
    },
  },
});

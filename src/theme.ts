// src/theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#b91c1c", // Tailwind red-700
    },
    secondary: {
      main: "#111827", // Tailwind gray-900
    },
    error: {
      main: "#dc2626", // red-600
    },
  },
  shape: {
    borderRadius: 6,
  },
});

export default theme;

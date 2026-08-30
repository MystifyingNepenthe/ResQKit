// react native paper

import { MD3LightTheme } from "react-native-paper";
import colors from "./colors";

const theme = {
    ...MD3LightTheme,

    colors: {
        ...MD3LightTheme.colors,

        primary: colors.primary,
        secondary: colors.secondary,
        background: colors.background,
        surface: colors.surface,

        error: colors.error,
    },
};

export default theme;
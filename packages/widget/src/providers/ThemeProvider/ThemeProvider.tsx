import { PaletteMode, useMediaQuery } from '@mui/material';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { useEffect, useMemo, useState } from 'react';
import { createTheme } from '../../config/theme';
import { useAppearance } from '../../hooks';
import { useWidgetConfig } from '../WidgetProvider';

export const ThemeProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const { appearance: colorSchemeMode, paletteOptions } = useWidgetConfig();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [appearance, setAppearance] = useAppearance();
  const [mode, setMode] = useState<PaletteMode>(
    colorSchemeMode ?? appearance === 'auto'
      ? prefersDarkMode
        ? 'dark'
        : 'light'
      : appearance,
  );

  useEffect(() => {
    if (appearance === 'auto') {
      setMode(prefersDarkMode ? 'dark' : 'light');
    } else {
      setMode(appearance);
    }
  }, [appearance, prefersDarkMode]);

  useEffect(() => {
    if (colorSchemeMode) {
      setAppearance(colorSchemeMode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorSchemeMode]);

  const theme = useMemo(
    () => createTheme(mode, paletteOptions),
    [mode, paletteOptions],
  );
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};

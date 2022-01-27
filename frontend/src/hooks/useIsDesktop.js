import { useTheme, useMediaQuery } from '@mui/material';

function useIsDesktop() {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.up('md'), { noSsr: true });
}

export default useIsDesktop;

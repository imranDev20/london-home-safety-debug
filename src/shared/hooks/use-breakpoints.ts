import { useTheme, Theme } from "@mui/system";
import useMediaQuery from "@mui/system/useMediaQuery";

interface Breakpoints {
  isXs: boolean;
  isSm: boolean;
  isMd: boolean;
  isLg: boolean;
  isXl: boolean;
  isSmallScreen: boolean;
  isMediumScreen: boolean;
  isLargeScreen: boolean;
}

const useBreakpoints = (): Breakpoints => {
  const theme = useTheme<Theme>();

  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const isSm = useMediaQuery(theme.breakpoints.only("sm"));
  const isMd = useMediaQuery(theme.breakpoints.only("md"));
  const isLg = useMediaQuery(theme.breakpoints.only("lg"));
  const isXl = useMediaQuery(theme.breakpoints.only("xl"));

  return {
    isXs,
    isSm,
    isMd,
    isLg,
    isXl,
    isSmallScreen: isXs || isSm,
    isMediumScreen: isMd,
    isLargeScreen: isLg || isXl,
  };
};

export default useBreakpoints;

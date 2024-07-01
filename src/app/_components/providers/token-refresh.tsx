"use client";
import useTokenRefresh from "@/shared/hooks/use-token-refresh";

const TokenRefresh = () => {
  useTokenRefresh();
  return null; // This component doesn't render anything
};

export default TokenRefresh;

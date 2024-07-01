import { useEffect } from "react";
import http from "@/services/http.services";

const useTokenRefresh = () => {
  useEffect(() => {
    const refreshToken = async () => {
      try {
        const response = await http.post("/refresh-token");
        if (response.data.success) {
          console.log("Token refreshed successfully");
        } else {
          console.log("Failed to refresh token");
        }
      } catch (error) {
        console.error("Error refreshing token", error);
      }
    };

    // Refresh token every 10 minutes
    const interval = setInterval(refreshToken, 10 * 60 * 1000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);
};

export default useTokenRefresh;

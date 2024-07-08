"use client";

import getConfig from "@/shared/cookie-consent-config";
import { useEffect } from "react";
import * as CookieConsent from "vanilla-cookieconsent";
import "vanilla-cookieconsent/dist/cookieconsent.css";

const ResetCookieConsent = () => {
  CookieConsent.reset(true);
  CookieConsent.run(getConfig());
};

const CookieConsentComponent = () => {
  useEffect(() => {
    CookieConsent.run(getConfig());
  }, []);

  return (
    <div>
      <button type="button" onClick={CookieConsent.showPreferences}>
        Manage cookie preferences
      </button>
      <button type="button" onClick={ResetCookieConsent}>
        Reset cookie consent
      </button>
    </div>
  );
};

export default CookieConsentComponent;

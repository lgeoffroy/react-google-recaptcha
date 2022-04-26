import ReCAPTCHA from "./recaptcha";
import makeAsyncScriptLoader from "react-async-script";

const callbackName = "onloadcallback";
const globalName = "grecaptcha";

function getOptions() {
  return (typeof window !== "undefined" && window.recaptchaOptions) || {};
}

function getURL() {
  const dynamicOptions = getOptions();

  if (dynamicOptions.enterprise && dynamicOptions.useRecaptchaNet) {
    throw new Error("Cannot use both reCaptchaNet and enterprise.");
  }

  const scriptName = dynamicOptions.enterprise ? "enterprise" : "api";
  const hostname = dynamicOptions.useRecaptchaNet ? "recaptcha.net" : "www.google.com";

  return `https://${hostname}/recaptcha/${scriptName}.js?onload=${callbackName}&render=explicit`;
}

export default makeAsyncScriptLoader(getURL, {
  callbackName,
  globalName,
  attributes: getOptions().nonce ? { nonce: getOptions().nonce } : {},
})(ReCAPTCHA);

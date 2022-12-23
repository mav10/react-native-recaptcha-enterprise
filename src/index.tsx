import { NativeModules, Platform } from 'react-native';
import type { ExecuteActions } from './types';
import { recaptchaErrorHandler } from './recaptchaErrorHandler';

const LINKING_ERROR =
  `The package 'react-native-recaptcha-enterprise' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const RecaptchaEnterprise = NativeModules.RecaptchaEnterprise
  ? NativeModules.RecaptchaEnterprise
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

/**
 * Initializes reCaptcha client with given siteKey
 * @param siteKey - Google Site Key
 *
 * @throws RecaptchaErrorType exception
 */
export function initializeRecaptcha(siteKey: string): Promise<void> {
  return RecaptchaEnterprise.initializeRecaptcha(siteKey)
    .catch(recaptchaErrorHandler)
    .then(() => Promise.resolve());
}

/**
 * Executes action and returns verify token.
 * @param actionName - type of performed action. Predefined is "LOGIN" only.
 * All other actions will be handled as custom ones (with "custom_" prefix).
 *
 * @returns Returns ReCaptcha token to verify user on backend|REST|etc.
 * (in the end on Google server side)
 *
 * @throws RecaptchaErrorType exception
 */
export function executeAction(actionName: ExecuteActions): Promise<string> {
  return RecaptchaEnterprise.executeAction(actionName)
    .catch(recaptchaErrorHandler)
    .then((token: string) => Promise.resolve(token));
}

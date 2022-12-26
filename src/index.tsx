import { NativeModules, Platform } from 'react-native';
import type { CanUseResult, ExecuteActions } from './types';
import { RecaptchaErrorCodes } from './types';
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
 * Checks that `Google ReCaptcha` is callable on native layer.
 * (It is called under the hood in {@link initializeRecaptcha} on native part.)
 *
 * It is not available in some cases:
 *  1. If module is not linked correctly.
 *   {Possible fix} - Try to re-install package and check it out again.
 *  2. If there is no `Google Play Services`. As library use them on Android platform.
 *  [Android only]
 *   {Possible fix} - Impossible! Ignore the library on such phones.
 *
 * @return boolean flag value
 * `TRUE` - captcha module is available;
 * `FALSE`- not available.
 */
export function canUseRecaptcha(): Promise<CanUseResult> {
  return RecaptchaEnterprise.canUseRecaptcha()
    .catch((err: any) => {
      const nativeError = recaptchaErrorHandler(err, false);

      console.error(
        `[Recaptcha Enterprise]: Could not be used as native module unavailable. It could be configuration issue
       ${Platform.select({
         android: ' or missing "Google Play Services" on Android platform.',
         default: '.',
       })}`,
        recaptchaErrorHandler(err, false)
      );
      return { result: false, reason: nativeError.code } as CanUseResult;
    })
    .then((value: boolean) => {
      return {
        result: value,
        reason: value ? undefined : RecaptchaErrorCodes.NotAvailable,
      } as CanUseResult;
    });
}

/**
 * Initializes reCaptcha client with given siteKey
 *
 * @param {string} siteKey - Google Site Key
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
 *
 * @param {string} actionName - Type of performed action. Predefined is "LOGIN" only.
 * All other actions will be handled as custom ones (with **"custom_"** prefix).
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

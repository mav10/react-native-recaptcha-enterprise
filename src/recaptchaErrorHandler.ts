import {
  AndroidRecaptchaErrorCodes,
  IOS_RecaptchaErrorCodes,
  RecaptchaErrorCodes,
  RecaptchaErrorType,
} from './types';
import { Platform } from 'react-native';

// TODO: migrate to numeric code type
function mapPlatformErrorsIntoCommonType(
  errorType: keyof IOS_RecaptchaErrorCodes | AndroidRecaptchaErrorCodes
): RecaptchaErrorCodes {
  return Platform.select({
    // @ts-ignore
    ios: IOS_RecaptchaErrorCodes[errorType],
    // @ts-ignore
    android: AndroidRecaptchaErrorCodes[errorType],
    default: RecaptchaErrorCodes.RecaptchaErrorCodeUnknown,
  });
}

/**
 * Parse error object, map it into {@link RecaptchaErrorType} and decide should be thrown or not.
 *
 * @param {*} err - A caught error-object on Promise-level.
 * @param {boolean} [throwable=true] - Optional parameter to define throw immediately
 * or take error result and handle by your-self.
 *
 * @return {RecaptchaErrorType} In case of not throwable.
 *
 * @throws {RecaptchaErrorType}
 */
export function recaptchaErrorHandler(
  err: any,
  throwable: boolean = true
): RecaptchaErrorType {
  const errorBody: RecaptchaErrorType = {
    code: err?.code
      ? mapPlatformErrorsIntoCommonType(err.code)
      : RecaptchaErrorCodes.RecaptchaErrorCodeUnknown,
    message: err?.message || 'Unexpected error',
    rawData: err,
  };

  if (throwable) {
    throw errorBody;
  }

  return errorBody;
}

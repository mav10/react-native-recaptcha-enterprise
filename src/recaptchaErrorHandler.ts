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

export function recaptchaErrorHandler(err: any): RecaptchaErrorType {
  throw {
    code: err?.code
      ? mapPlatformErrorsIntoCommonType(err.code)
      : RecaptchaErrorCodes.RecaptchaErrorCodeUnknown,
    message: err?.message || 'Unexpected error',
    rawData: err,
  };
}

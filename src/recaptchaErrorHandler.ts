import { RecaptchaErrorCodes, RecaptchaErrorType } from './types';

function mapPlatformErrorsIntoCommonType(
  errorType: string
): RecaptchaErrorCodes {
  const errorCode = parseInt(errorType, 10);
  if (errorCode) {
    if (errorCode <= 5 || errorCode === 100) {
      return (
        // @ts-ignore
        RecaptchaErrorCodes[errorType] ||
        RecaptchaErrorCodes.RecaptchaErrorCodeUnknown
      );
    }

    console.warn(
      '[Recaptcha Enterprise]: there is unhandled (not provided) error code: ' +
        `'${errorCode}'.` +
        ' Please, inform maintainer of this package via GitHub.'
    );
  }

  if (errorType) {
    return (
      // @ts-ignore
      RecaptchaErrorCodes[errorType] ||
      RecaptchaErrorCodes.RecaptchaErrorCodeUnknown
    );
  }

  return RecaptchaErrorCodes.RecaptchaErrorCodeUnknown;
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

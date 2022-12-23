import { RecaptchaErrorCodes, RecaptchaErrorType } from './types';

export function recaptchaErrorHandler(err: any): RecaptchaErrorType {
  throw {
    code: err?.code || RecaptchaErrorCodes.RecaptchaErrorCodeUnknown,
    message: err?.message || 'Unexpected error',
    rawData: err,
  };
}

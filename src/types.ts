export enum RecaptchaErrorCodes {
  'NotInitializedClient' = 'NotInitializedClient',
  'RecaptchaErrorCodeUnknown' = 'RecaptchaErrorCodeUnknown',
  'RecaptchaErrorNetworkError' = 'RecaptchaErrorNetworkError',
  'RecaptchaErrorInvalidSiteKey' = 'RecaptchaErrorInvalidSiteKey',
  'RecaptchaErrorInvalidKeyType' = 'RecaptchaErrorInvalidKeyType',
  'RecaptchaErrorInvalidPackageName' = 'RecaptchaErrorInvalidPackageName',
  'RecaptchaErrorInvalidAction' = 'RecaptchaErrorInvalidAction',
  'RecaptchaErrorCodeInternalError' = 'RecaptchaErrorCodeInternalError',
}

export type RecaptchaErrorType = {
  code: RecaptchaErrorCodes;
  message: string;
  rawData: any;
};

export type ExecuteActions = 'LOGIN' | string;

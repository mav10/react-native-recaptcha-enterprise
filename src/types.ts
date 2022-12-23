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

export enum IOS_RecaptchaErrorCodes {
  'NotInitializedClient' = 'NotInitializedClient',
  'RecaptchaErrorCodeUnknown' = 'RecaptchaErrorCodeUnknown',
  'RecaptchaErrorNetworkError' = 'RecaptchaErrorNetworkError',
  'RecaptchaErrorInvalidSiteKey' = 'RecaptchaErrorInvalidSiteKey',
  'RecaptchaErrorInvalidKeyType' = 'RecaptchaErrorInvalidKeyType',
  'RecaptchaErrorInvalidPackageName' = 'RecaptchaErrorInvalidPackageName',
  'RecaptchaErrorInvalidAction' = 'RecaptchaErrorInvalidAction',
  'RecaptchaErrorCodeInternalError' = 'RecaptchaErrorCodeInternalError',
}

export enum AndroidRecaptchaErrorCodes {
  'NotInitializedClient' = 'NotInitializedClient',
  'UNKNOWN_ERROR' = 'RecaptchaErrorCodeUnknown',
  'NETWORK_ERROR' = 'RecaptchaErrorNetworkError',
  'INVALID_SITEKEY' = 'RecaptchaErrorInvalidSiteKey',
  'INVALID_KEYTYPE' = 'RecaptchaErrorInvalidKeyType',
  'INVALID_PACKAGE_NAME' = 'RecaptchaErrorInvalidPackageName',
  'INVALID_ACTION' = 'RecaptchaErrorInvalidAction',
  'INTERNAL_ERROR' = 'RecaptchaErrorCodeInternalError',
}

export type RecaptchaErrorType = {
  code: RecaptchaErrorCodes;
  message: string;
  rawData: any;
};

export type ExecuteActions = 'LOGIN' | string;

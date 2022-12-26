export enum RecaptchaErrorCodes {
  'NotInitializedClient' = 'NotInitializedClient',
  'NotAvailable' = 'NotAvailable',
  /* Android: UNKNOWN_ERROR, ios: RecaptchaErrorCodeUnknown */
  'RecaptchaErrorCodeUnknown' = 0,
  /* Android: NETWORK_ERROR, ios: RecaptchaErrorNetworkError */
  'RecaptchaErrorNetworkError' = 1,
  /* Android: INVALID_SITEKEY, ios: RecaptchaErrorInvalidSiteKey */
  'RecaptchaErrorInvalidSiteKey' = 2,
  /* Android: INVALID_KEYTYPE, ios: RecaptchaErrorInvalidKeyType */
  'RecaptchaErrorInvalidKeyType' = 3,
  /* Android: INVALID_PACKAGE_NAME, ios: RecaptchaErrorInvalidPackageName */
  'RecaptchaErrorInvalidPackageName' = 4,
  /* Android: INVALID_ACTION, ios: RecaptchaErrorInvalidAction */
  'RecaptchaErrorInvalidAction' = 5,
  /* Android: INTERNAL_ERROR, ios: RecaptchaErrorCodeInternalError */
  'RecaptchaErrorCodeInternalError' = 100,
}

export type CanUseResult = {
  result: boolean;
} & ({ result: true } | { result: false; reason: string });

export type RecaptchaErrorType = {
  code: RecaptchaErrorCodes;
  message: string;
  rawData: any;
};

export type ExecuteActions = 'LOGIN' | string;

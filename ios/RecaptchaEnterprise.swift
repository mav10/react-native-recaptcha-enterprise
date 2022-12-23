import RecaptchaEnterprise

@objc(RecaptchaEnterprise)
class RecaptchaEnterprise: NSObject {
    var recaptchaClient: RecaptchaClient?

    @objc(initializeRecaptcha:withResolver:withRejecter:)
    func initializeRecaptcha(siteKey: String, resolve: @escaping RCTPromiseResolveBlock,reject: @escaping RCTPromiseRejectBlock) -> Void {
        Recaptcha.getClient(siteKey: siteKey) { recaptchaClient, error in
            if let recaptchaClient = recaptchaClient {
              self.recaptchaClient = recaptchaClient
                resolve(nil)
            }
            if let error = error {
              print("RecaptchaClient creation error: \(error).")
                reject(self.mapRecaptchaErrorCodeToString(error: error), error.errorMessage, error)
            }
        }
    }
    
    @objc(executeAction:withResolver:withRejecter:)
    func executeAction(actionName: String, resolve: @escaping RCTPromiseResolveBlock,reject: @escaping RCTPromiseRejectBlock) -> Void {
        guard let recaptchaClient = self.recaptchaClient else {
            reject("NotInitializedClient", "RecaptchaClient is not initialized", nil)
            return
        }
        
        var actualAction = actionName.uppercased() == "LOGIN"
            ? RecaptchaAction.init(action: .login)
            : RecaptchaAction.init(customAction: actionName)
        
        recaptchaClient.execute(actualAction!) { executeResult, error in
            if let executeResult = executeResult {
                resolve(executeResult.recaptchaToken)
            } else if let error = error {
                reject(self.mapRecaptchaErrorCodeToString(error: error), error.errorMessage, error)
            }
        }
    }
    
    
    
    /*
     * IMPORTANT: This list is add-only. Never change any existing value, since this class is
     * publicly visible and customers rely on these values to do error checking.
     */
    func mapRecaptchaErrorCodeToString(error: RecaptchaError) -> String {
        switch error.errorCode {
        case 1:
            /** reCAPTCHA cannot connect to Google servers, please make sure the app has network access. */
            return "RecaptchaErrorNetworkError"
        case 2:
            /** The site key used to call reCAPTCHA is invalid. */
            return "RecaptchaErrorInvalidSiteKey"
        case 3:
            /**
             * Cannot create a reCAPTCHA client because the key used cannot be used on iOS.
             *
             * Please register new site key with the key type set to "iOS App" via
             * [https://g.co/recaptcha/androidsignup](https://g.co/recaptcha/androidsignup).
             */
            return "RecaptchaErroInvalidKeyType"
        case 4:
            /**
             * Cannot create a reCAPTCHA client because the site key used doesn't support the calling package.
             */
            return "RecaptchaErrorInvalidPackageName"
        case 5:
            /** reCAPTCHA cannot accept the action used, see custom action guidelines */
            return "RecaptchaErrorInvalidAction"
        case 100:
            /** reCAPTCHA has faced an internal error, please try again in a bit. */
            return "RecaptchaErrorCodeInternalError"
        default:
            /** Unknown error occurred during the workflow. */
            return "RecaptchaErrorCodeUnknown"
        }
    }
}

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
                reject(String(error.errorCode), error.errorMessage, error)
            }
        }
    }

    @objc(executeAction:withResolver:withRejecter:)
    func executeAction(actionName: String, resolve: @escaping RCTPromiseResolveBlock,reject: @escaping RCTPromiseRejectBlock) -> Void {
        guard let recaptchaClient = self.recaptchaClient else {
            reject("NotInitializedClient", "RecaptchaClient is not initialized", nil)
            return
        }

        let actualAction = actionName.uppercased() == "LOGIN"
            ? RecaptchaAction.init(action: .login)
            : RecaptchaAction.init(customAction: actionName)

        recaptchaClient.execute(actualAction) { executeResult, error in
            if let executeResult = executeResult {
                resolve(executeResult.recaptchaToken)
            } else if let error = error {
                reject(String(error.errorCode), error.errorMessage, error)
            }
        }
    }

    @objc(canUseRecaptcha:withRejecter:)
    func canUseRecaptcha(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
        resolve(true)
    }
}

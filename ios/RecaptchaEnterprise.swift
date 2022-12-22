import RecaptchaEnterprise

@objc(RecaptchaEnterprise)
class RecaptchaEnterprise: NSObject {
    var recaptchaClient: RecaptchaClient?

    @objc(initializeRecaptcha:withResolver:withRejecter:)
    func initializeRecaptcha(siteKey: String, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        Task {
          let (recaptchaClient, error) = await Recaptcha.getClient(siteKey: siteKey)
          if let recaptchaClient = recaptchaClient {
            self.recaptchaClient = recaptchaClient
          }
          if let error = error {
            print("RecaptchaClient creation error: \(error).")
          }
        }
        resolve(nil)
         // reject("INITIALIZE_FAILED", "RecaptchaClient init failed by unknown reason", nil)
    }
    
    @objc(executeAction:withResolver:withRejecter:)
    func executeAction(actionName: String, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        resolve("empty token")
    }
}

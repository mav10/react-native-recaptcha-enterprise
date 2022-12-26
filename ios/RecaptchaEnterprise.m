#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(RecaptchaEnterprise, NSObject)

RCT_EXTERN_METHOD(initializeRecaptcha:(NSString*)siteKey
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(executeAction:(NSString*)actionName
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(canUseRecaptcha:
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)


- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

@end

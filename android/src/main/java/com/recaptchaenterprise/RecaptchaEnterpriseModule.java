package com.recaptchaenterprise;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.recaptcha.Recaptcha;
import com.google.android.recaptcha.RecaptchaTasksClient;

import java.util.List;
import java.util.concurrent.Executor;

@ReactModule(name = RecaptchaEnterpriseModule.NAME)
public class RecaptchaEnterpriseModule extends ReactContextBaseJavaModule {
  public static final String NAME = "RecaptchaEnterprise";

  public RecaptchaEnterpriseModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }

  private void initializeRecaptchaClient() {
    Recaptcha
      .getTasksClient(this, "YOUR_SITE_KEY")
      .addOnSuccessListener(
        (Executor) this,
        new OnSuccessListener<RecaptchaTasksClient>() {
          @Override
          public void onSuccess(RecaptchaTasksClient client) {
//            MainActivity.this.recaptchaTasksClient = client;
          }
        })
      .addOnFailureListener(
        (Executor) this,
        new OnFailureListener() {
          @Override
          public void onFailure(@NonNull Exception e) {
            // Handle communication errors ...
            // See "Handle communication errors" section
          }
        });
  }

  @Override
  public List<NativeModule> createNativeModules() {
    return createNativeModules();
  }

  @Override
  public List<NativeModule> createNativeModules(ReactApplicationContext reactApplicationContext) {}


  // Example method
  // See https://reactnative.dev/docs/native-modules-android
  @ReactMethod
  public void multiply(double a, double b, Promise promise) {
    promise.resolve(a * b);
  }
}

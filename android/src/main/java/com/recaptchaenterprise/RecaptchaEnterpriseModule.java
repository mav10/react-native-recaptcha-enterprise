package com.recaptchaenterprise;

import android.app.Activity;
import android.app.Application;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;
import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.GoogleApiAvailability;
import com.google.android.gms.tasks.OnCanceledListener;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.recaptcha.Recaptcha;
import com.google.android.recaptcha.RecaptchaAction;
import com.google.android.recaptcha.RecaptchaErrorCode;
import com.google.android.recaptcha.RecaptchaException;
import com.google.android.recaptcha.RecaptchaTasksClient;

import java.util.List;
import java.util.concurrent.Executor;

@ReactModule(name = RecaptchaEnterpriseModule.NAME)
public class RecaptchaEnterpriseModule extends ReactContextBaseJavaModule {
  public static final String NAME = "RecaptchaEnterprise";

  public final Boolean isInitialized = false;

  @Nullable
  private RecaptchaTasksClient recaptchaTasksClient = null;

  public RecaptchaEnterpriseModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }

  @ReactMethod
  public void initializeRecaptcha(String siteKey, Promise promise) {
    final Activity currentActivity = getCurrentActivity();
    if (currentActivity == null) {
      promise.reject(String.valueOf(RecaptchaErrorCode.UNKNOWN_ERROR.getErrorCode()), "Activity and Application context not found");
    }
    Application application = currentActivity.getApplication();

    try {
      if(!checkPlayServices()) {
        promise.reject("NotAvailable", "Recaptcha is not available as no Google Play Services.");
      }
    } catch (Exception e) {
       promise.reject("NotAvailable", "Recaptcha is not available as no Google Play Services.");
    }

    Recaptcha
      .getTasksClient(application, siteKey)
      .addOnSuccessListener(
        new OnSuccessListener<RecaptchaTasksClient>() {
          @Override
          public void onSuccess(RecaptchaTasksClient client) {
            Log.d("GRCP", "initialize succeeded with key: " + siteKey);
            recaptchaTasksClient = client;
            promise.resolve(null);
          }
        })
      .addOnFailureListener(
        new OnFailureListener() {
          @Override
          public void onFailure(@NonNull Exception e) {
            Log.d("GRCP", "initialize onFailure: ", e);

            int errorCode = RecaptchaErrorCode.UNKNOWN_ERROR.getErrorCode();
            String errorMessage = e.getMessage();

            if (e instanceof RecaptchaException) {
              errorCode = ((RecaptchaException) e).getErrorCode().getErrorCode();
              errorMessage = ((RecaptchaException) e).getErrorMessage();
            }
            promise.reject(String.valueOf(errorCode), errorMessage, e.getCause());
          }
        });
  }

  @ReactMethod
  public void executeAction(String action, Promise promise) {
    try {
      recaptchaTasksClient
        .executeTask(action.toUpperCase().equals("LOGIN")
          ? RecaptchaAction.LOGIN
          : RecaptchaAction.custom(action))
        .addOnSuccessListener(new OnSuccessListener<String>() {
          @Override
          public void onSuccess(String token) {
            Log.d("GRCP", "execute action \"" + action + "\" succeeded: ");
            promise.resolve(token);
          }
        })
        .addOnFailureListener(new OnFailureListener() {
          @Override
          public void onFailure(@NonNull Exception e) {
            Log.d("GRCP", "execute action \"" + action + "\" onFailure: ", e);
            int errorCode = RecaptchaErrorCode.UNKNOWN_ERROR.getErrorCode();
            String errorMessage = e.getMessage();

            if (e instanceof RecaptchaException) {
              errorCode = ((RecaptchaException) e).getErrorCode().getErrorCode();
              errorMessage = ((RecaptchaException) e).getErrorMessage();
            }
            promise.reject(String.valueOf(errorCode), errorMessage, e.getCause());
          }
        });
    } catch (NullPointerException exception) {
      promise.reject("NotInitializedClient", "Captcha client is null", exception);
    } catch (Exception exception) {
      promise.reject(String.valueOf(RecaptchaErrorCode.UNKNOWN_ERROR.getErrorCode()), "Unexpected error during execute", exception);
    }
  }

  @ReactMethod
  public void canUseRecaptcha(Promise promise) {
    try {
      final boolean result = checkPlayServices();
      promise.resolve(result);
    } catch (Exception e) {
      promise.reject("NotAvailable", "Recaptcha is not available as no Google Play Services.");
    }
  }

  private boolean checkPlayServices() {
    GoogleApiAvailability gApi = GoogleApiAvailability.getInstance();
    int resultCode = gApi.isGooglePlayServicesAvailable(getReactApplicationContext());
    if (resultCode != ConnectionResult.SUCCESS) {
      if (gApi.isUserResolvableError(resultCode)) {
        return false;
//        gApi.getErrorDialog(this, resultCode, PLAY_SERVICES_RESOLUTION_REQUEST).show();
      }
      return false;
    }
    return true;
  }
}

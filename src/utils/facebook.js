
// Dynamically load and initialize the Facebook SDK
export function loadFacebookSDK(appId, version = 'v19.0') {
//   console.log('[FB SDK] Loading Facebook SDK...');
  // Remove any previous SDK script and FB object to avoid double loading or stale state
  const old = document.getElementById('facebook-jssdk');
  if (old) {
    // console.log('[FB SDK] Removing old SDK script.');
    old.remove();
    if (window.FB) {
    //   console.log('[FB SDK] Deleting window.FB');
      delete window.FB;
    }
  }
  // Set fbAsyncInit BEFORE loading the SDK script
  function doFbInit() {
    if (window.FB && typeof window.FB.init === 'function') {
    //   console.log('[FB SDK] Initializing FB SDK with version', version, 'and appId', appId);
      window.FB.init({
        appId,
        cookie: true,
        xfbml: true,
        version,
      });
    } else {
    //   console.error('[FB SDK] window.FB or window.FB.init is not a function at doFbInit');
    }
  }
  window.fbAsyncInit = function () {
    // console.log('[FB SDK] fbAsyncInit called. window.FB:', window.FB);
    doFbInit();
  };
  const js = document.createElement('script');
  js.id = 'facebook-jssdk';
  js.src = `https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=${version}&appId=${encodeURIComponent(appId)}&autoLogAppEvents=1`;
  js.async = true;
  js.onload = function() {
    // console.log('[FB SDK] SDK script loaded. window.FB:', window.FB);
    // Extra safety: call FB.init here too if available
    doFbInit();
  };
  js.onerror = function(e) {
    // console.error('[FB SDK] SDK script failed to load', e);
  };
  document.body.appendChild(js);
}

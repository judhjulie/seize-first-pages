// PostHog's browser SDK is loaded only on the public site. The embedded desktop
// forwards a small, fixed set of progress events to the parent page.
(() => {
  const eventNames = new Set([
    'seize_computer_focused',
    'seize_window_opened',
    'seize_member_game_opened',
    'seize_concept_unlocked',
    'seize_score_puzzle_opened',
    'seize_score_hint_used',
    'seize_score_completed',
    'seize_secret_folder_opened',
    'seize_chat_message_sent',
    'seize_siren_triggered',
    'seize_shutdown_attempted'
  ]);
  const embedded = window.parent !== window;

  function capture(name, properties = {}) {
    if (!eventNames.has(name)) return;
    if (embedded) {
      window.parent.postMessage({ source: 'seize-analytics', name, properties }, location.origin);
    } else if (window.posthog) {
      window.posthog.capture(name, properties);
    }
  }
  window.seizeAnalytics = { capture };

  if (embedded || location.hostname !== 'judhjulie.github.io') return;

  // Official PostHog HTML loader, for this site's plain HTML deployment.
  !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split('.');2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement('script')).type='text/javascript',p.crossOrigin='anonymous',p.async=!0,p.src=s.api_host.replace('.i.posthog.com','-assets.i.posthog.com')+'/static/array.js',(r=t.getElementsByTagName('script')[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a='posthog',u.people=u.people||[],Object.defineProperty(u,'toString',{configurable:!0,enumerable:!0,writable:!0,value:function(t){var e='posthog';return'posthog'!==a&&(e+='.'+a),t||(e+=' (stub)'),e}}),Object.defineProperty(u.people,'toString',{configurable:!0,enumerable:!0,writable:!0,value:function(){return u.toString(1)+'.people (stub)'}}),o='init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagResult isFeatureEnabled reloadFeatureFlags on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey identify setPersonProperties group resetGroups reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug'.split(' '),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||{});

  window.posthog.init('phc_rUcyBCAP3kCGkSAxxukKJvhxZ3muRQmrA6CbaNcNMCTR', {
    api_host: 'https://us.i.posthog.com',
    defaults: '2026-05-30',
    person_profiles: 'identified_only',
    capture_pageview: true,
    capture_pageleave: true,
    autocapture: false,
    session_recording: { maskAllInputs: true, blockSelector: '.ph-no-capture' }
  });

  window.addEventListener('message', (event) => {
    if (event.origin !== location.origin ||
        event.source !== document.querySelector('.crt-screen iframe')?.contentWindow ||
        event.data?.source !== 'seize-analytics') return;
    capture(event.data.name, event.data.properties);
  });
})();

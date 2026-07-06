import * as Sentry from "@sentry/nextjs";

// Defer init off the critical JS path. Synchronous Sentry.init() during page
// load adds ~50ms actual execution time; Lighthouse's 4× CPU throttle amplifies
// this to ~400ms of simulated LCP regression. Post-load error capture is unaffected.
if (typeof window !== "undefined") {
  setTimeout(() => {
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      tracesSampleRate: 0,
      debug: false,
    });
  }, 0);
}

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;

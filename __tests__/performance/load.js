import http from "k6/http";
import { check, sleep } from "k6";
import { Rate, Trend } from "k6/metrics";

// Custom metrics
const errorRate = new Rate("errors");
const weekPageDuration = new Trend("week_page_duration");

export const options = {
  scenarios: {
    // Scenario 1: Normal load
    normal_load: {
      executor: "ramping-vus",
      startVUs: 0,
      stages: [
        { duration: "30s", target: 20 }, // ramp up
        { duration: "1m", target: 20 }, // sustain
        { duration: "20s", target: 0 }, // ramp down
      ],
      gracefulRampDown: "10s",
    },
    // Scenario 2: Spike test
    spike: {
      executor: "ramping-vus",
      startTime: "2m",
      startVUs: 0,
      stages: [
        { duration: "10s", target: 100 }, // sudden spike
        { duration: "30s", target: 100 }, // sustain spike
        { duration: "10s", target: 0 }, // drop off
      ],
    },
  },

  thresholds: {
    http_req_duration: ["p(95)<500", "p(99)<1000"], // 95% under 500ms
    errors: ["rate<0.05"], // less than 5% errors
    week_page_duration: ["p(95)<600"],
  },
};

const BASE_URL = __ENV.BASE_URL || "http://localhost:3000";

export default function () {
  // Test 1: Home page
  const homeRes = http.get(`${BASE_URL}/`);
  check(homeRes, {
    "home page status 200": (r) => r.status === 200,
    "home page loads under 500ms": (r) => r.timings.duration < 500,
  });
  errorRate.add(homeRes.status !== 200);

  sleep(1);

  // Test 2: Week pages
  const weekIds = [1, 2, 3, 4, 5, 6, 7];
  const weekId = weekIds[Math.floor(Math.random() * weekIds.length)];
  const weekRes = http.get(`${BASE_URL}/week/${weekId}`);

  check(weekRes, {
    "week page status 200": (r) => r.status === 200,
    "week page loads under 600ms": (r) => r.timings.duration < 600,
  });

  weekPageDuration.add(weekRes.timings.duration);
  errorRate.add(weekRes.status !== 200);

  sleep(1);

  // Test 3: Progress page
  const progressRes = http.get(`${BASE_URL}/progress`);
  check(progressRes, {
    "progress page status 200": (r) => r.status === 200,
  });

  sleep(1);

  // Test 4: API routes
  const apiRes = http.get(
    `${BASE_URL}/api/reflections?weekId=${weekId}&dayNum=1`,
  );
  check(apiRes, {
    "reflections API status 200": (r) => r.status === 200,
    "reflections API under 300ms": (r) => r.timings.duration < 300,
  });

  sleep(Math.random() * 2 + 1);
}

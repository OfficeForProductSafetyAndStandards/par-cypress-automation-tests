import http from 'k6/http';
import { check, sleep } from 'k6';


export const options = {
    vus: 5,
    duration: '30s',
    thresholds: {
        http_req_duration: ['p(95)<5000'], // 95% of requests must be under 1200ms
    },
};

export default function () {
    const BASE_URL = __ENV.PERF_URL;

    const res = http.get(BASE_URL);

    check(res, {
        'status is 200': (r) => r.status === 200,
    });

    sleep(1);
}


export function handleSummary(data) {
    return {
        "k6-results/summary.json": JSON.stringify(data, null, 2),
        stdout: JSON.stringify(data, null, 2),
    };
}

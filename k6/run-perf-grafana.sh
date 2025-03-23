#!/bin/bash

# ✅ Load .env vars into shell
eval "$(node k6/load-env.js bash)"

# Run with InfluxDB output and env vars from shell
K6_OUT=influxdb=http://localhost:8086/k6 \
k6 run \
  --env PERF_URL=$PERF_URL \
  --env BASE_UI_URL=$BASE_UI_URL \
  k6/scripts/load-test.js

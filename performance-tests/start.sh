# !/bin/bash
locust --headless --users 10 --spawn-rate 1 -H http://localhost:8081

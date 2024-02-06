#!/bin/bash
cd api-robot-control
# Run uvicorn server in the background
nohup uvicorn server:app --reload --host 0.0.0.0 > ../uvicorn.log 2>&1 &

# Run streaming.py in the background
nohup python3 streaming.py > ../streaming.log 2>&1 &

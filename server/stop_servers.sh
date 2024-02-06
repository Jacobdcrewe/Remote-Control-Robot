#!/bin/bash

# Stop uvicorn server
pkill -f "uvicorn server:app --reload --host 0.0.0.0"

# Stop streaming.py
pkill -f "python3 streaming.py"

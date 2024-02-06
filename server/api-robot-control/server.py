from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import serial
from enum import Enum

class Action(str, Enum):
    FORWARD = "FORWARD"
    BACKWARD = "BACKWARD"
    LEFT = "LEFT"
    RIGHT = "RIGHT"
    STOP = "STOP"

class RobotAction(BaseModel):
    action: Action


# Define serial port and baud rate for Arduino
serial_port = "/dev/ttyACM0"
baud_rate = 9600

# Create a serial object to establish a connection with the Arduino
ser = serial.Serial(serial_port, baud_rate, timeout=1)

# intialize the fast api app
app = FastAPI()

# Allow all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/robot/action")
async def perform_action(robot_action: RobotAction):
    received_data = ser.readline().decode('utf-8').strip()
    if received_data:
        print(received_data)
    print(robot_action)
    output = " "
    if robot_action.action == Action.FORWARD.value:
        output = "W"
    elif robot_action.action == Action.BACKWARD.value:
        output = "S"
    elif robot_action.action == Action.LEFT.value:
        output = "A"
    elif robot_action.action == Action.RIGHT.value:
        output = "D"
    
    ser.write(output.encode('utf-8'))

    # Here you would add the logic to control the robot
    # For demonstration, it just returns the action
    return {"action": robot_action.action}

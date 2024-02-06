# Remote-Control-Robot

Capstone Project for TMU F2023/W2024

# Running Frontend

Redirect to the robot-control file.

Run `npm install`

Run `npm run start`


# Running Server

Run `chmod +x run_servers.sh` to create run server command

Run `./run_servers.sh` to start the streaming and server

Run `chmod +x stop_servers.sh` to create stop server command

Run `./stop_servers.sh` to stop the streaming and server

 uvicorn server:app --reload --host 0.0.0.0

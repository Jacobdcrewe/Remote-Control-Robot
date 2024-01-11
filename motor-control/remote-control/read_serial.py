import serial
import threading
import time
import tty, sys, termios

# Define the serial port and baud rate
serial_port = "/dev/ttyACM0"  # Update this based on your setup
baud_rate = 9600

# Create a serial object
ser = serial.Serial(serial_port, baud_rate, timeout=1)

filedescriptors = termios.tcgetattr(sys.stdin)
tty.setcbreak(sys.stdin)

last_key = None

def read_serial():
    try:
        while True:
            # Read a line from the serial port
            received_data = ser.readline().decode('utf-8').strip()

            # Print the received data
            if received_data:
                print(received_data)

    except KeyboardInterrupt:
        pass

def write_serial():
    global last_key
    try:
        while True:
            # Example: Send a command back to the Arduino
            key = sys.stdin.read(1)[0]
            if key != last_key:
                print(key, " sent")
                ser.write(key.encode('utf-8'))
                last_key = key
    except KeyboardInterrupt:
        pass

# Create threads for reading and writing
read_thread = threading.Thread(target=read_serial)
write_thread = threading.Thread(target=write_serial)

try:
    # Start the threads
    read_thread.start()
    write_thread.start()

    # Keep the main thread alive
    read_thread.join()
    write_thread.join()

except KeyboardInterrupt:
    print("Exiting due to keyboard interrupt")

finally:
    # Close the serial port when the script exits
    ser.close()
    print("Serial port closed")
    termios.tcsetattr(sys.stdin, termios.TCSADRAIN, filedescriptors)

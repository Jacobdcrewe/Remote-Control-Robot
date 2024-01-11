const int leftFwdPin = 11;
const int leftBckPin = 9;
const int rightFwdPin = 8;
const int rightBckPin = 12;

unsigned long startTime = 0; // Variable to store the start time
int duration = 1000;         // 1 second duration for each case

void setup() {
  Serial.begin(9600);

  // Initialize LED pins as OUTPUT
  pinMode(leftFwdPin, OUTPUT);
  pinMode(leftBckPin, OUTPUT);
  pinMode(rightFwdPin, OUTPUT);
  pinMode(rightBckPin, OUTPUT);

  // Initially stop
  stopMotors();
}

void loop() {
  if (Serial.available() > 0) {
    // Read the character from the serial port
    char receivedChar = Serial.read();

    // Print the received character to the serial monitor
    Serial.print("Received Key: ");
    Serial.println(receivedChar);

    // Check if the received character is valid
    if (isValidChar(receivedChar)) {
      // Record the start time for this case
      startTime = millis();

      // Control motors based on the received character until a different character is pressed
      while (Serial.available() == 0 && millis() - startTime < duration) {
        processChar(receivedChar);
      }
    } else {
      // Stop motors if an unrecognized key is pressed
      stopMotors();

      // Clear the queue if an unrecognized key is received
      while (Serial.available() > 0) {
        Serial.read(); // Discard the unread characters in the queue
      }
    }
  }
}

bool isValidChar(char c) {
  return (c == 'W' || c == 'A' || c == 'S' || c == 'D' || c == 'w' || c == 'a' || c == 's' || c == 'd');
}

void processChar(char receivedChar) {
  switch (receivedChar) {
    case 'w':
    case 'W':
      Fwd();
      break;
    case 'a':
    case 'A':
      Left();
      break;
    case 's':
    case 'S':
      Bck();
      break;
    case 'd':
    case 'D':
      Right();
      break;
    default:
      // Should not reach here, but just in case
      break;
  }
}

void stopMotors() {
  digitalWrite(leftFwdPin, LOW);
  digitalWrite(leftBckPin, LOW);
  digitalWrite(rightFwdPin, LOW);
  digitalWrite(rightBckPin, LOW);
}

void Left() {
  digitalWrite(leftFwdPin, LOW);
  digitalWrite(leftBckPin, HIGH);
  digitalWrite(rightFwdPin, HIGH);
  digitalWrite(rightBckPin, LOW);
}

void Right() {
  digitalWrite(leftFwdPin, HIGH);
  digitalWrite(leftBckPin, LOW);
  digitalWrite(rightFwdPin, LOW);
  digitalWrite(rightBckPin, HIGH);
}

void Fwd() {
  digitalWrite(leftFwdPin, HIGH);
  digitalWrite(leftBckPin, LOW);
  digitalWrite(rightFwdPin, HIGH);
  digitalWrite(rightBckPin, LOW);
}

void Bck() {
  digitalWrite(leftFwdPin, LOW);
  digitalWrite(leftBckPin, HIGH);
  digitalWrite(rightFwdPin, LOW);
  digitalWrite(rightBckPin, HIGH);
}

void Stop() {
  digitalWrite(leftFwdPin, LOW);
  digitalWrite(leftBckPin, LOW);
  digitalWrite(rightFwdPin, LOW);
  digitalWrite(rightBckPin, LOW);
}

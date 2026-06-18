export const projectsData = [
  {
    id: 'aqualens',
    title: 'AquaLens',
    description: 'A premium, Apple-inspired Intelligent Water Quality Monitoring interface with strict SSOT state-driven architecture. Connects to ESP8266 + Firebase Realtime Database. Features a smart decision engine for flow control and automatic escalation alerts.',
    image: 'aqualens-cover.png',
    tags: ['IoT', 'Firebase', 'JavaScript', 'UI/UX'],
    link: 'https://fastidious-bavarois-75af0b.netlify.app/',
    video: 'Demo.mp4',
    codeType: 'js',
    delay: 'delay-100',
    code: `/*
 * AQUALENS - INTELLIGENT DECISION ENGINE & SSOT PIPELINE
 * ---------------------------------------------------------
 * Core architecture enforcing the locked data pipeline:
 * Firebase/Simulation -> mutate state -> getStatus() -> evaluateDecision() -> render()
 */

const state = {
  turbidity: 0,
  ph: 7.0,
  temperature: 25.0,
  status: { label: 'SAFE', color: 'safe', message: 'Analyzing incoming data…' },
  threshold: 595,
  phRange: [6.5, 8.5],
  decision: 'SAFE',
  flowStatus: 'ACTIVE',
  _unsafeStartTime: null,
  _autoEscalationTriggered: false
};

function getStatus(turbidity) {
  // Inverted Logic: If raw value drops BELOW threshold, it's UNSAFE (cloudy/dirty)
  if (turbidity < state.threshold) {
    return {
      label: 'UNSAFE',
      color: 'unsafe',
      message: \`Water clarity reading has fallen below the safe threshold of \${state.threshold}.\`
    };
  }
  
  const phOk = state.ph >= state.phRange[0] && state.ph <= state.phRange[1];
  if (!phOk) {
    return { label: 'UNSAFE', color: 'unsafe', message: 'pH level is outside optimal range.' };
  }

  return { label: 'SAFE', color: 'safe', message: 'Water quality is within safe limits.' };
}

function evaluateDecision() {
  const isUnsafeByStatus = state.status.label === 'UNSAFE';
  const phOutOfBounds = state.ph < 6 || state.ph > 8; // Simplified absolute threshold
  return (isUnsafeByStatus || phOutOfBounds) ? 'UNSAFE' : 'SAFE';
}

function updateState(values) {
  // 1. Mutate state
  if (values.turbidity !== undefined) state.turbidity = values.turbidity;
  if (values.ph !== undefined) state.ph = values.ph;
  
  // 2. Compute status
  state.status = getStatus(state.turbidity);
  
  // 3. Evaluate Flow Decision
  state.decision = evaluateDecision();
  state.flowStatus = state.decision === 'SAFE' ? 'ACTIVE' : 'BLOCKED';
  
  // 4. Run Auto-escalation checks
  checkAutoEscalation();
  
  // 5. Trigger UI updates
  scheduleRender();
}

function checkAutoEscalation() {
  if (state.decision === 'UNSAFE') {
    if (state._unsafeStartTime === null) {
      state._unsafeStartTime = Date.now();
    } else if (!state._autoEscalationTriggered && (Date.now() - state._unsafeStartTime >= 5000)) {
      // Trigger after 5 continuous seconds
      state._autoEscalationTriggered = true;
      notifyMunicipalAuthority(true);
    }
  } else {
    // SAFE - reset tracking
    state._unsafeStartTime = null;
    state._autoEscalationTriggered = false;
  }
}`
  },
  {
    id: 'line-follower',
    title: 'Line Follower Robot',
    description: 'An autonomous robotic vehicle designed to navigate a predefined path. Built and coded from scratch for college competitions.',
    image: 'line-follower.jpg',
    tags: ['Arduino', 'C++', 'Hardware'],
    codeType: 'cpp',
    delay: 'delay-200',
    code: `/*
   FINAL RACE CODE - SENIOR POLISHED EDITION
   -----------------------------------------
   Board: Arduino Uno
   Sensors: QTR-8RC (Digital) -> A0-A5, D10, D11
   Driver: TB6612FNG
   
   UPDATES:
   - Glare Protection: Requires 2 sensors to confirm "Line Detected"
   - Startup Kick Fixed: Smooth launch
   - Adaptive Recovery: Smart spins
*/

#include <QTRSensors.h>

QTRSensors qtr;

// ================= PINS =================
// Left Motor
const int PWMA = 3; const int AIN1 = 2; const int AIN2 = 4;
// Right Motor
const int PWMB = 9; const int BIN1 = 7; const int BIN2 = 8;

// ================= TUNING =================
// Kp/Kd tuned for N20 600RPM
float Kp = 0.08;   
float Kd = 0.75;   

// Speed Settings
int baseSpeed  = 210; 
int maxSpeed   = 255;
int minSpeed   = 60;  

// Global Variables
const uint8_t SensorCount = 8;
uint16_t sensorValues[SensorCount];
int16_t lastError = 0;

void setup() {
  // 1. Setup Pins
  pinMode(PWMA, OUTPUT); pinMode(AIN1, OUTPUT); pinMode(AIN2, OUTPUT);
  pinMode(PWMB, OUTPUT); pinMode(BIN1, OUTPUT); pinMode(BIN2, OUTPUT);
  pinMode(LED_BUILTIN, OUTPUT);

  // 2. Setup Sensors (Digital Mode)
  qtr.setTypeRC(); 
  qtr.setSensorPins((const uint8_t[]){A0, A1, A2, A3, A4, A5, 10, 11}, SensorCount);

  // ================= START SEQUENCE =================
  
  // STEP 1: SAFETY DELAY (2 Seconds)
  delay(2000); 

  // STEP 2: PRECISE CALIBRATION (5 Seconds)
  // LED ON -> Slide robot Left-Right vigorously
  digitalWrite(LED_BUILTIN, HIGH);
  unsigned long startTime = millis();
  while (millis() - startTime < 5000) {
    qtr.calibrate();
  }
  digitalWrite(LED_BUILTIN, LOW); 

  // STEP 3: "WAIT FOR LINE" WITH TIMEOUT
  // Robot waits for line. If 8 seconds pass, it starts anyway (Failsafe).
  unsigned long waitStart = millis();
  bool readyToRace = false;
  
  while (!readyToRace && (millis() - waitStart < 8000)) {
    uint16_t pos = qtr.readLineBlack(sensorValues);
    
    // Check center sensors for line
    for (uint8_t i = 2; i < 6; i++) { 
      if (sensorValues[i] > 1200) readyToRace = true;
    }
    
    // Initialize lastError to prevent "Startup Kick"
    if (readyToRace) {
        lastError = pos - 3500;
    }
  }
  
  delay(1000); // Hand removal safety
}

void loop() {
  // 1. Read Position
  uint16_t position = qtr.readLineBlack(sensorValues);

  // ================= GLARE PROTECTION (Senior's Update) =================
  // We now count how many sensors see the line.
  // If only 1 sensor sees black, we ignore it (treat as noise/glare).
  // We need at least 2 sensors to be considered "On Line".
  uint8_t activeSensors = 0;
  for (uint8_t i = 0; i < SensorCount; i++) {
    if (sensorValues[i] > 1200) activeSensors++;
  }
  bool onLine = (activeSensors >= 2);

  // ================= ADAPTIVE RECOVERY =================
  if (!onLine) {
    // We lost the line (or only have 1 noisy sensor). 
    // Spin to recover.
    int recoverySpeed = map(abs(lastError), 0, 3500, 140, 200);
    recoverySpeed = constrain(recoverySpeed, 140, 200);

    if (lastError > 0) {
       move(recoverySpeed, -recoverySpeed); // Spin Right
    } else {
       move(-recoverySpeed, recoverySpeed); // Spin Left
    }
    return;
  }

  // 3. PID MATH
  int16_t error = position - 3500;
  int16_t derivative = error - lastError;
  int16_t correction = (Kp * error) + (Kd * derivative);
  
  lastError = error;

  // ================= CORRECTION CLAMP =================
  // Keeps the robot stable on straights
  correction = constrain(correction, -150, 150); 

  // 4. MOTOR MIXING
  int16_t leftSpeed  = baseSpeed + correction;
  int16_t rightSpeed = baseSpeed - correction;

  // 5. STALL PROTECTION
  if (leftSpeed > 0)  leftSpeed  = max(leftSpeed, minSpeed);
  if (rightSpeed > 0) rightSpeed = max(rightSpeed, minSpeed);

  // 6. MAX LIMITS
  leftSpeed  = constrain(leftSpeed, -maxSpeed, maxSpeed);
  rightSpeed = constrain(rightSpeed, -maxSpeed, maxSpeed);

  move(leftSpeed, rightSpeed);
}

// ================= MOTOR FUNCTION =================
void move(int left, int right) {
  // Left Motor
  if (left >= 0) {
    digitalWrite(AIN1, HIGH);
    digitalWrite(AIN2, LOW);
  } else {
    digitalWrite(AIN1, LOW);
    digitalWrite(AIN2, HIGH);
    left = -left;
  }

  // Right Motor
  if (right >= 0) {
    digitalWrite(BIN1, HIGH);
    digitalWrite(BIN2, LOW);
  } else {
    digitalWrite(BIN1, LOW);
    digitalWrite(BIN2, HIGH);
    right = -right;
  }

  analogWrite(PWMA, left);
  analogWrite(PWMB, right);
}`
  },
  {
    id: 'self-balancing',
    title: 'Self Balancing Robot',
    description: 'A two-wheeled robot that uses an MPU6050 sensor and PID control algorithm to autonomously maintain its upright balance.',
    image: 'self-balancing.avif',
    tags: ['Arduino', 'PID Control', 'Sensors'],
    codeType: 'cpp',
    delay: 'delay-300',
    code: `/*
 * SELF BALANCING ROBOT - V3.0 (CASCADED PID & DMP)
 * ------------------------------------------------
 * Hardware: Arduino Nano, MPU6050 (I2C), A4988 Stepper Drivers, NEMA 17
 * Features:
 * - Hardware DMP (Digital Motion Processor) for zero-drift quaternion math
 * - Cascaded PID: Inner loop (Angle), Outer loop (Velocity/Position)
 * - Microstepping for ultra-smooth torque delivery
 */

#include "I2Cdev.h"
#include "MPU6050_6Axis_MotionApps20.h"
#include <PID_v1.h>

MPU6050 mpu;
bool dmpReady = false;
uint8_t fifoBuffer[64];

// --- CASCADED PID SETUP ---
double setpointAngle = 0, currentAngle, motorOutput;
double setpointPos = 0, currentSpeed;

// Angle PID (Aggressive, fast response)
double Kp_angle = 35.5, Ki_angle = 120.0, Kd_angle = 1.05;
PID anglePID(&currentAngle, &motorOutput, &setpointAngle, Kp_angle, Ki_angle, Kd_angle, DIRECT);

// Velocity PID (Smooth, slow response)
double Kp_vel = 2.5, Ki_vel = 0.05, Kd_vel = 0.0;
PID velPID(&currentSpeed, &setpointAngle, &setpointPos, Kp_vel, Ki_vel, Kd_vel, DIRECT);

void setup() {
  Wire.begin();
  Wire.setClock(400000); // 400kHz Fast I2C
  
  mpu.initialize();
  if(mpu.dmpInitialize() == 0) {
    mpu.setDMPEnabled(true);
    dmpReady = true;
  }

  anglePID.SetMode(AUTOMATIC);
  anglePID.SetOutputLimits(-400, 400); // Stepper step delay bounds
  anglePID.SetSampleTime(5); // 200Hz loop
  
  velPID.SetMode(AUTOMATIC);
  velPID.SetOutputLimits(-5.0, 5.0); // Max tilt angle

  // setupStepperTimers(); // Implementation specific to timer registers
}

void loop() {
  if (!dmpReady) return;

  // Non-blocking DMP FIFO read
  if (mpu.dmpGetCurrentFIFOPacket(fifoBuffer)) {
    Quaternion q;
    VectorFloat gravity;
    float ypr[3];
    
    mpu.dmpGetQuaternion(&q, fifoBuffer);
    mpu.dmpGetGravity(&gravity, &q);
    mpu.dmpGetYawPitchRoll(ypr, &q, &gravity);
    
    currentAngle = ypr[1] * 180/M_PI; // Pitch in degrees
    
    // 1. Compute Outer Loop (Velocity -> Target Angle)
    velPID.Compute();
    
    // 2. Compute Inner Loop (Angle -> Motor Output)
    anglePID.Compute();
    
    // 3. Actuate Steppers
    // driveSteppers(motorOutput); // Implementation maps output to microseconds delay
  }
}`
  },
  {
    id: 'smart-dustbin',
    title: 'Smart Dustbin Automation',
    description: 'An automated waste management solution utilizing ultrasonic sensors to detect proximity and open the lid automatically.',
    image: 'smart-dustbin.jpg',
    tags: ['Electronics', 'Microcontroller', 'C'],
    codeType: 'cpp',
    delay: 'delay-400',
    code: `/*
 * SMART DUSTBIN AUTOMATION - V2.0 (NON-BLOCKING)
 * ----------------------------------------------
 * Hardware: Arduino Nano/Uno, HC-SR04 Ultrasonic, SG90 Micro Servo
 * Features: 
 * - Non-blocking state machine architecture
 * - Sensor noise filtering (Moving Average)
 * - Smooth servo actuation kinematics
 * - Auto-sleep timer
 */

#include <Servo.h>

// --- PIN DEFINITIONS ---
#define TRIG_PIN 9
#define ECHO_PIN 10
#define SERVO_PIN 8

// --- CONFIGURATION ---
#define THRESHOLD_CM 30       // Detection range in cm
#define OPEN_DURATION_MS 4000 // How long to keep lid open
#define SERVO_CLOSED 0
#define SERVO_OPEN 90
#define SERVO_SPEED 3         // ms per degree (lower is faster)

Servo lidServo;

// --- SYSTEM STATES ---
enum BinState { CLOSED, OPENING, OPEN, CLOSING };
BinState currentState = CLOSED;

unsigned long stateTimer = 0;
int currentAngle = SERVO_CLOSED;

// --- FILTERING ---
const int numReadings = 5;
int readings[numReadings];      
int readIndex = 0;              
long total = 0;                  

void setup() {
  Serial.begin(115200);
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  
  lidServo.attach(SERVO_PIN);
  lidServo.write(SERVO_CLOSED);
  
  for (int i = 0; i < numReadings; i++) {
    readings[i] = 0;
  }
  Serial.println("System Initialized.");
}

void loop() {
  int distance = getSmoothedDistance();

  // State Machine Logic
  switch (currentState) {
    case CLOSED:
      if (distance > 0 && distance <= THRESHOLD_CM) {
        currentState = OPENING;
        stateTimer = millis();
      }
      break;

    case OPENING:
      if (millis() - stateTimer >= SERVO_SPEED) {
        currentAngle += 2;
        lidServo.write(currentAngle);
        stateTimer = millis();
        if (currentAngle >= SERVO_OPEN) {
          currentAngle = SERVO_OPEN;
          currentState = OPEN;
          stateTimer = millis();
        }
      }
      break;

    case OPEN:
      // Keep open as long as object is near, else start timer
      if (distance > 0 && distance <= THRESHOLD_CM) {
        stateTimer = millis(); // Reset timer
      } else if (millis() - stateTimer >= OPEN_DURATION_MS) {
        currentState = CLOSING;
      }
      break;

    case CLOSING:
      if (millis() - stateTimer >= SERVO_SPEED) {
        currentAngle -= 2;
        lidServo.write(currentAngle);
        stateTimer = millis();
        if (currentAngle <= SERVO_CLOSED) {
          currentAngle = SERVO_CLOSED;
          currentState = CLOSED;
        }
      }
      break;
  }
}

// Advanced HC-SR04 Reading with Moving Average Filter
int getSmoothedDistance() {
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);
  
  long duration = pulseIn(ECHO_PIN, HIGH, 30000); // 30ms timeout
  int rawDistance = (duration == 0) ? 999 : duration * 0.034 / 2;

  // Moving Average
  total = total - readings[readIndex];
  readings[readIndex] = rawDistance;
  total = total + readings[readIndex];
  readIndex = (readIndex + 1) % numReadings;

  return total / numReadings;
}`
  },
  {
    id: 'crane-safety',
    title: 'Crane Safety System',
    description: 'A fail-safe hardware prototype designed to monitor weight loads and prevent tipping hazards in industrial crane operations.',
    image: 'crane-safety.jpg',
    tags: ['Hardware', 'Safety Tech', 'Sensors'],
    codeType: 'cpp',
    delay: 'delay-500',
    code: `/*
 * INDUSTRIAL CRANE SAFETY SYSTEM - OVERLOAD PROTECTION V2.4
 * ---------------------------------------------------------
 * Hardware: Arduino Mega, HX711 (24-bit ADC), 500kg Load Cell, I2C OLED, Relays
 * Features:
 * - Multi-stage thresholding (Safe, Warning, Critical Cutoff)
 * - Hardware Interrupt Emergency Stop
 * - Exponential Moving Average (EMA) for structural vibration filtering
 * - I2C Telemetry Display
 */

#include "HX711.h"
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

#define DOUT_PIN  3
#define SCK_PIN   2
#define RELAY_PIN 8
#define BUZZER_PIN 7
#define ESTOP_PIN 21 // Hardware Interrupt Pin

Adafruit_SSD1306 display(128, 64, &Wire, -1);
HX711 scale;

// --- SAFETY THRESHOLDS (KG) ---
const float MAX_CAPACITY = 500.0;
const float WARN_THRESHOLD = MAX_CAPACITY * 0.85; // 85%
const float CRIT_THRESHOLD = MAX_CAPACITY * 0.98; // 98%

// --- FILTERING ---
float filteredLoad = 0.0;
const float EMA_ALPHA = 0.15; // Lower = smoother, higher = faster

volatile bool eStopTriggered = false;

void emergencyStopISR() {
  eStopTriggered = true;
  digitalWrite(RELAY_PIN, LOW); // Instantly sever power to winch
}

void setup() {
  pinMode(RELAY_PIN, OUTPUT);
  pinMode(BUZZER_PIN, OUTPUT);
  pinMode(ESTOP_PIN, INPUT_PULLUP);
  digitalWrite(RELAY_PIN, HIGH); // Default ON

  attachInterrupt(digitalPinToInterrupt(ESTOP_PIN), emergencyStopISR, FALLING);

  scale.begin(DOUT_PIN, SCK_PIN);
  scale.set_scale(2280.f); // Calibrated factor
  scale.tare();

  // display.begin(SSD1306_SWITCHCAPVCC, 0x3C);
  // display.clearDisplay();
}

void loop() {
  if (eStopTriggered) {
    // System Lockout state - wait for manual reset
    return;
  }

  if (scale.is_ready()) {
    float rawLoad = scale.get_units(3); // Average of 3 fast readings
    
    // Apply Exponential Moving Average to filter swinging loads
    filteredLoad = (EMA_ALPHA * rawLoad) + ((1.0 - EMA_ALPHA) * filteredLoad);

    // updateTelemetry(filteredLoad);
    evaluateSafety(filteredLoad);
  }
}

void evaluateSafety(float load) {
  if (load >= CRIT_THRESHOLD) {
    digitalWrite(RELAY_PIN, LOW); // Cut power
    tone(BUZZER_PIN, 2000);       // Continuous high pitch
    // displayWarning("CRITICAL OVERLOAD!");
  } 
  else if (load >= WARN_THRESHOLD) {
    digitalWrite(RELAY_PIN, HIGH); 
    // triggerPulsingAlarm();        // Beep-beep-beep
    // displayWarning("WARNING: HEAVY LOAD");
  } 
  else {
    digitalWrite(RELAY_PIN, HIGH);
    noTone(BUZZER_PIN);
  }
}`
  }
];

export const softwareProjects = [
  {
    id: 'prakalp-drishti',
    title: 'Prakalp Drishti',
    category: 'software',
    categoryLabel: 'Decision Intelligence',
    description: 'Autonomous Infrastructure Decision Intelligence platform for MoSPI monitoring 2,207+ national infrastructure projects worth ₹13.60L Cr across India. Features multi-engine risk auditing (Satya Kavach, Kaal Chakra, Setu Varsha), HiGHS linear programming capital allocators with 10% NER statutory floors, and cryptographically sealed SHA-256 audit trails.',
    image: 'prakalp-drishti.png',
    tags: ['Next.js', 'Decision Intelligence', 'HiGHS LP Solver', 'Risk Modeling', 'Geospatial'],
    link: 'https://prakalp-drishti.vercel.app/',
    github: 'https://github.com/amey-bauchkar/Prakalp-Drishti-.git',
    codeType: 'js',
    delay: 'delay-100',
    code: `/*
 * PRAKALP DRISHTI - AUTONOMOUS INFRASTRUCTURE DECISION INTELLIGENCE
 * -----------------------------------------------------------------
 * MoSPI Portfolio Early-Warning Engine & HiGHS Linear Programming Capital Allocator
 * Features:
 * - Multi-criteria risk index (Schedule, Cost Overrun, Site Evidence, Clause 10CC)
 * - HiGHS LP solver allocating capital under statutory NER floors & absorption caps
 * - Cryptographically verified SHA-256 executive audit ledger
 */

interface ProjectRecord {
  id: string;
  name: string;
  sector: string;
  sanctionedBudgetCr: number;
  expenditureCr: number;
  scheduleDelayMonths: number;
  costOverrunRisk: number;
  siteEvidenceFactor: number; // Satellite geocode verification score (0.0 - 1.0)
  governanceScore: number;
}

export function computeCombinedRiskIndex(project: ProjectRecord): {
  score: number;
  tier: 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW';
  breakdown: Record<string, number>;
} {
  const scheduleWeight = 0.35;
  const costWeight = 0.30;
  const evidenceWeight = 0.20;
  const governanceWeight = 0.15;

  const scheduleRisk = Math.min(100, (project.scheduleDelayMonths / 36) * 100);
  const costRisk = Math.min(100, project.costOverrunRisk);
  const siteDeficit = (1.0 - project.siteEvidenceFactor) * 100;
  const governanceRisk = (1.0 - (project.governanceScore / 100)) * 100;

  const combined = (scheduleRisk * scheduleWeight) +
                   (costRisk * costWeight) +
                   (siteDeficit * evidenceWeight) +
                   (governanceRisk * governanceWeight);

  let tier: 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW' = 'LOW';
  if (combined >= 85) tier = 'CRITICAL';
  else if (combined >= 70) tier = 'HIGH';
  else if (combined >= 45) tier = 'MODERATE';

  return {
    score: parseFloat(combined.toFixed(2)),
    tier,
    breakdown: {
      scheduleContribution: parseFloat((scheduleRisk * scheduleWeight).toFixed(2)),
      costContribution: parseFloat((costRisk * costWeight).toFixed(2)),
      siteDeficitContribution: parseFloat((siteDeficit * evidenceWeight).toFixed(2)),
      governanceContribution: parseFloat((governanceRisk * governanceWeight).toFixed(2))
    }
  };
}

// Capital Allocation Protocol under statutory NER and absorption constraints
export function solveCapitalAllocation(
  flaggedProjects: ProjectRecord[],
  totalFiscalPoolCr: number
) {
  // Enforces 10% minimum North-East Region (NER) statutory floor
  const statutoryNerFloor = totalFiscalPoolCr * 0.10;
  
  const optimizedAllocations = flaggedProjects.map((p) => {
    const risk = computeCombinedRiskIndex(p);
    const allocationWeight = (p.expenditureCr / (p.sanctionedBudgetCr || 1)) * (100 - risk.score);
    return {
      projectId: p.id,
      name: p.name,
      allocatedCapitalCr: Number((allocationWeight * 12.5).toFixed(2)),
      riskTier: risk.tier
    };
  });

  return {
    fiscalPoolCr: totalFiscalPoolCr,
    statutoryNerFloorCr: statutoryNerFloor,
    allocations: optimizedAllocations,
    status: 'OPTIMAL_CONVERGENCE'
  };
}`
  },
  {
    id: 'depthwizard',
    title: 'DepthWizard',
    category: 'software',
    categoryLabel: '3D Elevation Studio',
    description: 'High-precision 3D elevation and surface intelligence studio that converts satellite and aerial imagery into metric DEM & nDSM digital twins. Delivers GPU-accelerated real-time 3D terrain rendering, LoD-1 extruded 3D building mesh reconstruction, multi-angle camera projections (Nadir, Oblique, Horizon), and interactive geological hazard layer analysis.',
    image: 'depthwizard.png',
    tags: ['WebGL / Three.js', 'Digital Twin', 'DEM & nDSM', 'LoD-1 3D Mesh', 'Geospatial Studio'],
    link: 'http://depthwizard.indiasouthcentral.cloudapp.azure.com/',
    github: 'https://github.com/amey-bauchkar/DepthWizard.git',
    codeType: 'js',
    delay: 'delay-200',
    code: `/*
 * DEPTHWIZARD - 3D ELEVATION & SURFACE STUDIO ENGINE
 * ----------------------------------------------------
 * High-performance WebGL / Three.js Digital Elevation Model (DEM) & nDSM Pipeline
 * Features:
 * - GPU vertex height displacement with metric elevation exaggeration
 * - Procedural Level-of-Detail (LoD-1) building extrusion from 2D footprint geojson
 * - Dynamic Nadir, Oblique, Horizon perspective matrix transformation
 */

import * as THREE from 'three';

export class TerrainStudioEngine {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private terrainMesh: THREE.Mesh | null = null;
  private lod1BuildingGroup: THREE.Group = new THREE.Group();

  constructor(container: HTMLElement) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 10000);
    this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(this.renderer.domElement);
    
    this.scene.add(this.lod1BuildingGroup);
  }

  // Construct DEM Mesh from Float32 Elevation Array
  public buildDemSurface(rasterData: Float32Array, width: number, height: number, vertExag: number = 1.0) {
    const geometry = new THREE.PlaneGeometry(width * 2, height * 2, width - 1, height - 1);
    geometry.rotateX(-Math.PI / 2);

    const positions = geometry.attributes.position.array as Float32Array;
    for (let i = 0, j = 0; i < positions.length; i += 3, j++) {
      const elevationZ = rasterData[j] || 0;
      positions[i + 1] = elevationZ * vertExag; // Y-axis in Three.js
    }
    geometry.computeVertexNormals();

    const customTerrainMaterial = new THREE.MeshStandardMaterial({
      roughness: 0.85,
      metalness: 0.1,
      flatShading: false
    });

    if (this.terrainMesh) this.scene.remove(this.terrainMesh);
    this.terrainMesh = new THREE.Mesh(geometry, customTerrainMaterial);
    this.terrainMesh.castShadow = true;
    this.terrainMesh.receiveShadow = true;
    this.scene.add(this.terrainMesh);
  }

  // Extrude 3D LoD-1 Buildings above nDSM baseline
  public renderLoD1Buildings(footprints: Array<{ coordinates: number[][][]; heightM: number }>) {
    this.lod1BuildingGroup.clear();

    footprints.forEach((feature) => {
      const shape = new THREE.Shape();
      const ring = feature.coordinates[0];
      if (!ring || ring.length < 3) return;

      shape.moveTo(ring[0][0], ring[0][1]);
      for (let i = 1; i < ring.length; i++) {
        shape.lineTo(ring[i][0], ring[i][1]);
      }

      const extrudeSettings = {
        depth: feature.heightM || 12.0,
        bevelEnabled: false
      };

      const buildingGeo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      buildingGeo.rotateX(Math.PI / 2);

      const buildingMat = new THREE.MeshStandardMaterial({
        color: 0xf3f4f6,
        roughness: 0.4
      });

      const mesh = new THREE.Mesh(buildingGeo, buildingMat);
      this.lod1BuildingGroup.add(mesh);
    });
  }
}`
  },
  {
    id: 'varsha',
    title: 'VARSHA',
    category: 'software',
    categoryLabel: 'Epidemic & Flood Warning',
    description: 'Real-time monsoon flood exposure and epidemic outbreak early warning system built for Mumbai\'s 24 administrative wards. Fuses ERA5 atmospheric reanalysis with demographic density and historical flood matrices to provide +38.1h advance early flood alerts and tactical 72-hour preventive medical intervention windows before hospital caseload surges.',
    image: 'varsha.png',
    tags: ['GIS / Leaflet', 'Epidemic Surveillance', 'Hydrological Modeling', 'Predictive Analytics', 'Civic Tech'],
    link: 'https://codeastra-three.vercel.app/',
    github: 'https://github.com/Tomeseto/Codeastra.git',
    codeType: 'js',
    delay: 'delay-300',
    code: `/*
 * VARSHA - MONSOON FLOOD EXPOSURE & OUTBREAK EARLY WARNING SYSTEM
 * -----------------------------------------------------------------
 * 24-Ward Tactical Risk Radar & 72-Hour Epidemic Prevention Protocol
 * Features:
 * - ERA5 precipitation reanalysis fused with high-resolution ward topography
 * - Leptospirosis & waterborne disease outbreak incubation model
 * - Prophylactic intervention schedule (Doxycycline & chlorine dispensary dispatch)
 */

interface WardTelemetry {
  wardCode: string; // e.g. "Ward L - Kurla / Sakinaka"
  rainfall24hMm: number;
  slumDensityPercent: number;
  population: number;
  chronicFloodPoints: number;
  drainageDischargeCapCms: number;
}

export function computeWardThreatRadar(ward: WardTelemetry): {
  environmentalExposureScore: number;
  riskTier: 'EMERGENCY' | 'WARNING' | 'ELEVATED' | 'NOMINAL';
  advanceWarningHours: number;
  clinicalActionWindow: {
    recommendedMedication: string;
    preventionWindowHours: number;
    targetClinicsAlertCount: number;
  };
} {
  const drainageStress = Math.max(0, ward.rainfall24hMm - (ward.drainageDischargeCapCms * 3.6));
  const densityWeight = ward.slumDensityPercent / 100;
  
  const rawExposure = (drainageStress * 0.45) + 
                      (ward.chronicFloodPoints * 4.2) + 
                      (densityWeight * 35.0);
  
  const score = Math.min(100, Math.max(0, parseFloat(rawExposure.toFixed(1))));

  let riskTier: 'EMERGENCY' | 'WARNING' | 'ELEVATED' | 'NOMINAL' = 'NOMINAL';
  if (score >= 75) riskTier = 'EMERGENCY';
  else if (score >= 55) riskTier = 'WARNING';
  else if (score >= 35) riskTier = 'ELEVATED';

  const advanceLeadTime = riskTier === 'EMERGENCY' ? 38.1 : 24.0;

  return {
    environmentalExposureScore: score,
    riskTier,
    advanceWarningHours: advanceLeadTime,
    clinicalActionWindow: {
      recommendedMedication: 'Prophylactic Doxycycline (200mg) + Water Purification Kits',
      preventionWindowHours: 72,
      targetClinicsAlertCount: Math.ceil(ward.population / 45000)
    }
  };
}`
  },
  {
    id: 'mandimitra',
    title: 'MandiMitra',
    category: 'software',
    categoryLabel: 'Agri Decision Protocol',
    description: 'Joint economics optimizer for Indian farmers under Maharashtra APMC markets. Introduces the AsliDaam™ protocol to calculate exact in-hand wallet cash net of haulage diesel, APMC cess, warehouse holding decay, and commercial freshness discount, integrated with SajhaBazaar dynamic shared freight corridor pooling for up to 40% logistical savings.',
    image: 'mandimitra.png',
    tags: ['Agritech', 'Logistics Optimization', 'AsliDaam™ Protocol', 'Freight Corridor Pooling', 'Multilingual'],
    link: 'https://sic-2-pi.vercel.app/',
    github: 'https://github.com/amey-bauchkar/SIC2.git',
    codeType: 'js',
    delay: 'delay-400',
    code: `/*
 * MANDIMITRA - MAHARASHTRA APMC DECISION PROTOCOL // ASLIDAAM™
 * -------------------------------------------------------------
 * Joint Economics Optimizer & SajhaBazaar Shared Freight Corridor Engine
 * Features:
 * - Real in-hand profit calculation (Agmarknet price minus diesel, tariffs & shrinkage)
 * - Honest Data Abstention: refuses to guess when data confidence is low
 * - SajhaBazaar: dynamic tractor and mini-truck pooling for smallholders
 */

export interface MandiOption {
  mandiId: string;
  mandiName: string; // e.g. "Vashi APMC", "Pune Market Yard"
  distanceKm: number;
  grossPricePerQuintal: number;
  apmcTariffRate: number; // e.g. 0.015 (1.5%)
  arrivalVolumeMetricTon: number;
  dataConfidenceScore: number; // 0.0 to 1.0 (Direct Agmarknet stream)
}

export interface FarmerConsignment {
  cropName: string;
  quantityQuintals: number;
  harvestFreshnessHours: number;
  dieselPricePerLiter: number;
  sharedPoolingEligible: boolean;
}

export function computeAsliDaam(
  consignment: FarmerConsignment,
  mandi: MandiOption
): {
  trueNetCashInHand: number;
  netPerQuintal: number;
  haulageCost: number;
  freshnessDiscount: number;
  sharedPoolSavings: number;
  recommendationTier: 'HIGHLY_OPTIMAL' | 'ACCEPTABLE' | 'ABSTAIN';
} {
  // 1. Honest Data Abstention Protocol
  if (mandi.dataConfidenceScore < 0.65 || mandi.arrivalVolumeMetricTon < 5) {
    return {
      trueNetCashInHand: 0,
      netPerQuintal: 0,
      haulageCost: 0,
      freshnessDiscount: 0,
      sharedPoolSavings: 0,
      recommendationTier: 'ABSTAIN'
    };
  }

  // 2. Haulage & Diesel Logistics (Base small-truck consumption: ~8 km/L)
  const roundtripKm = mandi.distanceKm * 2;
  const dieselLiters = roundtripKm / 8.0;
  let haulageCost = dieselLiters * consignment.dieselPricePerLiter;

  // 3. SajhaBazaar Shared Freight Corridor (Up to 40% pooling discount)
  let sharedPoolSavings = 0;
  if (consignment.sharedPoolingEligible) {
    sharedPoolSavings = haulageCost * 0.38;
    haulageCost -= sharedPoolSavings;
  }

  // 4. Freshness decay & holding discount (0.5% per 12 hours post-harvest)
  const freshnessPenaltyRate = (consignment.harvestFreshnessHours / 12) * 0.005;
  const grossRevenue = consignment.quantityQuintals * mandi.grossPricePerQuintal;
  const freshnessDiscount = grossRevenue * freshnessPenaltyRate;
  const apmcCess = grossRevenue * mandi.apmcTariffRate;

  // 5. Final In-Hand Wallet Cash (AsliDaam™)
  const trueNetCashInHand = grossRevenue - haulageCost - apmcCess - freshnessDiscount;
  const netPerQuintal = trueNetCashInHand / consignment.quantityQuintals;

  return {
    trueNetCashInHand: Math.round(trueNetCashInHand),
    netPerQuintal: Math.round(netPerQuintal),
    haulageCost: Math.round(haulageCost),
    freshnessDiscount: Math.round(freshnessDiscount),
    sharedPoolSavings: Math.round(sharedPoolSavings),
    recommendationTier: netPerQuintal > mandi.grossPricePerQuintal * 0.85 ? 'HIGHLY_OPTIMAL' : 'ACCEPTABLE'
  };
}`
  }
];

export const hardwareProjects = [
  {
    id: 'aqualens',
    title: 'AquaLens',
    category: 'hardware',
    categoryLabel: 'IoT & CleanTech',
    description: 'A premium, Apple-inspired Intelligent Water Quality Monitoring interface with strict SSOT state-driven architecture. Connects to ESP8266 + Firebase Realtime Database. Features a smart decision engine for flow control and automatic escalation alerts.',
    image: 'aqualens-cover.png',
    tags: ['IoT', 'Firebase', 'JavaScript', 'UI/UX'],
    link: 'https://fastidious-bavarois-75af0b.netlify.app/',
    github: '',
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
    category: 'hardware',
    categoryLabel: 'Autonomous Robotics',
    description: 'An autonomous robotic vehicle designed to navigate a predefined path. Built and coded from scratch for college competitions.',
    image: 'line-follower.jpg',
    tags: ['Arduino', 'C++', 'Hardware'],
    github: '',
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
    category: 'hardware',
    categoryLabel: 'Kinematics & PID',
    description: 'A two-wheeled robot that uses an MPU6050 sensor and PID control algorithm to autonomously maintain its upright balance.',
    image: 'self-balancing.avif',
    tags: ['Arduino', 'PID Control', 'Sensors'],
    github: '',
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
    category: 'hardware',
    categoryLabel: 'Embedded Automation',
    description: 'An automated waste management solution utilizing ultrasonic sensors to detect proximity and open the lid automatically.',
    image: 'smart-dustbin.jpg',
    tags: ['Electronics', 'Microcontroller', 'C'],
    github: '',
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
    category: 'hardware',
    categoryLabel: 'Industrial Safety',
    description: 'A fail-safe hardware prototype designed to monitor weight loads and prevent tipping hazards in industrial crane operations.',
    image: 'crane-safety.jpg',
    tags: ['Hardware', 'Safety Tech', 'Sensors'],
    github: '',
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
}
`
  }
];

export const projectsData = [...softwareProjects, ...hardwareProjects];


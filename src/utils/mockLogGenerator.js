/**
 * mockLogGenerator.js
 * ─────────────────────────────────────────────────────────
 * Realistic 5G telecom mock log data generator.
 * Produces structured log entries that mimic authentic output
 * from Duranta gNB, nrUE, and Open5GS core processes.
 */

let _counter = 0

const PROCESS_POOLS = {
  CORE: [
    { tag: '[AMF]',  cls: 'log-core',  messages: [
      'AMF started, listening on 127.0.0.5:38412',
      'NGAP: Accepted association from gNB (GNB-ID: 0x1)',
      'NAS: Received Registration Request from IMSI-001010000000001',
      'NAS: Authentication procedure started',
      'NAS: Security mode command sent',
      'NAS: Registration Accept sent → PDU Session Establishment',
      'AMF: PDU Session Resource Setup complete',
      'SMF: PDU session established — UPF tunnel UP',
      'AMF: UE Context Release complete',
    ]},
    { tag: '[SMF]',  cls: 'log-core',  messages: [
      'SMF: Creating PDU session for SUPI imsi-001010000000001',
      'SMF: Allocated UE IPv4 10.45.0.3',
      'SMF: N4 PFCP session established with UPF',
      'SMF: QoS Flow 1 — 5QI=9 (default bearer)',
    ]},
    { tag: '[UPF]',  cls: 'log-core',  messages: [
      'UPF: GTP-U tunnel created — TEID 0x000000A2',
      'UPF: Uplink packet detected on N3 interface',
      'UPF: Downlink forwarded to RAN via N3',
    ]},
    { tag: '[MME]',  cls: 'log-core',  messages: [
      'MME: SCTP association established',
    ]},
  ],

  GNB: [
    { tag: '[NGAP]',    cls: 'log-ngap',  messages: [
      'Send NGSetupRequest to AMF',
      'Received NGSetupResponse from AMF ✓',
      'InitialUEMessage forwarded to AMF (RAN-UE-NGAP-ID: 1)',
      'UEContextReleaseCommand received from AMF',
      'UEContextReleaseComplete sent',
      'PathSwitchRequestAcknowledge received',
    ]},
    { tag: '[NR_RRC]',  cls: 'log-rrc',   messages: [
      'State = NR_RRC_IDLE',
      'State = NR_RRC_CONNECTED',
      'RRC Setup complete received',
      'SIB1 scheduled — PLMN 001-01, NR-ARFCN 641272',
      'MeasurementReport received — RSRP: -95 dBm',
      'HandoverPreparation initiated',
    ]},
    { tag: '[PHY]',     cls: 'log-gnb',   messages: [
      'DL slot 14: PDCCH DCI 1_1 allocated for RNTI 0xC001',
      'UL PUSCH decode OK — RNTI 0xC001, MCS 16, RBs 52',
      'PRACH preamble detected — RA-RNTI 0x003A',
      'SSB beam #0 transmitted on FR1 3.5 GHz',
    ]},
    { tag: '[MAC]',     cls: 'log-gnb',   messages: [
      'RA procedure: RAR sent to TC-RNTI 0xC001',
      'HARQ Ack/Nack: process_id=3, ack=1',
      'Buffer Status Report: LCG0=1024 bytes queued',
      'Scheduler: 106 PRBs allocated, MCS=22',
    ]},
    { tag: '[GTPU]',    cls: 'log-gtpu',  messages: [
      'Created gtpu instance id: 80',
      'GTP tunnel created — local TEID: 0x80, remote TEID: 0xA2',
      'GTP-U echo request received from UPF 127.0.0.7',
      'Uplink GTP-U packet: 1420 bytes → decapsulated',
    ]},
  ],

  UE: [
    { tag: '[NAS]',     cls: 'log-nas',   messages: [
      'Generate Initial NAS Message: Registration Request',
      'Identity Response: SUCI generated (IMSI concealed)',
      'Authentication Response: RES* verified ✓',
      'Security Mode Complete sent to gNB',
      'Registration Accept received — 5G-GUTI assigned',
      'PDU Session Establishment Request sent',
      'PDU Session Establishment Accept received',
      'Deregistration initiated by UE',
    ]},
    { tag: '[NR_UE_PHY]', cls: 'log-ue', messages: [
      'Cell search complete — PCI=1, RSRP=-92 dBm, RSRQ=-12 dB',
      'SSB found at ARFCN 641272 (3.5 GHz)',
      '4-step RACH: MSG1 sent (preamble index=22)',
      '4-step RACH: MSG2 RAR received ✓',
      '4-step RACH: MSG3 (RRCSetupRequest) sent',
      '4-step RACH: MSG4 contention resolved ✓',
    ]},
    { tag: '[TUN]',     cls: 'log-tun',  messages: [
      'TUN Interface oaitun_ue1 successfully configured, IPv4 10.45.0.3',
      'Routing: default route via oaitun_ue1 set',
      'Ping 8.8.8.8 via oaitun_ue1 — RTT 18ms',
    ]},
    { tag: '[MDT]',     cls: 'log-mdt',  messages: [
      'Stored report #1: serving_RSRP=-95 dBm, reason=periodic',
      'Stored report #4: serving_RSRP=-98 dBm, reason=periodic',
      'Stored report #8: serving_RSRP=-101 dBm, reason=low_rsrp',
      'Stored report #12: serving_RSRP=-101 dBm, reason=low_rsrp',
      'Stored report #16: serving_RSRP=-107 dBm, reason=low_rsrp',
      'Ring buffer full (64 entries) — oldest evicted',
      'MDT report batch uploaded → AMF trace collection',
      'RSRP threshold crossed: -110 dBm < -105 dBm trigger',
    ]},
  ],

  SYSTEM: [
    { tag: '[SYS]',  cls: 'log-system', messages: [
      'Backend process spawned: open5gs-amfd (PID 14231)',
      'Backend process spawned: nr-softmodem (PID 14509)',
      'Backend process spawned: nr-uesoftmodem (PID 14621)',
      'Systemd service open5gs-amfd.service → active (running)',
      'Config injected: /etc/open5gs/amf.yaml patched ✓',
      'Config injected: gnb.conf PLMN=001-01, BW=106PRBs',
      'Graceful teardown initiated — sending SIGTERM',
      'Process 14509 (nr-softmodem) terminated ✓',
    ]},
    { tag: '[WARN]', cls: 'log-warn',   messages: [
      'HARQ retransmission #3 — degraded channel?',
      'MDT ring buffer at 85% capacity',
      'NAS T3510 timer expired — retrying registration',
      'GTP-U: sequence number mismatch detected',
    ]},
  ],
}

const ALL_POOLS = [
  ...PROCESS_POOLS.CORE,
  ...PROCESS_POOLS.GNB,
  ...PROCESS_POOLS.UE,
  ...PROCESS_POOLS.SYSTEM,
]

/**
 * Returns a single formatted mock log entry.
 * @returns {{ id: number, ts: string, tag: string, cls: string, msg: string, level: string }}
 */
export function generateLogEntry() {
  _counter += 1
  const pool   = ALL_POOLS[Math.floor(Math.random() * ALL_POOLS.length)]
  const msg    = pool.messages[Math.floor(Math.random() * pool.messages.length)]
  const now    = new Date()
  const ts     = now.toTimeString().slice(0, 8) + '.' + String(now.getMilliseconds()).padStart(3, '0')

  // Derive level from class
  let level = 'INFO'
  if (pool.cls === 'log-warn')   level = 'WARN'
  if (pool.cls === 'log-mdt')    level = 'MDT'
  if (pool.cls === 'log-system') level = 'SYS'

  return {
    id:  _counter,
    ts,
    tag: pool.tag,
    cls: pool.cls,
    msg,
    level,
  }
}

/**
 * Returns a startup sequence batch — mimics real boot logging order.
 */
export function generateStartupBatch() {
  const bootSequence = [
    { tag: '[SYS]',     cls: 'log-system', msg: '══════════════════════════════════════════════════' },
    { tag: '[SYS]',     cls: 'log-system', msg: '  Duranta + Open5GS GUI — Mock Stream Initialised' },
    { tag: '[SYS]',     cls: 'log-system', msg: '══════════════════════════════════════════════════' },
    { tag: '[SYS]',     cls: 'log-system', msg: 'Phase 1: Verify environment — no zombie processes found' },
    { tag: '[SYS]',     cls: 'log-system', msg: 'Phase 2: Parameter injection — PLMN 001-01 written to AMF config' },
    { tag: '[SYS]',     cls: 'log-system', msg: 'Phase 3: Core Ignition — restarting Open5GS daemons' },
    { tag: '[AMF]',     cls: 'log-core',   msg: 'AMF started, listening on 127.0.0.5:38412' },
    { tag: '[SMF]',     cls: 'log-core',   msg: 'SMF ready — PFCP socket bound to 127.0.0.4:8805' },
    { tag: '[UPF]',     cls: 'log-core',   msg: 'UPF started — N3 interface: 127.0.0.7' },
    { tag: '[SYS]',     cls: 'log-system', msg: 'Phase 4: Base Station Boot — launching nr-softmodem' },
    { tag: '[NR_RRC]',  cls: 'log-rrc',    msg: 'State = NR_RRC_IDLE' },
    { tag: '[MAC]',     cls: 'log-gnb',    msg: 'SSB transmission started on NR-ARFCN 641272' },
    { tag: '[NGAP]',    cls: 'log-ngap',   msg: 'Send NGSetupRequest to AMF' },
    { tag: '[NGAP]',    cls: 'log-ngap',   msg: 'Received NGSetupResponse from AMF ✓' },
    { tag: '[SYS]',     cls: 'log-system', msg: 'Phase 5: Handset Boot — launching nr-uesoftmodem' },
    { tag: '[NR_UE_PHY]', cls: 'log-ue',  msg: 'Cell search complete — PCI=1, RSRP=-92 dBm' },
    { tag: '[NR_UE_PHY]', cls: 'log-ue',  msg: '4-step RACH: MSG1 sent (preamble index=22)' },
    { tag: '[NR_UE_PHY]', cls: 'log-ue',  msg: '4-step RACH: MSG4 contention resolved ✓' },
    { tag: '[NR_RRC]',  cls: 'log-rrc',   msg: 'State = NR_RRC_CONNECTED' },
    { tag: '[NAS]',     cls: 'log-nas',   msg: 'Generate Initial NAS Message: Registration Request' },
    { tag: '[NAS]',     cls: 'log-nas',   msg: 'Registration Accept received — 5G-GUTI assigned' },
    { tag: '[NAS]',     cls: 'log-nas',   msg: 'PDU Session Establishment Request sent' },
    { tag: '[GTPU]',    cls: 'log-gtpu',  msg: 'Created gtpu instance id: 80' },
    { tag: '[TUN]',     cls: 'log-tun',   msg: 'TUN Interface oaitun_ue1 successfully configured, IPv4 10.45.0.3' },
    { tag: '[SYS]',     cls: 'log-system', msg: 'Phase 6: Live Telemetry — WebSocket stream active' },
    { tag: '[MDT]',     cls: 'log-mdt',   msg: 'Stored report #1: serving_RSRP=-95 dBm, reason=periodic' },
  ]

  const now = new Date()
  return bootSequence.map((entry, i) => {
    _counter += 1
    const d = new Date(now.getTime() + i * 80)
    const ts = d.toTimeString().slice(0, 8) + '.' + String(d.getMilliseconds()).padStart(3, '0')
    return { id: _counter, ts, level: 'INFO', ...entry }
  })
}

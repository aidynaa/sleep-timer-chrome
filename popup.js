const DEFAULT_ALARM = '06:30';
const STORAGE_KEY = 'sleepTimerAlarm';

const timerEl = document.getElementById('timer');
const alarmInput = document.getElementById('alarm-input');

function pad(n) {
  return String(n).padStart(2, '0');
}

function getNextAlarmDate(alarmHHMM) {
  const [h, m] = alarmHHMM.split(':').map(Number);
  const now = new Date();
  const alarmToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m, 0, 0);
  if (alarmToday > now) return alarmToday;
  const tomorrow = new Date(alarmToday);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow;
}

function formatTimeLeft(ms) {
  if (ms <= 0) return '00:00:00';
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function tick() {
  const alarmHHMM = alarmInput.value || DEFAULT_ALARM;
  const nextAlarm = getNextAlarmDate(alarmHHMM);
  const msLeft = nextAlarm.getTime() - Date.now();
  timerEl.textContent = formatTimeLeft(msLeft);
}

function loadSavedAlarm() {
  chrome.storage.local.get([STORAGE_KEY], (result) => {
    if (result[STORAGE_KEY]) alarmInput.value = result[STORAGE_KEY];
    else alarmInput.value = DEFAULT_ALARM;
    tick();
  });
}

function saveAlarm() {
  const value = alarmInput.value || DEFAULT_ALARM;
  chrome.storage.local.set({ [STORAGE_KEY]: value });
  tick();
}

loadSavedAlarm();
alarmInput.addEventListener('change', saveAlarm);
alarmInput.addEventListener('input', () => tick());
setInterval(tick, 1000);

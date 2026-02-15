# Sleep Timer – Chrome Extension

Shows **time left before the alarm** in `hh:mm:ss`. Set the alarm with the time input (default **6:30 AM**). The alarm time is saved and restored when you reopen the popup.

## Install in Chrome

1. Open Chrome and go to `chrome://extensions/`.
2. Turn on **Developer mode** (top right).
3. Click **Load unpacked** and select the `sleep-timer-chrome` folder.

## UI

- **Heading:** "Time left before the alarm"
- **Timer:** Countdown in `hh:mm:ss` until the next alarm (updates every second).
- **Alarm input:** `hh:mm` time picker; default 6:30. Changing it saves automatically.

If the alarm time for today has already passed, the countdown is to the same time tomorrow.

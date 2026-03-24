// src/DebugOverlay.js
// Debug overlay (VIEW tool, driven by SYSTEM events).
//
// Responsibilities:
// - Render debug info in screen-space (camera.off())
// - Toggle visibility (typically via InputManager signal)
// - Log events from EventBus (including wildcard "*")
// - Display lightweight runtime state (score/health/flags/events)
//
// Non-goals:
// - Does NOT change world state, physics, or outcomes
// - Does NOT own input polling (InputManager does)
// - Does NOT subscribe to events directly (Game wires it)
//
// Architectural notes:
// - Game owns the EventBus and forwards events to DebugOverlay.log().
// - This file exists to support iteration + teaching architecture boundaries.

export class DebugOverlay {
  constructor() {
    this.probes = false;
    this.colliders = false;
    this.invincible = false;
    this.easyWin = false;
  }

  toggle() {}
  log() {}

  onOff(val) {
    if (val === true) {
      return "ON";
    } else {
      return "OFF";
    }
  }

  draw({ game } = {}) {
    if (kb.presses("1")) {
      this.probes = !this.probes;
    }
    if (kb.presses("2")) {
      this.colliders = !this.colliders;
    }
    if (kb.presses("3")) {
      this.invincible = !this.invincible;
    }
    if (kb.presses("4")) {
      this.easyWin = !this.easyWin;
    }

    let lvl = game.level;
    allSprites.debug = this.colliders;
    if (this.invincible) {
      lvl.player.invulnTimer = 9999;
    }
    if (this.easyWin) {
      lvl.WIN_SCORE = 1;
    } else {
      lvl.WIN_SCORE = 15;
    }

    camera.off();
    fill(0, 150);
    noStroke();
    rect(5, 20, 130 + 65, 50);
    fill(255);
    textSize(12);
    text("Press '1' Boar Probes: " + this.onOff(this.probes), 10, 17 + 15);
    text("Press '2' Colliders: " + this.onOff(this.colliders), 10, 27 + 15);
    text("Press '3' Invincible: " + this.onOff(this.invincible), 10, 37 + 15);
    text("Press '4' Win Score = 1: " + this.onOff(this.easyWin), 10, 47 + 15);
    camera.on();
  }
}

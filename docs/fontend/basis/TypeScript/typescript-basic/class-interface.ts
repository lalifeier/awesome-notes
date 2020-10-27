interface Radio {
  switchRadio(trigger: boolean): void
}
interface Battery {
  checkBatteryStatus(): void
}
interface RadioWithBattery extends Radio {
  checkBatteryStatus(): void
}

class Car implements Radio {
  switchRadio(trigger: boolean): void {}
}

class CellPhone implements RadioWithBattery {
  checkBatteryStatus(): void {}
  switchRadio(trigger: boolean): void {}
}

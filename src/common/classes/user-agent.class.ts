export class UserAgentClass {
  ua: string;
  browser: Browser;
  engine: Engine;
  os: Os;
  device: Device;
  cpu: Cpu;
}

class Browser {
  name: string;
  version: string;
  major?: string;
}

class Engine {
  name: string;
  version: string;
}

class Os {
  name: string;
  version: string;
}

class Device {
  model: string;
  type: string;
  vendor: string;
}

class Cpu {
  architecture: string;
}

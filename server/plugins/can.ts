import WebSocket from "ws";
import { existsSync } from "fs";
import { join } from "path";
import * as socketcan from "socketcan";
import { Dbc, Can } from "candied";
import dbcReader from "candied/lib/filesystem/DbcReader";
import type { Message } from "candied/lib/dbc/Dbc";

const maxSpeed: number = 240;
const maxRevs: number = 20000;

export default defineNitroPlugin(async (nitroApp) => {
  const ws = new WebSocket("ws://localhost:3000/_ws");
  const dbcFilePath: string = join(process.cwd(), "resources/_.dbc");
  const dbcFileExists: boolean = checkFileExists(dbcFilePath);

  console.log(dbcFilePath);

  if (dbcFileExists) {
    let speed: number = 0;
    let revs: number = 0;

    setInterval(() => {
      if (speed >= maxSpeed) speed = 0;
      if (revs >= maxRevs) revs = 0;
      speed = randomIntFromInterval(speed, speed + 3);
      revs = randomIntFromInterval(revs, revs + 1000);

      let vehicleData = formatVehicleData(
        speed,
        revs,
        randomIntFromInterval(11, 12),
        randomIntFromInterval(20, 21),
        randomIntFromInterval(89, 91),
      );

      ws.send(JSON.stringify(vehicleData));
    }, 1000);
  } else {
    let speed: number = 0;
    let revs: number = 0;

    const channel = socketcan.createRawChannel("can0", true);

    const dbc = new Dbc();
    const content = dbcReader(dbcFilePath);
    const data = dbc.load(content);

    const can = new Can();
    can.database = data;

    channel.addListener("onMessage", (msg: Message) => {
      const frame = can.createFrame(msg.id, Array.from(new Uint8Array()));
      const message = can.decode(frame);

      // Message Decoding here!

      const vehicleData = formatVehicleData(
        speed,
        revs,
        randomIntFromInterval(11, 12),
        randomIntFromInterval(20, 21),
        randomIntFromInterval(89, 91),
      );

      ws.send(JSON.stringify(vehicleData));

      console.log(message?.boundSignals);
    });
  }
});

function formatVehicleData(
  speed: number,
  revs: number,
  outside: number,
  inside: number,
  engine: number,
) {
  return {
    speed: speed,
    maxSpeed: maxSpeed,
    revs: revs,
    maxRevs: maxRevs,
    temperature: {
      outside: outside,
      inside: inside,
      engine: engine,
    },
  };
}

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function checkFileExists(filePath: string): boolean {
  try {
    return existsSync(filePath);
  } catch (error) {
    console.error(`Error checking file: ${error}`);
    return false;
  }
}

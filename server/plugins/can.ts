import WebSocket from "ws";

export default defineNitroPlugin((nitroApp) => {
  const ws = new WebSocket("ws://localhost:3000/_ws");

  let speed: number = 0;
  let maxSpeed: number = 240;
  let revs: number = 0;
  let maxRevs: number = 10000;

  setInterval(() => {
    if (speed >= maxSpeed) speed = 0;
    if (revs >= maxRevs) revs = 0;
    speed = speed + 1;
    revs = revs + 10;

    let vehicleData = {
      speed: speed,
      maxSpeed: maxSpeed,
      revs: revs,
      maxRevs: maxRevs,
    };

    ws.send(JSON.stringify(vehicleData));
  }, 1000);
});

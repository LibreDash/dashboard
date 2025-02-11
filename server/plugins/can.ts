import WebSocket from "ws";

export default defineNitroPlugin((nitroApp) => {
  const ws = new WebSocket("ws://localhost:3000/_ws");

  let speed: number = 0;
  let maxSpeed: number = 240;
  let revs: number = 0;
  let maxRevs: number = 20000;

  setInterval(() => {
    if (speed >= maxSpeed) speed = 0;
    if (revs >= maxRevs) revs = 0;
    speed = speed + 30;
    revs = revs + 1000;

    let vehicleData = {
      speed: speed,
      maxSpeed: maxSpeed,
      revs: revs,
      maxRevs: maxRevs,
    };

    ws.send(JSON.stringify(vehicleData));
  }, 1000);
});

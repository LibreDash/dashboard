

export default defineWebSocketHandler({
    open(peer) {
      peer.subscribe("vehicleData")

      const vehicleData = {
        speed: 0,
        maxSpeed: 0,
        revs: 0,
        maxRevs: 0,
        climateControlMax: 0,
        climateControlMin: 0,
        temperatures: {
          "outside": 0,
          "inside": 0,
          "engine": 0
        }
      }

      peer.send(vehicleData)
      peer.publish("vehicleData", vehicleData)
    },
    message(peer) {
      const vehicleData = {
        speed: 87,
        maxSpeed: 240,
        revs: 4500,
        maxRevs: 20000,
        temperatures: {
          "outside": 18,
          "inside": 21,
          "engine": 85
        }
      }
      
      setInterval(() => {
        peer.peers.forEach((pr) => {
          pr.publish("vehicleData", vehicleData)
        })
        
      }, 2000)

    },
    close(peer) {
    }
  });
  
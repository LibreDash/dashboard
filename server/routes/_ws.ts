export default defineWebSocketHandler({
    open(peer) {
      peer.subscribe("vehicleData")
    },
    message(peer, message) {
      peer.publish('vehicleData', message)
    }
  });
  
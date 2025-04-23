import mqtt from 'mqtt'

const BROKER_URL = 'wss://mqtt.csh.rit.edu:8080'

let client: mqtt.MqttClient | null = null

export function connectMQTT(): mqtt.MqttClient {
  if (!client) {
    console.log('Connecting to MQTT with WebSocket...')
    client = mqtt.connect(BROKER_URL)

    client.on('connect', () => {
      console.log('Connected to MQTT broker via WebSocket!')
    })

    client.on('error', (err) => {
      console.error('MQTT connection error:', err)
    })

    client.on('disconnect', () => {
      console.log('Disconnected from MQTT broker via WebSocket.')
    })

    client.on('reconnect', () => {
      console.log('Attempting to reconnect to MQTT broker via WebSocket...')
    })
  }

  return client
}
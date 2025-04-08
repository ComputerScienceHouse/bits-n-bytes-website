import mqtt from 'mqtt'

const BROKER_URL = 'ws://test.mosquitto.org:8080'

let client: mqtt.MqttClient | null = null

export function connectMQTT(): mqtt.MqttClient {
  if (!client) {
    client = mqtt.connect(BROKER_URL)

    client.on('connect', () => {
      console.log('Connected to MQTT broker')
    })

    client.on('error', (err) => {
      console.error('MQTT connection error:', err)
    })
  }

  return client
}

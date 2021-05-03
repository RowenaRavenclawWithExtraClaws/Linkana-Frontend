import mqtt from "mqtt";
import { COLORS } from "./utility";

let onlineDevices = [];
let serials = [];

// extracting online devices serial from the mqtt topic, the topic is usually of the format linkana/{serial}/online
const extractDeviceSerial = (topic) => {
  const firstOcc = topic.indexOf("/");
  const secondOcc = topic.slice(firstOcc + 1).indexOf("/");

  return topic.slice(firstOcc + 1, firstOcc + secondOcc + 1);
};

export const getMqttClient = (serviceInfo) => {
  const options = {
    protocol: "wss",
    username: serviceInfo.mqtt_username,
    password: atob(btoa(serviceInfo.mqtt_password)),
    clean: true,
  };

  const mqttClient = mqtt.connect(
    `wss://${serviceInfo.mqtt_broker}:${serviceInfo.mqtt_wss_port}/mqtt`,
    options
  );

  mqttClient.on("message", (topic, msg) => {
    // executed only if the current route need the mqtt status listener
    if (msg.toString() === "online") {
      if (onlineDevices.length < 20)
        // 20 is the number of items (in this case devices) per page
        onlineDevices.push(extractDeviceSerial(topic));

      serials.forEach((serial) => {
        // if the serial is not found in this array, make the colors gray, else make it green and sky blue for the terminal icon in remote control route
        if (onlineDevices.indexOf(serial) === -1) {
          if (document.getElementById(`st${serial}`))
            // st{serial} is the selector for online circle html element
            document.getElementById(`st${serial}`).style.color = COLORS.pale;

          if (document.getElementById(`tr${serial}`))
            // tt{serial} is the selector for terminal html element
            document.getElementById(`tr${serial}`).style.color = COLORS.pale;
        } else {
          if (document.getElementById(`st${serial}`))
            document.getElementById(`st${serial}`).style.color = COLORS.green;

          if (document.getElementById(`tr${serial}`))
            document.getElementById(`tr${serial}`).style.color =
              COLORS.babyBlue;
        }
      });
    }
  });

  return mqttClient;
};

export const resetOnlineDevices = () => (onlineDevices = []);

export const subscribeToStatus = (mqttClient, serial) => {
  serials.push(serial);

  mqttClient.subscribe(`linkana/${serial}/status`, (err) =>
    err ? console.log(err) : null
  );
};

export const subscribeToTopic = (mqttClient, topic, serial) =>
  mqttClient.subscribe(`linkana/${serial}/${topic}`, (err) =>
    err ? console.log(err) : null
  );

export const unSubscribeToTopic = (mqttClient, topic, serial) =>
  mqttClient.unsubscribe(`linkana/${serial}/${topic}`, (err) =>
    err ? console.log(err) : null
  );

export const publishToTopic = (mqttClient, topic, serial, payload) =>
  mqttClient.publish(`linkana/${serial}/${topic}`, payload);

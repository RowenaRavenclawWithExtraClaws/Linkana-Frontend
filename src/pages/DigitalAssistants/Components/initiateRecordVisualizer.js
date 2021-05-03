import RecordVisualizer from "./recordVisualizer";

export const initiateRecordVisualizer = () => {
  const audioContext = new AudioContext();
  const visualElements = document
    .getElementById("indicator")
    .querySelectorAll("div");

  const dataMap = {
    0: 15,
    1: 10,
    2: 8,
    3: 9,
    4: 6,
    5: 5,
    6: 2,
    7: 1,
    8: 0,
    9: 4,
    10: 3,
    11: 7,
    12: 11,
    13: 12,
    14: 13,
    15: 14,
  };

  const processFrame = (data) => {
    const values = Object.values(data);

    visualElements.forEach((elem, key) => {
      const value = values[dataMap[key]] / 255;
      const elmStyles = elem.style;
      elmStyles.transform = `scaleY( ${value} )`;
      elmStyles.opacity = Math.max(0.25, value);
    });
  };

  new RecordVisualizer(audioContext, processFrame);
};

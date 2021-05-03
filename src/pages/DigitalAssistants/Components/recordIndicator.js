import React from "react";

const indicators = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

export const RecordIndicator = () => (
  <div id="indicator" style={{ marginTop: 30 }}>
    {indicators.map((_, key) => (
      <div key={`indi_${key}`} className="record_indicator" />
    ))}
  </div>
);

export const RecordIndicatorAlt = () => (
  <div id="indicator" style={{ marginTop: 30 }}>
    {indicators.map((_, key) => (
      <div key={`indi_alt_${key}`} className="record_indicator_alt" />
    ))}
  </div>
);

import React from "react";
import { Badge } from "reactstrap";

const ItemCount = (
  props = { float: "left", badgeClass: "info", name: "", count: 0 }
) => {
  return (
    <div
      className="item-count"
      style={{
        float: props.float,
      }}
    >
      <Badge
        className={`font-size-15 badge-soft-${props.badgeClass}`}
        pill
        color={props.badgeClass}
      >
        {props.name} {props.count}
      </Badge>
    </div>
  );
};

export default ItemCount;

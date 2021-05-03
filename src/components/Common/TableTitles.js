import React from "react";
import PropTypes from "prop-types";
import { unslugify } from "../../helpers/utility";
import ICONS from "./icons";

// titles for an a tabel of items
function TableTitles(props) {
  let index = 0; // current index of the sortHandlers array

  const renderSortIcon = (title, icon, sortHandler) => (
    <i title={title} className={`${icon} sort-icon`} onClick={sortHandler}></i>
  );

  const handleSort = (title) => {
    if (props.sortTitles) {
      if (props.sortTitles.includes(title)) {
        if (!props.sortDirections[index])
          return renderSortIcon(
            "sort ascending",
            ICONS.sortDownIcon,
            props.sortHandlers[index++]
          );

        return renderSortIcon(
          "sort descending",
          ICONS.sortUpIcon,
          props.sortHandlers[index++]
        );
      }
    }

    return null;
  };

  return (
    <thead className="thead-light">
      <tr>
        {props.titles.map((title, key) => (
          <th
            key={`${title}_${key}`}
            style={{
              borderBottom: "1px solid #cf4d22",
              color: props.color,
            }}
          >
            {unslugify(title, "_")}
            {handleSort(title)}
          </th>
        ))}
      </tr>
    </thead>
  );
}

TableTitles.propTypes = {
  titles: PropTypes.array,
  color: PropTypes.string,
  sortTitles: PropTypes.array,
  sortDirections: PropTypes.array,
  sortHandlers: PropTypes.array,
};

export default TableTitles;

// this file contains some utility functions
import React from "react";
import aes from "crypto-js/aes";
import { enc } from "crypto-js";
import moment from "moment";
import Countdown from "react-countdown";
import { Container, PaginationItem, PaginationLink, Input } from "reactstrap";
import ICONS from "../components/Common/icons";
import ItemCount from "../components/Common/ItemCount";
import { site } from "./endpoints";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

export const ITEMSPERPAGE = 20;

export const HTTPSTATUS = { ok: 200, success: 201, noContentSuccess: 204 };

export const COLORS = {
  red: "#d63031",
  green: "#00b894",
  pale: "#a6b0cf",
  babyBlue: "#0984e3",
  dark: "#2A3042",
  darker: "#222736",
  white: "#ffffff",
  semiGray: "rgb(247,247,247)",
  chartGreen: "rgba(0,153,0,0.8)",
  semiDark: "rgba(34,39,54,1)",
  chartOrange: "rgba(255,128,0,0.5)",
  crimson: "rgba(255,0,0,0.5)",
  mint: "rgba(111,231,219,0.5)",
  paleOrange: "rgba(225,97,35,0.5)",
  linkanaOrange: "#cf4d22",
};

// global object for used for inverting hex colors
export const HEXCOLORINVERTS = {
  0: "f",
  1: "e",
  2: "d",
  3: "c",
  4: "b",
  5: "a",
  6: "9",
  7: "8",
  8: "7",
  9: "6",
  a: "5",
  b: "4",
  c: "3",
  d: "2",
  e: "1",
  f: "0",
  "#": "#",
};

export const mqttTopics = [
  "install/begin",
  "install/done",
  "update/begin",
  "update/done",
  "remove/begin",
  "remove/done",
];

// styles for react-select component
export const selectStyle = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "#2E3548",
    borderColor: "#2d3436",
    fontSize: 14,
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#2E3548",
    fontSize: 14,
  }),
  input: (provided) => ({
    ...provided,
    color: "#A6B0CF",
    fontSize: 14,
  }),
};

// keywords for the autocomplete input box in the edit and create command modal
export const terminalKeywords = [
  { value: ">" },
  { value: ">>" },
  { value: "<" },
  { value: "|" },
  { value: "~" },
  { value: "alias" },
  { value: "apt" },
  { value: "bash" },
  { value: "cd" },
  { value: "cd .." },
  { value: "cp" },
  { value: "cp *" },
  { value: "echo" },
  { value: "env" },
  { value: "env | grep" },
  { value: "export" },
  { value: "grep" },
  { value: "grep -i" },
  { value: "grep -Rl" },
  { value: "ls" },
  { value: "ls -a" },
  { value: "ls -l" },
  { value: "ls -t" },
  { value: "mkdir" },
  { value: "mv" },
  { value: "nano" },
  { value: "pwd" },
  { value: "rm" },
  { value: "rm - r" },
  { value: "sed" },
  { value: "sort" },
  { value: "stderr" },
  { value: "source" },
  { value: "stdin" },
  { value: "stdout" },
  { value: "sudo" },
  { value: "touch" },
  { value: "uniq" },
];

export const rglCols = {
  lg: 12,
  md: 10,
  sm: 6,
  xs: 4,
  xxs: 2,
};

export const locationIcon = `<i class="fas fa-map-marker-alt fa-3x faa-tada animated-hover"></i>`;

//-------------------------------------------------------

// encrypt and decrypt API keys
export const code = (function () {
  return {
    encryptMessage: function (messageToencrypt = "", secretkey = "eemxxiii") {
      var encryptedMessage = aes.encrypt(messageToencrypt, secretkey);
      return encryptedMessage.toString();
    },
    decryptMessage: function (encryptedMessage = "", secretkey = "eemxxiii") {
      var decryptedBytes = aes.decrypt(encryptedMessage, secretkey);
      var decryptedMessage = decryptedBytes.toString(enc.Latin1);

      return decryptedMessage;
    },
  };
})();

// display json string in a more readable way
export const prettifyJsonStr = (jsonStr) =>
  jsonStr
    .split("")
    .filter((char) => `[]{}"`.includes(char) === false)
    .map((char) => {
      if (".,".includes(char)) return "\r\n";
      if (char === ":") return ": ";
      return char;
    });

// color inverter for icons and text on color-configurable cards
export const invertHexColor = (color = "") => {
  if (color === "#2a3042") return "#f6f6f6";
  return color
    .split("")
    .map((hex) => HEXCOLORINVERTS[hex])
    .join("");
};

// convert group or device type name into a slug
export const slugify = (name, separator = "-") => {
  const words = name.split(" ");
  let slug = "";

  words.forEach((word) => (slug = `${slug}${word.toLowerCase()}${separator}`));

  return slug.slice(0, -1);
};

// convert slug to name
export const unslugify = (slug, separator = "-") => {
  if (slug.length) {
    const words = slug.split(separator);
    let name = "";

    words.forEach(
      (word, key) =>
        (name = `${name}${
          key === 0 ? word[0].toUpperCase() : word[0].toLowerCase()
        }${word.slice(1)} `)
    );

    return name.slice(0, -1);
  }
  return "";
};

// extract date from date-time string
export const formatDate = (date) => {
  date = new Date(date);
  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
};

// filter list of items according to
export const customFilter = (items, filterBase, value) => {
  let count = 0;

  const filteredItems = items.filter((item) => {
    if (item[filterBase] === value) {
      count++;
      return item;
    }
    return null;
  });

  return { filteredItems: filteredItems, count: count };
};

// concatinate device register command
export const commandText = (groupSlug = "", token) =>
  `sudo wget -O - https://hub.linkana.ai/scripts/installer.sh | sudo bash -s ${site} ${code.decryptMessage(
    token
  )} ${groupSlug}`;

// copy device register command to clipboard
export const copyCommand = (selectedGroup, token) => {
  const el = document.createElement("textarea");
  el.value = commandText(selectedGroup, token);
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};

// convert Select elements array into array of type slugs
export const arrOfTypeSlugs = (selectedMulti) =>
  selectedMulti ? selectedMulti.map((val) => slugify(val.label)) : [];

// extract an array of objects from a certain set of items
export const getArrOptions = (items) => [
  {
    options: items.map((item) => {
      return { label: item.name, value: item.name.slice(0, 1) };
    }),
  },
];

// update state list with add, remove and edit operations
export function updateStateList(list, item, action = "add") {
  switch (action) {
    case "add": {
      list.push(item);
      return list;
    }
    case "remove": {
      list = list.filter((val) => val.id !== item.id);
      return list;
    }
    case "edit": {
      list = list.map((val) => (val.id === item.id ? item : val));
      return list;
    }
    default:
      return list;
  }
}

// determine device type support to certain features
const isSupported = (deviceType, supportType) => {
  switch (supportType) {
    case "rcom":
      return deviceType.is_support_remote_commands;
    case "rcon":
      return deviceType.is_support_remote_control;
    case "apps":
      return deviceType.is_support_apps_install;
    case "mon":
      return deviceType.is_support_monitoring;
    case "ai":
      return deviceType.is_support_ai;
    default:
      return true;
  }
};

export const getSupportedDevices = (Devices, Types, supportType) => {
  let deviceType = null;

  return Devices.filter((device) => {
    deviceType = Types.find((type) => type.slug === device.type);
    if (deviceType) return isSupported(deviceType, supportType);
    return true;
  });
};

// get maximum number between two arrays + 1
export const getMaxArrays = (arr1, arr2) => {
  if (!arr1.length || !arr1.length) return 0;

  let max1 = arr1.reduce((val1, val2) => Math.max(val1, val2));

  let max2 = arr2.reduce((val1, val2) => Math.max(val1, val2));

  return Math.max(max1, max2) + 1;
};

// extract type slugs in the types box when editing a command
export const selectArrFromTypeSlugs = (command) => {
  let selectArr = [];

  command.types.forEach((slug) => {
    selectArr.push({ label: unslugify(slug), value: slug.slice(0, 1) });
  });

  return selectArr;
};

// get online status based on lastConnectedAt value for a device
export const isOnline = (lastConnectedAt) =>
  moment(moment().format()).diff(moment(lastConnectedAt), "seconds") <= 120;

const randomNameGenerator = (len) => {
  let name = "";

  while (len-- > 0)
    name = name.concat(
      alphabet[Math.floor(Math.random() * (alphabet.length - 1))]
    );

  return name;
};

// generate random and unique file name for the sended recorded file
export const generateFileName = (type) => {
  let ext = type.slice(6);
  const name = randomNameGenerator(6);

  if (ext[0] === "w" && ext[3] === "m") ext = ext.slice(0, 4);

  return `${name}.${ext}`;
};

// sort items by column entry
export const sortItems = (items, sortProp, ascending = true) =>
  items.sort((item1, item2) => {
    const compareResult = item1[sortProp].localeCompare(item2[sortProp]);

    if (ascending) return compareResult;
    return -1 * compareResult;
  });

// handle inactivity time events
export const handleInactivityTime = (seconds, handler) => {
  let timeoutID;

  window.addEventListener("focus", () => clearTimeout(timeoutID));

  window.addEventListener(
    "blur",
    () => (timeoutID = setTimeout(handler, seconds))
  );
};

// check validity of password and confirmation password fields
export const validatePasswords = (pass, confPass) => {
  if (pass !== confPass) return false;
  if (!pass.length || !confPass.length) return false;
  return true;
};

// get current site url
export const configSiteUrl = () => `https://${window.location.host}/login`;

// check empty obj
export const isObjEmpty = (obj) => Object.keys(obj).length === 0;

// check empty array
export const isArrEmpty = (arr) => arr.length === 0;

//-------------------------------------------------------

// change color of grid widgets
export const colorIcon = (backgroundColor, handler) => (
  <i
    className={`${ICONS.gearIcon} fa-lg`}
    title="change color"
    style={{
      float: "right",
      marginRight: 2,
      marginTop: 2,
      cursor: "pointer",
      color: invertHexColor(backgroundColor),
    }}
    onClick={handler}
  ></i>
);

//display items information in the table body
export const showInfo = (
  items,
  titles,
  color,
  formatter = null,
  extra = null
) =>
  items.map((piece, key) => (
    <tr key={`_order_${key}`}>
      {titles.map((title, indx) => (
        <td
          key={`_td_${indx}`}
          className="font-size-14"
          style={{ color: color }}
        >
          {title === "status" ? (
            <i
              id={`st${piece.serial}`}
              className={`${ICONS.statusCircle} fa-lg ${
                piece["is_online"] ? "online-color" : "offline-color"
              }`}
            ></i>
          ) : indx === titles.length - 1 && formatter ? (
            formatter(piece.icon ? piece : piece[title])
          ) : typeof piece[title] === "boolean" ? (
            piece[title] ? (
              "yes"
            ) : (
              "no"
            )
          ) : (
            piece[title]
          )}
        </td>
      ))}
      {extra ? <div style={{ float: "right" }}>{extra(piece)}</div> : null}
    </tr>
  ));

// reset layout button
export const ResetLayout = (props = { handler: () => {} }) => (
  <h6
    className="font-size-14 font-size-semibold breadcrumb-action"
    onClick={props.handler}
  >
    RESET LAYOUT
  </h6>
);

//displaying general info badge
export const renderBadges = (badges) => (
  <div id="devices_info" className="item-count">
    {badges.map((info, key) => (
      <ItemCount
        key={`${info.name}_${key}`}
        badgeClass={info.badgeClass}
        name={info.name}
        count={info.stateVar}
      ></ItemCount>
    ))}
  </div>
);

// loading animation when the data is being fetched
export const Loader = () => (
  <div className="page-content">
    <Container style={{ width: 70, height: 600 }}>
      <div className="wrap">
        <div className="loading">
          <div className="bounceball" title="loading"></div>
        </div>
      </div>
    </Container>
  </div>
);

// general getOption function for any set of items
export const getOptions = (items, def, attribute) => {
  return (
    <React.Fragment>
      <option>{def}</option>
      {items.map((item, key) =>
        item[attribute] === def ? null : (
          <option key={`${key}_a`}>{item[attribute]}</option>
        )
      )}
    </React.Fragment>
  );
};

// fullscreen icon that triggers fullscreen mode for app script fields
export function FullscreenToggle(props) {
  return (
    <i
      className={`${ICONS.fullscreenIcon} fa-lg fullscreen-icon`}
      title="full screen"
      onClick={() => {
        if (!props.fullScreen) {
          document.getElementById(props.elementID).requestFullscreen();
        } else {
          document.exitFullscreen();
        }
      }}
    ></i>
  );
}

// render available pages for a certain set of items
export function getPages(pageCount, currentPage, setCurPage) {
  let pages = [];
  let idString = null;

  if (pageCount > 1) {
    for (let i = 1; i <= pageCount; i++) {
      idString = `pag${i}`;

      pages.push(
        <PaginationItem
          key={idString}
          id={idString}
          active={currentPage === pages.length + 1 ? true : false}
        >
          <PaginationLink onClick={() => setCurPage(i)}>{i}</PaginationLink>
        </PaginationItem>
      );
    }
  }

  return pages;
}

export const renderActions = (item, actions) => (
  <td className="font-size-14">
    <div style={{ float: "right" }}>
      {actions.map((action, key) => action(key, item))}
    </div>
  </td>
);

export const AuthFooter = () => (
  <div className="mt-4 mt-md-5 text-center">
    <p className="mb-0 text-muted">© {new Date().getFullYear()} Nasser LLC</p>
  </div>
);

export const VerticalSpace = () => (
  <React.Fragment>
    <br />
    <br />
  </React.Fragment>
);

export const SearchField = (props = { field: "", setSearchWord: () => {} }) => (
  <div className="search-box mr-2 inline">
    <div className="position-relative">
      <Input
        type="text"
        className="form-control border-0"
        placeholder={`Search ${props.field}...`}
        onChange={(ev) => props.setSearchWord(ev.target.value)}
      />
      <i className={`${ICONS.searchIcon} search-icon`} />
    </div>
  </div>
);

// navigation arrow for tour modals
export const navArrow = (direction = "right") => (
  <i className={`${ICONS.navArrow}-${direction} fa-lg`}></i>
);

const renderer = ({ hours, minutes, seconds }) => (
  <span className="font-size-18">{seconds}</span>
);

// count down counter for login page redirection in reset password page
export const Counter = () => (
  <Countdown date={Date.now() + 5000} renderer={renderer} />
);

// extend or collapse sidebar utility function
const changeBodyAttribute = (attribute, value) => {
  if (document.body) document.body.setAttribute(attribute, value);
  return true;
};

// extend or collapse sidebar utility function
const manageBodyClass = (cssClass, action = "toggle") => {
  switch (action) {
    case "add":
      if (document.body) document.body.classList.add(cssClass);
      break;
    case "remove":
      if (document.body) document.body.classList.remove(cssClass);
      break;
    default:
      if (document.body) document.body.classList.toggle(cssClass);
      break;
  }

  return true;
};

export const collapseExtendSidebar = (menuType) => {
  console.log(menuType);
  if (menuType) {
    if (menuType === "default") {
      changeBodyAttribute("data-sidebar-size", "");
      manageBodyClass("sidebar-enable", "remove");
      changeBodyAttribute("data-keep-enlarged", "false");
      manageBodyClass("vertical-collpsed", "remove");
      localStorage.setItem("menu-item", "default");
    } else {
      changeBodyAttribute("data-keep-enlarged", "true");
      manageBodyClass("vertical-collpsed", "add");
      localStorage.setItem("menu-item", "icon");
    }
  }
};

export const toggleType = () => {
  if (!document.body.classList.contains("vertical-collpsed")) {
    localStorage.setItem("menu-type", "icon");
    changeBodyAttribute("data-keep-enlarged", "true");
    manageBodyClass("vertical-collpsed", "add");
  } else {
    localStorage.setItem("menu-type", "default");
    changeBodyAttribute("data-sidebar-size", "");
    manageBodyClass("sidebar-enable", "remove");
    changeBodyAttribute("data-keep-enlarged", "false");
    manageBodyClass("vertical-collpsed", "remove");
  }
};

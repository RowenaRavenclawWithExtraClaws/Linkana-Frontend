import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import { WebLinksAddon } from "xterm-addon-web-links";
import { SearchAddon } from "xterm-addon-search";

let terminal = new Terminal({
  cursorBlink: true,
  macOptionIsMeta: true,
  scrollback: 1000,
  bellStyle: "none",
  theme: {
    background: "black",
  },
  fontSize: 20,
});

const fitAddon = new FitAddon();
const webLinksAddon = new WebLinksAddon();
const searchAddon = new SearchAddon();

// let socket = new WebSocket(
//   `wss://api.dev.linkana.eu/devices/kdsalakf/connect/`
// );
let socket;
let socketData = {};
let payload = {};

export function connectSocket(serial, setConnected) {
  socket = new WebSocket(
    `wss://api.${window.location.host}/devices/${serial}/connect/`
  );

  socket.onopen = (ev) => {
    socket.send(JSON.stringify({ type: "ssh", text: "start" }));
    setConnected({ connected: true });
  };

  socket.onmessage = (msg) => {
    payload = JSON.parse(msg.data);

    if (payload.type === "pty_output") {
      terminal.write(payload.text);
    }
  };

  socket.onclose = (ev) => {
    //thisObj.setState({ connected: false });
  };

  window.onbeforeunload = beforeunload;
}

export function closeSocket() {
  socket.send(
    JSON.stringify({
      type: "client_disconnect",
      text: "disconnect",
    })
  );

  socket.close();
}

export function openTerminal() {
  terminal.onData((key) => {
    socketData = { type: "pty_input", text: key };
    socket.send(JSON.stringify(socketData));
  });

  terminal.loadAddon(fitAddon);
  terminal.loadAddon(webLinksAddon);
  terminal.loadAddon(searchAddon);

  terminal.open(document.getElementById("terminal"));
  fitAddon.fit();
  terminal.focus();
}

export function closeTerminal() {
  terminal = new Terminal({
    cursorBlink: true,
    macOptionIsMeta: true,
    scrollback: 1000,
    bellStyle: "none",
    theme: {
      background: "black",
    },
    fontSize: 20,
  });
}

/*terminal.onData((data) => {
  if (data.charCodeAt(0) === 13) {
    curLine = "";
    terminal.write(`\r\n${prefix}`);
  } else if (data.charCodeAt(0) === 127) {
    if (curLine.length) {
      curLine = curLine.slice(0, -1);
      terminal.write("\b \b");
    }
  } else {
    curLine += data;
    terminal.write(data);
    socketData = { type: "pty_input", text: data };
    socket.send(JSON.stringify(socketData));
  }
});*/

function beforeunload() {
  socket.send(
    JSON.stringify({
      type: "client_disconnect",
      text: "disconnect",
    })
  );
}

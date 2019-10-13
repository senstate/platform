import {StateService} from "./app/state.service";
import {SocketGateway} from "./app/socket.gateway";
import {IncomingMessage, ServerResponse} from "http";
import * as path from "path";
import {listNetworkInterfaces} from "./utils/network-interfaces";

// bootstrap();
const log = (...args) => console.info(...args);

const port = process.env.port || 3333;

const http = require('http');
const WebSocket = require('ws');
const finalhandler = require('finalhandler');
const serveStatic = require('serve-static');

const serve = serveStatic(path.join(__dirname, 'dashboard'));

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  const done = finalhandler(req, res);

  if (req.url.startsWith("/api/dash/interfaces")) {
    const result = JSON.stringify(listNetworkInterfaces());

    res.end(result, done);
    return;
  }

  serve(req, res, done);
});
const wss = new WebSocket.Server({server});

const state = new StateService();
const socketGateway = new SocketGateway(state, wss);

server.listen(port);

log(`Started to listen on Port: ${port}`);
log('Listening at http://localhost:' + port );
const interfaces = listNetworkInterfaces();

for (const i of interfaces) {
  log(`${i.ifname}: ${i.address}`)
}

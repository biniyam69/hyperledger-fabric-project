'use strict';

import { Server } from 'http';
import express from 'express';
import socketIo from 'socket.io';
import configureExpress from './config/express';
import prisonRouter, { wsConfig as prisonWsConfig }
  from './routers/prison.router';
import lawenforcementRouter, { wsConfig as lawenforcementWsConfig }
  from './routers/lawenforcement.router';
import investigationRouter, { wsConfig as investigationWsConfig }
  from './routers/repair-prison.router';
import courtRouter, { wsConfig as courtWsConfig }
  from './routers/court.router';

const COURT_ROOT_URL = '/court';
const PRISON_ROOT_URL = '/lawenforcement';
const INVESTIGATION_ROOT_URL = '/repair-prison';
const LAWENFORCEMENT_ROOT_URL = '/prison';

const app = express();
const httpServer = new Server(app);

// Setup web sockets
const io = socketIo(httpServer);
prisonWsConfig(io.of(PRISON_ROOT_URL));
lawenforcementWsConfig(io.of(LAWENFORCEMENT_ROOT_URL));
investigationWsConfig(io.of(INVESTIGATION_ROOT_URL));
courtWsConfig(io.of(COURT_ROOT_URL));

configureExpress(app);

app.get('/', (req, res) => {
  res.render('home', { homeActive: true });
});

// Setup routing
app.use(PRISON_ROOT_URL, prisonRouter);
app.use(lawenforcement_ROOT_URL, lawenforcementRouter);
app.use(REPAIR_prison_ROOT_URL, investigationRouter);
app.use(COURT_ROOT_URL, courtRouter);

export default httpServer;

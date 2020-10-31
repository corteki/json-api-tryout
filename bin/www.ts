#!/usr/bin/env ts-node

import { app } from "../src";
import debug from "debug";

debug('express:server');
const port = process.env.PORT ?? "3000";

app.listen(port, () => console.log(`app running on port ${port}`));
import TextTable from './src/lib/TextTable.js';
import Utils from './src/lib/Utils.js';
import server from './src/server.js';

async function Start() {
    console.log("Loading...");
    await TextTable.Load('./resources/TextTable.csv');
    console.log("Table Load Done.");
    console.log("Start Game");
    await Utils.delay(1000);
    server();
}

Start();
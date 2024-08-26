import TextTable from './src/lib/TextTable.js';
import Utils from './src/lib/Utils.js';
import server from './src/scenes/Lobby.js';
process.env.NODE_ENV = 'development';

async function Start() {
    console.log("Loading...");
    await TextTable.Load('./resources/TextTable.csv');
    console.log("Table Load Done.");
    console.log("Start Game");
    await Utils.Delay(1000);
    await server();
}

Start();
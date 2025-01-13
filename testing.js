const { mainAction } = require('./metadata_parser');

async function run() {
    const d = await mainAction("https://repo.papermc.io/repository/maven-snapshots", "io.papermc.paper.paper-api")
    console.log(d)
}

run()
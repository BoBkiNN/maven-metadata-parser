const { mainAction } = require('./metadata_parser');

async function run() {
    const d = await mainAction("https://repo.maven.apache.org/maven2", "org.apache.maven.plugins.maven-jar-plugin")
    console.log(d)
}

run()
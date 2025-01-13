const core = require('@actions/core');
const { mainAction } = require('./metadata_parser');

async function run() {
    try {
        const repoUrl = core.getInput('repo_url');
        const artifactId = core.getInput('artifact_id');

        const { latest, release, lastUpdated } = await mainAction(repoUrl, artifactId);
        console.log(latest+":"+typeof(latest))
        // Set the outputs for the GitHub Action
        core.setOutput('latest_version', latest);
        core.setOutput('latest_release', release ?? "");
        core.setOutput('last_updated_time', lastUpdated);
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();

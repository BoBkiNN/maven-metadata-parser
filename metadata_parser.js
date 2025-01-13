const https = require('https');
const http = require('http');
const xml2js = require('xml2js'); // XML parser library

/**
 * Converts a dot-separated Maven artifact ID to a path.
 * @param {string} artifactId - Dot-separated Maven artifact ID.
 * @returns {string} - Converted path.
 */
function convertArtifactIdToPath(artifactId) {
    return artifactId.replace(/\./g, '/');
}

/**
 * Constructs the Maven metadata URL.
 * @param {string} repoUrl - Repository base URL.
 * @param {string} artifactPath - Path to the artifact.
 * @returns {string} - Full Maven metadata URL.
 */
function constructMetadataUrl(repoUrl, artifactPath) {
    return `${repoUrl}/${artifactPath}/maven-metadata.xml`;
}

/**
 * Downloads a file from the given URL.
 * @param {string} url - File URL.
 * @returns {Promise<string>} - File content.
 */
function downloadFile(url) {
    return new Promise((resolve, reject) => {
        const client = url.startsWith('https') ? https : http;
        client.get(url, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to download file: ${response.statusCode}`));
                return;
            }

            let data = '';
            response.on('data', (chunk) => {
                data += chunk;
            });

            response.on('end', () => {
                resolve(data);
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
}

/**
 * Parses Maven metadata XML and extracts required values.
 * @param {string} xmlContent - XML content as a string.
 * @returns {Promise<{latest: string, release: string, lastUpdated: string}>} - Parsed data.
 */
async function parseMetadataXml(xmlContent) {
    const parser = new xml2js.Parser();
    const parsedData = await parser.parseStringPromise(xmlContent);
    const versioning = parsedData.metadata.versioning[0];

    return {
        latest: versioning.latest,
        release: versioning.release,
        lastUpdated: versioning.lastUpdated,
    };
}

// The main action logic wrapped in a function for testability
async function mainAction(repoUrl, artifactId) {
    const artifactPath = convertArtifactIdToPath(artifactId);
    const metadataUrl = constructMetadataUrl(repoUrl, artifactPath);
    const fileContent = await downloadFile(metadataUrl);
    return parseMetadataXml(fileContent);
}

// Export methods for testing
module.exports = {
    convertArtifactIdToPath,
    constructMetadataUrl,
    downloadFile,
    parseMetadataXml,
    mainAction,
};

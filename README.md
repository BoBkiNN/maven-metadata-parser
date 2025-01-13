# maven-metadata.xml parser

This action downloads `maven-metadata.xml` from provided repository and parses its content

## Inputs

### `repo_url`

**Required** Base URL of repository. Like `https://repo.papermc.io/repository/maven-snapshots`

### `artifact_id`

**Required** Dot-separated maven artifact id like `com.example.app`. Will be used to generate url for maven-metadata.xml

## Outputs

### `latest_version`

Latest version of artifact

### `latest_release`

Latest release version of artifact. May be empty if not set

### `last_updated_time`

Last updated time. Has format like `20250113170016`


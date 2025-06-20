# maven-metadata.xml parser

This action downloads `maven-metadata.xml` from provided repository and parses its content

## Inputs

### `repo_url`

**Required** Base URL of repository. Like `https://repo.papermc.io/repository/maven-snapshots`

### `artifact_id`

**Required** Dot-separated maven artifact id like `com.example.app`. Will be used to generate url for maven-metadata.xml

## Outputs

### `latest_version`

Latest version of artifact. Will be empty if no artifact data found (404)

### `latest_release`

Latest release version of artifact. May be empty if not set

### `last_updated_time`

Last updated time. Has format like `20250113170016`

## Example usage

```yml
- name: Download current version
  uses: BoBkiNN/maven-metadata-parser@v1.0.2 # dont forget to replace version
  id: download_current_version
  with:
    repo_url: https://repo.maven.apache.org/maven2
    artifact_id: org.apache.maven.plugins.maven-jar-plugin
- name: Store current version
  run: echo "Latest version is ${{ steps.download_current_version.outputs.latest_version }}"
```

## TODO
* Add error handling to warn or raise error with user choise
* Add getting last update timestamp as unix time


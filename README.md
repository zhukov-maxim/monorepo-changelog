> This project is currently in **beta and APIs are subject to change**.

# Monorepo CHANGELOG

A tool for assembling change logs for projects with multiple packages.
It works great with Lerna (https://github.com/lerna/lerna).

## Output example
```
# button

## 2.0.3 - 2017-06-18

### Fixed
- Focus state.


# table

## 3.1.0 - 2017-06-14

### Added
- Sticky header.
- Compact pagination.


# textarea

## 1.0.1 - 2017-06-23

### Fixed
- Decorations in Internet Explorer 11.
```

## Installation and usage

This package can be used as a CLI or as a Node module.

### Global (as a CLI)

#### Installation
```
npm install -g monorepo-changelog
```

#### Usage

This package can be used with a full name `monorepo-changelog` or with an alias `mrcl`.

By default it returns a list of changes for two latest weeks from all CHANGELOG.md files in current working directory.
```
mrcl
```

A path to a project, start date and end date can be specified in any order.
If only one date is specified, it is treated as a start date.
```
mrcl projects/ui-components 2017-06-12 2017-06-25
```

Output result to a file.
```
mrcl projects/ui-components 2017-06-12 2017-06-25 > sprint-changelog.md
```

#### Local

#### Installation
```
npm install --save monorepo-changelog
```

#### Usage
```
const getMonorepoChangelog = require('monorepo-changelog');

const options = {
  monoRepoPath: `${__dirname}/../markup/`,
  startDate: '2017-05-01',
  endDate: '2017-05-31'
};

const changelog = getMonorepoChangelog(options);
```

## Semantic versioning and change logs

Keep a CHANGELOG: http://keepachangelog.com/en/0.3.0/

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

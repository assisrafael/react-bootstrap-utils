# react-bootstrap-utils ![Node.js CI](https://github.com/assisrafael/react-bootstrap-utils/workflows/Node.js%20CI/badge.svg?branch=master)

[![NPM](https://nodei.co/npm/react-bootstrap-utils.png)](https://nodei.co/npm/react-bootstrap-utils/)

A React implementation of Boostrap v4 components.

Docs and demo: https://assisrafael.github.io/react-bootstrap-utils/

## Roadmap

- [] Smartable
- [] Form Range
- [] Form generation based on a configuration option
- [] Input help
- [] Input reset based on other fields
- [] Input Masks
- [] Input groups
- [] Hide/show form inputs
- [] Keyboard navigation on FormAutocomplete
- [] Automatic input id
- [] Subforms
- [] Sidebar
- [] Stepper
- [] Tree
- [] Button group
- [] Accordion (expansion panel)
- [] Progress bar
- [] Tooltip
- [] Popovers
- [] Table with row details
- [] Table footer (sums, counters, etc)
- [] Table with sticky footer
- [] Table with sticky columns
- [] Table with sticky header

## How to to run

Building the library

```bash
npm run build
```

Starting demo app

```bash
npm run start
```

## How to Publish a New Version

Make sure the master branch is updated (git pull) and make sure all new commits (or expected commits) are included. 
Suggested log visualization:

```bash
git log --graph --pretty=format:'%C(yellow)%h%C(cyan)%d%Creset %s - %C(blue)%an%Creset, %C(white)%ar%Creset'
```

On the terminal, run the command:

```bash
npm run release
```

followed by:

```bash
git push --follow-tags origin master && npm publish
```

Check the repository on Github, verifying the newly created tag
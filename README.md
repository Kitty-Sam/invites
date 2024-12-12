# README
## Installation
```bash
yarn install
```

## Install package in a web/api projects
```bash
yarn workspace web add <package>
yarn workspace api add <package>
```

## Development (launch project)
```bash
yarn rw build
yarn rw dev
```

### Types problems (if you have changed smth in prisma schema, for example)
```bash
rm -rf .redwood/types
yarn rw build
yarn rw dev
```

### Styles with Shad CN
```bash
yarn shad button
```

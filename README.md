# Angular 1 Starter

A simple starter template using AngularJS (1) and ngRedux.

## To Begin

### To build

```
$ npm install
$ npm run bower install
$ npm run grunt
```

### To develop with livereload

```
$ npm run grunt serve
```

Then open browser with url

```
http://localhost:9000
```

## Config

You can define deployment specific config (e.g. API endpoint)

The default provided config is `development` and `production`.

You can find them under `app/config` and free to add more environment you need.

To build/serve app using specific environment config,

```
$ NODE_ENV=your_environment npm run grunt [serve]
```

Also, environment variables can be injected into config using `process.env`.
It is useful for injecting sensitive config (third party API authentication)
when building and deploying your app using CI.

## Distribution

```
$ NODE_ENV=your_distribution_environment npm run grunt dist
```

Your minified and revisioned version of assets (css, js) are placed in `dist`
folder. You are ready to upload files from this folder to your live web servers.

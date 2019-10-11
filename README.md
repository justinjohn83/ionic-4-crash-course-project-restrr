# Ionic 4 Tutorial Course Project

(From original Author)

This is the project based on the following crash course:
[Ionic 4 Crash Course for Beginners - Build an App](https://youtu.be/qTdwUpQRptc)

## More Awesome Content

Do me a big ol' favor and check out these awesome links. I release new video tutorials on full stack development Monday-Thursday @ 10:30 AM ET!

* Subscribe to the [DesignCourse YouTube Channel](http://youtube.com/designcourse)
* Check out the associated website [Coursetro Full Stack Development Training](https://coursetro.com)
* Chat with me and others on Discord: [DesignCourse Discord Server](https://discord.gg/a27CKAF)
* [Twitter](https://twitter.com/designcoursecom)
* [Facebook](https://facebook.com/coursetro)

Enjoy!


## Getting Started

https://ionicframework.com/getting-started

### Install Node

### Install Angular CLI

```
npm install -g @angular/cli
```

### Install Ionic

```
npm install -g ionic
```

### Install Dependencies

```
npm install
```

Fix any high and critical npm vulnerabilities (without breaking changes)

```
npm audit fix
```

### Serve the mobile app in web browser

```
npm serve
```

### Add IOS Support through Cordova


First install Cordova:

```
npm i -g cordova
```

Add IOS support to the project.

https://ionicframework.com/docs/building/ios

Building for IOS (must run each time want to update the app)

```
ionic build
ionic cordova prepare ios
```


Removing a platform: for example, Android

```
ionic cordova platform remove android
```

To re-enable Android run

```
ionic cordova prepare android
```


## Common Issues

### You experience the following running `ionic serve`

```
ng run app:serve --host=localhost --port=8100
[ng] Schema validation failed with the following errors:
[ng]   Data path ".builders['app-shell']" should have required property 'class'.

[ERROR] ng has unexpectedly closed (exit code 1).
```


See https://forum.ionicframework.com/t/schema-validation-failed-builders-app-shell-should-have-required-property-class/165040
https://www.npmjs.com/package/@angular-devkit/build-angular

Rolled `@angular-devkit/build-angular` back from `0.803.8` -> `^0.12.4`

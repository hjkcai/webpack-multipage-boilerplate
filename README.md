# webpack-multipage-boilerplate

This is a **nice** boilerplate for using [webpack 2](https://webpack.js.org) with [pug](https://pugjs.org) and [LESS](https://lesscss.org) to build multi-page website.

## Motivation

The world of the today's front-end web development has changed a lot. Today we do not want to write HTML, CSS, JavaScript *directly*. Otherwise we use **tools** (e.g. webpack) to **generate** codes so that it is easy to use some advanced features such as **ES6/ES7**, **modularization**, **CSS preprocessor**, balabalabala...

Sometimes we still want to make a triditional multiple page webiste *for many reasons*. However I cannot tolarate making pages without any of these tools. So comes this boilerplate 🎉

Because of webpack's prefect assets management system, gulp/grunt is *not* used here. **All assets are webpack modules**. You can get the same experience as some SPA project is.

## What's included

This boilerplate includes these features (with [limitations](#limitation)):

1. [**webpack 2**](https://webpack.js.org): JavaScript module bundler
2. [**babel**](https://babeljs.io/): Use next generation JavaScript, today
3. [**LESS**](http://lesscss.org/): A CSS pre-processor
4. [**postcss**](https://github.com/postcss/postcss): A tool for transforming styles
5. [**pug**](https://pugjs.org): A high performance template engine
6. [**eslint**](http://eslint.org/): The pluggable linting utility for JavaScript and JSX

## Usage

Simply clone this repo and follow the guides below.

### Project structure

> You do not have to modify the files not listed below. If you want to know what did I do, see Contributer's Guide.

```
build/                codes related to building and dev-server
config/
|- dev.conf.js        development configuration
|- prod.conf.js       production configuration
src/
|- assets/            assets (optional)
|- lib/               your own modules (optional)
|- partials/          partials used in the views (optional)
|- scripts/           per-page JavaScript entries
|- views/             page templates
```

`views` and `scripts` are *required*. Every `.pug` or `.html` file in the `views` folder is considered as an *entry* of your website. Every `.js` file in the `scripts` folder that has the same filename in the `views` folder are the *main script* of that page and will be added automatically into the generated HTML file.

For example, if we have the following files:

```
src/
|- lib/
|  |- test.js
|- partials/
|  |- header.pug        --> included by page1.pug and page2.pug
|- scripts/
|  |- page1.js
|- views/
   |- page1.pug
   |- page2.pug
```

You will have two pages generated: `page1.html` and `page2.html`. `header.pug` will not be considered as a complete page. `page1.js` will be executed in `page1.html`. There is no script that will be executed in `page2.html` because `page2.js` is missing.

**Run the example and you will see!**

### Chunk map

Sometimes 2 or more pages will use the same one script. Of course we do not want to create several JavaScript files with the same content. The chunk map is here to solve this problem. Just define some mapping rules within an object:

```js
{
    'projects/**/*.pug': ['project'],
    'projects/special-project.pug': ['projects/special-project']
}
```

Then all the pug files inside the `projects` folder will have `project.js` included. And `projects/special-project.pug` will have `projects.js` *and* `projects/special-project.js` included.

For more informations about the left side of the rules, read [this](https://github.com/isaacs/node-glob#glob-primer)

### Run in development mode

> Remember to run `npm install` before you start development

When developing, there will be a server started at port 8080 (by default). You can preview your website through [http://localhost:8080](http://localhost:8080). **The webpage will automatically refresh when you save your code**.

Use the following command to start development server:

```
npm run dev
```

### Build production code

When you finished development and it is time to put the codes into your server, you cannot directly copy everything to your server. The origional code will not work. You need to *build* them!

Use the following command to build production code:

```
npm run build
```

The built files can be found in the `dist` folder (of course you can change the destination).

### Configuration

There are two configuration files in the `config` folder: `dev.conf.js` and `prod.conf.js`. Here are what you can modify:

1. `env`: Environment variable injection (you can access them from `process.env`)
2. `assetsPublicPath`: Where you are going to put your production code in the server. If you want to deploy your website at `example.com/abc`, the `assetsPublicPath` must be `/abc`, or the production code will not work at all
3. `output` (prod): The directory to store all generated production code. Must be an absolute path
4. `assetsSubDirectory` (prod): The directory (inside `output`) to store all static resources (js/css/img/fonts...)
5. `port` (dev): The port to start the development server.
6. `devtool` (dev): Which webpack devtool to use. See [https://webpack.js.org/configuration/devtool/](https://webpack.js.org/configuration/devtool/)
7. `proxyTable` (dev): An easy way to make you access your APIs through the development server. See [http://vuejs-templates.github.io/webpack/proxy.html](http://vuejs-templates.github.io/webpack/proxy.html)

## Limitations

There are some limitations you need to pay attention to:

1. You must add *at least* one JavaScript file in `scripts`. Otherwise webpack cannot start because no entry is  present.

2. You need to import local style files in the JavaScript code via `import` or `require` like this:

    ```javascript
    import '../assets/styles/normalize.css'     // import from your own file
    import 'normalize-css'                      // import from node_modules

    require('../assets/styles/page1.less')      // commonjs style
    ```

    You cannot do this:

    ```html
    <link rel="stylesheet" href="../assets/styles/normalize.css">
    ```

    But importing external styles is still need to import via `<link>`:

    ```html
    <link rel="stylesheet" href="somecdn.example.com/abc.css">
    ```

3. When you create a new view/script or delete an existing view/script, **the development server must be completely restarted** (in order to alter webpack's configuration). That results in *a slow recompilation*.


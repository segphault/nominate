# NOMinate

*NOMinate solves one of the most difficult engineering problems in existence: helping a group of people decide where to eat together. NOMinate's simple voting system cuts through the paralyzing indecision, putting an end to the conflict between pizza partisans and shwarma supporters. If you are planning dinner with the extended family or a working lunch with office colleagues, use NOMinate to avoid a lengthy debate.*

NOMinate is a simple demo that I built for my talk at JSConf US 2014. It's a full-stack JavaScript application with a SailJS backend and a MontageJS frontend. It requires the latest release candidate of SailsJS 0.10 because it uses database associations and other 0.10 features. The frontend is a single-page application that uses `sails.io.js` to communicate with the API backend. The NOMinate voting system works in real time, using socket.io and SailsJS pub/sub capabilities.

To run NOMinate, you will have to do the following:

* Run the `npm install` command in the project root directory
* Run the `npm install` command again in the `public` directory
* Run `node app.js` in the project root directory

If you have the SailsJS npm package installed globally, you can use `sails lift` instead of running the `app.js` file.

NOMinate doesn't use the standard SailsJS asset pipeline or view system. It is configured to serve static files directly out of the `public` subdirectory. In production, you would likely want to use [mop](https://github.com/montagejs/mop) in the public directory to create an optimized bundle. You can change the setting in `config/paths.js` to make it point to the mopped files.

In production, you will probably also want to use an actual database rather than the simple disk storage adapter that is used by default. NOMinate is known to work well with the SailsJS PostgreSQL adapter, but it has some issues with the 0.10.x MongoDB adapter.

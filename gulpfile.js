var gulp   = require('gulp');
var args   = require('yargs').argv;
var moment = require("moment");
var config = require('./config');
var shell  = require('gulp-shell');

// Pull in staging database
gulp.task('push-database', function(){
    if(typeof config === 'object'){

        if(config.databases[args.from] !== undefined){
            var from = config.databases[args.from];
        } else {
            console.log('No environment found for "from".\n');
            return false;
        }

        if(config.databases[args.to] !== undefined){
            var to = config.databases[args.to];
        } else {
            console.log('No environment found for "from".\n');
            return false;
        }

        var db = config.databases,
            now = moment().format('YYYY-MMMM-D-h-mm-ssa'),
            mysql = config.mysql,
            mysqldump = config.mysqldump;
        gulp.src('')
            .pipe(shell([
                mysqldump + ' -u ' + to.DB_USER + '  -h ' + to.DB_HOST + ' -p' + to.DB_PASSWORD + ' ' + to.DB_NAME + ' > ./' + config.database_location + '/local-' + now +'.sql',
                'echo "Local Database Backed Up "',
                mysqldump + ' -u ' + from.DB_USER + '  -h ' + from.DB_HOST + ' -p' + from.DB_PASSWORD + ' ' + from.DB_NAME + ' > ./' + config.database_location + '/integration-' + now +'.sql',
                'cp ./' + config.database_location + '/integration-' + now +'.sql ./' + config.database_location + '/new-local-' + now +'.sql',
                "sed -i \"\" 's/" + from.table_prefix + "/" + to.table_prefix + "/g' ./" + config.database_location + "/new-local-" + now + ".sql",
                mysql + ' -u ' + to.DB_USER + ' -p' + to.DB_PASSWORD + ' -h ' + to.DB_HOST + ' -e "DROP DATABASE IF EXISTS ' + to.DB_NAME + '; CREATE DATABASE ' + to.DB_NAME + ';"',
                mysql + ' -u ' + to.DB_USER + ' -p' + to.DB_PASSWORD + ' -h ' + to.DB_HOST + ' ' + to.DB_NAME + ' < ./' + config.database_location + '/new-local-' + now +'.sql',
                'echo "Database Migrated"'
            ]));
    }
});
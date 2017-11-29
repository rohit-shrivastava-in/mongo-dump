var CronJob = require('cron').CronJob;
var Cron = require('./mongodb_backup.js');

new CronJob('* * * * * *', () => {
    Cron.dbAutoBackUp();
}, () => {
    //Will execute when job will stop
    console.log("stopped")
}, true, 'Asia/Kolkata');
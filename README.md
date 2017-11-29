### Getting Auto Backup Set for MongoDB

Package required:

```javascript
$ npm install cron
```

Set Database configuration


```javascript
var dbOptions =  {
    user: false,
    pass: false,
    host: '<host name>', //i.e. 'localhost' or 'www.abc.com'
    port: 27017,
    database: '<databse name>', // i.e. 'databaseName'
    autoBackup: true,         // wanna create auto backup
    removeOldBackup: true,   // wanted to delete old backup
    keepLastDaysBackup: 2,  // Number backup you want to keep
    autoBackupPath: '<backup-path>' // i.e. /var/database-backup/
};
```

:+1: Schedule it to execute automatically

```javascript
new CronJob('* * * * * *', () => {
    Cron.dbAutoBackUp();
}, null, true, 'Asia/Kolkata');
```

Another example

```javascript
new CronJob('00 30 11 * * 1-5', () => {
	Cron.dbAutoBackUp();
  /*
   * Backup every weekday (Monday through Friday)
   * at 11:30:00 AM. It does not take backup on Saturday
   * or Sunday.
   */
  }, () => {
    /* This function is executed when the job stops */
  },
  true, /* Start the job right now */
  timeZone /* Time zone of this job. */
);
```


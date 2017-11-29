var fs = require('fs');
var child_process = require('child_process');

// BD options setup
var dbOptions =  {
    user: false,
    pass: false,
    host: 'localhost',
    port: 27017,
    database: '<databse name>',
    autoBackup: true, 
    removeOldBackup: true,
    keepLastDaysBackup: 2,
    autoBackupPath: '<backup-path>' // i.e. /var/database-backup/
};

/* return date object */
exports.stringToDate = (dateString) => {
    return new Date(dateString);
}

// Auto backup script
exports.dbAutoBackUp= () => {
    console.log("taking backup")
// check for auto backup is enabled or disabled
    if (dbOptions.autoBackup == true) {
        var date = new Date();
        var beforeDate, oldBackupDir, oldBackupPath;
        currentDate = this.stringToDate(date); // Current date
        var newBackupDir = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate();
        var newBackupPath = dbOptions.autoBackupPath + 'mongodump-' + newBackupDir; // New backup path for current backup process
        // check for remove old backup after keeping # of days given in configuration
        if (dbOptions.removeOldBackup == true) {
            beforeDate = currentDate;
            beforeDate.setDate(beforeDate.getDate() - dbOptions.keepLastDaysBackup); // Substract number of days to keep backup and remove old backup
            oldBackupDir = beforeDate.getFullYear() + '-' + (beforeDate.getMonth() + 1) + '-' + beforeDate.getDate();
            oldBackupPath = dbOptions.autoBackupPath + 'mongodump-' + oldBackupDir; // old backup(after keeping # of days)
        }

        var cmd = 'mongodump --host ' + dbOptions.host + ' --port ' + dbOptions.port + ' --db ' + dbOptions.database + ' --username ' + dbOptions.user + ' --password ' + dbOptions.pass + ' --out ' + newBackupPath; // Command for mongodb dump process
        child_process.exec(cmd, function (error, stdout, stderr) {
            
            if(error)
                console.log("Error", error)

            // check for remove old backup after keeping # of days given in configuration
            if (dbOptions.removeOldBackup == true) 
                if (fs.existsSync(oldBackupPath)) {
                    child_process.exec("rm -rf " + oldBackupPath, function (err) { });
                }
        });
    }
}
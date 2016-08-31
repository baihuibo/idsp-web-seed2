//Created by baihuibo on 16/3/23.
if (process.cwd().includes('/node_modules/')) {
    var copy = require('copy');
    var async = require('async');
    var fs = require('fs');
    var remove = require('remove');

    var first = [
        {//入口文件
            path: './src/**/*',
            to: '../../src/',
            overwrite: false
        }
    ];

    var update = [
        {//复制接口描述
            path: './typings/**/*',
            to: '../../typings/',
            overwrite: true
        },
        {//tsconfig.json
            path: './tsconfig.json',
            to: '../../',
            overwrite: true
        },

        {//样例文件
            path: './examples/**/*',
            to: '../../examples/',
            overwrite: true
        },

        {//data
            path: './resource/**/*',
            to: '../../resource/',
            overwrite: false
        }
    ];

    var list = [];
    if (fs.existsSync('../../app')) {//update
        list = list.concat(update);
    } else {//first
        list = list.concat(update, first);
    }

    var copyEach = copy.each;

    async.eachSeries(list, function (item, next) {
        var fn;
        if (Array.isArray(item.path)) {
            fn = copyEach;
        } else {
            fn = copy;
        }

        fn(item.path, item.to, {overwrite: item.overwrite}, function (err, file) {
            if (err) {
                return console.error(err);
            }
            next();
        });
    }, function done() {
        console.log('copy file is done.');
        var removePaths = ['./typings', './src', './examples', './resource'];

        removePaths.forEach(function (path) {
            remove(path, function (err) {
                if (err) {
                    console.error(err);
                }
            });
        });
    });
}
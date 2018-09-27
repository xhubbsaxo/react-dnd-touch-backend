/**
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
'use strict';

import { name } from '../package.json';
import babelify from 'babelify';
import browserify from 'browserify';
import gulp from 'gulp';
import gutil from 'gulp-util';
import source from 'vinyl-source-stream';
import watchify from 'watchify';

function rebundle (bundle, opts) {
    return bundle
        .on('error', gutil.log)
        .pipe(source(opts.destFilename))
        .pipe(gulp.dest(opts.destFolder))
        .on('end', opts.onEnd || Function.prototype);
}

function bundle (args) {
    return browserify({
        ...args,
        debug: true,
        standalone: name
    })
        .transform(babelify);
}

export default function dev ({ src, destFilename, destFolder }) {
    return () => {
        const bundler = watchify(bundle({
            ...watchify.args,
            entries: src
        }));

        bundler.on('log', gutil.log);

        function rebundleFn () {
            rebundle(bundler.bundle(), {
                destFolder,
                destFilename
            });
        }

        bundler.on('update', rebundleFn);

        rebundleFn();
    };
}

export function dist ({ src, destFolder, destFilename }) {
    return () => {
        const bundler = bundle({
            entries: src
        });
        return rebundle(bundler.bundle(), {
            destFolder,
            destFilename
        });
    };
}
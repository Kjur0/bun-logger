import { Logger, logger } from '.';

console.assert(false, 'This is an assertion failure message.');
logger.assert(false, 'This is an assertion failure message from logger.');

console.count('counter');
console.count('counter');
console.countReset('counter');
console.count('counter');
logger.count('counter from logger');
logger.count('counter from logger');
logger.countReset('counter from logger');
logger.count('counter from logger');

console.debug('This is a debug message.');
logger.debug('This is a debug message from logger.');

console.dir({ a: 1, b: 2, title: 'dir output' });
logger.dir({ a: 1, b: 2, title: 'dir output from logger' });

console.error('This is an error message.');
logger.error('This is an error message from logger.');

console.group('A group');
console.group('A group');
console.group('A group');
console.log('Inside the group');
console.groupEnd();
console.groupEnd();
console.groupEnd();

logger.group('A group from logger');
logger.group('A group from logger');
logger.group('A group from logger');
logger.log('Inside the group from logger');
logger.groupEnd();
logger.groupEnd();
logger.groupEnd();

console.groupCollapsed('A collapsed group');
console.groupCollapsed('A collapsed group');
console.groupCollapsed('A collapsed group');
console.log('Inside the collapsed group');
console.groupEnd();
console.groupEnd();
console.groupEnd();

logger.groupCollapsed('A collapsed group from logger');
logger.groupCollapsed('A collapsed group from logger');
logger.groupCollapsed('A collapsed group from logger');
logger.log('Inside the collapsed group from logger');
logger.groupEnd();
logger.groupEnd();
logger.groupEnd();

console.info('This is an info message.');
logger.info('This is an info message from logger.');

console.log('This is a log message.');
logger.log('This is a log message from logger.');

console.profile('Profile');
for (let i = 0; i < 1000000; i++) {
  // Some work to profile
}
console.profileEnd('Profile');

logger.profile('Profile from logger');
for (let i = 0; i < 1000000; i++) {
  // Some work to profile
}
logger.profileEnd('Profile from logger');

console.table([
  { a: 1, b: 2, title: 'table output' },
  { a: 3, b: 4, title: 'table output' },
]);
logger.table([
  { a: 1, b: 2, title: 'table output from logger' },
  { a: 3, b: 4, title: 'table output from logger' },
]);

console.time('Timer');
console.timeLog('Timer');
setTimeout(() => {
  console.timeEnd('Timer');
}, 100);
await new Promise((resolve) =>
  setTimeout(() => {
    console.timeEnd('Timer');
    resolve(undefined);
  }, 1000),
);

logger.time('Timer from logger');
logger.timeLog('Timer from logger');
setTimeout(() => {
  logger.timeEnd('Timer from logger');
}, 100);
await new Promise((resolve) =>
  setTimeout(() => {
    logger.timeEnd('Timer from logger');
    resolve(undefined);
  }, 1000),
);

console.timeStamp('This is a timestamp');
logger.timeStamp('This is a timestamp from logger');

console.trace('This is a trace message.');
logger.trace('This is a trace message from logger.');

console.warn('This is a warning message.');
logger.warn('This is a warning message from logger.');

const log = new Logger('MyScope', 'all');
log.assert(false, 'This is an assertion failure message from MyScope logger.');
log.count('counter from MyScope logger');
log.debug('This is a debug message from MyScope logger.');
log.dir({ a: 1, b: 2, title: 'dir output from MyScope logger' });
log.error('This is an error message from MyScope logger.');
log.group('A group from MyScope logger');
log.log('Inside the group from MyScope logger');
log.groupEnd();
log.groupCollapsed('A collapsed group from MyScope logger');
log.log('Inside the collapsed group from MyScope logger');
log.groupEnd();
log.info('This is an info message from MyScope logger.');
log.log('This is a log message from MyScope logger.');
log.profile('Profile from MyScope logger');
for (let i = 0; i < 1000000; i++) {
  // Some work to profile
}
log.profileEnd('Profile from MyScope logger');
log.table([
  { a: 1, b: 2, title: 'table output from MyScope logger' },
  { a: 3, b: 4, title: 'table output from MyScope logger' },
]);
log.time('Timer from MyScope logger');
log.timeLog('Timer from MyScope logger');
setTimeout(() => {
  log.timeEnd('Timer from MyScope logger');
}, 100);
await new Promise((resolve) =>
  setTimeout(() => {
    log.timeEnd('Timer from MyScope logger');
    resolve(undefined);
  }, 1000),
);
log.timeStamp('This is a timestamp from MyScope logger');
log.trace('This is a trace message from MyScope logger.');
log.warn('This is a warning message from MyScope logger.');

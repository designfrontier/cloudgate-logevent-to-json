// @flow

// mock out info logs to prevent tons of test output
const oldLog = global.console.log;
// $FlowFixMe never actually fix this :-)
global.console.log = params => {
  if (params.level !== 'info') {
    oldLog(params);
  }
};

/**
 * 日志打印的功能，打印的内容会出现在调试器面板
 * [MiniDemo]: <你的打印内容>
 * 方便调试的时候按前缀更好搜索
 */

/**
 * 三种等级的日志
 */
const method = {
  log: 'log',
  error: 'error',
  warn: 'warn',
};

const functionApply = Function.prototype.apply;

const _log = (method, ...args) => {
  return functionApply.call(console[method], console, args);
};

export function logFactory(tag = 'MiniDemo') {
  const { log, error, warn } = method;

  return {
    info(...msg) {
      _log.apply(window, [log, `[${tag}]: `, ...msg]);
    },
    error(...msg) {
      _log.apply(window, [error, `[${tag}]: `, ...msg]);
    },
    warn(...msg) {
      _log.apply(window, [warn, `[${tag}]: `, ...msg]);
    },
  };
}

/**
 * 最终使用的对象，参数与 console.log 一样
 * log.info()
 * log.warn()
 * log.error()
 */
export const log = logFactory();

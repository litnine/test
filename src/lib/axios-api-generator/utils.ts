const URL_TEMPLATE_REGEXP = /{([A-Za-z$_][A-Za-z0-9$_]*)}/g;
/**
 * 在url中嵌入变量值
 * @param {string} url 模板路径，形如/users/u{userId}
 * @param {object} data 键值对
 */
export function compileURLTemplate(url = '', data: { [key: string]: any }): string {
  return url.replace(URL_TEMPLATE_REGEXP, (_, key: string) => {
    const value = data[key];
    if (isUndef(value) || value === '') {
      throw new Error(`Missing path variables: "${key}"`);
    }
    return value;
  });
}

/**
 * 分析出url所需的变量
 */
export function parseURLTemplate(url = ''): string[] {
  URL_TEMPLATE_REGEXP.lastIndex = 0;
  const keys: string[] = [];
  let match: ReturnType<typeof URL_TEMPLATE_REGEXP.exec>;
  // eslint-disable-next-line no-cond-assign
  while ((match = URL_TEMPLATE_REGEXP.exec(url))) {
    keys.push(match[1]);
  }
  return [...new Set(keys)];
}

/**
 * `data` 是作为请求主体被发送的数据，只适用于这些请求方法： 'PUT', 'POST', 和 'PATCH'
 */
export function hasRequestBody(method: string): boolean {
  return /^(put|post|patch)$/i.test(method);
}

export function isUndef(val: any): val is null | undefined {
  return val === null || val === undefined;
}

function combineURLs(baseURL: string, relativeURL: string): string {
  return baseURL && relativeURL
    ? `${baseURL.replace(/\/+$/, '')}/${relativeURL.replace(/^\/+/, '')}`
    : relativeURL || baseURL;
}

function isAbsoluteURL(url: string): boolean {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}

export function resolveURLs(...args: string[]): string {
  let path = args.pop() || '';
  while (!isAbsoluteURL(path) && args.length) {
    path = combineURLs(args.pop() || '', path);
  }
  return path;
}

export interface SyncStorageOptions<T> {
  // 默认使用localStorage，为true时是使用sessionStorage储存
  session?: boolean;

  // 初始化时验证数据有效性，不通过验证时将丢弃原数据
  type?: typeof Number | typeof String | typeof Boolean | typeof Object | typeof Array;
  validator?: (value: T) => boolean;

  // 当该storage item不存在或解析值为undefined或解析值不通过验证时作为初始值
  default?: T | (() => T);

  // 持久化前调用，将返回值持久化，不会影响当前对象的值，重启应用时重新读取web storage时生效（常用于裁剪数组长度）
  transform?: (value: T) => T | undefined;
}

export default class WebStorageSynchro<T> {
  private key: string

  private options: SyncStorageOptions<T>

  private storage: Storage

  private value!: T | undefined

  private initialized = false

  constructor(key: string, options: SyncStorageOptions<T> = {}) {
    this.key = key;
    this.options = options;
    this.storage = window[options.session ? 'sessionStorage' : 'localStorage'];
  }

  public get() {
    if (!this.initialized) {
      this.initialized = true;
      this.value = this.getDefaultValue();
    }
    return this.value;
  }

  public set(value: T | undefined) {
    this.value = value;
    if (value === undefined) {
      this.storage.removeItem(this.key);
    } else {
      const { transform } = this.options;
      this.storage[this.key] = JSON.stringify(typeof transform === 'function' ? transform(value) : value);
    }
  }

  private getDefaultValue() {
    const {
      type,
      validator,
      default: defaultValue,
    } = this.options;
    let value;
    try {
      value = JSON.parse(this.storage[this.key]);
    } catch {
      //
    }
    if (
      isDef(value)
      && !(type && value.constructor !== type)
      && !(validator && validator(value) === false)
    ) {
      return value;
    }
    this.storage.removeItem(this.key);
    // @ts-ignore
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue;
  }
}

function isDef(value: any) {
  return value !== undefined && value !== null;
}

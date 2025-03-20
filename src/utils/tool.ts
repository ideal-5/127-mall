 export function deepClone<T>(value: T, hash = new WeakMap()): T {
    // 非对象类型直接返回（包括 null）
    if (Object(value) !== value) return value;

    // 处理 Date
    if (value instanceof Date) return new Date(value) as any;

    // 处理 RegExp
    if (value instanceof RegExp) return new RegExp(value.source, value.flags) as any;

    // 处理 Map
    if (value instanceof Map) {
        const result = new Map();
        hash.set(value, result);
        value.forEach((v, k) => {
            result.set(deepClone(k, hash), deepClone(v, hash));
        });
        return result as any;
    }

    // 处理 Set
    if (value instanceof Set) {
        const result = new Set();
        hash.set(value, result);
        value.forEach((v) => {
            result.add(deepClone(v, hash));
        });
        return result as any;
    }

    // 处理 TypedArray 或 ArrayBuffer 的情况
    if (ArrayBuffer.isView(value)) {
        // 如 Int8Array, Float32Array 等
        return new (value.constructor as any)(value) as any;
    }
    if (value instanceof ArrayBuffer) {
        return value.slice(0);
    }

    // 处理循环引用
    if (hash.has(value)) return hash.get(value);

    // 处理函数：一般直接返回同一个函数引用，或根据实际情况处理
    if (typeof value === "function") return value;

    // 创建一个新对象，保留原型
    const result = Array.isArray(value) ? [] : Object.create(Object.getPrototypeOf(value));

    // 缓存已处理的对象，防止循环引用
    hash.set(value, result);

    // 遍历所有键（包括 symbol 属性）
    Reflect.ownKeys(value).forEach((key) => {
        // 注意：此处不能用点操作符，确保能访问 symbol 属性
        (result as any)[key] = deepClone((value as any)[key], hash);
    });

    return result;
}

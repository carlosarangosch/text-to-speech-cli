// src/utils.ts
export function mapEnum(value: string, enumObject: any) {
    const lowercaseValue = value.toUpperCase();
    const entry = Object.keys(enumObject).find((key) => key === lowercaseValue || enumObject[key] === lowercaseValue);
    return entry ? enumObject[entry] : null;
  }
export class StringUtils {
  nvl(s: string | undefined, default_: string): string {
    return s || default_;
  }

  compareString(value1: string | undefined, value2: string | undefined) {
    return (value1 || "").localeCompare(value2 || "");
  }
}

export const stringUtils = new StringUtils();

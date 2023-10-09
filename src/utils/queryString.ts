import qs from 'qs';

export const generateSWRKey = (key: string, data: { [key: string]: any }) =>
  `${key}?${qs.stringify(data, {
    skipNulls: true,
    strictNullHandling: true,
    filter(_prefix: string, value: string) {
      if (value === '' || value === undefined || value === null) {
        return undefined;
      }
      return value;
    },
  })}`;

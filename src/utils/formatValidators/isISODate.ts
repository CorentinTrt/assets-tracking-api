export default function isISODate(date: string) {
  const ISO_8601_FULL =
    /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/i;

  return ISO_8601_FULL.test(date);
}

export default function errorZodReformate(error: any) {
  return {
    field: error.path[1],
    message: error.message,
  };
}

export function successResponse(statusCode: number, responseData: any) {
  return {
    status: 'success',
    statusCode: statusCode,
    data: responseData,
    error: null,
  };
}

export function errorResponse(statusCode: number, errorData: any) {
  return {
    status: 'error',
    statusCode: statusCode,
    data: null,
    errors: errorData,
  };
}

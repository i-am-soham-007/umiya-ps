export class ApiResponse {
  static success<T>(data: T, message: string = 'Success') {
    return {
      success: true,
      message,
      data
    };
  }

  static paginated<T>(data: T[], total: number, page: number, limit: number) {
    return {
      success: true,
      data,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  static error(message: string, statusCode: number = 500, errors: any = null) {
    return {
      success: false,
      message,
      statusCode,
      errors
    };
  }
}

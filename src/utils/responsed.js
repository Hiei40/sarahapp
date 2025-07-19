export const asyncHandler = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

// للرد الناجح بشكل موحد
export const successResponse = ({ res, message = "Done", status = 200, data = {} }) => {
  return res.status(status).json({
    success: true,
    message,
    data,
  });
};

// لمعالجة الأخطاء العامة
export const globalErrorHandling = (error, req, res, next) => {
  return res.status(500).json({
    success: false,
    message: error.message || "Internal Server Error",
    stack: error.stack,
  });
};  
const ApiError = require('../utils/ApiError');

/**
 * Generic validation middleware factory. Pass a Zod schema shaped like
 * { body?, params?, query? } and it will validate the matching parts of
 * the request, replacing them with the parsed (and coerced/trimmed)
 * values so controllers always receive clean data.
 */
const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse({
    body: req.body,
    params: req.params,
    query: req.query,
  });

  if (!result.success) {
    const errors = result.error.issues.map((issue) => ({
      field: issue.path.slice(1).join('.'), // drop the leading body/params/query
      message: issue.message,
    }));
    return next(ApiError.badRequest('Validation failed', errors));
  }

  if (result.data.body) req.body = result.data.body;
  if (result.data.params) req.params = result.data.params;
  if (result.data.query) req.query = result.data.query;

  next();
};

module.exports = validate;

function getPagination(page, size) {
  const limit = size ? +size : 10;
  const offset = +page ? (+page - 1) * limit : 0;
  console.log('limit', limit, 'offset', offset)
  return { limit, offset };
}

export default getPagination;

class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 1B) Advenced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));
    // let query = Tour.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      // const sortBy = req.query.sort.replace(',', ' ');
      this.query = this.query.sort(sortBy);
    } else {
      // quyidagi name propertysi ma'lumotlar bir vaqtda saqlanib qolgani uchun paginatsiyada muammo bo'ldi shuning uchun sortlashda qo'shimcha parametrni ishlatishga to'g'ri keldi odatda ma'lumotlar bir vaqtda saqlanib qolmaydi, shuning uchun odatda faqat createdAt propertysiga ko'ra sortlasak bo'ladi boshqa propertsiz
      this.query = this.query.sort('-createdAt, name');
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.replaceAll(',', ' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 10;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    if (this.queryString.page) {
      // const numTours = await Tour.countDocuments();
      // if (skip >= numTours) throw new Error('This page does not exists');
    }
    return this;
  }
}

module.exports = APIFeatures;

class ApiFeature {
     constructor(query, queryString) {
          this.query = query;
          this.queryString = queryString;
     }

    filter() {
    //1 BUILD QUERY remove unrelated for filtering queries other queries
    const queryObj = { ...this.queryString };
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach(el => delete queryObj[el]);

    // 1.2 ADVANCED FILTERING: Convert query parameters like field[operator]=value to MongoDB format { field: { $operator: value } }
    const processedQueryObj = {};
    Object.keys(queryObj).forEach(key => {
      const match = key.match(/(.+?)\[(gte|gt|lte|lt)\]/); // Check for field[operator]
      if (match) {
        const field = match[1];
        const operator = match[2];
        if (!processedQueryObj[field]) {
          processedQueryObj[field] = {};
        }

        // Ensure the value is cast to a number if it's a numeric operator
        const value = ['gte', 'gt', 'lte', 'lt'].includes(operator) && !isNaN(parseFloat(queryObj[key])) ? parseFloat(queryObj[key]) : queryObj[key];
        processedQueryObj[field][`$${operator}`] = value;
      } else {
        processedQueryObj[key] = queryObj[key]; // For simple equality like difficulty=easy
      }
    });

    console.log('Processed MongoDB Query:', processedQueryObj); // Log the processed query for verification
    this.query = this.query.find(processedQueryObj); // Update this.query
    return this; // Return this for chaining
  }
  sort(){
    // 02 Sort 
    if (this.queryString.sort) { // Should use features.queryString or be part of features.sort()
      const sortBy = this.queryString.sort.split(',').join(' ')
      this.query = this.query.sort(sortBy); // Modify features.query
    } else {
      this.query = this.query.sort('-createdAt'); // Modify features.query
    }
    return this; // Return this for chaining
  }

  pagination(){
    //04 pagination
  const page = this.queryString.page * 1 ;
  const limit = this.queryString.limit * 5 ;
  const skip = (page - 1) * limit;

  this.query = this.query.skip(skip).limit(limit); // Corrected 'features.query' to 'this.query'
  return this; // Return this for chaining
  }

  // Method for limiting the fields returned in the query result
  limitFields() {
    if (this.queryString.fields) {

      // const fieldsToSelect = { field: 'difficulty,maxGroupSize,duration,name' };

      const fieldsToSelect = this.queryString.fields.split(',').join('');
      this.query = this.query.select(fieldsToSelect);
    } else {
      // By default, exclude the __v field (common practice)
      // If you want all fields by default, you can remove this else block
      // or simply not call select(), as Mongoose returns all fields by default.
      this.query = this.query.select('-__v');
    }
    return this; // Return this for chaining
  }
}

module.exports = ApiFeature;

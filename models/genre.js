let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let GenreSchema = new Schema(
  {
    name: { type: String, required: true, maxlength: 100, minlength: 3 } //reference to the associated book
  }
);

// Virtual for bookinstance's URL
GenreSchema
.virtual('url')
.get(function () {
  return '/catalog/genre/' + this._id;
});

//Export model
module.exports = mongoose.model('Genre', GenreSchema);
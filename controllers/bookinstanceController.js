let BookInstance = require("../models/bookinstance");

// Display list of all BookInstances.
exports.bookinstance_list =  (req, res) => {
  BookInstance.find()
  .populate('book')
  .exec(function (err, list_bookinstances) {
    if (err) { return next(err); }
    // Successful, so render
    res.render('bookinstance_list', { title: 'Book Instance List', bookinstance_list: list_bookinstances });
  });
};

// Display detail page for a specific BookInstance.
exports.bookinstance_detail =  (req, res) => {
    res.send("NOT IMPLEMENTED: BookInstance detail: " + req.params.id);
};

// Display BookInstance create form on GET.
exports.bookinstance_create_get =  (req, res) => {
  if (req.session.loggedIn) {
    res.send("NOT IMPLEMENTED: BookInstance create GET");
  } else {
    res.redirect("/login");
  }
};

// Handle BookInstance create on POST.
exports.bookinstance_create_post =  (req, res) => {
  if (req.session.loggedIn) {
    res.send("NOT IMPLEMENTED: BookInstance create POST");
  } else {
    res.redirect("/login");
  }
};

// Display BookInstance delete form on GET.
exports.bookinstance_delete_get =  (req, res) => {
  if (req.session.loggedIn) {
    res.send("NOT IMPLEMENTED: BookInstance delete GET");
  } else {
    res.redirect("/login");
  }
};

// Handle BookInstance delete on POST.
exports.bookinstance_delete_post =  (req, res) => {
  if (req.session.loggedIn) {
    res.send("NOT IMPLEMENTED: BookInstance delete POST");
  } else {
    res.redirect("/login");
  }
};

// Display BookInstance update form on GET.
exports.bookinstance_update_get =  (req, res) => {
  if (req.session.loggedIn) {
    res.send("NOT IMPLEMENTED: BookInstance update GET");
  } else {
    res.redirect("/login");
  }
};

// Handle bookinstance update on POST.
exports.bookinstance_update_post =  (req, res) => {
  if (req.session.loggedIn) {
    res.send("NOT IMPLEMENTED: BookInstance update POST");
  } else {
    res.redirect("/login");
  }
};

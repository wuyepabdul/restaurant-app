exports.create = async (req, res) => {
  setTimeout(() => {
    res.json({
      successMessage: `Successfully created ${req.body.category} category`,
    });
  }, 3000);
};

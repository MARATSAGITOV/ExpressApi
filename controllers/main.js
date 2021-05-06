exports.getMain = function(req, res, next) {
    res.render('index', { title: 'Express' });
}
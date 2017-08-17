const Task = require('../models/Task');

module.exports = {
    index: (req, res) => {
        Task.find().then(tasks => {
            res.render('task/index', {
                'openTasks': tasks.filter(t => t.status === "Open"),
                'inProgressTasks': tasks.filter(t => t.status === "In Progress"),
                'finishedTasks': tasks.filter(t => t.status === "Finished")
            });
        });
    },
    createGet: (req, res) => {
        res.render('task/create');
    },
    createPost: (req, res) => {
        let task = req.body;
        Task.create(task).then(task => {
            res.redirect("/");
        }).catch(err => {
            task.error = 'Cannot create task.';
            res.render('task/create', task);
        });
    },
    editGet: (req, res) => {
        let id = req.params.id;
        Task.findById(id).then(task => {
            if (task === null) {
                res.redirect("/");
            } else {
                res.render('task/edit', task);
            }
        }).catch(err => {return res.redirect("/")});
    },
    editPost: (req, res) => {
        let id = req.params.id;
        let task = req.body;
        Task.findByIdAndUpdate(id, task, {runValidators: true}).then(tasks => {
          res.redirect("/");
        }).catch(err => {
            task.id = id;
            task.error = "Cannot edit task";
            return res.render('task/edit', task);
        });
    }
};
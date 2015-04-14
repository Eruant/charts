Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function () {
        return Meteor.subscribe('charts');
    }
});

Router.route('/', {
    name: 'chartList',
    data: function () {
        return Charts.find({});
    }
});

Router.route('/chart/:_id', {
    name: 'chartItem',
    data: function () {
        return Charts.findOne(this.params._id);
    }
});

Router.route('/new', {
    name: 'createNewChart'
});

var requireLogin = function () {

    if (!Meteor.user()) {
        this.render('accessDenied');
    } else {
        this.next();
    }
};

Router.onBeforeAction('dataNotFound', {
    only: 'chartItem'
});

Router.onBeforeAction(requireLogin, {
    only: 'createNewChart'
});

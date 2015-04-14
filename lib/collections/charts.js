Charts = new Mongo.Collection('charts');

Charts.allow({
    insert: function (userId, doc) {
        return !!userId;
    }
});

Meteor.methods({

    chartInsert: function (chartAttr) {

        check(Meteor.userId(), String);
        check(chartAttr, {
            title: String
        });

        var user = Meteor.user();
        var chart = _.extend(chartAttr, {
            userId: user._id,
            author: user.username,
            submitted: new Date()
        });

        var chartId = Charts.insert(chart);

        return {
            _id: chartId
        };
    }

});

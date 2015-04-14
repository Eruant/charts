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
            submitted: new Date(),
            results: []
        });

        var chartId = Charts.insert(chart);

        return {
            _id: chartId
        };
    },

    chartAddValue: function (answerAttr) {

        check(Meteor.userId(), String);
        check(answerAttr, {
            _id: String,
            value: String
        });

        //var user = Meteor.user();
        var chart = Charts.findOne({
            _id: answerAttr._id
        });

        var newValue = {
            name: answerAttr.value,
            value: 1
        };

        var results = chart.results;
        var incrementResults = false;

        _.each(results, function (element, index, list) {
            if (element.name === newValue.name) {
                element.value++;
                incrementResults = true;
            }
        });

        if (incrementResults) {
            // increment value
            Charts.update(answerAttr._id, {
                $set: {
                    results: results
                }
            });
        } else {
            // add new value
            Charts.update(answerAttr._id, {
                $addToSet: {
                    results: newValue
                }
            });
        }
    }

});

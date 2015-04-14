Meteor.publish('charts', function () {
    return Charts.find({});
});

Template.chartItem.rendered = function () {

};

Template.chartItem.helpers({

});

Template.chartItem.events({

    'submit form': function (e) {
        e.preventDefault();

        var $answer = $(e.target).find('[name=answer]');

        var answer = {
            _id: this._id,
            value: $answer.val().toLowerCase()
        };

        Meteor.call('chartAddValue', answer, function (error, result) {

            if (error) {
                alert(error.reason);
            }
        });

        $answer.val('');

    }
});

Template.chartItem.rendered = function () {

    var paper = Raphael('paper', 100, 100);
    var rect = paper.rect(0, 0, 100, 100);
    rect.attr('fill', '#f00');
    var circle = paper.circle(50, 50, 30);
    circle.attr('fill', '#0f0');

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

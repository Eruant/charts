Template.createNewChart.helpers({

    title: 'Create a new chart'

});

Template.createNewChart.events({

    'submit form': function (e) {
        e.preventDefault();

        var chart = {
            title: $(e.target).find('[name=title]').val()
        };

        Meteor.call('chartInsert', chart, function (error, result) {

            if (error) {
                alert(error.reason);
            }

            Router.go('chartItem', result);
        });

    }

});

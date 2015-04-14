drawChart = function (results) {

    if (!results.length) {
        return false;
    }

    var paperWidth = 800,
        paperHeight = 400,
        padding = {
            t:30, // top
            r:20, // right
            b:20, // bottom
            l:20  // right
        },
        barWidth = paperWidth / results.length,
        heighestValue = 0;

    _.each(results, function (element) {
        if (element.value > heighestValue) {
            heighestValue = element.value;
        }
    });

    var unitHeight = paperHeight / heighestValue;

    $('#paper').empty();

    var paper = Raphael('paper',
        paperWidth + padding.l + padding.r,
        paperHeight + padding.t + padding.b
    );

    paper.setViewBox(0, 0, paper.width, paper.height, true);

    paper
        .rect(0, 0, paper.width, paper.height)
        .attr('fill', '#fff');

    _.each(results, function (element, index, list) {

        var barHeight = unitHeight * element.value,
            offsetTop = paperHeight - barHeight,
            barPadding = 10,
            x = index * barWidth + padding.l + barPadding,
            y = offsetTop + padding.t,
            text = element.name.charAt(0).toUpperCase() + element.name.slice(1);

        paper
            .rect(x, y, barWidth - (barPadding * 2), barHeight)
            .attr('fill', '#336');

        paper
            .text(x + barPadding + 2, paperHeight + padding.t - barPadding, text)
            .transform('r90')
            .attr({
                'text-anchor': 'end',
                'font-size': 14,
                'font-family': 'Arial',
                'fill': '#fff'
            });
    });

};

Template.chartItem.rendered = function () {
    drawChart(this.data.results);

    Charts.find(this.data._id).observe({
        changed: function (chart) {
            drawChart(chart.results);
        }
    });
};

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

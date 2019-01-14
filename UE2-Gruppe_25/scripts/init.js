$(document).ready(function() {

    // TODO init: initialize all counters
	let devicesCounter = new Counter($('#counter > .devices-counter'));
	let arrowsCounter = new Counter($('#counter > .arrows-counter'));

    // TODO init: initialize controls
	let controls = new Controls($('#controls'));

    // TODO init: initialize diagram and transfer counters and controls
	let diagram = new Diagram('#diagram', '#arrow-sidebar-add', devicesCounter, arrowsCounter, controls);

    // TODO init: add drag functionality to devices in sidebar
	$('#devices > .device').draggable({
		helper: function(ev) {
			return $(this).find('.device-image').clone();
		},
		cursor: 'move'
	});
});

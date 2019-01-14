/**
 * A class representing one arrow
 *
 * @param {Diagram} diagram The diagram on which this arrow is shown
 * @param {Device} startDevice The start node for this arrow
 * @class
 */
function Arrow(diagram, startDevice) {
    "use strict";
    const _this = this;

    /**
     * The start node for this arrow
     * @member {Device}
     */
    this.startDevice = startDevice;

    /**
     * The (optional) end node for this arrow
     * @member {?Device}
     */
    this.endDevice = null;

    /**
     * The jQuery DOM object representing this arrow
     */
    const object = $(
        // TODO arrow: create jQuery object for the SVG path
		document.createElementNS('http://www.w3.org/2000/svg', 'path')
    ).addClass('arrow-path');

    // TODO arrow: add variables if necessary
	this.diagram = diagram;

    // TODO arrow: append the arrow DOM object to the arrows svg
	$('#diagram > .arrows > svg').append(object);

    // Initialize the event handlers
    attachEventHandlers();

    /**
     * Add the event handlers for the diagram
     */
    function attachEventHandlers() {
        // TODO arrow: attach events for functionality like in assignment-document described
		object.on('click', () => _this.diagram.arrowClick(_this));
		
        // TODO arrow optional: attach events for bonus points for 'TAB' to switch between arrows and to select arrow
    }

    /**
     * Add this arrow to the end nodes, if not yet present
     * @returns {boolean} True if the arrow was added, false if it was already present
     */
    function add() {
        if (!_this.endDevice || _this.endDevice === _this.startDevice || _this.startDevice.isConnectedTo(_this.endDevice)) {
            return false;
        }

        _this.startDevice.addArrowOut(_this);
        _this.endDevice.addArrowIn(_this);
        object.addClass("arrow-path-added");
        return true;
    }

    /**
     * Mark this device as active or inactive
     * @param {boolean} active
     */
    function setActive(active) {
        // TODO arrow: set/remove active class of arrow
		object.toggleClass('active', active);
    }

    /**
     * Update the end position of the arrow path
     * @param {number[]} endPosition New end position of the arrow
     */
    function updateEndPosition(endPosition) {
        // TODO arrow: draw an arrow between the start device and the given end position
        // HINT You can use Device.getIntersectionCoordinates to calculate the coordinates for the start device
		console.log('updateEndPosition');
		
		let dString = '';
		let startCoordinates = _this.startDevice.getIntersectionCoordinates(endPosition);
		dString += 'M' + startCoordinates[0] + ',' + startCoordinates[1] + ' L' + endPosition[0] + ',' + endPosition[1];
		object.attr('d', dString);
    }

    /**
     * Update the arrow path according to the device positions, or hide the path if no end device is set
     */
    function updateArrow() {
        // TODO arrow: draw an arrow between the start and end device
        // HINT You can use Device.getCenterCoordinates and Device.getIntersectionCoordinates
		console.log('updateArrow');
		
		let dString = '';
		let startCoordinates = _this.startDevice.getIntersectionCoordinates(_this.endDevice.getCenterCoordinates());
		dString += 'M' + startCoordinates[0] + ',' + startCoordinates[1];
		if(_this.endDevice) {
			let endCoordinates = _this.endDevice.getIntersectionCoordinates(_this.startDevice.getCenterCoordinates());
			dString += ' L' + endCoordinates[0] + ',' + endCoordinates[1];
		}
		object.attr('d', dString);
    }

    /**
     * Set the end device for this arrow
     * @param {Device} device The device to use as endpoint
     */
    function setEndDevice(device) {
        _this.endDevice = device;
        updateArrow();
    }

    /**
     * Remove this arrow from the DOM and its devices
     */
    function deleteArrow() {
        // TODO arrow: delete arrow from HTML DOM and from the devices of the endpoints of the arrow
		if(!isTemporaryArrow()) {
			_this.startDevice.deleteArrow(_this);
			_this.endDevice.deleteArrow(_this);
		}
		object.remove();
    }
	
	function isTemporaryArrow() {
		return !object.hasClass('arrow-path-added');
	}

    // Export some of the methods
    this.add = add;
    this.setActive = setActive;
    this.updateEndPosition = updateEndPosition;
    this.updateArrow = updateArrow;
    this.setEndDevice = setEndDevice;
    this.deleteArrow = deleteArrow;
}

/**
 * Class for the complete diagram
 * @param {string} areaSelector
 * @param {string} arrowButtonSelector
 * @param {Counter} devicesCounter
 * @param {Counter} arrowsCounter
 * @param {Controls} controls
 * @class
 */
function Diagram(areaSelector, arrowButtonSelector, devicesCounter, arrowsCounter, controls) {
    "use strict";
    const _this = this;

    /**
     * The jQuery object containing the diagram wrapper
     * @const
     */
    this.area = $(areaSelector);

    /**
     * The jQuery object containing the arrow button in the sidebar
     */
    const arrowButton = $(arrowButtonSelector);

    /**
     * The jQuery object containing the arrows svg area
     * @const
     */
    this.arrows = this.area.find(".arrows svg");

    /**
     * The jQuery object containing the device list
     * @const
     */
    this.devices = this.area.find(".devices");

    /**
     * The jQuery object containing the context menu
     */
    const context = $(".contextMenu");

    // TODO diagram: add variables for drawing mode and to store selected devices and arrows
	this.arrowDrawingMode = false;
	this.selectedDevice = null;
	this.selectedArrow = null;
	this.controls = controls;
	this.hoveredDevice = null;
	this.devicesCounter = devicesCounter;
	this.arrowsCounter = arrowsCounter;
	this.devicesTitleCounter = 1;
	
	const arrowButtonSmall = $('#arrow-device-add-reference');
	this.area.append(arrowButtonSmall);
	arrowButtonSmall.hide();

    // Initialize events
    attachEventHandlers();

    /**
     * Add the event handlers for the diagram
     */
    function attachEventHandlers() {
        // TODO diagram: prevent standard context menu inside of diagram
		_this.area.on('contextmenu', event => false);

        // TODO diagram: attach mouse move event and draw arrow if arrow active mode is on
		arrowButton.on('click', toggleArrowActive);
		
		$(document).keypress(function(e) {
			if(e.which == 97 || e.which == 65) {
				toggleArrowActive();
			}
		});
		
		arrowButtonSmall.on('click', function() {
			_this.selectedDevice = _this.hoveredDevice;
			_this.arrowDrawingMode = true;
			addTemporaryArrow();
		});
		
		
		_this.area.mousemove(function( event ) {
			if(_this.arrowDrawingMode && _this.selectedDevice) {
				_this.selectedArrow.updateEndPosition(getRelativeCoordinates(event.pageX, event.pageY));
			}
		});

        // TODO diagram: add device drop functionality by jquery ui droppable and prevent dropping outside the diagram
		_this.area.droppable({
			accept: '#devices > .device',
			drop: addDevice,
			tolerance: "fit"
		});

        // TODO diagram: attach mousedown event to body element and remove all active modes like arrow drawing active mode or selected device mode
		/*$('body').on('click', function(event) {
			deactivateArrowDrawing();
		});*/

        // TODO diagram: attach keyup event to html element for 'ENTF' ('DEL') (delete device or arrow) and 'a'/'A' (toggle arrow active mode)

        // TODO diagram: attach events for context menu items ('Detailseite', 'Löschen')
    }

    /**
     * Toggle whether drawing arrows is active or not
     */
    function toggleArrowActive() {
        // TODO diagram: toggle arrow active mode (call deactivateArrowDrawing() or activateArrowDrawing()
		console.log('toggleArrowActive');
		if(_this.arrowDrawingMode) {
			deactivateArrowDrawing();
		} else {
			activateArrowDrawing();
		}
    }
	
	function setHoveredDevice(device) {
		_this.hoveredDevice = device;
	}

    /**
     * Append the currently drawn arrow to the diagram
     */
    function addArrow() {
        // TODO diagram: if drawing arrow mode is on, create Arrow object
		console.log('addArrow');
		_this.selectedArrow.add();
		_this.arrowsCounter.alterCount(1);
    }
	
	function addTemporaryArrow() {
		if(_this.arrowDrawingMode && _this.selectedDevice) {
			console.log('creating new arrow');
			_this.selectedArrow = new Arrow(_this, _this.selectedDevice);
		}
	}

    /**
     * Set arrow drawing to active
     */
    function activateArrowDrawing() {
        // TODO diagram: reset selected arrows and selected devices, enable arrow active mode and add active class to arrow button in sidebar
		arrowButton.addClass('active');
		selectDevice(null);
		_this.selectedArrow = null;
		_this.arrowDrawingMode = true;
    }

    /**
     * Set arrow drawing to inactive and delete the temporary arrow
     */
    function deactivateArrowDrawing() {
        // TODO diagram: disable arrow active mode and remove active class to arrow button in sidebar
		arrowButton.removeClass('active');
		_this.arrowDrawingMode = false;
    }

    /**
     * TODO diagram: use this function to get relative coordinates of devices inside diagram
     * Determine the coordinates relative to the diagram area's top left corner
     * @param {number} x The absolute x coordinate
     * @param {number} y The absolute y coordinate
     * @returns {number[]} An array with two elements containing the relative x and y coordinates
     */
    function getRelativeCoordinates(x, y) {
        return [
            x - _this.area.offset().left - _this.area[0].clientLeft,
            y - _this.area.offset().top - _this.area[0].clientTop
        ];
    }

    /**
     * Add a new device on dropping it onto the diagram area
     * @param event The jQuery event instance
     * @param ui The jQuery UI instance
     */
    function addDevice(event, ui) {
        // TODO diagram: check if dragged device is inside diagram, if not => do nothing
		
		let dropPosition = $(ui.helper).offset();
		let position = getRelativeCoordinates(dropPosition.left, dropPosition.top);
		let title = $(ui.draggable).attr("title") + ' ' + _this.devicesTitleCounter++;
		let type = $(ui.draggable).attr("data-device-type");
		let min= $(ui.draggable).attr("data-device-min");
        let max= $(ui.draggable).attr("data-device-max");

		
		let device = new Device(_this, 0, position, type, title, min, max, images[type], update[type]);
		
		_this.controls.addDevice(device);
		_this.devicesCounter.alterCount(1);

        /**
         * TODO diagram: if dragged device is inside diagram, add dragged device to diagram
         *                 + get data added to html object in overview
         *                 + add image of device-resources.js
         *                 + add update function of device-updating-states.js
         *                 + create object of Device and transmit parameters
         *                 + add device to Controls
         *                 + adapt device counter of controls
         */
    }

    /**
     * Callback for clicking on an arrow
     * @param {Arrow} arrow the arrow instance
     */
    function arrowClick(arrow) {
        // TODO diagram: call selectArrow() with arrow, if arrow!=selectedArrow, otherwise with null
		if(_this.selectedArrow !== arrow) {
			if(_this.selectedArrow)
				_this.selectedArrow.setActive(false);
			arrow.setActive(true);
			selectArrow(arrow);
		} else {
			arrow.setActive(false);
			selectArrow(null);
		}
    }

    /**
     * Callback for opening the context menu for the given device
     * @param {Device} device the device instance
     * @param event The jQuery Event instance
     */
    function showContextMenu(device, event) {
        // TODO diagram: show context menu + select device + deactivate arrow drawing
		deactivateArrowDrawing();
		selectDevice(device);
		alert('test');
    }

    /**
     * Callback for mouse down on a device
     * @param {Device} device the device instance
     */
    function deviceMouseDown(device) {
        /**
         * TODO diagram: this method should be called in model-device.js if device a device is clicked
         *              + if arrow drawing mode is enabled and no device is selected before, create new object of Arrow for drawingArrow
         *              + if arrow drawing mode is enabled and a device was already selected before, add the drawn arrow between two devices
         *              + if selected device before is equal to new selected device, disable arrow drawing mode and delete drawn arrow from device to mouse position
         */
		console.log('mouseDown');
		
		if(_this.selectedDevice !== device) {
			if(_this.arrowDrawingMode) {
				if(_this.selectedDevice) {
					//end device -> save arrow
					console.log('end device selected');
					
					_this.selectedArrow.setEndDevice(device);
					addArrow();
					deactivateArrowDrawing();
				} else {
					//start device -> create arrow
					console.log('start device selected');
					selectDevice(device);
					addTemporaryArrow();
				}
			}
			
			selectDevice(device);
		} else {
			selectDevice(null);
			if(_this.arrowDrawingMode) {
				//same device clicked -> disable arrow drawing mode
				deleteSelectedArrow();
				deactivateArrowDrawing();
			}
		}
    }

    /**
     * Callback for releasing the mouse over a device (end of mouse movement)
     * @param {Device} device the device instance
     */
    function deviceMouseUp(device) {
        // TODO diagram: if drawing arrow mode is enabled and start device != end device, set end device of drawing arrow and add drawing arrow with addArrow()
    }

    /**
     * Select the given arrow
     * @param {?Arrow} arrow The arrow to select, or null to unselect
     */
    function selectArrow(arrow) {
        // TODO diagram: select arrow
		_this.selectedArrow = arrow;
    }

    /**
     * Select the given device
     * @param {?Device} device The device to select, or null to unselect
     */
    function selectDevice(device) {
        // TODO diagram: select device
		if(_this.selectedDevice)
				_this.selectedDevice.setActive(false);
		if(device)
				device.setActive(true);
		_this.selectedDevice = device;
    }

    /**
     * Remove the selected arrow
     */
    function deleteSelectedArrow() {
        // TODO diagram: delete selected arrow
		if(_this.selectedArrow) {
			_this.selectedArrow.deleteArrow();
			selectArrow(null);
		}
    }

    /**
     * Completely remove the selected device
     */
    function deleteSelectedDevice() {
        // TODO diagram: delete selected device
		
		_this.devicesCounter.alterCount(-1);
    }

    // Export some methods
    this.activateArrowDrawing = activateArrowDrawing;
    this.arrowClick = arrowClick;
    this.showContextMenu = showContextMenu;
    this.deviceMouseDown = deviceMouseDown;
    this.deviceMouseUp = deviceMouseUp;
	this.setHoveredDevice = setHoveredDevice;
}

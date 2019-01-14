/**
 * A class used for updating the values of the devices
 * @param form The jQuery container for the form
 * @class
 */
function Controls(form) {

    /**
     * The current values loaded from the form
     * @type {object}
     */
    let values = {};

    /**
     * A list of devices that should be updated with new values
     * @type {Device[]}
     */
    const devices = [];


    // TODO controls: add variables if necessary


    // Listen for updates
    form.submit(event => {
        event.preventDefault();
        updateDevices();
    });

    // Load initial values
    updateDevices();

    /**
     * Read the current values and update all registered devices
     */
    function updateDevices() {
        // TODO controls: get values of all controls of the form and call updateDevice on each device
		let device;
		let value;
		for(let i = 0; i < devices.length; i++) {
			device = devices[i];
			switch(device.type) {
				case 'item-generator':

					value = $('#control-item-generator').val();
					break;
                case 'interim-storage':
                    value = $('#control-interim-storage').val();
                    break;
                case 'machine':
                    value= $('#control-machine').val();
                    break;
                case 'conveyor':
                    value = $('#control-conveyor').prop("checked");
                    break;
                case 'intelligent-conveyor':
                    value = $('#control-intelligent-conveyor').prop("checked");
                    break;
                case 'end-storage':
                    value = $('#control-end-storage').val();
                    break;
                case 'trash-storage':
                    value = $('#control-trash-storage').val();
                    break;

				default:
					break;
			}
			device.updateDevice(value);
		}
    }

    /**
     * Add a device to the list and set to the current value
     * @param {Device} device The device object to add
     */
    function addDevice(device) {
        // TODO controls: add dropped device to list and update the state of the device
		devices.push(device);
    }

    /**
     * Remove a device from the list
     * @param {Device} device
     */
    function removeDevice(device) {
        // TODO controls: remove deleted device from list
    }

    // Export public methods
    this.addDevice = addDevice;
    this.removeDevice = removeDevice;
}

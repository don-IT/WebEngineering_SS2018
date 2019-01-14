/**
 * A class used for controlling the values of a counter
 * @param element The jQuery container element for the number
 * @class
 */
function Counter(element) {
    "use strict";

    /**
     * The number of currently added elements
     * @member {number}
     */
    let count = 0;

    /**
     * Update the number of added elements
     * @param {number} difference The number by which the counter should be increased/decreased
     */
    function alterCount(difference) {
        // TODO counter: adapt counter and update counter in overview.html
		count += difference;
		element.text(count);
    }

    // Export methods
    this.alterCount = alterCount;
}

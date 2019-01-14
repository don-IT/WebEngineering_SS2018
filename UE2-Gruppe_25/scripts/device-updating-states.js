const update = {
    "item-generator": updateItemGenerator,
    "machine": updateMachine,
    "conveyor": updateConveyor,
    "intelligent-conveyor": updateIntelligentConveyor,
    "interim-storage": updateInterimStorage,
    "end-storage": updateStorage,
    "trash-storage": updateStorage
};

/**
 * Update the image of an item generator ("3D-Drucker")
 * @param container The jQuery container for the device
 * @param {?number} min The minimum value for the device
 * @param {?number} max The maximum value for the device
 * @param value The new value to set
 */
function updateItemGenerator(container, min, max, value) {
    min=0;
    max=2;
    if(min<=value && max >=value){
        if(value==1){
            container.find('.thirdPlane').hide();
            container.find('.secondPlane').show();
        }
        if(value==0){
            container.find('.thirdPlane').hide();
            container.find('.secondPlane').hide();
        }
        if(value==2){
            container.find('.thirdPlane').show();
            container.find('.secondPlane').show();
        }
    }
    

}

/**
 * Update the image of a machine ("Maschine")
 * @param container The jQuery container for the device
 * @param {?number} min The minimum value for the device
 * @param {?number} max The maximum value for the device
 * @param value The new value to set
 */
function updateMachine(container, min, max, value) {

 
    var min_label = container.find("title:contains(min_label)").parent().find("tspan");

    var max_label = container.find("title:contains(max_label)").parent().find("tspan");

    if (typeof container === "undefined" || typeof min_label === "undefined" || typeof max_label === "undefined") {
        return;
    }

    if(value<34){
        container.find('#path3680').css('fill' , '#007d27');
    }else if(value>66){
        container.find('#path3680').css('fill' , 'red');
    }else{
        container.find('#path3680').css('fill' , '#ff7b25');
    }


    min_label.text(min);
    max_label.text(max);

    var min_y = container.find("title:contains(max_temp)").parent().attr("y") + 1;
    var max_y = container.find("title:contains(min_temp)").parent().attr("y") + 1;
    if(value>100){
        value=100;
    }
    var div = 100 - 0;
    var delta = Math.abs(max_y - min_y) / div;

    var y = Math.round((max_y - delta * (Math.abs(min) + value)) * 100000) / 100000;

    var path = container.find("title:contains(cur_temp)").parent();
    var d = path.attr("d");
    d = d.replace(d.split(' ')[4], y);

    path.attr("d", d);

}

/**
 * Update the image of a conveyor ("Förderband")
 * @param container The jQuery container for the device
 * @param {?number} min The minimum value for the device
 * @param {?number} max The maximum value for the device
 * @param value The new value to set
 */
function updateConveyor(container, min, max, value) {
    
        if(value==false){
            container.find('.package').hide();     
        }else{
            container.find('.package').show();
        }
        

}

/**
 * Update the image of an intelligent conveyor ("Intelligentes Förderband")
 * @param container The jQuery container for the device
 * @param {?number} min The minimum value for the device
 * @param {?number} max The maximum value for the device
 * @param value The new value to set
 */
function updateIntelligentConveyor(container, min, max, value) {
    
        if(value==false){
            container.find('.packageLeft').hide();     
            container.find('.packageRight').hide();  
        }else{
            container.find('.packageLeft').show();     
            container.find('.packageRight').show();  
        }
        

}

/**
 * Update the image of an interim storage ("Temporäres Lager")
 * @param container The jQuery container for the device
 * @param {?number} min The minimum value for the device
 * @param {?number} max The maximum value for the device
 * @param value The new value to set
 */
function updateInterimStorage(container, min, max, value) {
    
        if(value==0){
   container.find('.packageBottom').hide();
    container.find('.packageTop').hide();
}else if(value >0 && value < 5){
            container.find('.packageTop').hide();
            container.find('.packageBottom').show();
        }else{
            container.find('.packageBottom').show();
    container.find('.packageTop').show();
        }


}


/**
 * Update the image of an end storage ("Endlager") or a trash storage ("Mülllager")
 * @param container The jQuery container for the device
 * @param {?number} min The minimum value for the device
 * @param {?number} max The maximum value for the device
 * @param value The new value to set
 */
function updateStorage(container, min, max, value) {
    if(min<=value && value <=10){
       if ( container.find('#tspan837').length){ container.find('#tspan837').text(value);} else{ 
        container.find('#tspan866').text(value);
    }
}else{
          if ( container.find('#tspan837').length){ container.find('#tspan837').text(10);} else{ 
        container.find('#tspan866').text(10);
    }
}

}

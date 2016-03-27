// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery_ujs
//= require turbolinks
//= require_tree ../../../vendor/assets/javascripts/

//= require_directory .

var bright = document.getElementById("bright");

bright.onchange = function(){
        var b_v = bright.value,
            max = bright.max,
            range_x = bright.clientWidth;
        var b_r =  (range_x / max);
        b_r = (b_r*b_v);
        var bright_bar = document.getElementById("bright_bar");
        bright_bar.style.width = b_r+"px";
        change_img.style.webkitFilter = "brightness("+b_v+"%)";
    
};

function changeBarValue(value) {
    document.getElementById("bar_val").innerHTML = value;
};

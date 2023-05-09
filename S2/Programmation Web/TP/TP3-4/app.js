function display_elements_by_class(name_class) {
    var elem = document.getElementsByClassName(name_class);
    for(i=0; i<elem.length; i++) {
        elem[i].style.display = 'inline';
    }
}

function hide_elements_by_class(name_class) {
    var elem = document.getElementsByClassName(name_class);
    for(i=0; i<elem.length; i++) {
        elem[i].style.display = 'none';
    }
}


/**  SLIDER MOVIE  ********************************************************************/


const link = document.URL;

if(!link.includes("sub-page.html")) {
    var elem_slide = document.getElementsByClassName('slide');
    var text_slide = document.getElementsByClassName('slide-text');
    var index = 0;
    var nb_elem_slide = elem_slide.length;

    function showSlides() {
        index = (index + 1) % nb_elem_slide;
        hide_elements_by_class('slide');
        hide_elements_by_class('slide-text');
        
        elem_slide[index].style.display = 'inline';
        text_slide[index].style.display = 'inline';

        setTimeout(showSlides, 3000);
    }

    showSlides();


    document.getElementById("right").onclick = function() {
        index = (index + 1) % nb_elem_slide;
        hide_elements_by_class('slide');
        hide_elements_by_class('slide-text');
        
        elem_slide[index].style.display = 'inline';
        text_slide[index].style.display = 'inline';
    }

    document.getElementById("left").onclick = function() {
        index = (index - 1) % nb_elem_slide;
        if(index === -1) index = nb_elem_slide - 1;
        hide_elements_by_class('slide');
        hide_elements_by_class('slide-text');
        
        elem_slide[index].style.display = 'inline';
        text_slide[index].style.display = 'inline';
    }

}





/**  IMAGE GALLERY FILTER  ************************************************************/

document.getElementById('all').onclick = function() {
    display_elements_by_class('action');
    display_elements_by_class('adventure');
    display_elements_by_class('comedy');
    display_elements_by_class('fantasy');
    display_elements_by_class('family');
}

document.getElementById('action').onclick = function() {
    hide_elements_by_class('adventure');
    hide_elements_by_class('comedy');
    hide_elements_by_class('fantasy');
    hide_elements_by_class('family');
    display_elements_by_class('action');
}

document.getElementById('adventure').onclick = function() {
    hide_elements_by_class('action');
    hide_elements_by_class('comedy');
    hide_elements_by_class('fantasy');
    hide_elements_by_class('family');
    display_elements_by_class('adventure');
}

document.getElementById('comedy').onclick = function() {
    hide_elements_by_class('action');
    hide_elements_by_class('adventure');
    hide_elements_by_class('fantasy');
    hide_elements_by_class('family');
    display_elements_by_class('comedy');
}

document.getElementById('fantasy').onclick = function() {
    hide_elements_by_class('action');
    hide_elements_by_class('adventure');
    hide_elements_by_class('comedy');
    hide_elements_by_class('family');
    display_elements_by_class('fantasy');
}

document.getElementById('family').onclick = function() {
    hide_elements_by_class('action');
    hide_elements_by_class('adventure');
    hide_elements_by_class('comedy');
    hide_elements_by_class('fantasy');
    display_elements_by_class('family');
}



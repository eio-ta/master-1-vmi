$(document).ready(function() {

    // ANIMATION HOME-PAGE : NAVIGATION BAR
    $(window).scroll(function() {
        var height = $('.hp-bg-image').height();
        var scrollTop = $(window).scrollTop();

        if(scrollTop >= height - 40) {
            $('.nav-container').addClass('solid-nav');
        } else {
            $('.nav-container').removeClass('solid-nav');
        }
    });



    // ANIMATION HOME-PAGE : IMAGE ANIMATION
    $(".hp-g-animation").animate({left: '+=900px'}, 1000);



    // ANIMATION HOME-PAGE : NUMBERS
    const counters = document.querySelectorAll(".hp-number-counter");
    const speed = 500;
    
    counters.forEach((counter) => {
        const updateCount = () => {
            const target = parseInt(+counter.getAttribute("data-target"));
            const count = parseInt(+counter.innerText);
            const increment = Math.trunc(target / speed);
            if(count < target) {
                counter.innerText = count + increment;
                setTimeout(updateCount, 1);
            } else {
                count.innerText = target;
            }
        };
        updateCount();
    });



    // ANIMATION HOME-PAGE : MESSAGES
    var hp_m_item = document.querySelectorAll(".hp-m-item");
    var index = 0;

    document.getElementById("hp-m-right").onclick = function() {
        hp_m_item[index].style.display = "none";
        index = (index + 1) % hp_m_item.length;
        hp_m_item[index].style.display = "block";
    }

    document.getElementById("hp-m-left").onclick = function() {
        hp_m_item[index].style.display = "none";
        index = (index - 1) % hp_m_item.length;
        if(index === -1) index = hp_m_item.length - 1;
        hp_m_item[index].style.display = "block";
    }

});
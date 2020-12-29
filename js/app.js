/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/
document.addEventListener('DOMContentLoaded', function () {
    //Animate On Scroll Library add it to sections
    AOS.init();

    //Define Global Variables
    const ul_nav_list = document.querySelector('.navbar__menu ul');
    const all_sections = document.querySelectorAll('section');
    const scrollToTopButton = document.querySelector('.top-link');
    
    //End Global Variables
    //Start Helper Functions

    // build the nav
    const Build_nav = () => {
        let contener_nav = '';
        all_sections.forEach(section => {

            const section_Id = section.getAttribute('id')
            const section_Lable = section.getAttribute('data-nav');

            contener_nav += `<li><a class="Link_m" href="#${section_Id}"> ${section_Lable}</a></li>`;
            
        });
        ul_nav_list.innerHTML = contener_nav;
    };

    // Add class 'active' to section when near top of viewport
    const position_size = (section) => {
        //Test value
        //console.log(section.getBoundingClientRect().top);
        let the_section = section.getBoundingClientRect().top;
        return the_section;
    };
    const active_remov = (section) => {
        section.classList.remove('your-active-class');
        section.style.background = "linear-gradient(0deg, rgba(255,255,255,.1) 0%, rgba(255,255,255,.2) 100%)";
    };
    const active_add = (role, section) => {
        if (role) {
            section.classList.add('your-active-class');
            section.style.background = "linear-gradient(0deg, rgba(1,1,1,.1) 0%, rgba(255,255,255,.2) 100%)";
        };
    };
    const active_section = () => {
        all_sections.forEach(section => {
            is_in_viewport = () => position_size(section) < 200 && position_size(section) >= -200;
            
            active_remov(section);
            active_add(is_in_viewport(), section);
        });
    };
    
    // Scroll to anchor ID using scrollTO event
    // Scroll to section on link click
    let links = document.querySelectorAll('.navbar__menu a');
    
    for (let link of links) { 
        link.addEventListener('click', (el)=> {
            let hashval = link.getAttribute('href');
            let target = document.querySelector(hashval);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // update the browser's URL History
            history.pushState(null, null, hashval);
            el.preventDefault();
        });
    };

    //End Main Functions
    //Begin Events

    // Build menu 
    Build_nav();

    // Set sections as active
    window.addEventListener('scroll', active_section);

    // Secroll to top
    scrollToTopButton.addEventListener('click', (e)=> {
        e.preventDefault();
        window.scrollTo(0, 0);
    });
    
});
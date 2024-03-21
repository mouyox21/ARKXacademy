let menuIcon = document.querySelector('#menu-icon');
let navbar =  document.querySelector('.navbar')

menuIcon.onclick =() =>{
    menuIcon.classList.toggle('fa-xmark');
    navbar.classList.toggle('active');
}

let sections = document.querySelector('section')
let navLinks = document.querySelector('header nav a')

window.onscroll =()=>{
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset= sec.offsetTop -150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');
        
        if (top > offset && top <= offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                document.querySelector('header nav a [href*='+id+']').classList.add('active');
            })
        }     
        
    });

    let header = document.querySelector('header');
    header.classList.toggle('sticky',window.scrollY>100);

    menuIcon.classList.remove('fa-xmark');
    navbar.classList.remove('active');
}

ScrollReveal({
    distance:'80px',
    duration : 2000,
    delay: 200,
});

ScrollReveal().reveal('.home-content, heading',{origin:'top'});
ScrollReveal().reveal('.home-img, .skills-container',{origin:'bottom'});
ScrollReveal().reveal('.home-contact h1, .about-img',{origin:'left'});
ScrollReveal().reveal('.home-contact p, .about-content',{origin:'right'});

const typed = new Typed('.element',{
    strings:["Full Stack Developer", "Network Specialist"],
    typeSpeed: 70,
    backSpeed: 70,
    backDelay:1000,
    loop: true,
});

///////////////////////////////////

var downloadBtn = document.getElementById('download-cv');

    // Ajoutez un événement de clic au bouton
    downloadBtn.addEventListener('click', function() {
        // Chemin relatif vers le CV
        var cvURL = 'cv/CV.pdf';

        // Créez un élément 'a' temporaire
        var tempLink = document.createElement('a');
        tempLink.href = cvURL;
        tempLink.setAttribute('download', 'CV.pdf');

        // Ajoutez l'élément temporaire au corps du document
        document.body.appendChild(tempLink);

        // Cliquez sur le lien temporaire pour déclencher le téléchargement
        tempLink.click();

        // Supprimez l'élément temporaire du corps du document une fois le téléchargement terminé
        document.body.removeChild(tempLink);
    });

    
    function showEducation() {
        document.getElementById("educationSection").style.display = "block";
        document.getElementById("experienceSection").style.display = "none";
        document.getElementById("edu").style = "background-color: #59B2F4; color: #FFFFFF; box-shadow: 0 0 2rem rgba(89, 178, 244, 0.2);";
        document.getElementById("exp").style = "background-color: #59B2F4; color: #401F71; box-shadow: 0 0 2rem rgba(89, 178, 244, 0.2);";
    }
    
    function showExperience() {
        document.getElementById("educationSection").style.display = "none";
        document.getElementById("experienceSection").style.display = "block";
        document.getElementById("exp").style = "background-color: #59B2F4; color: #FFFFFF; box-shadow: 0 0 2rem rgba(89, 178, 244, 0.2);";
        document.getElementById("edu").style = "background-color: #59B2F4; color: #401F71; box-shadow: 0 0 2rem rgba(89, 178, 244, 0.2);";
        
    }

    // Initially show education section
    showEducation();
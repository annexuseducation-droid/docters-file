// =========================
// script.js
// Modern Clinic Website
// =========================

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

// -------------------------
// Appointment Booking
// -------------------------

const appointmentForm = document.getElementById("appointmentForm");
const message = document.getElementById("message");
const timeSlot = document.getElementById("timeSlot");

// Stores booked slots (Frontend only)
let bookedSlots = [];

appointmentForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const patientName = appointmentForm.querySelector('input[type="text"]').value.trim();
    const email = appointmentForm.querySelector('input[type="email"]').value.trim();
    const date = appointmentForm.querySelector('input[type="date"]').value;
    const slot = timeSlot.value;

    if (patientName === "" || email === "" || date === "" || slot === "") {
        showMessage("Please fill in all required fields.", "red");
        return;
    }

    const bookingKey = date + "-" + slot;

    if (bookedSlots.includes(bookingKey)) {
        showMessage("This time slot has already been booked.", "red");
        return;
    }

    bookedSlots.push(bookingKey);

    // Remove booked slot (simulation)
    const selectedOption = timeSlot.options[timeSlot.selectedIndex];
    selectedOption.remove();

    showMessage(
        `Appointment confirmed!\n\nPatient: ${patientName}\nDate: ${date}\nTime: ${slot}`,
        "green"
    );

    appointmentForm.reset();
});

// -------------------------
// Helper Function
// -------------------------

function showMessage(text, color) {

    message.innerText = text;
    message.style.color = color;
    message.style.fontWeight = "600";
    message.style.marginTop = "20px";

    setTimeout(() => {
        message.innerText = "";
    }, 6000);
}

// -------------------------
// Sticky Navbar Shadow
// -------------------------

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        navbar.classList.add("sticky");
    } else {
        navbar.classList.remove("sticky");
    }

});

// -------------------------
// Scroll Animation
// -------------------------

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }

    });

}, {
    threshold: 0.2
});

document.querySelectorAll(
    ".card, .medicine-card, .about-container, .contact-container"
).forEach(item => {
    observer.observe(item);
});

// -------------------------
// Current Year in Footer
// -------------------------

const footer = document.querySelector("footer p");

if (footer) {
    footer.innerHTML = `&copy; ${new Date().getFullYear()} Dr. Your Name | All Rights Reserved`;
}

// -------------------------
// Welcome Message
// -------------------------

window.addEventListener("load", () => {

    console.log("Modern Clinic Website Loaded Successfully");

});

// -------------------------
// Email Validation
// -------------------------

const emailInput = appointmentForm.querySelector('input[type="email"]');

emailInput.addEventListener("blur", () => {

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailInput.value !== "" && !emailPattern.test(emailInput.value)) {

        emailInput.style.border = "2px solid red";

    } else {

        emailInput.style.border = "2px solid #4CAF50";

    }

});

// -------------------------
// Character Counter for Symptoms
// -------------------------

const textarea = appointmentForm.querySelector("textarea");

if (textarea) {

    const counter = document.createElement("small");

    counter.style.display = "block";
    counter.style.marginTop = "5px";
    counter.style.color = "#666";

    textarea.parentNode.insertBefore(counter, textarea.nextSibling);

    textarea.addEventListener("input", () => {

        counter.textContent = `${textarea.value.length} / 500 characters`;

        if (textarea.value.length > 500) {

            textarea.value = textarea.value.substring(0, 500);

        }

    });

}

// -------------------------
// Auto-select Today's Date
// -------------------------

const dateInput = appointmentForm.querySelector('input[type="date"]');

const today = new Date().toISOString().split("T")[0];

dateInput.min = today;

// -------------------------
// Back to Top Button
// -------------------------

const topBtn = document.createElement("button");

topBtn.innerHTML = "↑";

topBtn.id = "topBtn";

document.body.appendChild(topBtn);

topBtn.style.position = "fixed";
topBtn.style.right = "20px";
topBtn.style.bottom = "20px";
topBtn.style.width = "45px";
topBtn.style.height = "45px";
topBtn.style.border = "none";
topBtn.style.borderRadius = "50%";
topBtn.style.cursor = "pointer";
topBtn.style.display = "none";
topBtn.style.fontSize = "22px";
topBtn.style.background = "#0d6efd";
topBtn.style.color = "white";
topBtn.style.boxShadow = "0 5px 15px rgba(0,0,0,.3)";

window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {

        topBtn.style.display = "block";

    } else {

        topBtn.style.display = "none";

    }

});

topBtn.addEventListener("click", () => {

    window.scrollTo({

        top: 0,
        behavior: "smooth"

    });

});
document.getElementById('resumeForm')?.addEventListener('submit', function(event: Event) {
    event.preventDefault();

    // Get references to form elements using their IDs
    const profilePictureInput = document.getElementById('profilePicture') as HTMLInputElement | null;
    const nameElement = document.getElementById('name') as HTMLInputElement | null;
    const emailElement = document.getElementById('email') as HTMLInputElement | null;
    const phoneElement = document.getElementById('phone') as HTMLInputElement | null;
    const addressElement = document.getElementById('address') as HTMLInputElement | null;
    const educationElement = document.getElementById('education') as HTMLInputElement | null;
    const experienceElement = document.getElementById('experience') as HTMLInputElement | null;
    const skillsElement = document.getElementById('skills') as HTMLInputElement | null;

    if (profilePictureInput && nameElement && emailElement && phoneElement && addressElement && educationElement && experienceElement && skillsElement) {

        const name = nameElement.value;
        const email = emailElement.value;
        const phone = phoneElement.value;
        const address = addressElement.value;
        const education = educationElement.value;
        const experience = experienceElement.value;
        const skills = skillsElement.value;

        // Handle profile picture
        const profilePictureFile = profilePictureInput.files?.[0];
        const profilePictureURL = profilePictureFile ? URL.createObjectURL(profilePictureFile) : '';

        // Create resume output
        const resumeOutput = `
        <h2>Resume</h2>
        ${profilePictureURL ? `<img src="${profilePictureURL}" alt="Profile Picture" class="profilePicture">` : ''}
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone Number:</strong> ${phone}</p>
        <p><strong>Address:</strong> ${address}</p>

        <h3>Education</h3>
        <p>${education}</p>

        <h3>Work Experience</h3>
        <p>${experience}</p>

        <h3>Skills</h3>
        <p>${skills}</p>
        `;

        const resumeOutputElement = document.getElementById('resumeOutput') as HTMLElement | null;
        if (resumeOutputElement) {
            resumeOutputElement.innerHTML = resumeOutput;

            // Show the download button after generating the resume
            const downloadBtn = document.getElementById('downloadBtn') as HTMLButtonElement | null;
            if (downloadBtn) {
                downloadBtn.style.display = 'block';
                downloadBtn.onclick = function() {
                    const blob = new Blob([resumeOutput], { type: 'text/html' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'resume.html';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                };
            }
        } else {
            console.error('The resume output element is missing');
        }
    } else {
        console.error('One or more form elements are missing');
    }
});
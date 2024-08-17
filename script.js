const searchbtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
const phonesContainer = document.getElementById('phones-container');
const showDetailsBtn = document.getElementById('show-details-btn');

async function getPhones(searchVal) {
    try {
        const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchVal}`);
        const data = await response.json();
        
        if (data.status) {
            displayPhones(data.data);
        } else {
            phonesContainer.innerHTML = "<p>No phones found.</p>";
        }
    } catch (error) {
        console.error('Error fetching phone data:', error);
    }
}

function displayPhones(phones) {
    phonesContainer.innerHTML = ''; 
    phones.forEach((phone,index) => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('phone-div');
        phoneDiv.innerHTML = `
            <img src="${phone.image}" alt="${phone.phone_name}">
            <p id="phone-name">${phone.phone_name}</p>
            <p id="phone-desc">There are many variations of passages of available, but the majority have suffered</p>
            <button id="show-details-btn" onclick="getPhoneDetails('${phone.slug}')" class="common-btn">SHOW DETAILS</button>
        `;
        phonesContainer.appendChild(phoneDiv);



    });
}

// Fetch iPhone data on page load
window.onload = () => {
    getPhones('iphone');  // Default search value for iPhones
    
};

// Fetch phone data based on user input when the search button is clicked
searchbtn.addEventListener('click', () => {
    const searchVal = searchInput.value.trim();
    if (searchVal) {
        getPhones(searchVal);
    }
});

async function getPhoneDetails(phoneSlug) {
    try {
        const response = await fetch(`https://openapi.programming-hero.com/api/phone/${phoneSlug}`);
        const data = await response.json();
        const phonesDetail = data.data;
        console.log(phonesDetail);

       
        const div = document.createElement('div');
        div.style.textAlign = 'center';
        div.style.borderRadius = '10px';
        div.style.height = '550px';
        div.style.width = '520px';
        div.style.backgroundColor = '#1C222A';
        div.style.position = 'fixed';
        div.style.top = '50%';
        div.style.left = '50%';
        div.style.transform = 'translate(-50%, -50%)';
        div.style.zIndex = '1000'; // Ensure it's on top
        div.style.padding = '20px';
        div.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.5)';
        div.style.color = 'white';
        div.classList.add('phoneDetailDiv');

        
        const phoneImg = document.createElement('img');
        phoneImg.setAttribute('src', phonesDetail.image);
        
        phoneImg.style.borderRadius = '8px';
        div.appendChild(phoneImg);

        
        const phonename = document.createElement('h2');
        phonename.innerText = phonesDetail.name;
        phonename.style.color = 'white';
        phonename.style.fontSize = '25px';
        phonename.style.marginTop = '15px';
        phonename.style.marginBottom = '10px';
        div.appendChild(phonename);

        const featuresDiv = document.createElement('div');
        featuresDiv.style.marginTop = '10px';

        const mainFeatures = phonesDetail.mainFeatures;
        const features = [
            { label: 'Storage', value: mainFeatures.storage },
            { label: 'Display Size', value: mainFeatures.displaySize },
            { label: 'Memory', value: mainFeatures.memory },
            { label: 'Chipset', value: mainFeatures.chipSet }
        ];

        features.forEach(feature => {
            const featureP = document.createElement('p');
            featureP.innerText = `${feature.label}: ${feature.value}`;
            featureP.style.fontSize = '18px';
            featureP.style.marginBottom = '5px';
            featuresDiv.appendChild(featureP);
        });

        div.appendChild(featuresDiv);

       
        const closeButton = document.createElement('button');
        closeButton.innerText = 'Close';
        closeButton.style.marginTop = '20px';
        closeButton.style.padding = '10px 20px';
        closeButton.style.backgroundColor = '#ff4d4d';
        closeButton.style.color = 'white';
        closeButton.style.border = 'none';
        closeButton.style.borderRadius = '5px';
        closeButton.style.cursor = 'pointer';
        closeButton.addEventListener('click', () => {
            document.body.removeChild(div);
        });
        div.appendChild(closeButton);

        
        document.body.appendChild(div);
    } catch (error) {
        console.log(error);
    }
}


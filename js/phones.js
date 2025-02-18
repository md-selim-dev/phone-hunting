const loadPhone = async (inputText, isShowAll) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${inputText}`;
  const res = await fetch(url);
  const data = await res.json();
  const phones = data.data
  if (!inputText) {
    displayPhones(isShowAll)
  } else {
    displayPhones(phones, isShowAll, inputText)
  }

}


const displayPhones = (phones, isShowAll, inputText) => {
  // console.log(phones)

  const phoneCardContainer = document.getElementById('phones-card-container');
  phoneCardContainer.textContent = '';

  const showAllBtnContainer = document.getElementById('show-all-btn-container');

  if (!phones) {
    phoneCardContainer.textContent = 'Enter a value'
    showAllBtnContainer.classList.add('hidden')
  } else {

    if(phones.length === 0){
      phoneCardContainer.textContent = `Couldn't find data for: ${inputText}`;
      showAllBtnContainer.classList.add('hidden')
    }

    if (phones.length > 9 && !isShowAll) {
      phones = phones.slice(0, 9);
      showAllBtnContainer.classList.remove('hidden')
    } else {
      showAllBtnContainer.classList.add('hidden')
    }

    phones.forEach(phone => {
      const phoneCard = document.createElement('div');
      phoneCard.classList = 'card bg-gray-100 px-4 py-6 shadow-xl text-center';
      phoneCard.innerHTML = `
      
  <figure class="bg-white rounded-xl mb-4 py-6">
    <img
      src="${phone.image}"
      alt="${phone.slug}" />
      </figure>
      <div class="card-body items-center">
        <h2 class="card-title font-bold text-[black]">${phone.phone_name}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions">
          <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-info mt-4">Show Details</button>
        </div>
      </div>

    `;
      phoneCardContainer.appendChild(phoneCard)

    })
  }
  toggleLoadingSpinner(false)

}

let lastInputText = 'huawei';

const handleSearch = () => {
  toggleLoadingSpinner(true)
  const inputField = document.getElementById('input-field');
  const inputText = inputField.value;
  lastInputText = inputText;
  loadPhone(inputText)
  inputField.value = ''

}

const toggleLoadingSpinner = (isLoading) => {
  const loaderContainer = document.getElementById('loading-spinner-container');
  if (isLoading) {
    loaderContainer.classList.remove('hidden')
  } else {
    loaderContainer.classList.add('hidden')
  }
}


const handleShowAll = () => {
  loadPhone(lastInputText, true)
}

const handleShowDetails = async (id) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  const details = data.data;
  displayPhoneDetails(details)

}

const displayPhoneDetails = (phone) => {

  const phoneDetailsContainer = document.getElementById('phone-details-container');
  phoneDetailsContainer.innerHTML = `
  <figure class="flex justify-center bg-white rounded-xl mb-4 py-6">
    <img src="${phone.image}"/>
  </figure>
  <h3 class="text-lg font-bold">${phone.name}</h3>
  <p class="py-4">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layou t.</p>
  <p class="py-2"><b>Storage: </b>${phone?.mainFeatures?.storage || 'No Data Available'}</p>
  <p class="py-2"><b>Display Size: </b>${phone?.mainFeatures?.displaySize || 'No Data Available'}</p>
  <p class="py-2"><b>Chipset: </b>${phone?.mainFeatures?.chipSet || 'No Data Available'}</p>
  <p class="py-2"><b>Memory: </b>${phone?.mainFeatures?.memory || 'No Data Available'}</p>
  <p class="py-2"><b>Slug: </b>${phone?.slug || 'No Data Available'}</p>
  <p class="py-2"><b>Release Date: </b>${phone?.releaseDate || 'No Data Available'}</p>
  <p class="py-2"><b>Brand: </b>${phone?.brand || 'No Data Available'}</p>
  <p class="py-2"><b>GPS: </b>${phone?.others?.GPS || 'No Data Available'}</p>  
  
  <div class="modal-action">
   <form method="dialog">
    <!-- if there is a button in form, it will close the modal -->
    <button class="btn bg-gray-50 btn-error">Close</button>
   </form>
  </div>
  `

  phone_details_modal.showModal()
}


loadPhone(lastInputText)
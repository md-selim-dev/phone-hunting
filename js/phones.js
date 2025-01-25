



const loadPhone = async (searchText = 'iphone', isShowAll) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
  const data = await res.json();
  const phones = data.data;
  // console.log(phones)
  displayPhones(phones, isShowAll);
}
const displayPhones = (phones, isShowAll) => {
  // console.log(phones)
  const phonesCardContainer = document.getElementById('phones-card-container');

  // clear phone container cards before adding new cards
  phonesCardContainer.textContent = "";

  // display show all button if there are more than 12 phones
  const showAllContainer = document.getElementById('show-all-container');
  if(phones.length > 12 && !isShowAll){
    showAllContainer.classList.remove('hidden');
  }else{
    showAllContainer.classList.add('hidden')
  }
  // console.log('is show all', isShowAll)
  // display only first 12 phones if not show all
  if(!isShowAll){
    phones = phones.slice(0,12)
  }

  phones.forEach(phone => {
    // console.log(phone)
    const phoneCard = document.createElement('div');
    phoneCard.classList = `card bg-gray-100 max-w-96 shadow-xl`;
    phoneCard.innerHTML = `

    <figure class="px-10 pt-10">
      <img
        src="${phone.image}"
        alt="phone-image"
      class="rounded-xl" />
    </figure>
    <div class="card-body items-center text-center">
    <h2 class="font-bold text-[#403F3F] text-2xl">${phone.brand}</h2>
    <h3 class="font-bold text-[#403F3F] text-2xl">${phone.phone_name}</h3>
    <p>There are many variations of passages of available, but the majority have suffered</p>
    <b class="font-bold text-[#403F3F]">$999</b>
    <div class="card-actions">
      <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
    </div>
  </div>
    `;
    phonesCardContainer.appendChild(phoneCard)
  });
  toggleLoadingSpinner(false)
}

// handle show details
const handleShowDetails = async (id) => {
  console.log('clicked show details', id);
  // load indivisual phone data
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  const phone = data.data;
  
  showPhoneDetails(phone)
}

// show indivitual phone details
const showPhoneDetails = (phone) =>{
  console.log(phone)

  const showDeailContainer = document.getElementById('show-detail-container');
  showDeailContainer.classList = 'flex flex-col gap-2';
  showDeailContainer.innerHTML = `
    <div class="flex justify-center">
      <div class="bg-[#cad0e4] px-20 py-6 rounded-xl mb-6">
        <img src="${phone.image}"/>
      </div>
    </div>
    <h3 class="text-lg font-bold">${phone.name}</h3>
    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layou t.</p>
    <p><span>Storage: </span>${phone?.mainFeatures?.storage}</p>
    <p><span>Display Size: </span>${phone?.mainFeatures?.displaySize}</p>
    <p><span>Chipset: </span>${phone?.mainFeatures?.chipSet ? phone.mainFeatures.chipSet : ''}</p>
    <p><span>Memory: </span>${phone?.mainFeatures?.memory}</p>
    <p><span>Slug: </span>${phone?.slug}</p>
    <p><span>Release Date: </span> ${phone?.releaseDate || ''}</p>
    <p><span>Brand: </span>${phone?.brand ? phone.brand : ''}</p>
    <p><span>GPS: </span>${phone?.others?.GPS || ''}</p>
    
  `
  show_details_modal.showModal()
  
}

const handleSearch = (isShowAll) => {
  toggleLoadingSpinner(true)
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  console.log(searchText);
  loadPhone(searchText, isShowAll);
}
// recap search button

// const handleSearch2 = () => {
//   toggleLoadingSpinner(true)
//   const searchField = document.getElementById('search-field2');
//   const searchText = searchField.value;
//   loadPhone(searchText)
// }

const toggleLoadingSpinner = (isLoading) => {
  loadingSpinner = document.getElementById('loading-spinner');
  if(isLoading){
    loadingSpinner.classList.remove('hidden')
  }else{
    loadingSpinner.classList.add('hidden')
  }
}

const handleShowAll = () => {
  handleSearch(true);
  
}

loadPhone();
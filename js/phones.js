



const loadPhone = async (searchText) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
  const data = await res.json();
  const phones = data.data;
  // console.log(phones)
  displayPhones(phones);
}
const displayPhones = (phones) => {
  console.log(phones)
  const phonesCardContainer = document.getElementById('phones-card-container');

  // clear phone container cards before adding new cards
  phonesCardContainer.textContent = "";

  // display show all button if there are more than 12 phones
  const showAllContainer = document.getElementById('show-all-container');
  if(phones.length > 12){
    showAllContainer.classList.remove('hidden');
  }else{
    showAllContainer.classList.add('hidden')
  }

  // display only first 10 phones
  phones = phones.slice(0,12)

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
      <button class="btn btn-primary">Show Details</button>
    </div>
  </div>
    
    `;
    phonesCardContainer.appendChild(phoneCard)

  })
}

const handleSearch = () => {
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  console.log(searchText);
  loadPhone(searchText);
}


// recap search button

const handleSearch2 = () => {
  toggleLoadingSpinner()
  const searchField = document.getElementById('search-field2');
  const searchText = searchField.value;
  loadPhone(searchText)
}


const toggleLoadingSpinner = () => {
  loadingSpinner = document.getElementById('loading-spinner');
  loadingSpinner.classList.remove('hidden')
}

// loadPhone();
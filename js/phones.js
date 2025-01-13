const loadPhone = async () => {
  const res = await fetch('https://openapi.programming-hero.com/api/phones?search=iphone');
  const data = await res.json();
  const phones = data.data;
  // console.log(phones)
  displayPhones(phones);
}
const displayPhones = (phones) => {
  // console.log(phones)
  const phonesCardContainer = document.getElementById('phones-card-container');

  phones.forEach(phone => {
    console.log(phone)
    const phoneCard = document.createElement('div');
    phoneCard.classList = `card bg-gray-100 max-w-96 shadow-xl`;
    phoneCard.innerHTML = `

    <figure class="px-10 pt-10">
      <img
        src="${phone.image}"
        alt="Shoes"
      class="rounded-xl" />
    </figure>
    <div class="card-body items-center text-center">
    <h2 class="card-title">Shoes!</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div class="card-actions">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
    
    `;
    phonesCardContainer.appendChild(phoneCard)

  })
}


loadPhone()



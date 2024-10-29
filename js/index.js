const requestURL = '../json/index.json';

async function fetchHoodiesJson() {
    try{
        const response = await fetch(requestURL);
        if (!response.ok){
            throw new Error(`An error occured. Json request failed ${response.status}.`)
        }
        return await response.json();
    }
    catch (error){
        console.error('An error occured. Null Json', error)
        return null;
    }
}

function createHoodieCard ({id, name, brand, img, price, stars}){
    return `
        <div class="card m-4" style="width: 18rem">
            <img src="${img}" class="card-img-top" alt="Person wearing a ${brand} ${name}.">
            <div class="card-body">
                <div class="d-flex justify-content-between">
                    <h5 class="card-title">${name}</h5>
                    <div class="d-flex">
                        <i class="bi bi-star-fill me-2"></i>
                        <p>${stars}</p>
                    </div>
                </div>
                <p class="card-text mb-4">${brand}</p>
                <h3>${price} €</h3>
            </div>
        </div>
    `;
}

async function displayHoodies(){
    const shopSection = document.getElementById('shopSection');
    const hoodiesData = await fetchHoodiesJson();
    
    if (hoodiesData && hoodiesData.hoodies){
        const hoodiesCard = hoodiesData.hoodies.map(createHoodieCard).join('');
        shopSection.innerHTML = hoodiesCard;
    }
    else{
        shopSection.innerHTML = `<p>Hoodies Json couldn't load</p>`;
    }
}

displayHoodies();
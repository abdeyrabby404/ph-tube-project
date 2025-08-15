function loadCategories() {
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        .then((res) => res.json())
        .then((data) => displayCategories(data.categories))
}

// categories: 
// {
//       "category_id": "1003",
//       "category": "Comedy"
//     },

function displayCategories(categories) {
    // console.log(categories);
    //step-1: load category from html
    const categoryContainer = document.getElementById("categoryContainer");


        //step-2: I will add category name using loop
        for (const cat of categories) {
            const newDivForCategory = document.createElement("div");
            newDivForCategory.innerHTML=`
            <button class="btn btn-sm  hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
            `;
            // newDivForCategory.appendChild()
            categoryContainer.append(newDivForCategory)
            console.log(newDivForCategory)
        }



}

loadCategories();
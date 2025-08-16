// const { createElement } = require("react");


const activeClassBtn = () => {
  const removeActiveClass = document.getElementsByClassName("active");
  // console.log(removeActiveClass)
  for (let btn of removeActiveClass){
    btn.classList.remove("active");
  }

}

function loadCategories() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
}

// function loadVideos(){
//     fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
//     .then(response => response.json())
//     .then(data => displayVideos(data.videos))
// }
// categories: 
// {
//       "category_id": "1003",
//       "category": "Comedy"
//     },


const loadCategoriesVideo = (id) => {
  // console.log(id);
  const url = `
  https://openapi.programming-hero.com/api/phero-tube/category/${id}
  `;
  // console.log(url)
  fetch(url)
  .then(res => res.json())
  .then(data => {

    activeClassBtn();

    const buttonClickColorClass = document.getElementById(`btn-${id}`)
    console.log(buttonClickColorClass);
    buttonClickColorClass.classList.add("active")

    displayVideos(data.category)
  })
}

const loadVideos = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then(response => response.json())
    .then(data => {
      const allBtn = document.getElementById("btn-All");
      activeClassBtn();
      allBtn.classList.add("active")
      
      displayVideos(data.videos)
    })
}


function displayCategories(categories) {
  // console.log(categories);
  //step-1: load category from html
  const categoryContainer = document.getElementById("categoryContainer");

  //step-2: I will add category name using loop
  for (const cat of categories) {
    const newDivForCategory = document.createElement("div");
    newDivForCategory.innerHTML = `
            <button id="btn-${cat.category_id}" onclick="loadCategoriesVideo(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
            `;
    // newDivForCategory.appendChild()
    categoryContainer.append(newDivForCategory)
    // console.log(newDivForCategory)
  }
}

const displayVideos = (videos) => {
  // console.log(videos)
  const cardContainer = document.getElementById("cardContainer");
  
  // this is use for turn of repeatation content 
  cardContainer.innerHTML="";
  // console.log(cardContainer)

  if(videos.length == 0){
    
    cardContainer.innerHTML = `
    <div class="col-span-full text-center flex flex-col items-center py-24 space-y-4">
            <img class="w-56" src="./assets/Icon.png" alt="">
            <h2 class="font-bold text-3xl">Oops!! Sorry, There is no content here <br> Press <span
                    class="btn btn-small text-black py-2 hover:bg-[#FF1F3D] hover:text-white" onclick="loadVideos()">All</span> to show
                available contents!</h2>
        </div>
    `;
    return;
  }



  videos.forEach(video => {
    const videoCard = document.createElement("div")
    // console.log(videoCard)

    // "videos": [
    // {
    //   "category_id": "1001",
    //   "video_id": "aaaa",
    //   "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
    //   "title": "Shape of You",
    //   "authors": [
    //     {
    //       "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
    //       "profile_name": "Olivia Mitchell",
    //       "verified": ""
    //     }
    //   ],
    //   "others": {
    //     "views": "100K",
    //     "posted_date": "16278"
    //   },
    //   "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
    // },
    videoCard.innerHTML =
      `
            <div class="card">
            <figure class="relative">
                <img class="rounded-lg object-cover w-full h-64" src="${video.thumbnail}" alt="Shoes" />
                <span class="absolute bottom-2 right-2 bg-black text-white rounded-sm px-[2px]">3hrs 56 min ago</span>
            </figure>
            <div class="py-2">
                <div class="flex gap-4">
                    <div class="profile">
                        <div class="avatar">
                            <div class="w-10 h-10 rounded-full">
                                <img class="" src="${video.authors[0].profile_picture}" />
                            </div>
                        </div>
                    </div>
                    <di class="space-y-2">
                        <h1 class="text-2xl font-bold">${video.title}</h1>
                        <p class="text-lg flex text-gray-500"> ${video.authors[0].profile_name} <img class="w-7 h-7" src="https://img.icons8.com/?size=48&id=QMxOVe0B9VzG&format=png" alt=""> </p>
                        <p class="text-lg text-gray-500">${video.others.views} views</p>
                    </div>

                </div>
            </div>
        </div>
        `;
    cardContainer.append(videoCard)
  }
  )
}
// const displayVideos = (videos) => {
//     const cardContainer = document.getElementById("cardContainer");

//     videos.forEach(video => {
//         console.log(video);
//         const videoCard = document.createElement("div")
//         // console.log(cardDesc)
//         videoCard.innerHTML = `
//             <div class="w-96 shadow-sm">
//   <figure>
//     <img class="w-96 h-56"
//       src="${video.thumbnail}"
//       alt="Shoes" />
//   </figure>
//   <div class="card-body">
//     <h2 class="card-title">${video.title}</h2>
//     <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
//     <div class="card-actions justify-end">
//       <button class="btn btn-primary">Buy Now</button>
//     </div>
//   </div>
// </div>
//         `;
//         cardContainer.append(videoCard)
//     });
// }

loadCategories();
// loadVideos();
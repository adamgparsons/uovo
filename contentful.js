const spaceId = "jo5nenx7bx3r";
const environmentId = "master";
const accessToken = "rayBcbZwy8tAT6CVX1D3mkkD6_05N3WHqM1VeEeDVJ4";
const sectionTag = document.querySelector("section.grid");

const url = `https://cdn.contentful.com/spaces/${spaceId}/environments/${environmentId}/entries?access_token=${accessToken}&order=fields.order&content_type=menuItem`;

const grabData = function() {
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      // store the assets somewhere
      const assets = data.includes.Asset;

      return data.items.map(item => {
        let imageUrl;

        const imageId = item.fields.image.sys.id;

        const imageData = assets.find(asset => {
          return asset.sys.id == imageId;
        });

        if (imageData) {
          imageUrl = imageData.fields.file.url;
        }
        item.fields.image = "http:" + imageUrl;

        return item.fields;
      });
    });
};

// run grabData on load
grabData().then(data => {
  // in here do something with the returned data
  console.log(data);

  // remove the loader
  sectionTag.innerHTML = "";
  data.forEach(item => {
    sectionTag.innerHTML =
      sectionTag.innerHTML +
      `
      <div class="item">
        <img src="${item.image}">
        <div class="title">
        <h2>${item.title}</h2>
        <p>${item.price}</p>
        </div>
        <p>${item.description}</p>
      </div>
      
      `;
  });
});

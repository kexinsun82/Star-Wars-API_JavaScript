// Task 1: Making an API Call
const fetchData = async () => {
  const swapiData = localStorage.getItem('swapiData');

  if (swapiData) {
    // use storage data
    console.log("use localStorage data:", JSON.parse(swapiData));
  } else {
    // fetch data from the API
    const url = "https://swapi.dev/api/people/?page=1";

    try {
      const response = await fetch(url);
      const data = await response.json();

      // Save the stringified data
      localStorage.setItem('swapiData', JSON.stringify(data));

      console.log("Data fetched and saved to localStorage:", data);
    } catch (error) {
      console.error("Error fetching or saving data:", error);
    }
  }
};

// fetchData();


// Task 2: Data Filtering Function
function filterData(array = []) {
  return array.filter(item => Number(item.mass) <= 100);
}


// Task 3: UI Rendering Function
const peopleData = [
  { 
    name: 'Luke Skywalker', 
    eye_color: 'blue', 
    hair_color: 'blond', 
    height: '172', 
    mass: '77', 
    birth_year: '19BBY', 
    films: 4 
  },
  { 
    name: 'C-3PO', 
    eye_color: 'yellow', 
    hair_color: 'n/a', 
    height: '167', 
    mass: '75', 
    birth_year: '112BBY', 
    films: 6 
  },
  { 
    name: 'R2-D2', 
    eye_color: 'red', 
    hair_color: 'n/a', 
    height: '96', 
    mass: '32', 
    birth_year: '33BBY', 
    films: 6 
  }
];

const createInfoCard = (people) => {
  const container = document.getElementById("container");
  const card = document.createElement("div");
  const name = document.createElement("h2");
  const ul = document.createElement("ul");

  name.textContent = people.name;

  // list items
  const features = ['eye_color', 'hair_color', 'height', 'mass', 'birth_year', 'films'];
  features.forEach(feature => {
    const li = document.createElement("li");
    li.textContent = `${feature.replace('_', ' ')}: ${people[feature]}`;
    ul.appendChild(li);
  });

  // append elements
  card.appendChild(name);
  card.appendChild(ul);
  container.appendChild(card);
};

// Render data
peopleData.forEach(people => {
  createInfoCard(people);
});


// Task 4: Initiate project
fetchData().then(data => {
  const filteredData = filterData(data);
    filteredData.forEach(people => {
      createInfoCard(people);
    });
  })
  .catch(error => {
    console.error('Error fetching or processing data:', error);
  });

const filteredData = filterData(peopleData);
console.log(filteredData);

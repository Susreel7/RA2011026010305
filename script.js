document.addEventListener('DOMContentLoaded', function () {
    const urlsContainer = document.getElementById('urls');
    const addUrlButton = document.getElementById('addUrl');
    const fetchNumbersButton = document.getElementById('fetchNumbers');
    const numbersList = document.getElementById('numbers');
  
    addUrlButton.addEventListener('click', function () {
      const input = document.createElement('input');
      input.type = 'text';
      input.placeholder = 'Enter URL';
      urlsContainer.appendChild(input);
    });
  
    fetchNumbersButton.addEventListener('click', async function () {
      const inputs = urlsContainer.querySelectorAll('input');
      const urls = Array.from(inputs).map(input => input.value);
  
      try {
        const responses = await Promise.all(urls.map(url => fetch(url)));
        const data = await Promise.all(responses.map(response => response.json()));
        const mergedNumbers = data.flatMap(item => item.numbers);
        const uniqueNumbers = [...new Set(mergedNumbers)];
  
        numbersList.innerHTML = uniqueNumbers.map(number => `<li>${number}</li>`).join('');
      } catch (error) {
        console.error('Error fetching numbers:', error);
      }
    });
  });
  
let books;

async function renderBooks(filter) {
  const booksWrapper = document.querySelector(".books");

  booksWrapper.classList += ' books__loading'

  if (!books) {
    books = await getBooks();
  }
  
  booksWrapper.classList.remove('books__loading')

  if (filter === "LOW_TO_HIGH") {
    books.sort(
      (a, b) =>
        (a.salePrice || a.originalPrice) - (b.salePrice || b.originalPrice)
    );
  } else if (filter === "HIGH_TO_LOW") {
    books.sort(
      (a, b) =>
        (b.salePrice || b.originalPrice) - (a.salePrice || a.originalPrice)
    );
  } else if (filter === "RATING") {
    books.sort((a, b) => b.rating - a.rating);
  }

  const booksHtml = books
    .map((book) => {
      return `<div class="book">
    <figure class="book__img--wrapper">
      <img class="book__img" src="${book.url}" alt="">
    </figure>
    <div class="book__title">
      ${book.title}
    </div>
    <div class="book__ratings">
      ${ratingsHTML(book.rating)}
    </div>
    <div class="book__price">
      ${priceHTML(book.originalPrice, book.salePrice)}
    </div>
  </div>`;
    })
    .join("");

  booksWrapper.innerHTML = booksHtml;
}

function priceHTML(originalPrice, salePrice) {
  if (!salePrice) {
    return `R$${originalPrice.toFixed(2)}`;
  }
  return `<span class="book__price--normal">R$${originalPrice.toFixed(
    2
  )}</span>R$${salePrice.toFixed(2)}`;
}

function ratingsHTML(rating) {
  let ratingHTML = "";
  for (let i = 0; i < Math.floor(rating); ++i) {
    ratingHTML += '<i class="fas fa-star"></i>\n';
  }
  if (!Number.isInteger(rating)) {
    ratingHTML += '<i class="fas fa-star-half-alt"></i>\n';
  }
  return ratingHTML;
}

function filterBooks(event) {
  renderBooks(event.target.value);
}

setTimeout(() => {
  renderBooks();
});

// FAKE DATA
function getBooks() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "Poder sem Limites",
          url: "assets/tonyrobbins.jpg",
          originalPrice: 49.95,
          salePrice: 14.95,
          rating: 4.5,
        },
        {
          id: 2,
          title: "Hábitos Atômicos",
          url: "assets/habitosatomicos.jpg",
          originalPrice: 39,
          salePrice: null,
          rating: 5,
        },
        {
          id: 3,
          title: "Trabalho Focado",
          url: "assets/61XDczCKI0L.jpg",
          originalPrice: 29,
          salePrice: 12,
          rating: 5,
        },
        {
          id: 4,
          title: "Can't hurt me",
          url: "assets/canthurtme.jpg",
          originalPrice: 44,
          salePrice: 19,
          rating: 4.5,
        },
        {
          id: 5,
          title: "Poder do Agora",
          url: "assets/poderdoagora.jpg",
          originalPrice: 32,
          salePrice: 17,
          rating: 4,
        },
        {
          id: 6,
          title: "Milagre da Manhã",
          url: "assets/milagredamanha.jpg",
          originalPrice: 70,
          salePrice: 12.5,
          rating: 5,
        },
        {
          id: 7,
          title: "Pai Rico Pai Pobre",
          url: "assets/pairicopaipobre.jpg",
          originalPrice: 11,
          salePrice: 10,
          rating: 4,
        },
        {
          id: 8,
          title: "Poder dos 5 Segundos",
          url: "assets/poderdos5segundos.jpg",
          originalPrice: 38,
          salePrice: 17.95,
          rating: 4.5,
        },
        {
          id: 9,
          title: "Atitude Mental Positiva",
          url: "assets/atitudementalpositiva.jpg",
          originalPrice: 35,
          salePrice: null,
          rating: 2,
        },
        {
          id: 10,
          title: "O Homem Mais Rico Da Babilônia",
          url: "assets/homemmaisricodababilonia.jpg",
          originalPrice: 40,
          salePrice: null,
          rating: 4,
        },
        {
          id: 11,
          title: "Harry Poter e a Pedra Filosofal",
          url: "assets/harrypotter.jpg",
          originalPrice: 30,
          salePrice: null,
          rating: 4.5,
        },
      ]);
    }, 1000);
  });
}

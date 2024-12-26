import logo from "./logo.svg";
import "./App.css";
import "./index.css";
import pizzaData from "./data.js";

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}
function Pizza({ name, photo, price, ingredients, soldOut }) {
  return (
    <div className={`pizza ${soldOut ? "sold-out" : ""}`}>
      <img src={photo} alt={name} />

      <div>
        <h1>{name}</h1>
        <h3>{ingredients}</h3>
        <p>$ {price}</p>
        {/* <p>{soldOut? "Sold Out" : "Available"}</p> */}
      </div>
    </div>
  );
}

function Header() {
  const style = {
    color: "red",
    fontSize: "48px",
  };
  return (
    <header className="header">
      <title>Fast React Pizza Co.</title>
      <meta property="og:image" content="pizzas/margherita.jpg" />

      <h1 style={{ style }} className="text-uppercase">
        Fast React Pizza Co.
      </h1>
    </header>
  );
}
function Menu() {
  const pizza = pizzaData;
  const numPizzas = pizza.length;
  return (
    <main className="menu">
      <h2>Menu Contents</h2>
      {/* <Pizza
        name={pizzaData[0].name}
        photo={pizzaData[0].photoName}
        price={pizzaData[0].price}
        ingredients={pizzaData[0].ingredients}
      />
      <Pizza
        name={pizzaData[1].name}
        photo={pizzaData[1].photoName}
        price={pizzaData[1].price}
        ingredients={pizzaData[1].ingredients}
      />{" "}
      <Pizza
        name={pizzaData[2].name}
        photo={pizzaData[2].photoName}
        price={pizzaData[2].price}
        ingredients={pizzaData[2].ingredients}
      />{" "} */}
      {numPizzas > 0 && (
      <ul>
      {pizzaData.map((pizza) => (
        <Pizza
          key={pizza.name}
          name={pizza.name}
          photo={pizza.photoName}
          price={pizza.price}
          ingredients={pizza.ingredients}
          soldOut={pizza.soldOut}
        />
      ))}
      </ul>
      )}
    </main>
  );
}
function Footer() {
  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;

  return (
    <div>
      <footer className="footer">
        <span>
          {isOpen ? (
            <div className="order">
              <p>We're open until {closeHour}:00</p>
              <button className="btn">Order Now</button>
            </div>
          ) : (
            <p>
              We're closed and will open at {openHour}:00. Come visit us when
              available
            </p>
          )}
        </span>
        <span className="text">
          {new Date().getFullYear()} &copy; All rights reserved
        </span>
      </footer>
    </div>
  );
}

export default App;

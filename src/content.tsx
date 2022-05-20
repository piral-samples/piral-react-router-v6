import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ExtensionSlot } from "piral-core";

export const Home: React.FC = () => (
  <>
    <h1>Homepage</h1>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, quae
      quaerat. Consequuntur, modi! Molestias fugiat tenetur aliquam quia vitae
      eligendi cum odio. Debitis velit dolorum numquam fuga vitae cum eum?
    </p>
    <p>
      <Link to="/foo">Subpage</Link>
    </p>
  </>
);

export const Subpage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1>Subpage</h1>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam
        consectetur, iure nostrum sed, architecto est corporis similique
        explicabo facilis rerum pariatur nihil totam odio omnis fugiat eaque
        repellat cum officia.
      </p>
      <p>
        <button onClick={() => navigate(-1)}>Back</button>
      </p>
    </>
  );
};

export const Layout: React.FC = ({ children }) => (
  <>
    <header>
      <Link to="/">Home</Link> | <b>Piral with React Router v6</b>
    </header>
    <main>{children}</main>
    <footer>
      <ExtensionSlot
        name="menu-items"
        render={(items) => (
          <ul>
            {items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        )}
      />
    </footer>
  </>
);

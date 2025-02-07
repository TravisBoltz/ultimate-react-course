import "./App.css";
import { useState } from "react";
const faqs = [
  {
    title: "Where are these chairs assembled?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.",
  },
  {
    title: "How long do I have to return my chair?",
    text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.",
  },
  {
    title: "Do you ship to countries outside the EU?",
    text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!",
  },
];

export default function App() {
  return (
    <div>
      <title>Accordion App</title>

      <Accordion />
    </div>
  );
}

function Accordion() {
  const [curOpen, setCurOpen] = useState(null);

  return (
    <div className="accordion">
      {faqs.map((faq, index) => (
        <AccordionItem
          title={faq.title}
          text={faq.text}
          num={index + 1}
          key={index}
          curOpen={curOpen}
          onOpen={setCurOpen}
        />
      ))}
    </div>
  );
}

function AccordionItem({ num, title, text, curOpen, onOpen }) {
  const isOpen = num === curOpen;

  function handleToggle() {
    onOpen(isOpen ? null : num);
  }

  return (
    <div className={`${isOpen ? "open" : ""} item`} onClick={handleToggle}>
      <div className="number">{num < 9 ? `0${num}` : num}</div>
      <div className="title">{title}</div>
      <div className="icon">{isOpen ? "-" : "+"}</div>
      {isOpen && <div className="content-box">{text}</div>}
    </div>
  );
}

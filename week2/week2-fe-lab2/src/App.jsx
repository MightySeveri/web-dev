function Hello() {
  return <p>hello, world</p>
}

function Bye() {
  return <p>Goodbye, react</p>
}

function App() {
  return (
    <div>
      <Hello />
      <Bye / >
    </div>
  );
}

export default App;
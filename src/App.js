import { Outlet } from 'react-router-dom';
import Nav from './components/header/Nav';

function App() {
  return (
    <>
      <Nav />
      <section id="content">
        <Outlet />
      </section>
    </>
  );
}

export default App;

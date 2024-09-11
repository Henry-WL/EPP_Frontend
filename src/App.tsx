import Example from "./components/Navbar";
import AuthenticatedRoutes from "./pages/AuthenticatedRoutes";

const App = () => {
  return (
    <div className="">
      <Example />

      <AuthenticatedRoutes />
    </div>
  );
};

export default App;

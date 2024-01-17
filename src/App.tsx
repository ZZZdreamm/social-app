import "./styles/Styles.scss";
import { Providers } from "./services/Contexts/Providers";
import { HandleOnlineState } from "./globals/layout/HandleOnlineState";

function App() {
  return (
    <Providers>
      <div className="App">
        <HandleOnlineState />
      </div>
    </Providers>
  );
}

export default App;

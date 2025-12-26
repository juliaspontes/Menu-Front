import { FC } from "react";
import MasterPage from "../MasterPage/MasterPage";
import Pagebase from "../../components/Pagebase/Pagebase";

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  return (
    <MasterPage>
      <Pagebase title="Home" descriptionPage="Apenas realizando teste">
        <div className="home">
          <h1>Home teste</h1>
        </div>
      </Pagebase>
    </MasterPage>
  );
};

export default Home;

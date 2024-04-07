import Image from "next/image";
import styles from "./page.module.css";
import './globals.scss';

const  Home = () => {
  return (
    <div className="">
        <div className="notification is-primary">
          This container is <strong>centered</strong> on desktop and larger viewports.
      </div>
    </div>
  );
}

export default Home;

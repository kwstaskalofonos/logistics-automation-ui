import Image from "next/image";
import styles from "./page.module.css";
import './globals.scss';

export default function Home() {
  return (
    <div className="container">
        <div className="notification is-primary">
    This container is <strong>centered</strong> on desktop and larger viewports.
  </div>
    </div>
  );
}

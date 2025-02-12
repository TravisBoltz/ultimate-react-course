// import { PageNav } from "../components/features/PageNav";

import Map from "@/components/features/Map/Map";
import SideBar from "@/components/features/SideBar/SideBar";
import styles from "./AppLayout.module.css";
export default function AppLayout() {
  return (
    <div className={styles.app}>
      {/* <PageNav /> */}
      <SideBar />
      <Map />
    </div>
  );
}

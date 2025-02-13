import { useSearchParams, useNavigate } from "react-router-dom";
import styles from "./Map.module.css";

export default function Map() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  return (
    <div
      className={styles.mapContainer}
      onClick={() => {
        navigate("form");
      }}
    >
      <h1>Map</h1>
      <h1>
        Map: {lat} and {lng}
      </h1>
      <button
        className="border-2 rounded-md border=white p-2"
        onClick={() => setSearchParams({ lat: 23, lng: 50 })}
      >
        Change
      </button>
    </div>
  );
}

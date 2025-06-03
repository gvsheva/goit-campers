import { useState } from "react";
import Category from "../../components/Category";
import HeartToggle from "../../components/HeartToggle";
import css from "./HomePage.module.css";
import FilterToggle from "../../components/FilterToggle";
import Button from "../../components/Button";
import Input from "../../components/Input";
import LocationSelect from "../../components/LocationSelect";
import DatePicker from "../../components/DatePicker";
import FilterToggleGroup, {
  type FilterItem,
} from "../../components/FilterToggleGroup";

const vehicleEquipment = [
  { icon: "wind", label: "AC", name: "ac" },
  { icon: "diagram", label: "Automatic", name: "automatic" },
  { icon: "cup-hot", label: "Kitchen", name: "kitchen" },
  { icon: "tv", label: "TV", name: "tv" },
  { icon: "shower", label: "Bathroom", name: "bathroom" },
] as FilterItem[];

const vehicleTypes = [
  { icon: "grid-1x2", label: "Van", name: "van" },
  { icon: "grid-2x2", label: "Fully Integrated", name: "integrated" },
  { icon: "grid-3x3", label: "Alcove", name: "alcove" },
] as FilterItem[];

const HomePage = () => {
  const [checked, setChecked] = useState(false);
  const [location, setLocation] = useState("");
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  return (
    <div className={css.container}>
      <h1>Welcome to the Home Page</h1>
      <p>This is the main page of our application.</p>
      <Button>Click me!</Button>
      <Category icon="microwave" label="Microwave" />
      <HeartToggle checked={checked} onChange={setChecked} />
      <FilterToggle
        icon="wind"
        label="AC"
        checked={checked}
        onChange={setChecked}
      />
      <LocationSelect
        value={location}
        onChange={setLocation}
        options={["Kyiv, Ukraine", "Lviv, Ukraine", "Odesa, Ukraine"]}
      />
      <Input placeholder="Some text here" />
      <Input />
      <DatePicker
        value={new Date()}
        onChange={(date) => console.log("Selected:", date)}
      />

      <FilterToggleGroup
        title="Vehicle equipment"
        items={vehicleEquipment}
        selected={selectedEquipment}
        onChange={setSelectedEquipment}
      />

      <FilterToggleGroup
        title="Vehicle type"
        items={vehicleTypes}
        selected={selectedTypes}
        onChange={setSelectedTypes}
      />
    </div>
  );
};

export default HomePage;

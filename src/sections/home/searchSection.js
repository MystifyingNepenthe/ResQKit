import SearchBar from "../../components/input/searchBar";

export default function SearchSection({
  search,
  setSearch,
}) {
  return (
    <SearchBar
      value={search}
      onChangeText={setSearch}
    />
  );
}
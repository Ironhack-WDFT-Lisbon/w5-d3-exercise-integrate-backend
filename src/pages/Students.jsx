import Listing from "../components/Listing";

export default function Students({ students, deleteItem }) {
  return (
    <>
      <h1>Students List</h1>
      <Listing data={students} deleteItem={deleteItem} />
    </>
  );
}

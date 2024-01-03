import { useSelector } from "react-redux";
import Card from "../components/Card";

const FavoritesPage = () => {
  const favorites = useSelector((state) => state.favorites.items);

  return (
    <>
      <div>
        <h1 className="text-gray-600 text-center text-3xl font-bold mt-4">
          Favourites
        </h1>
      </div>
      <div className="mt-8 grid md:grid-cols-2  xl:grid-cols-3 gap-2 lg:gap-6 items-start max-w-6xl px-4 mx-auto py-6">
        {favorites.map((favorite) => (
          <Card key={favorite.id} {...favorite} />
        ))}
      </div>
    </>
  );
};

export default FavoritesPage;

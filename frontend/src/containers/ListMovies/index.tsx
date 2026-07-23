import Pagination from "../../components/Pagination";
import Loading from "../../components/Loading";
import Table from "../../components/Table";

import ColumnsMovies from "../../utils/ColumnsMovies";

import useFilterMoviesList from "./hooks/useFilterMoviesListHook";
import useMoviesList from "./hooks/useMoviesListHook";
import FilterMovies from "./FilterMovies";

const ListMovies = () => {
  const { state: filters, onChange, clearFilters } = useFilterMoviesList();

  const { movies, totalPages, loading, error } = useMoviesList({
    page: Number(filters.page),
    size: filters.size,
    year: filters.year ? Number(filters.year) : undefined,
    winner: filters.winner ? filters.winner === "true" : undefined,
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <FilterMovies state={filters} onChange={onChange} clearFilters={clearFilters} />
      <br />
      <Table columns={ColumnsMovies} dataSource={movies} />
      <Pagination
        currentPage={Number(filters.page) + 1}
        totalPages={totalPages}
        onPageChange={(page) => onChange((page - 1).toString(), "page")}
      />
    </div>
  );
};

export default ListMovies;

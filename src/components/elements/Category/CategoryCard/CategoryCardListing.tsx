import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../../../store/actions/category.action";
import { getAllCategoriesSelector } from "../../../../store/selectors/category.selector";
import CategoryCardLayout from "./CategoryCardLayout";

// import CategoryCard from "./CategoryCard";

const CategoryCardListing = () => {
  const dispatch = useDispatch();
  const categoryFetchData = useSelector(getAllCategoriesSelector);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return <CategoryCardLayout categories={categoryFetchData} />;
};

export default CategoryCardListing;

import { NavLink } from "react-router-dom";
import styled from "styled-components";

const SearchAndFilterContainer = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
`;

const SearchAndFilterMenu = styled.div`
  max-width: 1080px;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & #search {
  }
`;

const FilterMenu = styled.ul`
  display: flex;
  justify-content: end;
  align-items: center;
  list-style: none;
  gap: 42px;
`;

const FilterMenuItem = styled.li`
  font-family: "Roboto", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  display: inline-block;

  & > a {
    cursor: pointer;
    height: 79px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    color: rgba(0, 0, 0, 0.5);
  }
  & > a.active {
    border-bottom: 2px solid black;
    color: rgba(0, 0, 0, 1);
  }
`;

export default function SearchAndFilter({ filterOptions }) {
  return (
    <SearchAndFilterContainer>
      <SearchAndFilterMenu>
        <div id="search">{/* Search */}</div>
        <FilterMenu>
          {filterOptions.map((filterOption) => (
            <FilterMenuItem key={filterOption.key}>
              <NavLink to={`/feed/${filterOption.key}`}>
                {filterOption.label}
              </NavLink>
            </FilterMenuItem>
          ))}
        </FilterMenu>
      </SearchAndFilterMenu>
    </SearchAndFilterContainer>
  );
}

import React, { useEffect, useState } from "react";
import "./App.css";
import styled from "styled-components";
import SearchResult from "./components/SearchResult";

export const BASE_URL = "http://localhost:9000";

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [selectedBtn, setSelectedBtn] = useState("all");

  useEffect(() => {
    const fetchFoodData = async () => {
      try {
        setLoading(true);
        const response = await fetch(BASE_URL);
        const json = await response.json();
        setData(json);
        setFilteredData(json);
        setLoading(false);
      } catch (error) {
        setError("Unable to fetch Data");
      }
    };
    fetchFoodData();
  }, []);
  const searchFood = (e) => {
    const searchValue = e.target.value;

    // console.log(searchValue);

    if (searchValue === "") {
      setFilteredData(null);
    }

    const filter = data?.filter((food) =>
      food.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredData(filter);
  };
  const filterFood = (type) => {
    if (type === "all") {
      setFilteredData(data);
      setSelectedBtn("all");
      return;
    }

    const filter = data?.filter((food) =>
      food.type.toLowerCase().includes(type.toLowerCase())
    );
    setFilteredData(filter);
    setSelectedBtn(type);
  };

const filterBtns = [
  {
    name: "All",
    type: "all",
  },
  {
    name: "Breakfast",
    type: "breakfast",
  },
  {
    name: "Lunch",
    type: "lunch",
  },
  {
    name: "Dinner",
    type: "dinner",
  },
];

// fetchFoodData();
if (error) return <div>{error}</div>;
if (loading) return <div>Loading...</div>;

return (
  <Container>
    <TopContainer>
      <div className="logo">
        <img src="/logo.svg" alt="" />
      </div>
      <div className="search">
        <input
          onChange={searchFood}
          type="text"
          placeholder="Search Food ..."
        />
      </div>
    </TopContainer>
    <FilterContainer>
      {filterBtns.map((value)=>(
        <Button isSelected = {selectedBtn == value.type}
        key={value.name} onClick={()=>filterFood(value.type)}>
          {value.name}
        </Button>
      ))}
      
    </FilterContainer>
    <SearchResult data={filteredData}></SearchResult>
  </Container>
)
}
export default App;
const Container = styled.div`
  margin: 1200px;
  margin: 0 auto;
`;
const TopContainer = styled.section`
  height: 140px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px;
  .search {
    input {
      background-color: transparent;
      border: 1px solid red;
      color: white;
      border-radius: 5px;
      height: 40px;
      font-size: 16px;
      padding: 0 10px;
      &::placeholder{
        color: white;
      }
    }
  }
  @media (0<width<600px){
    flex-direction: column;
    height: 130px;
  }
`;
const FilterContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 20px;
`;
export const Button = styled.button`
  background: ${({isSelected})=>(isSelected ?"#004563" : "#ff4343")};
  border-radius: 10px;
  padding: 6px 12px;
  color: white;
  font-size: 20px;
  &:hover {
    cursor: pointer;
    background-color: #004563;
  }
`;

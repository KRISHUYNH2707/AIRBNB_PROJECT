import React from "react";
import { Modal } from "antd";
import Search from "antd/es/input/Search";

interface Props {
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchUser(props: Props): JSX.Element {
  const handleSearch = async (value: string | "") => {
    if (!value && value !== "") {
      Modal.warning({ title: "Please enter a search term" });
      return;
    }
    await props.setKeyword(!value ? "" : encodeURIComponent(value));
  };
  return (
    <>
      <Search
        key="search"
        placeholder="Enter a name"
        enterButton="Search"
        size="large"
        style={{
          width: 300,
        }}
        onSearch={handleSearch}
      />
    </>
  );
}

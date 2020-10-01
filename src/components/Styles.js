import styled from "styled-components";

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const Container = styled.div`
  width: 400px;
  margin: 30px auto;
  clear: both;
`;

const List = styled.ul`
  list-style: none;
  padding: 0px 20px;
  background-color: #fff;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  border-top: 3px solid #9b8dab;
  box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.16);
`;

const ListItem = styled.li`
  padding: 10px 0px;
  border-top: 1px solid #e0dddd;
  :first-of-type {
    border-top: none;
  }
  a,
  u {
    text-decoration: none;
  }
`;

const Text = styled.div`
  font-family: "Segoe UI", "Helvetica Neue", sansserif;
  font-size: 15px;
  color: #565555;
`;

const ItemTitle = styled(Text)`
  font-size: 18px;
  color: #383737;
  margin-bottom: 10px;
`;

const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${(props) => (props.primary ? "palevioletred" : "white")};
  color: ${(props) => (props.primary ? "white" : "palevioletred")};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  cursor: pointer;
`;

const CircleList = styled.ul`
    counter-reset: list-counter;
    list-style: none;
    float:left;
}`;

const CircleListItem = styled.li`
  margin: 1.5em 0;
  &:before {
    content: counter(list-counter);
    counter-increment: list-counter;
    width: 1em;
    height: 1em;
    padding: 0.5em;
    margin-right: 1em;
    border-radius: 50%;
    border: 0.25em solid #ccc;
    background: #000;
    color: #fff;
    font-family: arial;
    font-weight: bold;
    text-align: center;
    display: inline-block;
  }
`;

const TextInput = styled.input.attrs({
  type: "text",
})`
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  outline: none;
  display: block;
  width: 100%;
  padding: 7px;
  border: none;
  border-bottom: 1px solid #ddd;
  background: transparent;
  margin-bottom: 10px;
  font: 16px Arial, Helvetica, sans-serif;
  height: 45px;
`;

export {
  Title,
  Container,
  List,
  ListItem,
  Text,
  ItemTitle,
  Button,
  CircleList,
  CircleListItem,
  TextInput,
};

import styles from "./UserContainer.module.scss";
import axios from 'axios';
// import {getUsers} from "../../api/users"
import {useEffect, useState} from 'react';
import UserItem from "../UsersItem/UserItem";
import Button from "../Button/Button";
import instance from "../../api/instance";

const UserContainer = () => {

  const [users, setUsers] = useState([]);
  const [isLastPage, setIsLastPage] = useState(false);
  const [url, setUrl] = useState("users?page=1&count=6");
  const usersHTML = users.map((item) => (
    <UserItem
      key={item.id}
      {...item}
    />
  ));

  const getUsers = async () => {
    try {
      const result = await instance.get(url);
      const currentPage = result.data.page;
      const totalPage = result.data.total_pages;

      setUsers(users => [...users, ...result.data.users]);

      if (currentPage === totalPage) {
        setIsLastPage(true);
        return;
      }

      setUrl(result.data.links.next_url.split("v1/")[1])
    } catch (e) {
      console.error(e);
    }
  }

  useEffect( () => {
    getUsers();
  }, [])


  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Working with GET request</h1>
      <div className={styles.userContent}>{usersHTML}</div>
      {!isLastPage && <Button getUsers={getUsers} text={"Show more"} type={"button"}/>}
    </div>
  );
}

export default UserContainer;

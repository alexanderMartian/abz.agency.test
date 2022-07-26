import styles from "./UserContainer.module.scss";
import {useEffect, useState, useRef} from 'react';
import UserItem from "../UsersItem/UserItem";
import Button from "../Button/Button";
import instance from "../../api/instance";
import {useSelector} from 'react-redux';
import Preloader from "../Preloader/Preloader";
import ActionMessage from "../ActionMessage/ActionMessage";

const UserContainer = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const url = useRef("users?page=1&count=6");
  const isSuccessfullyRegistration = useSelector((state) => state.user.isSuccessfullyRegistration);

  const usersHTML = users.map((item) => (
    <UserItem
      key={item.id}
      {...item}
    />
  ));

  const getUsers = async () => {
    try {
      setIsLoading(true);
      const result = await instance.get(url.current);
      const currentPage = result.data.page;
      const totalPage = result.data.total_pages;

      isSuccessfullyRegistration ?
        setUsers(result.data.users)
        :
        setUsers(users => [...users, ...result.data.users]);

      if (currentPage === totalPage) {
        setIsLastPage(true);
        setIsLoading(false);
        return;
      }
      url.current = result.data.links.next_url.split("v1/")[1];
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  }

  useEffect( () => {
    getUsers();
  }, [])

  useEffect( () => {
    if (isSuccessfullyRegistration) {
      url.current = "users?page=1&count=6";
      getUsers();
    }

  }, [isSuccessfullyRegistration])

  return (
    <div className={styles.container}>
      {isLoading && <Preloader/>}
      <h1 className={styles.title}>Working with GET request</h1>
      <div className={styles.userContent}>{usersHTML}</div>
      <ActionMessage/>
      {!isLastPage && <Button
        getUsers={getUsers}
        text={"Show more"}
        type={"button"}
        disabled={isLoading}
      />}
    </div>
  );
}

export default UserContainer;

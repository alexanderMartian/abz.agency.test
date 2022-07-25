import styles from "./UserContainer.module.scss";
import {useEffect, useState} from 'react';
import UserItem from "../UsersItem/UserItem";
import Button from "../Button/Button";
import instance from "../../api/instance";
import {useDispatch, useSelector} from 'react-redux';

const UserContainer = () => {

  const [users, setUsers] = useState([]);
  const [isLastPage, setIsLastPage] = useState(false);
  const [url, setUrl] = useState("users?page=1&count=6");
  const isSuccessfullyRegistration = useSelector((state) => state.user.isSuccessfullyRegistration);

  const usersHTML = users.map((item) => (
    <UserItem
      key={item.id}
      {...item}
    />
  ));

  useEffect( () => {
    console.log(isSuccessfullyRegistration, 'isSuccessfullyRegistration')
  },[isSuccessfullyRegistration])

  const getUsers = async () => {
    try {
      const result = await instance.get(url);
      const currentPage = result.data.page;
      const totalPage = result.data.total_pages;

      isSuccessfullyRegistration ?
        setUsers(result.data.users)
        :
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

  useEffect( () => {
    if (isSuccessfullyRegistration) {
    setUrl("users?page=1&count=6");
    getUsers()
    }

  }, [isSuccessfullyRegistration])



  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Working with GET request</h1>
      <div className={styles.userContent}>{usersHTML}</div>
      {!isLastPage && <Button getUsers={getUsers} text={"Show more"} type={"button"}/>}
    </div>
  );
}

export default UserContainer;

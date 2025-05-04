import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Stack,
  TextField,
} from "@mui/material";
import { useInputValidation } from "6pp";
import SearchIcon from "@mui/icons-material/Search";
import UserItem from "../shared/UserItem";
import { useDispatch, useSelector } from "react-redux";
import { setIsSearch } from "../../redux/reducers/misc";
import {
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
} from "../../redux/api/api";
import { useAsyncMutation } from "../../hooks/hook";

const search = () => {
  const search = useInputValidation("");

  const dispatch = useDispatch();

  const { isSearch } = useSelector((state) => state.misc);

  const [searchUser] = useLazySearchUserQuery();
  const [sendFriendRequest, isLoadingSendFriendRequest] = useAsyncMutation(
    useSendFriendRequestMutation
  );

  const addFriendHaandler = async (id) => {
    await sendFriendRequest("Sending Friend Request", { userId: id });
  };

  const searchCloseHandler = () => dispatch(setIsSearch(false));

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      searchUser(search.value)
        .then(({ data }) => setUsers(data.users))
        .catch((err) => console.log(err));
    }, 1000);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [search.value]);

  return (
    <Dialog open={isSearch} onClose={searchCloseHandler}>
      <Stack p={"2rem"} direction={"column"} width={"25rem"}>
        <DialogTitle textAlign={"center"}>Find People</DialogTitle>
        <TextField
          label=""
          size="small"
          value={search.value}
          onChange={search.changeHandler}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
          variant="outlined"
        />

        <List>
          {users.map((i) => {
            return (
              <UserItem
                user={i}
                key={i._id}
                handler={addFriendHaandler}
                handlerIsLoading={isLoadingSendFriendRequest}
              />
            );
          })}
        </List>
      </Stack>
    </Dialog>
  );
};

export default search;

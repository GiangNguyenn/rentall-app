import React from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Center,
  Stack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { IconContext } from "react-icons";
import { BsKey } from "react-icons/bs";
import { AiOutlineEdit, AiOutlineProfile } from "react-icons/ai";
import { TbHeartOff } from "react-icons/tb";
import { UserTab } from "../../components";
import {
  UserProfileAddress,
  UserProfileAvatar,
  UserProfileButton,
  UserProfileDeactivateButton,
  UserProfileEmail,
  UserProfileName,
} from "../../components/elements";
import DefaultLayout from "../DefaultLayout";
import { getCurrentUserSelector } from "../../store/selectors/user.selector";

const UserProfile = () => {
  const currentUser = useSelector(getCurrentUserSelector);
  return (
    <DefaultLayout>
      <Box>
        <UserTab />

        <Center py={6}>
          <Box
            w="full"
            maxH="900px"
            h="full"
            bg={useColorModeValue("white", "gray.900")}
            rounded="lg"
            p={6}
            textAlign="center"
          >
            <UserProfileAvatar />
            <UserProfileName userName={currentUser.name} />
            <UserProfileEmail userEmail={currentUser.email} />
            <UserProfileAddress userAddress="Ho Chi Minh city" />
            <Stack
              mt={8}
              direction="row"
              spacing={4}
              alignContent="center"
              justifyContent="center"
            >
              <UserProfileButton
                directUrl="/user/change-password"
                userButtonItem="Change your password"
                leftIcon={<BsKey />}
              />
              <UserProfileButton
                directUrl="/user/:id/edit"
                userButtonItem="Edit"
                leftIcon={<AiOutlineEdit />}
              />
            </Stack>
            <Stack
              mt={1}
              direction="row"
              spacing={4}
              alignContent="center"
              justifyContent="center"
            >
              <UserProfileButton
                directUrl="/user/view-my-profile"
                userButtonItem="View your information"
                leftIcon={<AiOutlineProfile />}
              />
            </Stack>
            <Stack
              mt={4}
              direction="row"
              spacing={4}
              alignContent="center"
              justifyContent="center"
              pt="15px"
            >
              <UserProfileDeactivateButton />
            </Stack>
          </Box>
        </Center>
      </Box>
    </DefaultLayout>
  );
};

export default UserProfile;

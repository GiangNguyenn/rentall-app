import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  GridItem,
} from "@chakra-ui/react";

import { useDisclosure } from "@chakra-ui/hooks";
import { useDropzone } from "react-dropzone";
import { getCurrentUserSelector } from "../../../store/selectors/user.selector";
import { IMAGES } from "../../../utils/constants/image.constant";
import { customAxios } from "../../../http-common";
import { toast } from "react-toastify";
import { getUserDetail } from "../../../store/actions/user.action";
import qs from "qs";

const UserProfileAvatar = () => {
  const currentUser = useSelector(getCurrentUserSelector);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [img, setImg] = useState("");
  const handleUploadFiles = async (file: any) => {
    const fd = new FormData();
    fd.append("images", file);
    const response = await customAxios("multipart/form-data").post(
      "product/upload-single-image",
      fd
    );
    if (response.data) {
      setImg(response.data.url!);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxFiles: 1,
    onDrop: async (acceptedFiles: File[]) => {
      setIsLoading(true);
      await handleUploadFiles(acceptedFiles[0]);
      setIsLoading(false);
    },
  });

  const _handleChangeAvt = async () => {
    const response = await customAxios()
      .put(
        "user/edit-user",
        qs.stringify({
          profileImage: img,
        })
      )
      .catch((e) => {
        toast.error("Error when upload your avatar");
      });
    if (response && (response.status === 200 || response.status === 201)) {
      toast.success("Change avatar successfully");
      dispatch(getUserDetail());
    }
  };

  return (
    <Avatar
      boxSize="350px"
      src={
        currentUser.profileImage
          ? currentUser.profileImage
          : IMAGES.defaultAvatar
      }
      mb={4}
      pos="relative"
      className="overflow-hidden"
    >
      <div className="absolute bottom-0 ">
        <Button
          onClick={onOpen}
          size="lg"
          height="100px"
          width="400px"
          colorScheme="blackAlpha"
          className="opacity-0 hover:opacity-100 hover:bg-[#222] absolute bottom-0 outline-none box-border cursor-pointer duration-500 z-30"
        >
          Change Avatar
        </Button>
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <GridItem className="pb-5 p-5" colSpan={{ base: 6, sm: 3 }}>
            <FormControl>
              <FormLabel>Change your avatar</FormLabel>
              <div
                style={{
                  background: img ? `url('${img}')` : "none",
                  backgroundPosition: "center center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
                className={
                  img
                    ? "border-4 cursor-pointer text-center justify-center p-[20%]"
                    : "border-dashed border-4 cursor-pointer text-center justify-center p-[20%]"
                }
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                {img ? (
                  <></>
                ) : (
                  <p>Drag 'n' drop some files here, or click to select files</p>
                )}
              </div>
            </FormControl>
            <aside className="flex flex-row" />
          </GridItem>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button type="reset" mr={3} onClick={() => setImg("")}>
              Reset
            </Button>
            <Button
              disabled={!img}
              type="submit"
              mr={3}
              onClick={_handleChangeAvt}
            >
              Change Avatar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Avatar>
  );
};

export default UserProfileAvatar;

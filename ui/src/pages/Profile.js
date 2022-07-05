import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navigation from "../components/Navigation";
import Announcement from "../components/Announcement";
import { useDispatch, useSelector } from "react-redux";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { profileactions } from "../store/Userprofile";
import Profiler from "../components/Profiler";
const Profile_maincontainer = styled.div``;
const Container = styled.div``;
const Button = styled.button`
  padding: 10px;
`;
const Update_container = styled.div`
  margin-top: 20px;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;
const Form_container = styled.div`
  height: 120vh;
  width: 100vb;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 0px;
  box-sizing: content-box;
  background-image: linear-gradient(to right, #ddd6f3, #faaca8);
`;
const Form = styled.form``;
const Input = styled.input`
  width: 350px;
  padding: 10px;
  box-sizing: border-box;
`;
const Label = styled.label`
  font-size: 20px;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
`;
const Image1 = styled.img`
  height: 150px;
  width: 200px;
  border-radius: 0%;
  background-color: red;
`;
const Profile = () => {
  const [show, setshow] = useState(false);
  const [profileobject, setProfileobject] = useState({});
  const selector = useSelector((state) => state.userprofile);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(selector.User_profile)
    setProfileobject(selector.User_profile);
    
  }, [selector.User_profile]);
  const show_handler = () => {
    setshow(true);
  };
  const profilechnage_handler = (e) => {
    console.log("jto");
    setProfileobject((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const profilechnage_handler1 = (e) => {
    const { files } = e.target;
    const localImageUrl =URL.createObjectURL(files[0]);

    setProfileobject((prev) => {
      return {
        ...prev,
        [e.target.name]: localImageUrl,
      };
    });
  };
  const submithandler = (e) => {
    e.preventDefault();
    dispatch(profileactions.addprofile(profileobject));
  };
  return (
    <Container>
      <Navigation></Navigation>
      <Announcement></Announcement>
      <Profile_maincontainer>
        {selector.User_profile.hasOwnProperty("fname") ? (
          <Profiler
            object={profileobject}
            submithandler={submithandler}
            profilechnage_handler={profilechnage_handler}
            profilechnage_handler1={profilechnage_handler1}
          ></Profiler>
        ) : !show ? (
          <Update_container>
            <AccountCircleIcon
              style={{ width: "100px", height: "100px" }}
            ></AccountCircleIcon>
            <br></br>
            <h1 style={{ margin: "0px" }}>Please update your profile</h1>
            <br></br>
            <Button onClick={show_handler}>Add profile</Button>
          </Update_container>
        ) : (
          <Form_container>
            <div>
              {" "}
              <Image1 src={profileobject.image}></Image1>
            </div>

            <Form>
              <Label> First Name:</Label>
              <br></br>
              <Input
                type="text"
                placeholder="First Name"
                name="fname"
                onChange={profilechnage_handler}
              ></Input>
              <br></br> <br></br>
              <Label>Last Name:</Label>
              <br></br>
              <Input
                type="text"
                placeholder="Last Name"
                name="lname"
                onChange={profilechnage_handler}
              ></Input>
              <br></br> <br></br>
              <Label>Phone No:</Label>
              <br></br>
              <Input
                type="number"
                placeholder="Phone No"
                name="phone"
                onChange={profilechnage_handler}
              ></Input>
              <br></br> <br></br>
              <Label>Gmail:</Label>
              <br></br>
              <Input
                type="email"
                placeholder="Gmail"
                name="email"
                onChange={profilechnage_handler}
              ></Input>
              <br></br> <br></br>
              <Label>DOB</Label>
              <br></br>
              <Input
                type="date"
                placeholder="Date Of Birth"
                name="DOB"
                onChange={profilechnage_handler}
              ></Input>
              <br></br> <br></br>
              <Label>Age</Label>
              <br></br>
              <Input
                type="text"
                placeholder="Age"
                name="age"
                onChange={profilechnage_handler}
              ></Input>
              <br></br> <br></br>
              <Label>select profile image</Label>
              <br></br>
              <Input
                type="file"
                placeholder="choose image"
                name="image"
                onChange={profilechnage_handler1}
              ></Input>
              <br></br>
              <button
                type="submit"
                style={{
                  marginLeft: "100px",
                  marginTop: "10PX",
                  padding: "5px 10px",
                  backgroundColor: "teal",
                  borderRadius: "10PX",
                }}
                onClick={submithandler}
              >
                SUBMIT
              </button>
            </Form>
          </Form_container>
        )}
      </Profile_maincontainer>
    </Container>
  );
};

export default Profile;

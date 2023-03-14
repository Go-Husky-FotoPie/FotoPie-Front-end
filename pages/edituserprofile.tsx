import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material";
import FormHelperText from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  useForm,
  SubmitHandler,
  FormState,
  FormProvider,
} from "react-hook-form";
import Copyright from "../src/components/Copyright";
import FormTextField from "../src/components/textField/formTextField";
import { yupResolver } from "@hookform/resolvers/yup";
import { Schema, string, object, mixed } from "yup";
import { useRouter } from "next/router";
import axiosRequest from "../src/utils/axiosRequest";
import NavBar from "../src/components/NavBar";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { getMe } from "../src/axiosRequest/api/editUser";
import { updateName } from "../src/axiosRequest/api/editUser";
import { upload } from "../src/axiosRequest/api/editUser";

// Define a type with the shape of the form values
interface IFormInput {
  firstName: string;
  lastName: string;
  bio: string;
  location: string;
  website: string;
  twitter: string;
  instagram: string;
  youtube: string;
  tiktok: string;
}

interface MouseEvent {
  target: EventTarget;
}
// Define a schema for the form values
const formSchema: Schema<IFormInput> = object({
  firstName: string().max(15).required(),
  lastName: string().max(15).required(),
  bio: string().max(130).default(""),
  location: string().max(20).default(""),
  website: string().default(""),
  twitter: string().default(""),
  instagram: string().default(""),
  youtube: string().default(""),
  tiktok: string().default(""),
});

// Define a component that renders the form
export default function EditUserProfile() {
  const router = useRouter();
  const methods = useForm<IFormInput>({
    resolver: yupResolver(formSchema),
  });

  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    getMe().then((res) => {
      setLastName(res.data.lastName);
      setFirstName(res.data.firstName);
      setAvatar(res.data.avatarPath);
    });
  }, [avatar]);

  // Define a submit handler for the form
  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    updateName(data);
  };

  const handleFileUpload = async (event: MouseEvent) => {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files != null) {
      const file = fileInput.files[0];
      const formData = new FormData();
      formData.append("file", file);
      upload(formData).then((res) => {
        setAvatar(res.data.avatarPath);
      });
    };
  };

  return (
    <>
      <NavBar isFixed={false} color="#000000" />
      <FormProvider {...methods}>
        <Container component="main" maxWidth="md">
          {/*Page heading, profile icon and change picture button*/}

          <Box
            sx={{
              marginTop: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Typography component="h1" variant="h3">
              Profile Setting
            </Typography>
          </Box>

          {/*change avatar button*/}
          <Grid container spacing={10}>
            <Grid item xs={2}>
              <Avatar src={avatar} sx={{ width: 130, height: 130 }}></Avatar>
            </Grid>
            <Grid item xs={10}>
              <Button
                size="medium"
                variant="contained"
                color="secondary"
                sx={{ mt: 5, mb: 8 }}
                component="label"
              >
                Change Picture
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                />
              </Button>
            </Grid>
          </Grid>
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            {/*First input grid*/}

            <Grid container spacing={8}>
              <Grid item xs={6}>
                <Typography variant="h6">First Name*</Typography>
                <FormTextField
                  name="firstName"
                  label={firstName}
                  id="firstName"
                  autoComplete="firstName"
                />
              </Grid>

              <Grid item xs={6}>
                <Typography variant="h6">Last Name*</Typography>
                <FormTextField
                  name="lastName"
                  label={lastName}
                  id="lastName"
                  autoComplete="LastName"
                />
              </Grid>
            </Grid>
            <Typography variant="body1" color="grey">
              We want people to use their real names in the community so they
              can get to know each other.
            </Typography>

            {/*Box containing password reset*/}

            <Box component="form" sx={{ mt: 3 }}>
              <Typography component="h1" variant="h6">
                password
              </Typography>

              <Button
                type="submit"
                size="medium"
                variant="contained"
                color="secondary"
                sx={{ mt: 3, mb: 2 }}
              >
                <Link href="reset-request" color="inherit" underline="none">
                  Reset Password
                </Link>
              </Button>
            </Box>

            {/*Box for writing bio*/}

            <Box
              sx={{
                width: 850,
                height: 250,
              }}
            >
              <Typography component="h1" variant="h4">
                Recognition
              </Typography>

              <TextField
                sx={{
                  width: 850,
                }}
                InputProps={{ sx: { height: 150 } }}
                name="bio"
                label="Write a short bio for your profile"
                id="bio"
                autoComplete="bio"
              />
              <Typography variant="body1" color="grey" align="right">
                0/130
              </Typography>
            </Box>

            {/*Second input grid*/}

            <Grid container spacing={8}>
              <Grid item xs={6}>
                <Typography variant="h6">Location</Typography>
                <FormTextField
                  name="location"
                  label="location"
                  id="location"
                  autoComplete="location"
                />
                <Typography variant="body1" color="grey">
                  By sharing your location information, you help us make your
                  profile more identifiable.
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="h6">Website</Typography>
                <FormTextField
                  name="website"
                  label="website"
                  id="website"
                  autoComplete="website"
                />
                <Typography variant="body1" color="grey">
                  Your profile page, homepage, blog.
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="h6">Twitter</Typography>
                <FormTextField
                  name="twitter"
                  label="twitter"
                  id="twitter"
                  autoComplete="twitter"
                />
              </Grid>

              <Grid item xs={6}>
                <Typography variant="h6">Instagram</Typography>
                <FormTextField
                  name="instagram"
                  label="instagram"
                  id="instagram"
                  autoComplete="instagram"
                />
              </Grid>

              <Grid item xs={6}>
                <Typography variant="h6">Youtube</Typography>
                <FormTextField
                  name="youtube"
                  label="youtube"
                  id="youtube"
                  autoComplete="youtube"
                />
              </Grid>

              <Grid item xs={6}>
                <Typography variant="h6">TikTok</Typography>
                <FormTextField
                  name="tiktok"
                  label="tiktok"
                  id="tiktok"
                  autoComplete="tiktok"
                />
              </Grid>
            </Grid>

            <Box>
              {/*Message notification setting*/}
              <Box
                sx={{
                  marginTop: 8,
                  width: 850,
                  height: 150,
                }}
              >
                <Typography component="h1" variant="h4">
                  Message notification
                </Typography>

                <Typography component="h1" variant="h6">
                  Fotopie moderates all messages to prevent spam.
                </Typography>

                <FormControlLabel
                  control={
                    <Checkbox value="showMessageButton" color="primary" />
                  }
                  label="Show message button on my profile"
                />
              </Box>

              {/*Other setting*/}
              <Box
                sx={{
                  marginTop: 8,
                  width: 850,
                  height: 150,
                }}
              >
                <Typography variant="h4">Other settings</Typography>

                <Typography variant="h6" color="grey">
                  Delete account and all data
                </Typography>

                <Link href="delete account" variant="h6">
                  delete account
                </Link>
              </Box>

              {/*change name button*/}
              <Grid
                container
                justifyContent="center"
                component="form"
                onSubmit={methods.handleSubmit(onSubmit)}
              >
                <Button
                  type="submit"
                  size="large"
                  color="secondary"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Save Profile
                </Button>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </FormProvider>
    </>
  );
}

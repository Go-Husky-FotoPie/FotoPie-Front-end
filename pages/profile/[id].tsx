import { Button, Container, Grid } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import NavBar from "../../src/components/NavBar";
import Gallery from "../../src/components/profile/Gallery";
import Collection from "../../src/components/profile/Collection";
import { getUserInfo } from "../../src/axiosRequest/api/user";

export default function ProfilePage() {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [avatarPath, setAvatarPath] = useState("");
  const [isGallery, setIsGallery] = useState(true);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!router.isReady) return;

    getUserInfo(id).then((res) => {
      console.log(res);
      // if (id !== res.data.id) return router.push("/404");
      setLastName(res.data.lastName);
      setFirstName(res.data.firstName);
      setAvatarPath(res.data.avatarPath);
    });
  }, [id]);

  return (
    <>
      <NavBar isFixed={false} color="#000000" />
      <Grid
        container
        direction="column"
        alignItems="center"
        sx={{ mt: 10, width: "100%" }}
      >
        {/* avatar */}
        <Grid item>
          <Avatar
            alt="avatar"
            src={avatarPath}
            sx={{ width: 180, height: 180 }}
          />
        </Grid>

        {/* name */}
        <Grid
          container
          direction="row"
          justifyContent="center"
          sx={{ mt: 5 }}
          spacing={2}
        >
          <Grid item>
            <Typography variant="h3">{firstName}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h3">{lastName}</Typography>
          </Grid>
        </Grid>

        {/* Gallery & Collection button*/}
        <Grid container justifyContent="center" sx={{ mt: 5 }} spacing={5}>
          <Grid item>
            <Button
              variant={isGallery ? "contained" : "outlined"}
              sx={{ borderRadius: 10, p: 1.5, pl: 3, pr: 3 }}
              size="large"
              onClick={() => {
                // router.push(`/profile/${id}/gallery`);
                setIsGallery(true);
              }}
            >
              <Typography>Gallery</Typography>
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant={!isGallery ? "contained" : "outlined"}
              sx={{ borderRadius: 10, p: 1.5, pl: 3, pr: 3 }}
              size="large"
              onClick={() => {
                // router.push(`/profile/${id}/collection`);
                setIsGallery(false);
              }}
            >
              <Typography>Collection</Typography>
            </Button>
          </Grid>
        </Grid>

        <Grid sx={{m:5}}>
          {isGallery ? (
            <Gallery id={id as string} />
          ) : (
            <Collection id={id as string} />
          )}
        </Grid>
      </Grid>
    </>
  );
}

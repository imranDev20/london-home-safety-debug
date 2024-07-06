import ProfileNavigation from "./_components/profile-navigation";
import { Container, Box, Sheet } from "@mui/joy";

export default function ProfileLayout(props: { children: React.ReactNode }) {
  return (
    <Sheet variant="soft">
      <Container
        maxWidth="lg"
        sx={{
          pt: 5,
          pb: 10,
        }}
      >
        <ProfileNavigation>{props.children}</ProfileNavigation>
      </Container>
    </Sheet>
  );
}

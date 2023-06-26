import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Container, PageContainer } from "../styles/LoggedInLayoutStyle";

export default function LoggedInLayout() {
  // some other code here

  return (
    <Container>
      <NavBar />
      <PageContainer>
        <Outlet />
      </PageContainer>
    </Container>
  );
}

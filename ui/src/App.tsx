import { EuiPanel } from "@elastic/eui";
import "@elastic/eui/dist/eui_theme_amsterdam_light.css";
import c from "classnames";
import React from "react";
import { Helmet } from "react-helmet";
import {
  BrowserRouter as Router,
  Route,
  useHistory,
  useLocation,
} from "react-router-dom";
import Header, { BreadcrumbHeader } from "./components/header";
import Login from "./pages/login";
import ProjectListing from "./pages/project-listing";
import ProjectsCreate from "./pages/projects-create";
import Register from "./pages/register";

const AppContainer: React.FC<{}> = ({ children }) => {
  const location = useLocation();
  const history = useHistory();
  if (localStorage.getItem("token") && location.pathname === "/") {
    history.push("/dashboard");
  }
  return (
    <div
      className={c(
        "app",
        ["/", "/register"].includes(location.pathname) ? "fancy-background" : ""
      )}
    >
      {children}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContainer>
        <Helmet>
          <link
            href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
            rel="stylesheet"
          />
        </Helmet>
        <header>
          <Header />
          <Route key="dashboard" exact path="/dashboard">
            <BreadcrumbHeader items={[{ text: "Dashboard", href: "/" }]} />
          </Route>
          <Route key="projects" exact path="/projects">
            <BreadcrumbHeader
              items={[
                { text: "Dashboard", href: "/dashboard" },
                { text: "Projects", href: "/projects" },
              ]}
            />
          </Route>
          <Route key="projects-create" exact path="/projects/create">
            <BreadcrumbHeader
              items={[
                { text: "Dashboard", href: "/dashboard" },
                { text: "Projects", href: "/projects" },
                { text: "Create", href: "/projects/create" },
              ]}
            />
          </Route>
        </header>
        <main>
          <Route key="login" exact path="/">
            <Login />
          </Route>
          <Route key="register" exact path="/register">
            <Register />
          </Route>
          <Route key="dashboard" exact path="/dashboard">
            <div>home</div>
          </Route>
          <Route exact path="/projects">
            <div style={{ maxWidth: "80%", margin: "0 auto" }}>
              <EuiPanel paddingSize="m">
                <ProjectListing />
              </EuiPanel>
            </div>
          </Route>
          <Route exact path="/projects/create">
            <div style={{ maxWidth: "80%", margin: "0 auto" }}>
              <EuiPanel paddingSize="m">
                <ProjectsCreate />
              </EuiPanel>
            </div>
          </Route>
        </main>
      </AppContainer>
    </Router>
  );
}

export default App;

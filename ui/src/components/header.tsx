/**
 * This demo has been simplified to showcase just the buttons within sections.
 * See the main example for all the menu items.
 */
import { gql, useQuery } from "@apollo/client";
import {
  EuiAvatar,
  EuiBreadcrumb,
  EuiButton,
  EuiButtonEmpty,
  EuiHeader,
  EuiHeaderSectionItemButton,
  EuiHeaderSections,
  EuiIcon,
  EuiKeyPadMenu,
  EuiKeyPadMenuItem,
  EuiPopover,
  htmlIdGenerator,
} from "@elastic/eui";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

export interface IAppMenuItemProps {
  label: string;
  href: string;
  icon: string;
  onClick?: (e: React.MouseEvent) => void;
}

export const AppMenuItem = (props: IAppMenuItemProps) => {
  const history = useHistory();
  return (
    <EuiKeyPadMenuItem
      label={props.label}
      onClick={(e: React.MouseEvent) => {
        if (props.onClick) {
          props.onClick(e);
        }
        history.push(props.href);
      }}
    >
      <EuiIcon type={props.icon} size="l" />
    </EuiKeyPadMenuItem>
  );
};

const HeaderAppMenu = () => {
  const idGenerator = htmlIdGenerator();
  const popoverId = idGenerator("popover");
  const keypadId = idGenerator("keypad");

  const [isOpen, setIsOpen] = useState(false);

  const onMenuButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const button = (
    <EuiHeaderSectionItemButton
      aria-controls={keypadId}
      aria-expanded={isOpen}
      aria-haspopup="true"
      aria-label="Apps menu"
      onClick={onMenuButtonClick}
    >
      <EuiIcon type="apps" size="l" />
    </EuiHeaderSectionItemButton>
  );

  return (
    <EuiPopover
      id={popoverId}
      button={button}
      isOpen={isOpen}
      anchorPosition="downRight"
      closePopover={closeMenu}
    >
      <EuiKeyPadMenu id={keypadId} style={{ width: 500 }}>
        <AppMenuItem
          label="Dashboard"
          href="/"
          icon="dashboardApp"
          onClick={() => closeMenu()}
        />
        <AppMenuItem
          label="Projects"
          href="/projects"
          icon="discoverApp"
          onClick={() => closeMenu()}
        />

        <EuiKeyPadMenuItem label="Foo">
          <EuiIcon type="discoverApp" size="l" />
        </EuiKeyPadMenuItem>

        <EuiKeyPadMenuItem label="Foo">
          <EuiIcon type="devToolsApp" size="l" />
        </EuiKeyPadMenuItem>

        <EuiKeyPadMenuItem label="Foo">
          <EuiIcon type="machineLearningApp" size="l" />
        </EuiKeyPadMenuItem>

        <EuiKeyPadMenuItem label="Foo">
          <EuiIcon type="graphApp" size="l" />
        </EuiKeyPadMenuItem>

        <EuiKeyPadMenuItem label="Foo">
          <EuiIcon type="visualizeApp" size="l" />
        </EuiKeyPadMenuItem>

        <EuiKeyPadMenuItem label="Foo" betaBadgeLabel="Beta">
          <EuiIcon type="timelionApp" size="l" />
        </EuiKeyPadMenuItem>
      </EuiKeyPadMenu>
    </EuiPopover>
  );
};

const UserNavItem = () => {
  const USER_QUERY = gql`
    query {
      me {
        id
        username
        email
        confirmed
        blocked
        role {
          name
        }
      }
    }
  `;

  const { data, loading, error } = useQuery(USER_QUERY);
  const email = data && data.me && data.me.email;
  return (
    <EuiHeaderSectionItemButton disabled aria-label="Account menu">
      <EuiAvatar isDisabled name={email || ""} size="s" />
    </EuiHeaderSectionItemButton>
  );
};

const UnauthenticatedNavbarItems = () => {
  const history = useHistory();

  return (
    <>
      <EuiButton
        iconType="user"
        iconSide="right"
        // isLoading={true}
        // isDisabled={true}
        color={"primary"}
        size="s"
        fill
        onClick={() => history.push("/")}
      >
        Login
      </EuiButton>
      <span style={{ width: "1em" }} />
      <EuiButton
        iconType="arrowRight"
        iconSide="right"
        // isLoading={true}
        // isDisabled={true}
        color={"success"}
        size="s"
        fill
        onClick={() => history.push("/register")}
      >
        Register
      </EuiButton>
    </>
  );
};

const LogoutButton = () => {
  const history = useHistory();

  return (
    <EuiButtonEmpty
      iconType="exit"
      iconSide="right"
      // isLoading={true}
      // isDisabled={true}
      color="ghost"
      size="s"
      onClick={() => {
        localStorage.removeItem("token");
        history.push("/");
      }}
    >
      Logout
    </EuiButtonEmpty>
  );
};

const getNavbarItems = () => {
  if (localStorage.getItem("token")) {
    return [<UserNavItem />, <HeaderAppMenu />, <LogoutButton />];
  }

  return [<UnauthenticatedNavbarItems />];
};

const navbarSections: EuiHeaderSections[] = [
  {
    items: [
      <Link to="/" className="font-source-pro text-white text-2xl">
        <EuiIcon type="logoCode" size="xl" /> Kue
      </Link>,
      // todo spaces here
    ],
    borders: "right",
  },
  {
    items: getNavbarItems(),
  },
];

export const Header = () => {
  return (
    <>
      <EuiHeader theme="dark" sections={navbarSections} />
    </>
  );
};

export const BreadcrumbHeader = ({
  items,
}: {
  items: Array<Partial<EuiBreadcrumb>>;
}) => {
  const history = useHistory();
  const crumbs = items.map((crumb) => ({
    text: crumb.text,
    href: crumb.href,
    onClick: (e: React.MouseEvent) => {
      e.preventDefault();
      history.push(crumb.href!);
    },
  }));
  return (
    <EuiHeader
      sections={[
        {
          items: [],
          borders: "right",
          breadcrumbs: crumbs,
          breadcrumbProps: {
            "aria-label": "Header sections breadcrumbs",
          },
        },
      ]}
    />
  );
};

export default Header;

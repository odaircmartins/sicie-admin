import styled from "styled-components";

import NavLink from "./NavLink";
import {breakpoints as bp} from '../../config/globalStyle';

const LinksGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: ${p => Number(!p.compact)};
  padding: 24px 0 14px 0;
  overflow: hidden;
  overflow-y: auto;
  background-color: #fff;
  transition: flex-grow 0.3s cubic-bezier(0.4, 0, 1, 1);
  scrollbar-color: #4fc3f7 #fff;
  scrollbar-width: thin !important;
  ::-webkit-scrollbar {
    width: 4px;
  }
  /* Track */
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #4fc3f7;
    border-radius: 4px;
  }
  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #3f3f3f;
  }
  @media(max-width: ${bp.desktop}) {
      flex-grow: 1;
  }
`;

const DenseNavLinks = styled(NavLink)`
  && {
    box-shadow: none;
    min-height: 48px;
  }
`;

const links = [
  {
    to: "/usuarios",
    icon: "far fa-user",
    label: "Usuário",
  },
  {
    to: "/alterar-senha",
    icon: "fas fa-fingerprint",
    label: "Alterar senha",
  },
  {
    to: "/listar-eventos",
    icon: "far fa-list-alt",
    label: "Eventos",
  },
  {
    to: "/prestadores-servicos",
    icon: "fa fa-briefcase",
    label: "Serviços",
  },
];

function NavLinksGroup(props) {
  return (
    <LinksGroup {...props}>
      {links.map((l) => (
        <DenseNavLinks
          compact={props.compact}
          key={l.to}
          to={l.to}
          iconClassName={l.icon}
          label={l.label}
        />
      ))}
    </LinksGroup>
  );
}

export default NavLinksGroup;
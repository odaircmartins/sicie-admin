import styled from "styled-components";

import NavLink from "./NavLink";
import {breakpoints as bp} from '../../config/globalStyle';

const LinksGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: ${p => Number(!p.compact)};
  padding: 24px 0 14px 0;
  margin-right: 2px;
  overflow: hidden;
  overflow-y: auto;
  background-color: rgba(var(--color-secondary-rgb), 0.1);
  transition: flex-grow 0.3s cubic-bezier(0.4, 0, 1, 1);
  ::-webkit-scrollbar {
    width: 4px;
  }
  /* Track */
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.4);
    border-radius: 4px;
  }
  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
  }
  @media(max-width: ${bp.desktop}) {
      flex-grow: 1;
  }
`;

const DenseNavLinks = styled(NavLink)`
  && {
    box-shadow: none;
    min-height: 36px;
  }
`;

const links = [
  {
    to: "/usuarios",
    icon: "fas fa-user",
    label: "Usuário",
  },
  {
    to: "/alterar-senha",
    icon: "fas fa-key",
    label: "Alterar senha",
  },
  {
    to: "/criar-evento",
    icon: "fas fa-calendar",
    label: "Criar evento",
  },
  {
    to: "/listar-eventos",
    icon: "fas fa-list-alt",
    label: "Listar Eventos",
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
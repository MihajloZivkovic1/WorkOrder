import { Outlet, Form, NavLink } from "react-router-dom";
import Logout from "../components/Logout";



export default function Root() {
  return (
    <>
      <div id="sidebar">
        <h1>Manage Work Orders</h1>
        <div>
          <Form method="post">
            <button type="submit">New</button>
            <Logout />
          </Form>
        </div>
        <nav>
          <ul>

            <li>
              <NavLink to={`/cardboards`}>
                {<h1>Repromaterijal</h1>}
              </NavLink>
            </li>

            <li>
              <NavLink to={`/createCardboards`}>
                {<h1>Kreiraj novi repromaterijal</h1>}
              </NavLink>
            </li>
            <li>
              <NavLink to={`/createWorkOrder`}>
                {<h1>Kreiraj novi radni nalog</h1>}
              </NavLink>
            </li>
            <li>
              <NavLink to={`/getWorkOrder`}>
                {<h1>Pregledaj sve radne naloge</h1>}
              </NavLink>
            </li>
          </ul>

        </nav>

      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}

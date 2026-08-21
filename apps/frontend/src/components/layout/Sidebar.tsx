import { NavLink } from "react-router-dom";

export default function Sidebar() {
    return (
        <aside className="sidebar">
            <div className="sidebar-logo">
                <h2>Brain Agriculture</h2>
            </div>

            <nav className="sidebar-nav">
                <NavLink to="/" end>
                    Dashboard
                </NavLink>

                <NavLink to="/produtores">
                    Produtores
                </NavLink>

                <NavLink to="/propriedades">
                    Propriedades
                </NavLink>

                <NavLink to="/culturas">
                    Culturas
                </NavLink>
            </nav>
        </aside>
    );
}
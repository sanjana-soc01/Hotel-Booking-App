import Header from "./Header";
import {Outlet} from "react-router-dom";

export default function Layout(){
    return(
        <div className="py-4 px-8 flex flex-col">
            <Header className="py-4 px-8 flex flex-col mx-auto" />
            <Outlet />
        </div>
    );
}
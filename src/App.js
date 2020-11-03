import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Component imports
import Logout from "./components/logout";
import NavBar from "./components/navbar";
import NotFound from "./components/notFound";
import Home from "./components/home";
import Login from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import auth from "./services/authService";
import ContactUs from "./components/contactUs";
import About from "./components/about";
import FAQ from "./components/FAQ";
import FooterPage from "./components/footer";
import PurchaseTicket from "./components/purchaseTicket";
import Checkout from "./components/checkoutForm";
import CharityList from "./components/charityList";
import CharityView from "./components/charityView";
import UserSettings from "./components/userSettings";
import UserTickets from "./components/userTickets";

// Admin imports
import createAdminStore from "./admin/createAdminStore";
import { Provider } from "react-redux";
import { createHashHistory } from "history";
import { Admin, Resource } from "react-admin";
import Dashboard from "./admin/components/dashboard";
import { UserList, UserCreate, UserEdit } from "./admin/components/userList";
import {
  TicketList,
  TicketCreate,
  TicketEdit,
} from "./admin/components/ticketList";
import {
  AdminCharityList,
  CharityCreate,
  CharityEdit,
} from "./admin/components/charityList";
import {
  SlideshowList,
  SlideshowCreate,
  SlideshowEdit,
} from "./admin/components/slideshowList";
import {
  SponsorList,
  SponsorCreate,
  SponsorEdit,
} from "./admin/components/sponsorList";
import CharityIcon from "@material-ui/icons/EmojiEmotions";
import UserIcon from "@material-ui/icons/Group";
import TicketIcon from "@material-ui/icons/ConfirmationNumber";
import SlideshowIcon from "@material-ui/icons/AddAPhoto";
import SponsorIcon from "@material-ui/icons/Stars";
import dataProvider from "./admin/dataProvider";
import authProvider from "./admin/authProvider";

// CSS imports
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const history = createHashHistory();
class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    const links = [
      { path: "/about", name: "About Us" },
      { path: "/purchase", name: "Buy Tickets" },
      { path: "/charities", name: "Participating Organizations" },
      { path: "/contactUs", name: "Contact Us" },
      { path: "/FAQ", name: "FAQ" },
    ];
    const banner = process.env.PUBLIC_URL + "/images/banner.jpg";
    const rotaryWheel =
      process.env.PUBLIC_URL + "/images/rotaryInternational.png";
    return (
      <Provider
        store={createAdminStore({ authProvider, dataProvider, history })}
      >
        <main
          className="container-fluid"
          role="main"
          style={{ padding: "0px" }}
        >
          <div>
            <div className="grid-container">
              <div className="grid-item wheel">
                <img
                  src={rotaryWheel}
                  alt="Rotary International Wheel"
                  style={{ height: "200px" }}
                />
              </div>
              <div className="grid-item banner-container">
                <img
                  src={banner}
                  className="banner-image"
                  alt="Rotary Snowball Sweepstakes Banner"
                />
              </div>
              <div className="grid-item title">
                <h1>Rotary Club of Grand Junction</h1>
              </div>
            </div>
          </div>
          <NavBar links={links} user={user} />
          <div>
            <ToastContainer />
            <Switch>
              <Route path="/register" component={RegisterForm} />
              <Route path="/login" component={Login} />
              <Route path="/logout" component={Logout} />
              <Route path="/not-found" component={NotFound} />
              <Route path="/" exact component={Home} />
              <Route path="/about" component={About} />
              <Route path="/purchase" component={PurchaseTicket} />
              <Route path="/checkout" component={Checkout} />
              <Route path="/contactUs" component={ContactUs} />
              <Route path="/FAQ" component={FAQ} />
              <Route exact path="/charities" component={CharityList} />
              <Route path="/charities/:id" component={CharityView} />
              <Route path="/tickets" component={UserTickets} />
              <Route
                path="/settings"
                component={() => <UserSettings user={user} />}
              />
              <Route
                path="/admin"
                component={() => (
                  <Admin
                    dashboard={Dashboard}
                    catchAll={NotFound}
                    dataProvider={dataProvider}
                    authProvider={authProvider}
                    history={history}
                  >
                    {(permissions) => [
                      <Resource
                        name="users"
                        list={
                          permissions.role === "admin" ||
                          permissions.role === "master"
                            ? UserList
                            : null
                        }
                        icon={UserIcon}
                        create={UserCreate}
                        edit={UserEdit}
                      />,
                      <Resource
                        name="tickets"
                        list={
                          permissions.role === "admin" ||
                          permissions.role === "master"
                            ? TicketList
                            : null
                        }
                        icon={TicketIcon}
                        create={TicketCreate}
                        edit={TicketEdit}
                      />,
                      <Resource
                        name="charities"
                        list={AdminCharityList}
                        icon={CharityIcon}
                        create={
                          permissions.role === "admin" ||
                          permissions.role === "master"
                            ? CharityCreate
                            : null
                        }
                        edit={CharityEdit}
                      />,
                      <Resource
                        name="sponsors"
                        list={
                          permissions.role === "admin" ||
                          permissions.role === "master"
                            ? SponsorList
                            : null
                        }
                        icon={SponsorIcon}
                        create={SponsorCreate}
                        edit={SponsorEdit}
                      />,
                      <Resource
                        name="slideshow"
                        options={{ label: "Slideshow Images" }}
                        list={
                          permissions.role === "admin" ||
                          permissions.role === "master"
                            ? SlideshowList
                            : null
                        }
                        icon={SlideshowIcon}
                        create={SlideshowCreate}
                        edit={SlideshowEdit}
                      />,
                    ]}
                  </Admin>
                )}
              />
              <Redirect to="/not-found" />
            </Switch>
          </div>
          <FooterPage />
        </main>
      </Provider>
    );
  }
}

export default App;

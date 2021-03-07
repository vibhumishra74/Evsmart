import "./App.css";
import { BrowserRouter, Switch } from "react-router-dom";
import Navigation from "./components/navigation";
import Footer from "./components/navigation/Footer";
import Home from "./components/home components/Home";
import Contact from "./components/contacttus";
import Profile from "./components/Profile";
import StationProfile from "./components/StationProfile";
import Help from "./components/Help";
import About from "./components/About";
import Signin from "./components/Signin";
import Dashboard from "./components/Dashboard";
import Map from "./components/Map";
import SignUp from "./components/Signup";
import Station from "./components/Station";
import AdminDash from "./components/adminDash";
import { Fragment } from "react";
import PrivateRoute from "./components/routes/PrivateRoute";
import PublicRoute from "./components/routes/PublicRoute";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Switch className="App">
        <Fragment>
          <PublicRoute exact path="/" component={Home} />
          <PublicRoute exact path="/home" component={Home} />
          <PublicRoute path="/contact" component={Contact} />
          <PrivateRoute path="/help" component={Help} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/station-profile" component={StationProfile} />
          <PrivateRoute path="/map" component={Map} />
          <PublicRoute path="/about" component={About} />
          <PublicRoute path="/sign-in" component={Signin} />
          <PublicRoute path="/sign-up" component={SignUp} />
          <PrivateRoute path="/station" component={Station} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/admindash" component={AdminDash} />
        </Fragment>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

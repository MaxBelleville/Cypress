import React, { Component } from "react";
import "./App.css";
import { NavBarT } from "./Components/Nav/NavBar";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { HomeT } from "./Pages/Home";
import { AboutT } from "./Pages/About";
import { AccountT } from "./Pages/Account";
import { FAQT } from "./Pages/FAQ";
import { PostT } from "./Pages/Posts/Post";
import { EditT } from "./Pages/Posts/Edit";
import { ViewT } from "./Pages/Posts/View";
import { CreateT } from "./Pages/Posts/Create";
import { ContactT } from "./Pages/Contact";
import { RegisterT } from "./Pages/Register";
import { LoginT } from "./Pages/Login";
import { Logout } from "./Pages/Logout";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "guest",
    };
    if (sessionStorage.getItem("sessionEmail") != null) {
      this.state = {
        status: "user",
      };
    }
    this.changeToUser = this.changeToUser.bind(this);
    this.changeToGuest = this.changeToGuest.bind(this);
  }
  changeToUser() {
    this.setState({ status: "user" });
  }
  changeToGuest() {
    this.setState({ status: "guest" });
  }
  render() {
    return (
      <div className="App">
        <NavBarT userState={this.state.status} />
        <Router>
          <Switch>
            <Route path="/about" component={AboutT} />
            <Route path="/faq" component={FAQT} />
            <Route path="/contact" component={ContactT} />
            <Route path="/register">
              <RegisterT change={this.changeToUser} />
            </Route>
            <Route path="/login">
              <LoginT change={this.changeToUser} />
            </Route>
            <Route path="/logout">
              <Logout change={this.changeToGuest} />
            </Route>
            <Route path="/account">
              <AccountT change={this.changeToGuest} />
            </Route>
            <Route path="/posts/view" component={ViewT} />
            <Route path="/posts/create" component={CreateT} />
            <Route
              path="/posts/post"
              render={(props) => <PostT {...props} />}
            />
            <Route
              path="/posts/edit"
              render={(props) => <EditT {...props} />}
            />
            <Route path="/">
              <HomeT acc={this.state.status} />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

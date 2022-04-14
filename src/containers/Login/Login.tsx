import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import {
  Auth,
  FC_AddBasicInfo,
  FC_Login,
  FT_AddBasicInfo,
  FT_Login,
} from "../../actions";
import Alert from "../../components/Alert/Alert";
import Button from "../../components/Buttons/Button";
import TextInput from "../../components/Inputs/TextInput";
import { StoreState } from "../../reducers";

// props for the component
interface AppProps {
  auth: Auth;
  FC_Login: FT_Login;
  FC_AddBasicInfo: FT_AddBasicInfo;
}

interface AppState {
  username: string;
  password: string;
  loading: boolean;
  error: {
    target: "username" | "password" | "main" | null;
    msg: string;
  };
}

class _App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      username: "",
      password: "",
      loading: false,
      error: {
        target: null,
        msg: "",
      },
    };
  }

  submitLogin = (e: any) => {
    e.preventDefault();

    //* Validation
    if (this.state.username.length <= 4) {
      return this.setState({
        error: {
          target: "username",
          msg: "Phone must not be lass than 4 character",
        },
      });
    }

    //* Validation
    if (this.state.password.length <= 4) {
      return this.setState({
        error: {
          target: "password",
          msg: "Password must not be lass than 4 character",
        },
      });
    }

    this.setState({
      loading: true,
      error: {
        target: null,
        msg: "",
      },
    });
    this.props.FC_Login(
      {
        password: this.state.password,
        username: this.state.username,
      },
      (auth_status, msg) => {
        console.log({ auth_status, msg });

        if (auth_status === true) {
          // this.props.FC_AddBasicInfo((info_status, msg) => {
          //   if (info_status === true) {
          //     // this.props.FC_AddBasicInfo((status, msg) => {});
          //   }
          // });
        } else {
          this.setState({
            error: {
              target: "main",
              msg: msg,
            },
            loading: false,
          });

          setTimeout(() => {
            this.setState({
              error: {
                target: null,
                msg: "",
              },
            });
          }, 3000);
        }
      }
    );
  };

  render() {
    if (this.props.auth.isAuthenticated === true) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <>
        {this.state.error.target === "main" && (
          <Alert theme="danger" fixed>
            {this.state.error.msg}
          </Alert>
        )}

        <div className="min-h-screen bg-gray-100 dark:bg-dark-900 flex items-center">
          <div className="bg-white py-10 rounded border mt-5  dark:bg-dark-800 w-full max-w-md mx-auto px-5">
            <form onSubmit={this.submitLogin}>
              <h1 className="text-center text-3xl mb-6 text-primary-800 dark:text-primary-dark  font-extrabold">
                TMIS Login
              </h1>

              <TextInput
                error={
                  this.state.error.target === "username"
                    ? this.state.error.msg
                    : ""
                }
                label="Phone"
                name="phone"
                onChange={(e) =>
                  this.setState({
                    username: e.target.value,
                    error: {
                      target: null,
                      msg: "",
                    },
                  })
                }
                placeholder="25070000000"
                value={this.state.username}
                disabled={this.state.loading}
                type="email"
              />

              <TextInput
                error={
                  this.state.error.target === "password"
                    ? this.state.error.msg
                    : ""
                }
                label="Password"
                name="password"
                onChange={(e) =>
                  this.setState({
                    password: e.target.value,
                    error: {
                      target: null,
                      msg: "",
                    },
                  })
                }
                placeholder="Password"
                value={this.state.password}
                disabled={this.state.loading}
                type="password"
              />

              <div className="mt-5">
                <Button full loading={this.state.loading}>
                  Login
                </Button>
              </div>

              <div className="mt-4 text-center">
                <p className=" cursor-pointer">Forget your password?</p>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ auth }: StoreState): { auth: Auth } => {
  return { auth: auth };
};

export const Login = connect(mapStateToProps, {
  FC_Login,
  FC_AddBasicInfo,
})(_App);

import React from "react";
import { connect } from "react-redux";
import { Auth } from "../../actions";
import DashboardContainer from "../../components/DashboardContainer/DashboardContainer";
import Heading from "../../components/Heading/Heading";
import TextInput from "../../components/Inputs/TextInput";
import { StoreState } from "../../reducers";
// import Alert, { AlertInterface } from "../../components/Alert/Alert";

// props for the component
interface AppProps {
  auth: Auth;
}

interface AppState {
  loading: boolean;
}

class _CreateDocument extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  render() {
    return (
      <DashboardContainer className=" flex bg-white shadow">
        <div className="p-8 w-full">
          <Heading>Register new Document</Heading>

          <div className="py-2 grid grid-cols-2 w-full gap-8 ">
            <TextInput
              onChange={(e) => {}}
              value={""}
              error={""}
              label={"Names of document's owner"}
              placeholder={""}
              name={""}
            />
            <TextInput
              onChange={(e) => {}}
              value={""}
              error={""}
              label={"Names of document's owner"}
              placeholder={""}
              name={""}
            />
            <TextInput
              onChange={(e) => {}}
              value={""}
              error={""}
              label={"Names of document's owner"}
              placeholder={""}
              name={""}
            />
            <TextInput
              onChange={(e) => {}}
              value={""}
              error={""}
              label={"Names of document's owner"}
              placeholder={""}
              name={""}
            />
            <TextInput
              onChange={(e) => {}}
              value={""}
              error={""}
              label={"Names of document's owner"}
              placeholder={""}
              name={""}
            />
          </div>
        </div>
      </DashboardContainer>
    );
  }
}

const mapStateToProps = ({ auth }: StoreState): { auth: Auth } => {
  return { auth: auth };
};

export const CreateDocument = connect(mapStateToProps, {})(_CreateDocument);

import React from "react";
import { connect } from "react-redux";
import { Auth } from "../../actions";
import PDFViewer from "../../components/PDFViewer/PDFViewer";
import { StoreState } from "../../reducers";
// import Alert, { AlertInterface } from "../../components/Alert/Alert";

// props for the component
interface AppProps {
  auth: Auth;
}

interface AppState {
  loading: boolean;
}

class _DocumentDetails extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  render() {
    return (
      <div className=" flex bg-white">
        <div className="flex-1">
          <PDFViewer
            file_url={"http://localhost:4000/api/uploads/01.pdf"}
            class_name={" w-full height-calculated"}
            frame_title={""}
            setLoadingFile={() => {}}
          />
        </div>

        <div className="w-72 p-5">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
          nostrum eum dignissimos nemo saepe quis rerum consequuntur, itaque
          repudiandae excepturi doloremque officiis enim hic obcaecati. Nobis
          possimus architecto veniam quas?
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }: StoreState): { auth: Auth } => {
  return { auth: auth };
};

export const DocumentDetails = connect(mapStateToProps, {})(_DocumentDetails);

import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { Auth } from "../../actions";
import Button from "../../components/Buttons/Button";
import DashboardContainer from "../../components/DashboardContainer/DashboardContainer";
import Heading from "../../components/Heading/Heading";
import TextInput from "../../components/Inputs/TextInput";
import { APP_URL } from "../../config/app.config";
import { StoreState } from "../../reducers";
import { setAxiosToken } from "../../utils/AxiosToken";
// import Alert, { AlertInterface } from "../../components/Alert/Alert";

export const UPLOAD_DOC_MAX_SIZE = 1048576; // 1MB to Bytes
export const UPLOAD_DOC_MAX_SIZE_MB = 1;
export const UPLOAD_DOC_FILE_TYPE_ERROR_MSG = "The system accept images only";
export const SUPORT_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/tiff",
  "image/webp",
  "image/bmp",
  "image/gif",
  "application/pdf",
];

// props for the component
interface AppProps {
  auth: Auth;
}

interface AppState {
  loading: boolean;
  upload_percentage: number;
  error: {
    target: string;
    msg: string;
  };
  success: boolean;
  files: any;
}

class _CreateDocument extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      loading: false,
      success: false,
      files: "",
      upload_percentage: 0,
      error: {
        target: "",
        msg: "",
      },
      // no_categories: false,
    };
  }

  // upload data
  FC_UploadUserDocumentAPI = async () => {
    console.log("FC_UploadUserDocumentAPI");

    this.setState({
      loading: true,
    });
    try {
      var formData = new FormData();
      formData.append("phone", "234234234");
      formData.append("email", "janvier@gmail.com");
      formData.append("names", "janvier");
      // formData.append("year", "james");
      // formData.append("title", "hello");
      // formData.append("start_year", "12/12/1212");
      // formData.append("phone_number", "23113224234");

      // formData.append("file", this.state.files);
      formData.append("files", this.state.files[0]);
      console.log({ file: this.state.files[0] });

      if (!this.state.files) return;
      setAxiosToken();
      const res = await axios.post<{
        doc_id: string;
        message: string;
        files?: string;
      }>(`${APP_URL}/document`, formData, {
        onUploadProgress: (progressEvent: any) => {
          let number_percentage =
            (+progressEvent?.loaded / +progressEvent.total) * 100;
          this.setState({
            upload_percentage: number_percentage,
          });
        },
      });

      console.log({ res });

      this.setState({
        loading: false,
        success: true,
      });

      // console.log({ subcategory_data: res.data });

      // this.props.FC_AddUploadedDocumentToState(res.data);

      // call the complete handler
      // if (this.props.UploadCompleted !== null) {
      //   this.props.UploadCompleted();
      // }

      // timer for message
      // setTimeout(() => {
      //   this.props.close();
      // }, 2000);

      this.clearForm();
      // this.setState({
      //   category_subcategory_data: null,
      //   school: null,
      // });
    } catch (error) {
      console.log({ error });

      this.setState({
        loading: false,
        error: {
          target: "all",
          msg: "msg",
        },
      });
    }
  };

  clearForm = () => {
    this.setState({
      upload_percentage: 0,
      files: "",
      loading: false,
    });
  };

  submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.setState({
      error: {
        target: "",
        msg: "",
      },
    });

    this.FC_UploadUserDocumentAPI();
  };

  onFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      error: {
        msg: "",
        target: "",
      },
      files: "",
    });

    // check if the file is available
    if (e.target.files === null) {
      return this.setState({
        error: {
          msg: "Please select a valid file",
          target: "files",
        },
      });
    }

    const file = e.target.files[0];

    // check the file type
    if (!SUPORT_FILE_TYPES.includes(file.type)) {
      return this.setState({
        error: {
          msg: UPLOAD_DOC_FILE_TYPE_ERROR_MSG,
          target: "files",
        },
      });
    }

    // check if the size is valued
    if (file.size >= UPLOAD_DOC_MAX_SIZE) {
      return this.setState({
        error: {
          msg: `Max file size is (${UPLOAD_DOC_MAX_SIZE_MB}MB)`,
          target: "files",
        },
      });
    }

    // Add image
    this.setState({
      error: {
        msg: "",
        target: "",
      },
      files: e.target.files,
    });
  };

  render() {
    return (
      <DashboardContainer className=" flex bg-white shadow">
        <div className="p-8 w-full">
          <Heading>Register new Document</Heading>
          <form onSubmit={this.submitHandler}>
            <div className="py-2 grid grid-cols-2 w-full gap-8 ">
              <div className="mt-1">
                <input
                  onChange={this.onFileChange}
                  type="file"
                  name="files"
                  className={`input-white w-full inline-block  ${
                    this.state.error?.target === "files"
                      ? "border-red-500 border-2"
                      : "border-gray-500 border-2"
                  }`}
                  placeholder="files"
                  disabled={this.state.loading}
                />
              </div>
              <div className="-mt-1">
                <TextInput
                  onChange={(e) => {}}
                  value={""}
                  error={""}
                  label={"Names of document's owner"}
                  placeholder={""}
                  name={""}
                />
              </div>
              <div className="-mt-1">
                <TextInput
                  onChange={(e) => {}}
                  value={""}
                  error={""}
                  label={"Names of document's owner"}
                  placeholder={""}
                  name={""}
                />
              </div>
              <div className="-mt-1">
                <TextInput
                  onChange={(e) => {}}
                  value={""}
                  error={""}
                  label={"Names of document's owner"}
                  placeholder={""}
                  name={""}
                />
              </div>
              <div className="-mt-1">
                <TextInput
                  onChange={(e) => {}}
                  value={""}
                  error={""}
                  label={"Names of document's owner"}
                  placeholder={""}
                  name={""}
                />
              </div>
              <div className="-mt-1">
                <TextInput
                  onChange={(e) => {}}
                  value={""}
                  error={""}
                  label={"Names of document's owner"}
                  placeholder={""}
                  name={""}
                />
              </div>
              <div className="-mt-1">
                <TextInput
                  onChange={(e) => {}}
                  value={""}
                  error={""}
                  label={"Names of document's owner"}
                  placeholder={""}
                  name={""}
                />
              </div>
              <div className="mt-2">
                <Button type="submit">
                  Upload document {this.state.upload_percentage}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </DashboardContainer>
    );
  }
}

const mapStateToProps = ({ auth }: StoreState): { auth: Auth } => {
  return { auth: auth };
};

export const CreateDocument = connect(mapStateToProps, {})(_CreateDocument);
